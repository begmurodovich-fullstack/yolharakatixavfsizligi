/**
 * Rasmiy iRAP / SR4S Demonstrator Standart Boshlang'ich Baza (Baseline).
 * Manba: results.starratingforschools.org/model/V31a
 */

export const SR4S_OFFICIAL_BASELINE = {
  along: 1.7,
  crossingMain: 1.9,
  crossingSide: 1.4,
  srsScore: 5.1,
  decimalStar: 4.6,
  starRating: 4,
  banding: [200, 54, 24, 9, 3] as const,
};

/**
 * Rasmiy saytning barcha 40 ta mezonining standart (Default) qiymatlar xaritasi.
 */
export const SR4S_DEFAULT_ATTRIBUTES_MAP: Record<string, string> = {
  land_use_driver_side: '3',
  land_use_passenger_side: '3',
  area_type: '2',
  vehicle_parking: '1',
  sight_distance: '1',
  number_of_lanes: '1',
  lane_width: '1',
  shoulder_rumble_strips: '1',
  road_condition: '1',
  skid_resistance_grip: '1',
  grade: '1',
  carriageway: '3',
  median_type: '13',
  delineation: '1',
  street_lighting: '2',
  school_zone_warning: '2',
  school_zone_crossing_supervisor: '2',
  sidewalk_driver_side: '4',
  sidewalk_passenger_side: '4',
  paved_shoulder_driver_side: '3',
  paved_shoulder_passenger_side: '3',
  ped_channelisation: '1',
  pedestrian_crossing_facilities_inspected_road: '5',
  pedestrian_crossing_facilities_intersecting_road: '3',
  pedestrian_crossing_quality: '1',
  vehicle_flow_aadt: '100',
  pedestrian_peak_hour_flow_across_the_road: '2',
  pedestrian_peak_hour_flow_along_the_road_passenger_side: '2',
  pedestrian_peak_hour_flow_along_the_road_driver_side: '2',
  intersection_type: '8',
  property_access_points: '2',
  intersecting_road_volume: '4999.00',
  intersection_quality: '1',
  curvature: '1',
  quality_of_curve: '3',
  speed_limit: '40',
  operating_speed_85th_percentile: '45',
  speed_management_traffic_calming: '1',
  motorcycle_percent: '1',
  hgv_percent: '1',
};
