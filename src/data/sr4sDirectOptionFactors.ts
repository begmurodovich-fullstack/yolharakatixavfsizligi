/**
 * Rasmiy SR4S / iRAP v3.10 mezon variantlarining rasmiy multiplikatorlari.
 * 
 * Ushbu jadval results.starratingforschools.org/demonstrator rasmiy tizimidan
 * to'g'ridan-to'g'ri olingan sr4s_168_exact_calibration.json asosida avtomatik
 * 1:1 kalibratsiya qilingan.
 * 
 * Barcha DEFAULT (boshlang'ich) variantlar uchun faktor aniq 1.00 ga teng.
 * Bu orqali sayt ochilganda boshlang'ich ball ANIQ 4.6 Yulduz (SRS: 5.0, along: 1.7, cm: 1.9, cs: 1.4) bo'ladi!
 */

export interface DetailedOptionFactor {
  alongFactor: number;
  crossingMainFactor: number;
  crossingSideFactor: number;
  decimalStar: number;
}

export const SR4S_DIRECT_OPTION_FACTORS: Record<string, Record<string, DetailedOptionFactor>> = {
  "land_use_left": {
    "undeveloped": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "residential": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "commercial": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "industrial": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "farming": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "school": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "land_use_right": {
    "undeveloped": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "residential": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "commercial": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "industrial": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "farming": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "school": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "area_type": {
    "rural": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "urban": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "vehicle_parking": {
    "none": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "one_side": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.5
    },
    "two_side": {
      "alongFactor": 1,
      "crossingMainFactor": 1.3684,
      "crossingSideFactor": 1.2857,
      "decimalStar": 4.4
    }
  },
  "sight_distance": {
    "adequate": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "poor": {
      "alongFactor": 1.4706,
      "crossingMainFactor": 1.4211,
      "crossingSideFactor": 1.4286,
      "decimalStar": 4.2
    }
  },
  "number_of_lanes": {
    "1_1": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "2_1": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.1
    },
    "2_2": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.1
    },
    "3_2": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.1
    },
    "3_3": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.1
    },
    "4_4": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.1
    }
  },
  "lane_width": {
    "wide": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "medium": {
      "alongFactor": 1,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "narrow": {
      "alongFactor": 1,
      "crossingMainFactor": 0.8947,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "shoulder_rumble_strips": {
    "present": {
      "alongFactor": 0.8235,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "road_condition": {
    "good": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "medium": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    },
    "poor": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    }
  },
  "grip": {
    "good": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "medium": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 1.4211,
      "crossingSideFactor": 1.3571,
      "decimalStar": 4.2
    },
    "poor": {
      "alongFactor": 2.0588,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 2,
      "decimalStar": 3.9
    }
  },
  "grade": {
    "grade_low": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "grade_medium": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    },
    "grade_high": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    }
  },
  "carriageway_type": {
    "divided_north_east": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "divided_south_west": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "undivided": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "middle_of_road": {
    "center_line": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "wide_line": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3
    },
    "hatching": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3
    },
    "turn_lane": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3
    },
    "flexible_posts": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3
    },
    "separated_0_1": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3
    },
    "separated_1_5": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3
    },
    "separated_5_10": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3
    },
    "separated_10_20": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2
    },
    "separated_20_plus": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2
    },
    "metal_barrier": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2
    },
    "concrete_barrier": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2
    },
    "wire_barrier": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3
    },
    "motorcycle_barrier": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2
    },
    "one_way": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "broken_wide_markings": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3
    }
  },
  "lines_and_signs": {
    "adequate": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "poor": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    }
  },
  "street_lighting": {
    "present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "not_present": {
      "alongFactor": 1.2941,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4
    }
  },
  "school_warning": {
    "flashing_beacons": {
      "alongFactor": 0.9412,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 0.9286,
      "decimalStar": 4.6
    },
    "signs_markings": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "no_school_zone": {
      "alongFactor": 1.0588,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    },
    "no_school_nearby": {
      "alongFactor": 1.0588,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    }
  },
  "crossing_supervisor": {
    "supervisor": {
      "alongFactor": 1,
      "crossingMainFactor": 0.5789,
      "crossingSideFactor": 0.8571,
      "decimalStar": 4.7
    },
    "no_supervisor": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "no_school_nearby": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "sidewalk_left": {
    "none": {
      "alongFactor": 7,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 3.5
    },
    "0_1m": {
      "alongFactor": 0.8235,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "1_3m": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "gt_3m": {
      "alongFactor": 0.6471,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7
    },
    "barrier": {
      "alongFactor": 0.5294,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7
    },
    "poor": {
      "alongFactor": 7,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 3.5
    },
    "moderate": {
      "alongFactor": 0.8235,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "shared": {
      "alongFactor": 0.6471,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7
    }
  },
  "sidewalk_right": {
    "none": {
      "alongFactor": 7,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 3.5
    },
    "0_1m": {
      "alongFactor": 0.8235,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "1_3m": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "gt_3m": {
      "alongFactor": 0.6471,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7
    },
    "barrier": {
      "alongFactor": 0.5294,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7
    },
    "poor": {
      "alongFactor": 7,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 3.5
    },
    "moderate": {
      "alongFactor": 0.8235,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "shared": {
      "alongFactor": 0.6471,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7
    }
  },
  "road_edge_left": {
    "none": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "0_1m": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "1_2_4m": {
      "alongFactor": 1,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "gt_2_4m": {
      "alongFactor": 0.9412,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "road_edge_right": {
    "none": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "0_1m": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "1_2_4m": {
      "alongFactor": 1,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "gt_2_4m": {
      "alongFactor": 0.9412,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "pedestrian_channelisation": {
    "present": {
      "alongFactor": 1,
      "crossingMainFactor": 0.8947,
      "crossingSideFactor": 0.8571,
      "decimalStar": 4.6
    },
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "crossing_main_road": {
    "none": {
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1,
      "decimalStar": 4.9
    },
    "lights": {
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1,
      "decimalStar": 4.9
    },
    "raised": {
      "alongFactor": 1,
      "crossingMainFactor": 0.2632,
      "crossingSideFactor": 1,
      "decimalStar": 4.8
    },
    "bridge_tunnel": {
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1,
      "decimalStar": 4.9
    },
    "marked": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "unmarked": {
      "alongFactor": 1,
      "crossingMainFactor": 1.5263,
      "crossingSideFactor": 1,
      "decimalStar": 4.4
    },
    "refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 0.7368,
      "crossingSideFactor": 1,
      "decimalStar": 4.7
    },
    "lights_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1,
      "decimalStar": 4.9
    },
    "marked_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1.5263,
      "crossingSideFactor": 1,
      "decimalStar": 4.4
    },
    "raised_marked": {
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1,
      "decimalStar": 4.9
    },
    "raised_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1,
      "decimalStar": 4.9
    },
    "raised_marked_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 0.2632,
      "crossingSideFactor": 1,
      "decimalStar": 4.8
    }
  },
  "crossing_side_road": {
    "none": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0,
      "decimalStar": 4.8
    },
    "lights": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0,
      "decimalStar": 4.8
    },
    "raised": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 2.2143,
      "decimalStar": 4.3
    },
    "bridge_tunnel": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0,
      "decimalStar": 4.8
    },
    "marked": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "unmarked": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 11.2143,
      "decimalStar": 3.2
    },
    "refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 5.5714,
      "decimalStar": 3.8
    },
    "lights_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0,
      "decimalStar": 4.8
    },
    "marked_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 11.2143,
      "decimalStar": 3.2
    },
    "raised_marked": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0,
      "decimalStar": 4.8
    },
    "raised_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0,
      "decimalStar": 4.8
    },
    "raised_marked_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 2.2143,
      "decimalStar": 4.3
    }
  },
  "crossing_quality": {
    "adequate": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "poor": {
      "alongFactor": 1,
      "crossingMainFactor": 1.5263,
      "crossingSideFactor": 1.5,
      "decimalStar": 4.3
    },
    "na": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "crossing_flow": {
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1,
      "decimalStar": 4.9
    },
    "present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "right_side_flow": {
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "left_side_flow": {
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "intersection_type": {
    "merge_lane": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4
    },
    "3_leg": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "3_leg_signal": {
      "alongFactor": 1,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 0.9286,
      "decimalStar": 4.6
    },
    "3_leg_turn_lane": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "3_leg_turn_signal": {
      "alongFactor": 1,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 0.9286,
      "decimalStar": 4.6
    },
    "4_leg": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "4_leg_turn_lane": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1.0714,
      "decimalStar": 4.5
    },
    "4_leg_signal": {
      "alongFactor": 1,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 0.9286,
      "decimalStar": 4.6
    },
    "4_leg_turn_signal": {
      "alongFactor": 1,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 0.9286,
      "decimalStar": 4.6
    },
    "roundabout": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4
    },
    "mini_roundabout": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4
    },
    "formal_u_turn": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4
    },
    "informal_u_turn": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4
    },
    "active_train": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1.0714,
      "decimalStar": 4.5
    },
    "passive_train": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1.0714,
      "decimalStar": 4.5
    },
    "no_intersection": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0,
      "decimalStar": 4.6
    },
    "short_merge": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4
    },
    "diverge_lane": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4
    }
  },
  "driveways": {
    "1_2_residential": {
      "alongFactor": 1.0588,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "2_plus_residential": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "commercial": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "not_applicable": {
      "alongFactor": 0.9412,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "intersection_quality": {
    "adequate": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "poor": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.5
    },
    "not_applicable": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "curve_type": {
    "straight": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "moderate": {
      "alongFactor": 1.8235,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.4
    },
    "sharp": {
      "alongFactor": 3.6471,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 3.9
    },
    "very_sharp": {
      "alongFactor": 6.2353,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 3.6
    }
  },
  "curve_quality": {
    "adequate": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "poor": {
      "alongFactor": 1.2941,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    },
    "not_curve": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "speed_management": {
    "present": {
      "alongFactor": 0.8235,
      "crossingMainFactor": 0.7895,
      "crossingSideFactor": 0.7857,
      "decimalStar": 4.8
    },
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "motorcycle_percent": {
    "0": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "100": {
      "alongFactor": 1,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "not_recorded": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "1_5": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "6_10": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "11_20": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "21_40": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "41_60": {
      "alongFactor": 1,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "61_80": {
      "alongFactor": 1,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "81_99": {
      "alongFactor": 1,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    }
  },
  "hgv_percent": {
    "not_recorded": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "0_5": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "5_10": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "10_15": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "15_20": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1,
      "decimalStar": 4.6
    },
    "20_30": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    },
    "30_40": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    },
    "40_plus": {
      "alongFactor": 1,
      "crossingMainFactor": 1.3158,
      "crossingSideFactor": 1,
      "decimalStar": 4.5
    }
  }
};
