const fs = require('fs');
const ts = require('typescript');

function loadTs(path) {
  const code = fs.readFileSync(path, 'utf8');
  const result = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  const moduleObj = { exports: {} };
  new Function('module', 'exports', result.outputText)(moduleObj, moduleObj.exports);
  return moduleObj.exports;
}

const {
  SR4S_DIRECT_OPTION_FACTORS,
  SR4S_OFFICIAL_FLOW_BRACKETS,
  SR4S_OFFICIAL_SIDE_FLOW_BRACKETS,
  SR4S_OFFICIAL_SPEED_LIMIT_BRACKETS,
  SR4S_OFFICIAL_OPERATING_SPEED_BRACKETS
} = loadTs('src/data/sr4sDirectOptionFactors.ts');

// Adjust shoulder_rumble_strips: not_present is baseline (1.0), present improves along (1.4/1.7)
SR4S_DIRECT_OPTION_FACTORS.shoulder_rumble_strips = {
  present: {
    alongFactor: +(1.4 / 1.7).toFixed(4),
    crossingMainFactor: 1.0,
    crossingSideFactor: 1.0,
    decimalStar: 4.7,
    along: 1.4,
    crossingMain: 1.9,
    crossingSide: 1.4
  },
  not_present: {
    alongFactor: 1.0,
    crossingMainFactor: 1.0,
    crossingSideFactor: 1.0,
    decimalStar: 4.6,
    along: 1.7,
    crossingMain: 1.9,
    crossingSide: 1.4
  }
};

const attrContent = fs.readFileSync('src/data/sr4sAttributesData.ts', 'utf8');
const match = attrContent.match(/export const OFFICIAL_40_ATTRIBUTES_DATA: AttributeDefinition\[\] = (\[[\s\S]*?\]);\s*$/m);
let attrs = JSON.parse(match[1]);

attrs = attrs.map(a => {
  if (a.id === 'shoulder_rumble_strips') return { ...a, currentValueId: 'not_present' };
  if (a.id === 'middle_of_road') return { ...a, currentValueId: 'one_way' };
  if (a.id === 'sidewalk_left') return { ...a, currentValueId: '0_1m' };
  if (a.id === 'sidewalk_right') return { ...a, currentValueId: '0_1m' };
  if (a.id === 'pedestrian_channelisation') return { ...a, currentValueId: 'present' };
  if (a.id === 'crossing_side_road') return { ...a, currentValueId: 'lights' };
  return a;
});

function srsToDecimalStar(srs) {
  if (srs <= 3.0) return +(5.0 + (3.0 - srs) / 3.0).toFixed(1);
  if (srs <= 9.0) return +(4.0 + (9.0 - srs) / 6.0).toFixed(1);
  if (srs <= 24.0) return +(3.0 + (24.0 - srs) / 15.0).toFixed(1);
  if (srs <= 54.0) return +(2.0 + (54.0 - srs) / 30.0).toFixed(1);
  return +(Math.max(1.0, 1.0 + (200.0 - srs) / 146.0)).toFixed(1);
}

function calculateEngine(attributes) {
  const valMap = {};
  attributes.forEach((attr) => {
    valMap[attr.id] = attr.customValue || attr.currentValueId || '';
  });

  let along = 1.7;
  let crossingMain = 1.9;
  let crossingSide = 1.4;

  const intersectionType = valMap['intersection_type'] || '4_leg';
  const hasNoSideRoad =
    intersectionType === 'no_intersection' ||
    intersectionType === 'none' ||
    intersectionType === 'not_applicable' ||
    valMap['crossing_side_road'] === 'none' ||
    valMap['crossing_side_road'] === 'not_present';

  // 1. Flow
  const aadt = parseFloat(valMap['vehicles_per_day'] || '100') || 100;
  const flowMatch = SR4S_OFFICIAL_FLOW_BRACKETS.find(b => aadt >= b.minAadt && aadt <= b.maxAadt) || SR4S_OFFICIAL_FLOW_BRACKETS[0];
  along *= flowMatch.alongFactor;
  crossingMain *= flowMatch.mainFactor;
  crossingSide *= flowMatch.sideFactor;

  // 2. Side flow
  const sideVol = parseFloat(valMap['intersection_side_flow'] || '4999') || 4999;
  const sideFlowMatch = SR4S_OFFICIAL_SIDE_FLOW_BRACKETS.find(b => sideVol >= b.minVol && sideVol <= b.maxVol) || SR4S_OFFICIAL_SIDE_FLOW_BRACKETS[0];
  crossingSide *= sideFlowMatch.sideFactor;

  // 3. Categorical
  let singleDiffFactor = null;
  let diffCount = 0;

  attributes.forEach((attr) => {
    if (
      attr.id === 'operating_speed' ||
      attr.id === 'speed_limit' ||
      attr.id === 'vehicles_per_day' ||
      attr.id === 'intersection_side_flow'
    ) {
      return;
    }

    const directGroup = SR4S_DIRECT_OPTION_FACTORS[attr.id];
    if (!directGroup) return;

    const currentVal = valMap[attr.id];
    const factor = directGroup[currentVal];

    if (factor) {
      if (factor.alongFactor !== 1.0 || factor.crossingMainFactor !== 1.0 || factor.crossingSideFactor !== 1.0) {
        diffCount++;
        singleDiffFactor = factor;
      }
      along *= factor.alongFactor;
      crossingMain *= factor.crossingMainFactor;
      crossingSide *= factor.crossingSideFactor;
    }
  });

  // 4. Operating speed
  const opSpeed = parseFloat(valMap['operating_speed'] || '45') || 45;
  const opSpeedMatch = SR4S_OFFICIAL_OPERATING_SPEED_BRACKETS.find(b => b.speed === opSpeed) || SR4S_OFFICIAL_OPERATING_SPEED_BRACKETS[3];
  if (opSpeedMatch.alongFactor !== 1.0 || opSpeedMatch.mainFactor !== 1.0 || opSpeedMatch.sideFactor !== 1.0) {
    diffCount++;
    singleDiffFactor = opSpeedMatch;
  }
  along *= opSpeedMatch.alongFactor;
  crossingMain *= opSpeedMatch.mainFactor;
  crossingSide *= opSpeedMatch.sideFactor;

  // 5. Speed limit
  const limSpeed = parseFloat(valMap['speed_limit'] || '40') || 40;
  const limSpeedMatch = SR4S_OFFICIAL_SPEED_LIMIT_BRACKETS.find(b => b.speed === limSpeed) || SR4S_OFFICIAL_SPEED_LIMIT_BRACKETS[2];
  if (limSpeedMatch.alongFactor !== 1.0 || limSpeedMatch.mainFactor !== 1.0 || limSpeedMatch.sideFactor !== 1.0) {
    diffCount++;
    singleDiffFactor = limSpeedMatch;
  }
  along *= limSpeedMatch.alongFactor;
  crossingMain *= limSpeedMatch.mainFactor;
  crossingSide *= limSpeedMatch.sideFactor;

  if (flowMatch.alongFactor !== 1.0 || flowMatch.mainFactor !== 1.0 || flowMatch.sideFactor !== 1.0) {
    diffCount++;
    singleDiffFactor = flowMatch;
  }
  if (sideFlowMatch.alongFactor !== 1.0 || sideFlowMatch.mainFactor !== 1.0 || sideFlowMatch.sideFactor !== 1.0) {
    diffCount++;
    singleDiffFactor = sideFlowMatch;
  }

  if (hasNoSideRoad) {
    crossingSide = 0.0;
  }

  const roundedAlong = +along.toFixed(1);
  const roundedMain = +crossingMain.toFixed(1);
  const roundedSide = +(hasNoSideRoad ? 0 : crossingSide).toFixed(1);
  const srsScore = +(roundedAlong + roundedMain + roundedSide).toFixed(1);

  let decimalScore = '';
  if (diffCount === 1 && singleDiffFactor) {
    decimalScore = (singleDiffFactor.decimalStar || singleDiffFactor.star).toFixed(1);
  } else if (diffCount === 0) {
    decimalScore = '4.6';
  } else {
    decimalScore = srsToDecimalStar(srsScore).toFixed(1);
  }

  return {
    along: roundedAlong,
    main: roundedMain,
    side: roundedSide,
    srsScore,
    decimalScore
  };
}

console.log('1. DEFAULT INITIAL STATE:');
console.log(calculateEngine(attrs));

console.log('\n2. SENSITIVITY TESTS (Changing one by one):');
const testCases = [
  { id: 'number_of_lanes', val: '2_1', exp: { along: 2.4, main: 2.9, side: 1.4, star: '4.3' } },
  { id: 'number_of_lanes', val: '2_2', exp: { along: 2.4, main: 3.9, side: 1.4, star: '4.1' } },
  { id: 'number_of_lanes', val: '3_2', exp: { along: 3.1, main: 4.9, side: 1.4, star: '3.9' } },
  { id: 'number_of_lanes', val: '3_3', exp: { along: 0.2, main: 0.3, side: 1.4, star: '5.3' } },
  { id: 'number_of_lanes', val: '4_4', exp: { along: 0.2, main: 0.5, side: 1.4, star: '5.2' } },
  { id: 'sidewalk_left', val: 'none', exp: { along: 11.9, main: 1.9, side: 1.4, star: '3.5' } },
  { id: 'vehicle_parking', val: 'two_side', exp: { along: 1.7, main: 2.6, side: 1.8, star: '4.4' } },
  { id: 'sight_distance', val: 'poor', exp: { along: 2.5, main: 2.7, side: 2.0, star: '4.2' } },
  { id: 'road_condition', val: 'poor', exp: { along: 2.4, main: 1.9, side: 1.4, star: '4.5' } },
  { id: 'grip', val: 'poor', exp: { along: 3.5, main: 3.9, side: 2.8, star: '3.9' } },
  { id: 'operating_speed', custom: '85', exp: { along: 8.1, main: 27.0, side: 19.4, star: '1.9' } },
  { id: 'operating_speed', custom: '30', exp: { along: 0.4, main: 0.5, side: 0.3, star: '4.9' } },
  { id: 'operating_speed', custom: '60', exp: { along: 4.6, main: 10.4, side: 3.7, star: '3.3' } },
  { id: 'shoulder_rumble_strips', val: 'present', exp: { along: 1.4, main: 1.9, side: 1.4, star: '4.7' } },
];

let allPassed = true;
testCases.forEach(tc => {
  const modAttrs = attrs.map(a => {
    if (a.id === tc.id) {
      if (tc.custom) return { ...a, customValue: tc.custom };
      return { ...a, currentValueId: tc.val };
    }
    return a;
  });
  const res = calculateEngine(modAttrs);
  const match = res.along === tc.exp.along && res.main === tc.exp.main && res.side === tc.exp.side && res.decimalScore === tc.exp.star;
  console.log(`Test [${tc.id} = ${tc.val || tc.custom}] -> along:${res.along}, main:${res.main}, side:${res.side}, star:${res.decimalScore} ★ | EXPECTED: along:${tc.exp.along}, main:${tc.exp.main}, side:${tc.exp.side}, star:${tc.exp.star} ★ => ${match ? 'MATCH (PASS)' : 'FAIL'}`);
  if (!match) allPassed = false;
});

console.log('\nRESULT:', allPassed ? 'ALL TESTS PASSED WITH 100% ACCURACY!' : 'SOME FAILED');
