import { AttributeDefinition } from '../data/sr4sAttributesData';
import { SR4S_DEFAULT_ATTRIBUTES_MAP } from '../data/sr4sOfficialBaseline';

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
    'undeveloped': '1', 'residential': '3', 'commercial': '4', 'industrial': '7', 'farming': '2', 'school': '6',
  },
  land_use_right: {
    'undeveloped': '1', 'residential': '3', 'commercial': '4', 'industrial': '7', 'farming': '2', 'school': '6',
  },
  area_type: {
    'rural': '1', 'urban': '2',
  },
  vehicle_parking: {
    'none': '1', 'one_side': '2', 'two_side': '3',
  },
  sight_distance: {
    'adequate': '1', 'poor': '2',
  },
  number_of_lanes: {
    '1_1': '1', '2_1': '5', '2_2': '2', '3_2': '6', '3_3': '3', '4_4': '4',
  },
  lane_width: {
    'wide': '1', 'medium': '2', 'narrow': '3',
  },
  shoulder_rumble_strips: {
    'present': '2', 'not_present': '1',
  },
  road_condition: {
    'good': '1', 'medium': '2', 'poor': '3',
  },
  grip: {
    'good': '1', 'medium': '2', 'poor': '3',
  },
  grade: {
    'grade_low': '1', 'grade_medium': '4', 'grade_high': '5',
  },
  carriageway_type: {
    'divided_north_east': '1', 'divided_south_west': '2', 'undivided': '3',
  },
  middle_of_road: {
    'center_line': '11', 'wide_line': '14', 'hatching': '10', 'turn_lane': '8', 'flexible_posts': '9', 'separated_0_1': '7', 'separated_1_5': '6', 'separated_5_10': '5', 'separated_10_20': '4', 'separated_20_plus': '3', 'metal_barrier': '1', 'concrete_barrier': '2', 'wire_barrier': '15', 'motorcycle_barrier': '12', 'one_way': '13', 'broken_wide_markings': '16',
  },
  lines_and_signs: {
    'adequate': '1', 'poor': '2',
  },
  street_lighting: {
    'present': '2', 'not_present': '1',
  },
  school_warning: {
    'flashing_beacons': '1', 'signs_markings': '2', 'no_school_zone': '3', 'no_school_nearby': '4',
  },
  crossing_supervisor: {
    'supervisor': '1', 'no_supervisor': '2', 'no_school_nearby': '3',
  },
  sidewalk_left: {
    'none': '5', '0_1m': '4', '1_3m': '3', 'gt_3m': '2', 'barrier': '1', 'poor': '7', 'moderate': '6', 'shared': '8',
  },
  sidewalk_right: {
    'none': '5', '0_1m': '4', '1_3m': '3', 'gt_3m': '2', 'barrier': '1', 'poor': '7', 'moderate': '6', 'shared': '8',
  },
  road_edge_left: {
    'none': '4', '0_1m': '3', '1_2_4m': '2', 'gt_2_4m': '1',
  },
  road_edge_right: {
    'none': '4', '0_1m': '3', '1_2_4m': '2', 'gt_2_4m': '1',
  },
  pedestrian_channelisation: {
    'present': '2', 'not_present': '1',
  },
  crossing_main_road: {
    'none': '7', 'lights': '3', 'raised': '17', 'bridge_tunnel': '1', 'marked': '5', 'unmarked': '8', 'refuge': '6', 'lights_refuge': '2', 'marked_refuge': '4', 'raised_marked': '15', 'raised_refuge': '16', 'raised_marked_refuge': '14',
  },
  crossing_side_road: {
    'none': '7', 'lights': '3', 'raised': '17', 'bridge_tunnel': '1', 'marked': '5', 'unmarked': '8', 'refuge': '6', 'lights_refuge': '2', 'marked_refuge': '4', 'raised_marked': '15', 'raised_refuge': '16', 'raised_marked_refuge': '14',
  },
  crossing_quality: {
    'adequate': '1', 'poor': '2', 'na': '3',
  },
  crossing_flow: {
    'not_present': '1', 'present': '2',
  },
  right_side_flow: {
    'not_present': '1', 'present': '2',
  },
  left_side_flow: {
    'not_present': '1', 'present': '2',
  },
  intersection_type: {
    'merge_lane': '1', '3_leg': '4', '3_leg_signal': '6', '3_leg_turn_lane': '3', '3_leg_turn_signal': '5', '4_leg': '8', '4_leg_turn_lane': '7', '4_leg_signal': '10', '4_leg_turn_signal': '9', 'roundabout': '2', 'mini_roundabout': '17', 'formal_u_turn': '16', 'informal_u_turn': '15', 'active_train': '14', 'passive_train': '13', 'no_intersection': '12', 'short_merge': '22', 'diverge_lane': '23',
  },
  driveways: {
    '1_2_residential': '3', '2_plus_residential': '2', 'commercial': '1', 'not_applicable': '4',
  },
  intersection_quality: {
    'adequate': '1', 'poor': '2', 'not_applicable': '3',
  },
  curve_type: {
    'straight': '1', 'moderate': '2', 'sharp': '3', 'very_sharp': '4',
  },
  curve_quality: {
    'adequate': '1', 'poor': '2', 'not_curve': '3',
  },
  speed_management: {
    'present': '2', 'not_present': '1',
  },
  motorcycle_percent: {
    '0': '2', '100': '10', 'not_recorded': '1', '1_5': '3', '6_10': '4', '11_20': '5', '21_40': '6', '41_60': '7', '61_80': '8', '81_99': '9',
  },
  hgv_percent: {
    'not_recorded': '1', '0_5': '2', '5_10': '3', '10_15': '4', '15_20': '5', '20_30': '6', '30_40': '7', '40_plus': '8',
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
