import { AttributeDefinition } from '@/data/sr4sAttributesData';
import { SR4S_DEFAULT_ATTRIBUTES_MAP } from '@/data/sr4sOfficialBaseline';

/**
 * UI mezon ID-larining rasmiy iRAP / SR4S parametr kalitlariga moslik jadvali.
 */
export const ATTR_ID_TO_OFFICIAL_PARAM: Record<string, string> = {
  land_use_left: 'land_use_driver_side',
  land_use_right: 'land_use_passenger_side',
  area_type: 'area_type',
  vehicle_parking: 'vehicle_parking',
  sight_distance: 'sight_distance',
  number_of_lanes: 'number_of_lanes',
  lane_width: 'lane_width',
  shoulder_rumble_strips: 'shoulder_rumble_strips',
  road_condition: 'road_condition',
  grip: 'skid_resistance_grip',
  grade: 'grade',
  carriageway_type: 'carriageway',
  middle_of_road: 'median_type',
  lines_and_signs: 'delineation',
  street_lighting: 'street_lighting',
  school_warning: 'school_zone_warning',
  crossing_supervisor: 'school_zone_crossing_supervisor',
  sidewalk_left: 'sidewalk_driver_side',
  sidewalk_right: 'sidewalk_passenger_side',
  road_edge_left: 'paved_shoulder_driver_side',
  road_edge_right: 'paved_shoulder_passenger_side',
  pedestrian_channelisation: 'ped_channelisation',
  crossing_main_road: 'pedestrian_crossing_facilities_inspected_road',
  crossing_side_road: 'pedestrian_crossing_facilities_intersecting_road',
  crossing_quality: 'pedestrian_crossing_quality',
  vehicles_per_day: 'vehicle_flow_aadt',
  crossing_flow: 'pedestrian_peak_hour_flow_across_the_road',
  right_side_flow: 'pedestrian_peak_hour_flow_along_the_road_passenger_side',
  left_side_flow: 'pedestrian_peak_hour_flow_along_the_road_driver_side',
  intersection_type: 'intersection_type',
  driveways: 'property_access_points',
  intersection_side_flow: 'intersecting_road_volume',
  intersection_quality: 'intersection_quality',
  curve_type: 'curvature',
  curve_quality: 'quality_of_curve',
  speed_limit: 'speed_limit',
  operating_speed: 'operating_speed_85th_percentile',
  speed_management: 'speed_management_traffic_calming',
  motorcycle_percent: 'motorcycle_percent',
  hgv_percent: 'hgv_percent',
};

/**
 * UI variant ID-larining rasmiy iRAP / SR4S sonli kodlariga moslik jadvali.
 */
export const ATTR_OPTION_TO_OFFICIAL_CODE: Record<string, Record<string, string>> = {
  land_use_left: {
    undeveloped: '1', residential: '2', commercial: '3', industrial: '4', farming: '5', school: '6',
  },
  land_use_right: {
    undeveloped: '1', residential: '2', commercial: '3', industrial: '4', farming: '5', school: '6',
  },
  area_type: {
    rural: '1', urban: '2',
  },
  vehicle_parking: {
    none: '1', one_side: '2', two_side: '3',
  },
  sight_distance: {
    adequate: '1', poor: '2',
  },
  number_of_lanes: {
    '1_1': '1', '2_1': '2', '2_2': '2', '3_2': '2', '3_3': '2', '4_4': '2',
  },
  lane_width: {
    wide: '1', medium: '2', narrow: '3',
  },
  shoulder_rumble_strips: {
    not_present: '1', present: '2',
  },
  road_condition: {
    good: '1', medium: '2', poor: '3',
  },
  grip: {
    good: '1', medium: '2', poor: '3',
  },
  grade: {
    grade_low: '1', grade_medium: '4', grade_high: '4',
  },
  carriageway_type: {
    divided_north_east: '1', divided_south_west: '2', undivided: '3',
  },
  middle_of_road: {
    center_line: '13',
    wide_line: '1',
    hatching: '2',
    turn_lane: '3',
    flexible_posts: '4',
    separated_0_1: '5',
    separated_1_5: '6',
    separated_5_10: '7',
    separated_10_20: '8',
    separated_20_plus: '9',
    metal_barrier: '10',
    concrete_barrier: '11',
    wire_barrier: '12',
    motorcycle_barrier: '10',
    one_way: '13',
    broken_wide_markings: '1',
  },
  lines_and_signs: {
    adequate: '1', poor: '2',
  },
  street_lighting: {
    present: '2', not_present: '1',
  },
  school_warning: {
    flashing_beacons: '1', signs_markings: '2', no_school_zone: '3', no_school_nearby: '3',
  },
  crossing_supervisor: {
    supervisor: '1', no_supervisor: '2', no_school_nearby: '3',
  },
  sidewalk_left: {
    none: '5', '0_1m': '3', '1_3m': '4', gt_3m: '2', barrier: '1',
    poor: '5', moderate: '3', shared: '2',
  },
  sidewalk_right: {
    none: '5', '0_1m': '3', '1_3m': '4', gt_3m: '2', barrier: '1',
    poor: '5', moderate: '3', shared: '2',
  },
  road_edge_left: {
    none: '4', '0_1m': '3', '1_2_4m': '2', gt_2_4m: '1',
  },
  road_edge_right: {
    none: '4', '0_1m': '3', '1_2_4m': '2', gt_2_4m: '1',
  },
  pedestrian_channelisation: {
    not_present: '1', present: '2',
  },
  crossing_main_road: {
    none: '1',
    lights: '10',
    raised: '14',
    bridge_tunnel: '9',
    marked: '5',
    unmarked: '7',
    refuge: '6',
    lights_refuge: '11',
    marked_refuge: '8',
    raised_marked: '12',
    raised_refuge: '13',
    raised_marked_refuge: '14',
  },
  crossing_side_road: {
    none: '1',
    lights: '10',
    raised: '14',
    bridge_tunnel: '9',
    marked: '3',
    unmarked: '7',
    refuge: '6',
    lights_refuge: '11',
    marked_refuge: '8',
    raised_marked: '12',
    raised_refuge: '13',
    raised_marked_refuge: '14',
  },
  crossing_quality: {
    adequate: '1', poor: '2', na: '3',
  },
  crossing_flow: {
    not_present: '1', present: '2',
  },
  right_side_flow: {
    not_present: '1', present: '2',
  },
  left_side_flow: {
    not_present: '1', present: '2',
  },
  intersection_type: {
    merge_lane: '1',
    '3_leg': '3',
    '3_leg_signal': '4',
    '3_leg_turn_lane': '5',
    '3_leg_turn_signal': '6',
    '4_leg': '8',
    '4_leg_turn_lane': '7',
    '4_leg_signal': '4',
    '4_leg_turn_signal': '6',
    roundabout: '2',
    mini_roundabout: '2',
    formal_u_turn: '1',
    informal_u_turn: '1',
    active_train: '7',
    passive_train: '7',
    no_intersection: 'none',
    short_merge: '1',
    diverge_lane: '1',
  },
  driveways: {
    '1_2_residential': '1',
    '2_plus_residential': '2',
    commercial: '3',
    not_applicable: '4',
  },
  intersection_quality: {
    adequate: '1', poor: '2', not_applicable: '3',
  },
  curve_type: {
    straight: '1', moderate: '2', sharp: '3', very_sharp: '4',
  },
  curve_quality: {
    adequate: '1', poor: '2', not_curve: '3',
  },
  speed_management: {
    not_present: '1', present: '2',
  },
  motorcycle_percent: {
    not_recorded: '1', '0': '1', '1_5': '2', '6_10': '2', '11_20': '3', '21_40': '3', '41_60': '4', '61_80': '4', '81_99': '4', '100': '4',
  },
  hgv_percent: {
    not_recorded: '1', '0_5': '1', '5_10': '2', '10_15': '3', '15_20': '3', '20_30': '4', '30_40': '4', '40_plus': '5',
  },
};

/**
 * 40 ta mezonni rasmiy results.starratingforschools.org/model/V31a qabul qiladigan
 * form-urlencoded parametrlariga aylantirib beradi.
 */
export function buildOfficialSr4sPayload(
  attributes: AttributeDefinition[] | Record<string, string>
): URLSearchParams {
  const payloadMap: Record<string, string> = { ...SR4S_DEFAULT_ATTRIBUTES_MAP };

  if (Array.isArray(attributes)) {
    attributes.forEach((attr) => {
      const officialKey = ATTR_ID_TO_OFFICIAL_PARAM[attr.id] || attr.id;
      const rawVal = attr.customValue || attr.currentValueId || '';

      if (attr.isInput || attr.isSlider) {
        // Sonli qiymatlar (Tezlik, AADT va boshqalar)
        if (rawVal) {
          payloadMap[officialKey] = String(rawVal);
        }
      } else {
        // Variantli mezonlar
        const codeMap = ATTR_OPTION_TO_OFFICIAL_CODE[attr.id];
        if (codeMap && codeMap[rawVal]) {
          payloadMap[officialKey] = codeMap[rawVal];
        } else if (rawVal) {
          payloadMap[officialKey] = String(rawVal);
        }
      }
    });
  } else {
    // Agar to'g'ridan-to'g'ri key-value berilgan bo'lsa
    Object.entries(attributes).forEach(([key, val]) => {
      const officialKey = ATTR_ID_TO_OFFICIAL_PARAM[key] || key;
      const codeMap = ATTR_OPTION_TO_OFFICIAL_CODE[key];
      if (codeMap && codeMap[val]) {
        payloadMap[officialKey] = codeMap[val];
      } else {
        payloadMap[officialKey] = String(val);
      }
    });
  }

  const params = new URLSearchParams();
  Object.entries(payloadMap).forEach(([k, v]) => {
    params.append(k, v);
  });

  return params;
}
