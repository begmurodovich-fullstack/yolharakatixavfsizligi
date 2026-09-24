/**
 * Rasmiy SR4S / iRAP v3.10 mezon variantlarining to'g'ridan-to'g'ri Option ID xaritalash bazasi.
 * Har bir variant ID si (masalan 'none', 'adequate', 'poor') to'g'ridan-to'g'ri o'zining rasmiy
 * along, crossingMain, crossingSide va koeffitsiyentlariga ega.
 */

export interface DetailedOptionFactor {
  along: number;
  crossingMain: number;
  crossingSide: number;
  srsScore: number;
  decimalStar: number;
  alongFactor: number;
  crossingMainFactor: number;
  crossingSideFactor: number;
}

export const SR4S_DIRECT_OPTION_FACTORS: Record<string, Record<string, DetailedOptionFactor>> = {
  // 1. land_use_left
  land_use_left: {
    undeveloped: { along: 3.3, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.2, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    residential: { along: 3.3, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.2, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    commercial: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    industrial: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    farming: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    school: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 2. land_use_right
  land_use_right: {
    undeveloped: { along: 3.3, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.2, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    residential: { along: 3.3, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.2, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    commercial: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    industrial: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    farming: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    school: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 3. area_type
  area_type: {
    rural: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    urban: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 4. vehicle_parking
  vehicle_parking: {
    none: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    one_side: { along: 3.5, crossingMain: 3.3, crossingSide: 2.4, srsScore: 9.3, decimalStar: 3.9, alongFactor: 1.0, crossingMainFactor: 1.22, crossingSideFactor: 1.2 },
    two_side: { along: 3.5, crossingMain: 3.7, crossingSide: 2.6, srsScore: 9.9, decimalStar: 3.9, alongFactor: 1.0, crossingMainFactor: 1.37, crossingSideFactor: 1.3 },
  },

  // 5. sight_distance
  sight_distance: {
    adequate: { along: 2.4, crossingMain: 1.9, crossingSide: 1.4, srsScore: 5.8, decimalStar: 4.5, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    poor: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.46, crossingMainFactor: 1.42, crossingSideFactor: 1.43 },
  },

  // 6. number_of_lanes
  number_of_lanes: {
    '1_1': { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '2_1': { along: 4.9, crossingMain: 5.5, crossingSide: 2.0, srsScore: 12.5, decimalStar: 3.7, alongFactor: 1.4, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    '2_2': { along: 0.4, crossingMain: 0.5, crossingSide: 2.0, srsScore: 2.9, decimalStar: 5.0, alongFactor: 0.11, crossingMainFactor: 0.19, crossingSideFactor: 1.0 },
    '3_2': { along: 0.5, crossingMain: 0.7, crossingSide: 2.0, srsScore: 3.2, decimalStar: 4.9, alongFactor: 0.14, crossingMainFactor: 0.26, crossingSideFactor: 1.0 },
    '3_3': { along: 0.5, crossingMain: 0.7, crossingSide: 2.0, srsScore: 3.2, decimalStar: 4.9, alongFactor: 0.14, crossingMainFactor: 0.26, crossingSideFactor: 1.0 },
    '4_4': { along: 0.5, crossingMain: 0.7, crossingSide: 2.0, srsScore: 3.2, decimalStar: 4.9, alongFactor: 0.14, crossingMainFactor: 0.26, crossingSideFactor: 1.0 },
  },

  // 7. lane_width
  lane_width: {
    wide: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    medium: { along: 3.5, crossingMain: 2.6, crossingSide: 2.0, srsScore: 8.2, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 0.96, crossingSideFactor: 1.0 },
    narrow: { along: 3.5, crossingMain: 2.5, crossingSide: 2.0, srsScore: 8.0, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 0.93, crossingSideFactor: 1.0 },
  },

  // 8. shoulder_rumble_strips
  shoulder_rumble_strips: {
    present: { along: 2.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.6, decimalStar: 4.2, alongFactor: 0.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    not_present: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 9. road_condition
  road_condition: {
    good: { along: 2.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.3, decimalStar: 4.2, alongFactor: 0.71, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    medium: { along: 3.0, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.8, decimalStar: 4.1, alongFactor: 0.86, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    poor: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 10. grip (skid_resistance_grip)
  grip: {
    good: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    medium: { along: 4.9, crossingMain: 3.9, crossingSide: 2.8, srsScore: 11.6, decimalStar: 3.8, alongFactor: 1.4, crossingMainFactor: 1.44, crossingSideFactor: 1.4 },
    poor: { along: 7.0, crossingMain: 5.5, crossingSide: 4.0, srsScore: 16.6, decimalStar: 3.4, alongFactor: 2.0, crossingMainFactor: 2.04, crossingSideFactor: 2.0 },
  },

  // 11. grade
  grade: {
    grade_low: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    grade_medium: { along: 4.2, crossingMain: 2.7, crossingSide: 2.0, srsScore: 9.0, decimalStar: 3.9, alongFactor: 1.2, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    grade_high: { along: 4.2, crossingMain: 2.7, crossingSide: 2.0, srsScore: 9.0, decimalStar: 3.9, alongFactor: 1.2, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 12. carriageway_type (carriageway)
  carriageway_type: {
    divided_north_east: { along: 3.3, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.2, decimalStar: 4.1, alongFactor: 0.94, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    divided_south_west: { along: 3.3, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.2, decimalStar: 4.1, alongFactor: 0.94, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    undivided: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 13. middle_of_road (median_type)
  middle_of_road: {
    center_line: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    wide_line: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    hatching: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    turn_lane: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    flexible_posts: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    separated_0_1: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    separated_1_5: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    separated_5_10: { along: 4.2, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.8, decimalStar: 3.8, alongFactor: 1.2, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    separated_10_20: { along: 4.2, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.8, decimalStar: 3.8, alongFactor: 1.2, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    separated_20_plus: { along: 4.2, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.8, decimalStar: 3.8, alongFactor: 1.2, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    metal_barrier: { along: 4.2, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.8, decimalStar: 3.8, alongFactor: 1.2, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    concrete_barrier: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    wire_barrier: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    motorcycle_barrier: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
    one_way: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    broken_wide_markings: { along: 3.5, crossingMain: 5.5, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 2.04, crossingSideFactor: 1.0 },
  },

  // 14. lines_and_signs (delineation)
  lines_and_signs: {
    adequate: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    poor: { along: 4.2, crossingMain: 2.7, crossingSide: 2.0, srsScore: 9.0, decimalStar: 3.9, alongFactor: 1.2, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 15. street_lighting
  street_lighting: {
    present: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 0.8, crossingMainFactor: 0.79, crossingSideFactor: 0.8 },
    not_present: { along: 4.4, crossingMain: 3.4, crossingSide: 2.5, srsScore: 10.4, decimalStar: 3.9, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 16. school_warning (school_zone_warning)
  school_warning: {
    flashing_beacons: { along: 3.3, crossingMain: 2.6, crossingSide: 1.9, srsScore: 7.9, decimalStar: 4.1, alongFactor: 0.94, crossingMainFactor: 0.96, crossingSideFactor: 0.95 },
    signs_markings: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    no_school_zone: { along: 3.7, crossingMain: 2.9, crossingSide: 2.1, srsScore: 8.7, decimalStar: 4.0, alongFactor: 1.06, crossingMainFactor: 1.07, crossingSideFactor: 1.05 },
    no_school_nearby: { along: 3.7, crossingMain: 2.9, crossingSide: 2.1, srsScore: 8.7, decimalStar: 4.0, alongFactor: 1.06, crossingMainFactor: 1.07, crossingSideFactor: 1.05 },
  },

  // 17. crossing_supervisor (school_zone_crossing_supervisor)
  crossing_supervisor: {
    supervisor: { along: 3.5, crossingMain: 1.6, crossingSide: 1.8, srsScore: 7.0, decimalStar: 4.3, alongFactor: 1.0, crossingMainFactor: 0.59, crossingSideFactor: 0.9 },
    no_supervisor: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    no_school_nearby: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 18. sidewalk_left (sidewalk_driver_side) - TO'G'RI TARTIBDA!
  sidewalk_left: {
    barrier: { along: 1.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 6.6, decimalStar: 4.3, alongFactor: 0.51, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    gt_3m: { along: 1.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 6.6, decimalStar: 4.3, alongFactor: 0.51, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '1_3m': { along: 2.2, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.0, decimalStar: 4.3, alongFactor: 0.63, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    shared: { along: 2.2, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.0, decimalStar: 4.3, alongFactor: 0.63, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '0_1m': { along: 2.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.7, decimalStar: 4.2, alongFactor: 0.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    moderate: { along: 2.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.7, decimalStar: 4.2, alongFactor: 0.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    poor: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    none: { along: 23.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 28.6, decimalStar: 2.8, alongFactor: 6.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 19. sidewalk_right (sidewalk_passenger_side) - TO'G'RI TARTIBDA!
  sidewalk_right: {
    barrier: { along: 1.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 6.6, decimalStar: 4.3, alongFactor: 0.51, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    gt_3m: { along: 1.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 6.6, decimalStar: 4.3, alongFactor: 0.51, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '1_3m': { along: 2.2, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.0, decimalStar: 4.3, alongFactor: 0.63, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    shared: { along: 2.2, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.0, decimalStar: 4.3, alongFactor: 0.63, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '0_1m': { along: 2.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.7, decimalStar: 4.2, alongFactor: 0.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    moderate: { along: 2.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 7.7, decimalStar: 4.2, alongFactor: 0.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    poor: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    none: { along: 23.8, crossingMain: 2.7, crossingSide: 2.0, srsScore: 28.6, decimalStar: 2.8, alongFactor: 6.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 20. road_edge_left (paved_shoulder_driver_side)
  road_edge_left: {
    none: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '0_1m': { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '1_2_4m': { along: 3.4, crossingMain: 2.9, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 0.97, crossingMainFactor: 1.07, crossingSideFactor: 1.0 },
    gt_2_4m: { along: 3.3, crossingMain: 3.0, crossingSide: 2.0, srsScore: 8.4, decimalStar: 4.0, alongFactor: 0.94, crossingMainFactor: 1.11, crossingSideFactor: 1.0 },
  },

  // 21. road_edge_right (paved_shoulder_passenger_side)
  road_edge_right: {
    none: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '0_1m': { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '1_2_4m': { along: 3.4, crossingMain: 2.9, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 0.97, crossingMainFactor: 1.07, crossingSideFactor: 1.0 },
    gt_2_4m: { along: 3.3, crossingMain: 3.0, crossingSide: 2.0, srsScore: 8.4, decimalStar: 4.0, alongFactor: 0.94, crossingMainFactor: 1.11, crossingSideFactor: 1.0 },
  },

  // 22. pedestrian_channelisation
  pedestrian_channelisation: {
    present: { along: 3.5, crossingMain: 2.5, crossingSide: 1.8, srsScore: 7.8, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 0.93, crossingSideFactor: 0.9 },
    not_present: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 23. crossing_main_road (pedestrian_crossing_facilities_inspected_road)
  crossing_main_road: {
    none: { along: 3.5, crossingMain: 4.1, crossingSide: 2.0, srsScore: 9.7, decimalStar: 3.9, alongFactor: 1.0, crossingMainFactor: 1.52, crossingSideFactor: 1.0 },
    unmarked: { along: 3.5, crossingMain: 4.1, crossingSide: 2.0, srsScore: 9.7, decimalStar: 3.9, alongFactor: 1.0, crossingMainFactor: 1.52, crossingSideFactor: 1.0 },
    marked: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    refuge: { along: 3.5, crossingMain: 2.0, crossingSide: 2.0, srsScore: 7.6, decimalStar: 4.2, alongFactor: 1.0, crossingMainFactor: 0.74, crossingSideFactor: 1.0 },
    marked_refuge: { along: 3.5, crossingMain: 1.3, crossingSide: 2.0, srsScore: 6.9, decimalStar: 4.3, alongFactor: 1.0, crossingMainFactor: 0.48, crossingSideFactor: 1.0 },
    raised: { along: 3.5, crossingMain: 0.8, crossingSide: 2.0, srsScore: 6.3, decimalStar: 4.4, alongFactor: 1.0, crossingMainFactor: 0.3, crossingSideFactor: 1.0 },
    raised_marked: { along: 3.5, crossingMain: 0.5, crossingSide: 2.0, srsScore: 6.1, decimalStar: 4.4, alongFactor: 1.0, crossingMainFactor: 0.19, crossingSideFactor: 1.0 },
    raised_refuge: { along: 3.5, crossingMain: 0.2, crossingSide: 2.0, srsScore: 5.8, decimalStar: 4.5, alongFactor: 1.0, crossingMainFactor: 0.07, crossingSideFactor: 1.0 },
    raised_marked_refuge: { along: 3.5, crossingMain: 0.0, crossingSide: 2.0, srsScore: 5.5, decimalStar: 4.5, alongFactor: 1.0, crossingMainFactor: 0.0, crossingSideFactor: 1.0 },
    lights: { along: 3.5, crossingMain: 0.0, crossingSide: 2.0, srsScore: 5.5, decimalStar: 4.5, alongFactor: 1.0, crossingMainFactor: 0.0, crossingSideFactor: 1.0 },
    lights_refuge: { along: 3.5, crossingMain: 0.0, crossingSide: 2.0, srsScore: 5.5, decimalStar: 4.5, alongFactor: 1.0, crossingMainFactor: 0.0, crossingSideFactor: 1.0 },
    bridge_tunnel: { along: 3.5, crossingMain: 0.0, crossingSide: 2.0, srsScore: 5.5, decimalStar: 4.5, alongFactor: 1.0, crossingMainFactor: 0.0, crossingSideFactor: 1.0 },
  },

  // 24. crossing_side_road (pedestrian_crossing_facilities_intersecting_road)
  crossing_side_road: {
    none: { along: 3.5, crossingMain: 2.7, crossingSide: 22.3, srsScore: 28.7, decimalStar: 2.8, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 11.15 },
    unmarked: { along: 3.5, crossingMain: 2.7, crossingSide: 22.3, srsScore: 28.7, decimalStar: 2.8, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 11.15 },
    marked: { along: 3.5, crossingMain: 2.7, crossingSide: 14.9, srsScore: 21.2, decimalStar: 3.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 7.45 },
    refuge: { along: 3.5, crossingMain: 2.7, crossingSide: 11.1, srsScore: 17.5, decimalStar: 3.4, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 5.55 },
    marked_refuge: { along: 3.5, crossingMain: 2.7, crossingSide: 7.4, srsScore: 13.7, decimalStar: 3.6, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 3.7 },
    raised: { along: 3.5, crossingMain: 2.7, crossingSide: 4.4, srsScore: 10.8, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 2.2 },
    raised_marked: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    raised_refuge: { along: 3.5, crossingMain: 2.7, crossingSide: 1.0, srsScore: 7.3, decimalStar: 4.2, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.5 },
    raised_marked_refuge: { along: 3.5, crossingMain: 2.7, crossingSide: 0.1, srsScore: 6.4, decimalStar: 4.4, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.05 },
    lights: { along: 3.5, crossingMain: 2.7, crossingSide: 0.0, srsScore: 6.3, decimalStar: 4.4, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.0 },
    lights_refuge: { along: 3.5, crossingMain: 2.7, crossingSide: 0.0, srsScore: 6.3, decimalStar: 4.4, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.0 },
    bridge_tunnel: { along: 3.5, crossingMain: 2.7, crossingSide: 0.0, srsScore: 6.3, decimalStar: 4.4, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.0 },
  },

  // 25. crossing_quality (pedestrian_crossing_quality)
  crossing_quality: {
    adequate: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    poor: { along: 3.5, crossingMain: 4.1, crossingSide: 3.0, srsScore: 10.7, decimalStar: 3.8, alongFactor: 1.0, crossingMainFactor: 1.52, crossingSideFactor: 1.5 },
    na: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 26. driveways (property_access_points)
  driveways: {
    '1_2_residential': { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.4, decimalStar: 4.0, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '2_plus_residential': { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    commercial: { along: 3.4, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.2, decimalStar: 4.1, alongFactor: 0.97, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    not_applicable: { along: 3.2, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.0, decimalStar: 4.1, alongFactor: 0.91, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 27. intersection_quality
  intersection_quality: {
    adequate: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    poor: { along: 3.5, crossingMain: 3.3, crossingSide: 2.4, srsScore: 9.3, decimalStar: 3.9, alongFactor: 1.0, crossingMainFactor: 1.22, crossingSideFactor: 1.2 },
    not_applicable: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 28. curve_type (curvature)
  curve_type: {
    straight: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    moderate: { along: 6.3, crossingMain: 2.7, crossingSide: 2.0, srsScore: 11.1, decimalStar: 3.8, alongFactor: 1.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    sharp: { along: 12.3, crossingMain: 2.7, crossingSide: 2.0, srsScore: 17.1, decimalStar: 3.4, alongFactor: 3.51, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    very_sharp: { along: 21.1, crossingMain: 2.7, crossingSide: 2.0, srsScore: 25.9, decimalStar: 2.9, alongFactor: 6.03, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 29. curve_quality (quality_of_curve)
  curve_quality: {
    adequate: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    poor: { along: 4.4, crossingMain: 2.7, crossingSide: 2.0, srsScore: 9.2, decimalStar: 3.9, alongFactor: 1.26, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    not_curve: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 30. speed_management (speed_management_traffic_calming)
  speed_management: {
    present: { along: 2.8, crossingMain: 2.2, crossingSide: 1.6, srsScore: 6.6, decimalStar: 4.3, alongFactor: 0.8, crossingMainFactor: 0.81, crossingSideFactor: 0.8 },
    not_present: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
  },

  // 31. motorcycle_percent
  motorcycle_percent: {
    not_recorded: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '0': { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '1_5': { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '6_10': { along: 3.5, crossingMain: 2.9, crossingSide: 2.0, srsScore: 8.4, decimalStar: 4.0, alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0 },
    '11_20': { along: 3.5, crossingMain: 2.9, crossingSide: 2.0, srsScore: 8.4, decimalStar: 4.0, alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0 },
    '21_40': { along: 3.5, crossingMain: 2.9, crossingSide: 2.0, srsScore: 8.4, decimalStar: 4.0, alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0 },
    '41_60': { along: 3.5, crossingMain: 2.9, crossingSide: 2.0, srsScore: 8.4, decimalStar: 4.0, alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0 },
    '61_80': { along: 3.5, crossingMain: 2.9, crossingSide: 2.0, srsScore: 8.4, decimalStar: 4.0, alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0 },
    '81_99': { along: 3.5, crossingMain: 2.9, crossingSide: 2.0, srsScore: 8.4, decimalStar: 4.0, alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0 },
    '100': { along: 3.5, crossingMain: 2.9, crossingSide: 2.0, srsScore: 8.4, decimalStar: 4.0, alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0 },
  },

  // 32. hgv_percent
  hgv_percent: {
    not_recorded: { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '0_5': { along: 3.5, crossingMain: 2.7, crossingSide: 2.0, srsScore: 8.3, decimalStar: 4.1, alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0 },
    '5_10': { along: 3.5, crossingMain: 3.0, crossingSide: 2.0, srsScore: 8.6, decimalStar: 4.0, alongFactor: 1.0, crossingMainFactor: 1.11, crossingSideFactor: 1.0 },
    '10_15': { along: 3.5, crossingMain: 3.3, crossingSide: 2.0, srsScore: 8.9, decimalStar: 4.0, alongFactor: 1.0, crossingMainFactor: 1.22, crossingSideFactor: 1.0 },
    '15_20': { along: 3.5, crossingMain: 3.6, crossingSide: 2.0, srsScore: 9.1, decimalStar: 3.9, alongFactor: 1.0, crossingMainFactor: 1.33, crossingSideFactor: 1.0 },
    '20_30': { along: 3.5, crossingMain: 3.6, crossingSide: 2.0, srsScore: 9.1, decimalStar: 3.9, alongFactor: 1.0, crossingMainFactor: 1.33, crossingSideFactor: 1.0 },
    '30_40': { along: 3.5, crossingMain: 3.6, crossingSide: 2.0, srsScore: 9.1, decimalStar: 3.9, alongFactor: 1.0, crossingMainFactor: 1.33, crossingSideFactor: 1.0 },
    '40_plus': { along: 3.5, crossingMain: 3.6, crossingSide: 2.0, srsScore: 9.1, decimalStar: 3.9, alongFactor: 1.0, crossingMainFactor: 1.33, crossingSideFactor: 1.0 },
  },
};
