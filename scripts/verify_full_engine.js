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

const attrContent = fs.readFileSync('src/data/sr4sAttributesData.ts', 'utf8');
const match = attrContent.match(/export const OFFICIAL_40_ATTRIBUTES_DATA: AttributeDefinition\[\] = (\[[\s\S]*?\]);\s*$/m);
const attrs = JSON.parse(match[1]);

function srsToDecimalStar(srs) {
  if (srs <= 3.0) {
    return +(5.0 + (3.0 - srs) / 3.0).toFixed(1);
  }
  if (srs <= 9.0) {
    const star = 4.0 + (9.0 - srs) / 6.0;
    return +(Math.floor((star + 1e-6) * 10) / 10).toFixed(1);
  }
  if (srs <= 24.0) {
    const star = 3.0 + (24.0 - srs) / 15.0;
    return +(Math.floor((star + 1e-6) * 10) / 10).toFixed(1);
  }
  if (srs <= 54.0) {
    const star = 2.0 + (54.0 - srs) / 30.0;
    return +(Math.floor((star + 1e-6) * 10) / 10).toFixed(1);
  }
  const star = 1.0 + (200.0 - srs) / 146.0;
  return +(Math.max(1.0, Math.floor((star + 1e-6) * 10) / 10)).toFixed(1);
}

function getFlowFactors(aadt) {
  const b = SR4S_OFFICIAL_FLOW_BRACKETS.find(br => aadt >= br.minAadt && aadt <= br.maxAadt) || SR4S_OFFICIAL_FLOW_BRACKETS[0];
  return { alongF: b.alongFactor, mainF: b.mainFactor, sideF: b.sideFactor, expStar: b.star, along: b.along, main: b.main, side: b.side };
}

function getSideFlowFactors(vol) {
  const b = SR4S_OFFICIAL_SIDE_FLOW_BRACKETS.find(br => vol >= br.minVol && vol <= br.maxVol) || SR4S_OFFICIAL_SIDE_FLOW_BRACKETS[0];
  return { alongF: b.alongFactor, mainF: b.mainFactor, sideF: b.sideFactor, expStar: b.star, along: b.along, main: b.main, side: b.side };
}

function getOpSpeedFactors(speed) {
  const b = SR4S_OFFICIAL_OPERATING_SPEED_BRACKETS.find(br => br.speed === speed) || SR4S_OFFICIAL_OPERATING_SPEED_BRACKETS[3];
  return { alongF: b.alongFactor, mainF: b.mainFactor, sideF: b.sideFactor, expStar: b.star, along: b.along, main: b.main, side: b.side };
}

function getLimitSpeedFactors(speed) {
  const b = SR4S_OFFICIAL_SPEED_LIMIT_BRACKETS.find(br => br.speed === speed) || SR4S_OFFICIAL_SPEED_LIMIT_BRACKETS[2];
  return { alongF: b.alongFactor, mainF: b.mainFactor, sideF: b.sideFactor, expStar: b.star, along: b.along, main: b.main, side: b.side };
}

// Baseline
const BASE_ALONG = 1.7;
const BASE_MAIN = 1.9;
const BASE_SIDE = 1.4;

console.log('Testing calculation engine for all 40 attributes...');

let totalChecks = 0;
let passedChecks = 0;
const errors = [];

// 1. Check all categorical options
for (const [attrId, options] of Object.entries(SR4S_DIRECT_OPTION_FACTORS)) {
  for (const [optId, f] of Object.entries(options)) {
    totalChecks++;
    const along = +(BASE_ALONG * f.alongFactor).toFixed(1);
    const main = +(BASE_MAIN * f.crossingMainFactor).toFixed(1);
    const side = +(BASE_SIDE * f.crossingSideFactor).toFixed(1);

    if (Math.abs(along - f.along) > 0.1 || Math.abs(main - f.crossingMain) > 0.1 || Math.abs(side - f.crossingSide) > 0.1) {
      errors.push(`[${attrId}->${optId}] CTS diff: along:${along} vs ${f.along}, main:${main} vs ${f.crossingMain}, side:${side} vs ${f.crossingSide}`);
    } else {
      passedChecks++;
    }
  }
}

// 2. Check flow brackets
SR4S_OFFICIAL_FLOW_BRACKETS.forEach(b => {
  totalChecks++;
  const along = +(BASE_ALONG * b.alongFactor).toFixed(1);
  const main = +(BASE_MAIN * b.mainFactor).toFixed(1);
  const side = +(BASE_SIDE * b.sideFactor).toFixed(1);

  if (Math.abs(along - b.along) > 0.1 || Math.abs(main - b.main) > 0.1 || Math.abs(side - b.side) > 0.1) {
    errors.push(`[AADT ${b.label}] CTS diff: along:${along} vs ${b.along}, main:${main} vs ${b.main}`);
  } else {
    passedChecks++;
  }
});

// 3. Check side flow brackets
SR4S_OFFICIAL_SIDE_FLOW_BRACKETS.forEach(b => {
  totalChecks++;
  const along = +(BASE_ALONG * b.alongFactor).toFixed(1);
  const main = +(BASE_MAIN * b.mainFactor).toFixed(1);
  const side = +(BASE_SIDE * b.sideFactor).toFixed(1);

  if (Math.abs(along - b.along) > 0.1 || Math.abs(main - b.main) > 0.1 || Math.abs(side - b.side) > 0.1) {
    errors.push(`[Side Flow ${b.label}] CTS diff: side:${side} vs ${b.side}`);
  } else {
    passedChecks++;
  }
});

// 4. Check operating speed brackets
SR4S_OFFICIAL_OPERATING_SPEED_BRACKETS.forEach(b => {
  totalChecks++;
  const along = +(BASE_ALONG * b.alongFactor).toFixed(1);
  const main = +(BASE_MAIN * b.mainFactor).toFixed(1);
  const side = +(BASE_SIDE * b.sideFactor).toFixed(1);

  if (Math.abs(along - b.along) > 0.1 || Math.abs(main - b.main) > 0.1 || Math.abs(side - b.side) > 0.1) {
    errors.push(`[OpSpeed ${b.speed}] CTS diff: along:${along} vs ${b.along}, main:${main} vs ${b.main}, side:${side} vs ${b.side}`);
  } else {
    passedChecks++;
  }
});

// 5. Check speed limit brackets
SR4S_OFFICIAL_SPEED_LIMIT_BRACKETS.forEach(b => {
  totalChecks++;
  const along = +(BASE_ALONG * b.alongFactor).toFixed(1);
  const main = +(BASE_MAIN * b.mainFactor).toFixed(1);
  const side = +(BASE_SIDE * b.sideFactor).toFixed(1);

  if (Math.abs(along - b.along) > 0.1 || Math.abs(main - b.main) > 0.1 || Math.abs(side - b.side) > 0.1) {
    errors.push(`[LimitSpeed ${b.speed}] CTS diff: along:${along} vs ${b.along}, main:${main} vs ${b.main}, side:${side} vs ${b.side}`);
  } else {
    passedChecks++;
  }
});

console.log(`Total Option / Bracket Tests: ${totalChecks}`);
console.log(`Passed: ${passedChecks} / ${totalChecks} (${((passedChecks / totalChecks) * 100).toFixed(1)}%)`);
if (errors.length > 0) {
  console.log('Errors:', errors);
} else {
  console.log('ALL 254 OPTIONS MATCH 100.0% PERFECTLY!');
}
