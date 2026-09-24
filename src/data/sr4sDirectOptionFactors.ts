/**
 * Rasmiy SR4S / iRAP v3.10 mezon variantlarining multiplikatorlari.
 * 
 * Barcha DEFAULT (boshlang'ich) variantlar uchun faktor aniq 1.00 ga teng.
 * Bu orqali sayt ochilganda boshlang'ich ball ANIQ 4.6 Yulduz (SRS: 5.1, along: 1.7, cm: 1.9, cs: 1.4) bo'ladi!
 */

export interface DetailedOptionFactor {
  alongFactor: number;
  crossingMainFactor: number;
  crossingSideFactor: number;
  decimalStar: number;
}

export const SR4S_DIRECT_OPTION_FACTORS: Record<string, Record<string, DetailedOptionFactor>> = {
  // 1. land_use_left & land_use_right (Default: residential -> 1.0)
  land_use_left: {
    undeveloped: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    residential: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    commercial: { alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    industrial: { alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    farming: { alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    school: { alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
  },
  land_use_right: {
    undeveloped: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    residential: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    commercial: { alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    industrial: { alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    farming: { alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    school: { alongFactor: 1.06, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
  },

  // 2. area_type (Default: urban -> 1.0)
  area_type: {
    rural: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    urban: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 3. vehicle_parking (Default: none -> 1.0)
  vehicle_parking: {
    none: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    one_side: { alongFactor: 1.0, crossingMainFactor: 1.22, crossingSideFactor: 1.2, decimalStar: 4.4 },
    two_side: { alongFactor: 1.0, crossingMainFactor: 1.37, crossingSideFactor: 1.3, decimalStar: 4.3 },
  },

  // 4. sight_distance (Default: adequate -> 1.0)
  sight_distance: {
    adequate: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    poor: { alongFactor: 1.46, crossingMainFactor: 1.42, crossingSideFactor: 1.43, decimalStar: 4.1 },
  },

  // 5. number_of_lanes (Default: 1_1 -> 1.0)
  number_of_lanes: {
    '1_1': { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '2_1': { alongFactor: 1.4, crossingMainFactor: 2.04, crossingSideFactor: 1.0, decimalStar: 3.7 },
    '2_2': { alongFactor: 0.8, crossingMainFactor: 0.8, crossingSideFactor: 1.0, decimalStar: 4.8 },
    '3_2': { alongFactor: 0.9, crossingMainFactor: 0.9, crossingSideFactor: 1.0, decimalStar: 4.7 },
    '3_3': { alongFactor: 0.9, crossingMainFactor: 0.9, crossingSideFactor: 1.0, decimalStar: 4.7 },
    '4_4': { alongFactor: 0.9, crossingMainFactor: 0.9, crossingSideFactor: 1.0, decimalStar: 4.7 },
  },

  // 6. lane_width (Default: wide -> 1.0)
  lane_width: {
    wide: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    medium: { alongFactor: 1.0, crossingMainFactor: 0.96, crossingSideFactor: 1.0, decimalStar: 4.6 },
    narrow: { alongFactor: 1.0, crossingMainFactor: 0.93, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 7. shoulder_rumble_strips (Default: not_present -> 1.0)
  shoulder_rumble_strips: {
    present: { alongFactor: 0.85, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.8 },
    not_present: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 8. road_condition (Default: good -> 1.0)
  road_condition: {
    good: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    medium: { alongFactor: 1.15, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.4 },
    poor: { alongFactor: 1.35, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.2 },
  },

  // 9. grip (Default: good -> 1.0)
  grip: {
    good: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    medium: { alongFactor: 1.4, crossingMainFactor: 1.44, crossingSideFactor: 1.4, decimalStar: 4.1 },
    poor: { alongFactor: 2.0, crossingMainFactor: 2.04, crossingSideFactor: 2.0, decimalStar: 3.6 },
  },

  // 10. grade (Default: grade_low -> 1.0)
  grade: {
    grade_low: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    grade_medium: { alongFactor: 1.2, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.4 },
    grade_high: { alongFactor: 1.2, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.4 },
  },

  // 11. carriageway_type (Default: undivided -> 1.0)
  carriageway_type: {
    divided_north_east: { alongFactor: 0.94, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.7 },
    divided_south_west: { alongFactor: 0.94, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.7 },
    undivided: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 12. middle_of_road (Default: center_line -> 1.0)
  middle_of_road: {
    center_line: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    wide_line: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    hatching: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    turn_lane: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    flexible_posts: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    separated_0_1: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    separated_1_5: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    separated_5_10: { alongFactor: 1.1, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    separated_10_20: { alongFactor: 1.1, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    separated_20_plus: { alongFactor: 1.1, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    metal_barrier: { alongFactor: 1.1, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    concrete_barrier: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    wire_barrier: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    motorcycle_barrier: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    one_way: { alongFactor: 1.0, crossingMainFactor: 0.6, crossingSideFactor: 1.0, decimalStar: 4.8 },
    broken_wide_markings: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 13. lines_and_signs (Default: adequate -> 1.0)
  lines_and_signs: {
    adequate: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    poor: { alongFactor: 1.25, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.3 },
  },

  // 14. street_lighting (Default: present -> 1.0)
  street_lighting: {
    present: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    not_present: { alongFactor: 1.25, crossingMainFactor: 1.25, crossingSideFactor: 1.25, decimalStar: 4.2 },
  },

  // 15. school_warning (Default: signs_markings -> 1.0)
  school_warning: {
    flashing_beacons: { alongFactor: 0.9, crossingMainFactor: 0.9, crossingSideFactor: 0.9, decimalStar: 4.8 },
    signs_markings: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    no_school_zone: { alongFactor: 1.15, crossingMainFactor: 1.15, crossingSideFactor: 1.15, decimalStar: 4.3 },
    no_school_nearby: { alongFactor: 1.15, crossingMainFactor: 1.15, crossingSideFactor: 1.15, decimalStar: 4.3 },
  },

  // 16. crossing_supervisor (Default: no_supervisor -> 1.0)
  crossing_supervisor: {
    supervisor: { alongFactor: 1.0, crossingMainFactor: 0.5, crossingSideFactor: 0.8, decimalStar: 4.9 },
    no_supervisor: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    no_school_nearby: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 17. sidewalk_left & sidewalk_right (Default: 1_3m -> 1.0)
  sidewalk_left: {
    barrier: { alongFactor: 0.75, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.8 },
    gt_3m: { alongFactor: 0.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.8 },
    '1_3m': { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    shared: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '0_1m': { alongFactor: 1.35, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.3 },
    moderate: { alongFactor: 1.35, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.3 },
    poor: { alongFactor: 1.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 3.9 },
    none: { alongFactor: 6.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 2.5 },
  },
  sidewalk_right: {
    barrier: { alongFactor: 0.75, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.8 },
    gt_3m: { alongFactor: 0.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.8 },
    '1_3m': { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    shared: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '0_1m': { alongFactor: 1.35, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.3 },
    moderate: { alongFactor: 1.35, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.3 },
    poor: { alongFactor: 1.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 3.9 },
    none: { alongFactor: 6.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 2.5 },
  },

  // 18. road_edge_left & road_edge_right (Default: 0_1m -> 1.0)
  road_edge_left: {
    none: { alongFactor: 1.05, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    '0_1m': { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '1_2_4m': { alongFactor: 0.95, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.7 },
    gt_2_4m: { alongFactor: 0.9, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.7 },
  },
  road_edge_right: {
    none: { alongFactor: 1.05, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.5 },
    '0_1m': { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '1_2_4m': { alongFactor: 0.95, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.7 },
    gt_2_4m: { alongFactor: 0.9, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.7 },
  },

  // 19. pedestrian_channelisation (Default: not_present -> 1.0)
  pedestrian_channelisation: {
    present: { alongFactor: 1.0, crossingMainFactor: 0.9, crossingSideFactor: 0.9, decimalStar: 4.7 },
    not_present: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 20. crossing_main_road (Default: marked -> 1.0)
  crossing_main_road: {
    none: { alongFactor: 1.0, crossingMainFactor: 1.8, crossingSideFactor: 1.0, decimalStar: 3.9 },
    unmarked: { alongFactor: 1.0, crossingMainFactor: 1.8, crossingSideFactor: 1.0, decimalStar: 3.9 },
    marked: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    refuge: { alongFactor: 1.0, crossingMainFactor: 0.74, crossingSideFactor: 1.0, decimalStar: 4.8 },
    marked_refuge: { alongFactor: 1.0, crossingMainFactor: 0.48, crossingSideFactor: 1.0, decimalStar: 4.9 },
    raised: { alongFactor: 1.0, crossingMainFactor: 0.3, crossingSideFactor: 1.0, decimalStar: 5.0 },
    raised_marked: { alongFactor: 1.0, crossingMainFactor: 0.19, crossingSideFactor: 1.0, decimalStar: 5.0 },
    raised_refuge: { alongFactor: 1.0, crossingMainFactor: 0.07, crossingSideFactor: 1.0, decimalStar: 5.0 },
    raised_marked_refuge: { alongFactor: 1.0, crossingMainFactor: 0.0, crossingSideFactor: 1.0, decimalStar: 5.0 },
    lights: { alongFactor: 1.0, crossingMainFactor: 0.0, crossingSideFactor: 1.0, decimalStar: 5.0 },
    lights_refuge: { alongFactor: 1.0, crossingMainFactor: 0.0, crossingSideFactor: 1.0, decimalStar: 5.0 },
    bridge_tunnel: { alongFactor: 1.0, crossingMainFactor: 0.0, crossingSideFactor: 1.0, decimalStar: 5.0 },
  },

  // 21. crossing_side_road (Default: marked -> 1.0)
  crossing_side_road: {
    none: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 3.5, decimalStar: 3.2 },
    unmarked: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 3.5, decimalStar: 3.2 },
    marked: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    refuge: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.7, decimalStar: 4.8 },
    marked_refuge: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.5, decimalStar: 4.9 },
    raised: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.3, decimalStar: 5.0 },
    raised_marked: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.1, decimalStar: 5.0 },
    raised_refuge: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.05, decimalStar: 5.0 },
    raised_marked_refuge: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.0, decimalStar: 5.0 },
    lights: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.0, decimalStar: 5.0 },
    lights_refuge: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.0, decimalStar: 5.0 },
    bridge_tunnel: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 0.0, decimalStar: 5.0 },
  },

  // 22. crossing_quality (Default: adequate -> 1.0)
  crossing_quality: {
    adequate: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    poor: { alongFactor: 1.0, crossingMainFactor: 1.52, crossingSideFactor: 1.5, decimalStar: 4.1 },
    na: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 23. driveways (Default: 2_plus_residential -> 1.0)
  driveways: {
    '1_2_residential': { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '2_plus_residential': { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    commercial: { alongFactor: 0.97, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    not_applicable: { alongFactor: 0.91, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.7 },
  },

  // 24. intersection_quality (Default: adequate -> 1.0)
  intersection_quality: {
    adequate: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    poor: { alongFactor: 1.0, crossingMainFactor: 1.22, crossingSideFactor: 1.2, decimalStar: 4.4 },
    not_applicable: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 25. curve_type (Default: straight -> 1.0)
  curve_type: {
    straight: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    moderate: { alongFactor: 1.8, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.0 },
    sharp: { alongFactor: 3.51, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 3.4 },
    very_sharp: { alongFactor: 6.03, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 2.8 },
  },

  // 26. curve_quality (Default: not_curve -> 1.0)
  curve_quality: {
    adequate: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    poor: { alongFactor: 1.26, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.3 },
    not_curve: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 27. speed_management (Default: not_present -> 1.0)
  speed_management: {
    present: { alongFactor: 0.75, crossingMainFactor: 0.75, crossingSideFactor: 0.75, decimalStar: 4.9 },
    not_present: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
  },

  // 28. motorcycle_percent (Default: not_recorded -> 1.0)
  motorcycle_percent: {
    not_recorded: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '0': { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '1_5': { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '6_10': { alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0, decimalStar: 4.5 },
    '11_20': { alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0, decimalStar: 4.5 },
    '21_40': { alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0, decimalStar: 4.5 },
    '41_60': { alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0, decimalStar: 4.5 },
    '61_80': { alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0, decimalStar: 4.5 },
    '81_99': { alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0, decimalStar: 4.5 },
    '100': { alongFactor: 1.0, crossingMainFactor: 1.07, crossingSideFactor: 1.0, decimalStar: 4.5 },
  },

  // 29. hgv_percent (Default: not_recorded -> 1.0)
  hgv_percent: {
    not_recorded: { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '0_5': { alongFactor: 1.0, crossingMainFactor: 1.0, crossingSideFactor: 1.0, decimalStar: 4.6 },
    '5_10': { alongFactor: 1.0, crossingMainFactor: 1.11, crossingSideFactor: 1.0, decimalStar: 4.5 },
    '10_15': { alongFactor: 1.0, crossingMainFactor: 1.22, crossingSideFactor: 1.0, decimalStar: 4.4 },
    '15_20': { alongFactor: 1.0, crossingMainFactor: 1.33, crossingSideFactor: 1.0, decimalStar: 4.3 },
    '20_30': { alongFactor: 1.0, crossingMainFactor: 1.33, crossingSideFactor: 1.0, decimalStar: 4.3 },
    '30_40': { alongFactor: 1.0, crossingMainFactor: 1.33, crossingSideFactor: 1.0, decimalStar: 4.3 },
    '40_plus': { alongFactor: 1.0, crossingMainFactor: 1.33, crossingSideFactor: 1.0, decimalStar: 4.3 },
  },
};
