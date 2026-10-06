/**
 * Rasmiy iRAP v3.10 va SR4S (Star Rating for Schools) Benchmark Kalibratsiya Koeffitsiyentlari.
 * 
 * Ushbu ma'lumotlar to'g'ridan-to'g'ri mijoz tomonidan taqdim etilgan rasmiy 40 ta mezon
 * bo'yicha etalon sinov jadvallari (Reference Benchmark Table) asosida avtomatik shakllantirildi.
 * 
 * Standart Boshlang'ich Nuqta (Baseline):
 *   - along: 1.7
 *   - crossingMain: 1.9
 *   - crossingSide: 1.4
 *   - srsScore: 5.0 (5.1)
 *   - decimalStarRating: 4.6 ★
 */

export interface DetailedOptionFactor {
  alongFactor: number;
  crossingMainFactor: number;
  crossingSideFactor: number;
  decimalStar: number;
  along: number;
  crossingMain: number;
  crossingSide: number;
}

export interface FlowBracketFactor {
  code: number;
  label: string;
  minAadt: number;
  maxAadt: number;
  along: number;
  main: number;
  side: number;
  star: number;
  alongFactor: number;
  mainFactor: number;
  sideFactor: number;
}

export interface SideFlowBracketFactor {
  code: number;
  label: string;
  minVol: number;
  maxVol: number;
  along: number;
  main: number;
  side: number;
  star: number;
  alongFactor: number;
  mainFactor: number;
  sideFactor: number;
}

export interface SpeedBracketFactor {
  code: number;
  speed: number;
  along: number;
  main: number;
  side: number;
  star: number;
  alongFactor: number;
  mainFactor: number;
  sideFactor: number;
}

export const SR4S_DIRECT_OPTION_FACTORS: Record<string, Record<string, DetailedOptionFactor>> = {
  "land_use_left": {
    "undeveloped": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "residential": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "commercial": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "industrial": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "farming": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "school": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "land_use_right": {
    "undeveloped": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "residential": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "commercial": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "industrial": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "farming": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "school": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "area_type": {
    "rural": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "urban": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "vehicle_parking": {
    "none": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "one_side": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.3,
      "crossingSide": 1.7
    },
    "two_side": {
      "alongFactor": 1,
      "crossingMainFactor": 1.3684,
      "crossingSideFactor": 1.2857,
      "decimalStar": 4.4,
      "along": 1.7,
      "crossingMain": 2.6,
      "crossingSide": 1.8
    }
  },
  "sight_distance": {
    "adequate": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "poor": {
      "alongFactor": 1.4706,
      "crossingMainFactor": 1.4211,
      "crossingSideFactor": 1.4286,
      "decimalStar": 4.2,
      "along": 2.5,
      "crossingMain": 2.7,
      "crossingSide": 2
    }
  },
  "number_of_lanes": {
    "1_1": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "2_1": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 1.5263,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 2.4,
      "crossingMain": 2.9,
      "crossingSide": 1.4
    },
    "2_2": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.1,
      "along": 2.4,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "3_2": {
      "alongFactor": 1.8235,
      "crossingMainFactor": 2.5789,
      "crossingSideFactor": 1,
      "decimalStar": 3.9,
      "along": 3.1,
      "crossingMain": 4.9,
      "crossingSide": 1.4
    },
    "3_3": {
      "alongFactor": 0.1176,
      "crossingMainFactor": 0.1579,
      "crossingSideFactor": 1,
      "decimalStar": 5.3,
      "along": 0.2,
      "crossingMain": 0.3,
      "crossingSide": 1.4
    },
    "4_4": {
      "alongFactor": 0.1176,
      "crossingMainFactor": 0.2632,
      "crossingSideFactor": 1,
      "decimalStar": 5.2,
      "along": 0.2,
      "crossingMain": 0.5,
      "crossingSide": 1.4
    }
  },
  "lane_width": {
    "wide": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "medium": {
      "alongFactor": 1,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.8,
      "crossingSide": 1.4
    },
    "narrow": {
      "alongFactor": 1,
      "crossingMainFactor": 0.8947,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.7,
      "crossingSide": 1.4
    }
  },
  "shoulder_rumble_strips": {
    "present": {
      "alongFactor": 0.8235,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7,
      "along": 1.4,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "road_condition": {
    "good": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "medium": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 2.1,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "poor": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 2.4,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "grip": {
    "good": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "medium": {
      "alongFactor": 1.4118,
      "crossingMainFactor": 1.4211,
      "crossingSideFactor": 1.3571,
      "decimalStar": 4.2,
      "along": 2.4,
      "crossingMain": 2.7,
      "crossingSide": 1.9
    },
    "poor": {
      "alongFactor": 2.0588,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 2,
      "decimalStar": 3.9,
      "along": 3.5,
      "crossingMain": 3.9,
      "crossingSide": 2.8
    }
  },
  "grade": {
    "grade_low": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "grade_medium": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 2.1,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "grade_high": {
      "alongFactor": 1.7647,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 3,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "carriageway_type": {
    "divided_north_east": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "divided_south_west": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "undivided": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "middle_of_road": {
    "center_line": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2,
      "along": 2.1,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "wide_line": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2,
      "along": 2.1,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "hatching": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2,
      "along": 2.1,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "turn_lane": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2,
      "along": 2.1,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "flexible_posts": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2,
      "along": 2.1,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "separated_0_1": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "separated_1_5": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "separated_5_10": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "separated_10_20": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "separated_20_plus": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "metal_barrier": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "concrete_barrier": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "wire_barrier": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "motorcycle_barrier": {
      "alongFactor": 1,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    },
    "one_way": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "broken_wide_markings": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 2.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.2,
      "along": 2.1,
      "crossingMain": 3.9,
      "crossingSide": 1.4
    }
  },
  "lines_and_signs": {
    "adequate": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "poor": {
      "alongFactor": 1.2353,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 2.1,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "street_lighting": {
    "present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "not_present": {
      "alongFactor": 1.2941,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4,
      "along": 2.2,
      "crossingMain": 2.4,
      "crossingSide": 1.7
    }
  },
  "school_warning": {
    "flashing_beacons": {
      "alongFactor": 0.9412,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 0.9286,
      "decimalStar": 4.6,
      "along": 1.6,
      "crossingMain": 1.8,
      "crossingSide": 1.3
    },
    "signs_markings": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "no_school_zone": {
      "alongFactor": 1.0588,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.8,
      "crossingMain": 2,
      "crossingSide": 1.4
    },
    "no_school_nearby": {
      "alongFactor": 1.0588,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.8,
      "crossingMain": 2,
      "crossingSide": 1.4
    }
  },
  "crossing_supervisor": {
    "supervisor": {
      "alongFactor": 1,
      "crossingMainFactor": 0.5789,
      "crossingSideFactor": 0.8571,
      "decimalStar": 4.7,
      "along": 1.7,
      "crossingMain": 1.1,
      "crossingSide": 1.2
    },
    "no_supervisor": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "no_school_nearby": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "sidewalk_left": {
    "none": {
      "alongFactor": 7,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 3.5,
      "along": 11.9,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "0_1m": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "1_3m": {
      "alongFactor": 0.8235,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.4,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "gt_3m": {
      "alongFactor": 0.6471,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7,
      "along": 1.1,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "barrier": {
      "alongFactor": 0.5294,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7,
      "along": 0.9,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "poor": {
      "alongFactor": 2.0588,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 3.5,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "moderate": {
      "alongFactor": 1.5882,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 2.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "shared": {
      "alongFactor": 1.5882,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 2.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "sidewalk_right": {
    "none": {
      "alongFactor": 7,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 3.5,
      "along": 11.9,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "0_1m": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "1_3m": {
      "alongFactor": 0.8235,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.4,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "gt_3m": {
      "alongFactor": 0.6471,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7,
      "along": 1.1,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "barrier": {
      "alongFactor": 0.5294,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.7,
      "along": 0.9,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "poor": {
      "alongFactor": 2.0588,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.3,
      "along": 3.5,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "moderate": {
      "alongFactor": 1.5882,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 2.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "shared": {
      "alongFactor": 1.5882,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 2.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "road_edge_left": {
    "none": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "0_1m": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "1_2_4m": {
      "alongFactor": 1,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 2,
      "crossingSide": 1.4
    },
    "gt_2_4m": {
      "alongFactor": 0.9412,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.6,
      "crossingMain": 2.1,
      "crossingSide": 1.4
    }
  },
  "road_edge_right": {
    "none": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "0_1m": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "1_2_4m": {
      "alongFactor": 1,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 2,
      "crossingSide": 1.4
    },
    "gt_2_4m": {
      "alongFactor": 0.9412,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.6,
      "crossingMain": 2.1,
      "crossingSide": 1.4
    }
  },
  "pedestrian_channelisation": {
    "present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 0.8947,
      "crossingSideFactor": 0.8571,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.7,
      "crossingSide": 1.2
    }
  },
  "crossing_main_road": {
    "none": {
      "alongFactor": 1,
      "crossingMainFactor": 1.5263,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 1.7,
      "crossingMain": 2.9,
      "crossingSide": 1.4
    },
    "lights": {
      "alongFactor": 1,
      "crossingMainFactor": 0.1579,
      "crossingSideFactor": 1,
      "decimalStar": 4.9,
      "along": 1.7,
      "crossingMain": 0.3,
      "crossingSide": 1.4
    },
    "raised": {
      "alongFactor": 1,
      "crossingMainFactor": 0.8947,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.7,
      "crossingSide": 1.4
    },
    "bridge_tunnel": {
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1,
      "decimalStar": 4.9,
      "along": 1.7,
      "crossingMain": 0,
      "crossingSide": 1.4
    },
    "marked": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "unmarked": {
      "alongFactor": 1,
      "crossingMainFactor": 1.5263,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 1.7,
      "crossingMain": 2.9,
      "crossingSide": 1.4
    },
    "refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 0.7368,
      "crossingSideFactor": 1,
      "decimalStar": 4.7,
      "along": 1.7,
      "crossingMain": 1.4,
      "crossingSide": 1.4
    },
    "lights_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 0.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.9,
      "along": 1.7,
      "crossingMain": 0.1,
      "crossingSide": 1.4
    },
    "marked_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 0.4737,
      "crossingSideFactor": 1,
      "decimalStar": 4.8,
      "along": 1.7,
      "crossingMain": 0.9,
      "crossingSide": 1.4
    },
    "raised_marked": {
      "alongFactor": 1,
      "crossingMainFactor": 0.5789,
      "crossingSideFactor": 1,
      "decimalStar": 4.7,
      "along": 1.7,
      "crossingMain": 1.1,
      "crossingSide": 1.4
    },
    "raised_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 0.4211,
      "crossingSideFactor": 1,
      "decimalStar": 4.8,
      "along": 1.7,
      "crossingMain": 0.8,
      "crossingSide": 1.4
    },
    "raised_marked_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 0.2632,
      "crossingSideFactor": 1,
      "decimalStar": 4.8,
      "along": 1.7,
      "crossingMain": 0.5,
      "crossingSide": 1.4
    }
  },
  "crossing_side_road": {
    "none": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 11.2143,
      "decimalStar": 3.2,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 15.7
    },
    "lights": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "raised": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 6.7143,
      "decimalStar": 3.7,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 9.4
    },
    "bridge_tunnel": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0,
      "decimalStar": 4.8,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 0
    },
    "marked": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 7.5,
      "decimalStar": 3.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 10.5
    },
    "unmarked": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 11.2143,
      "decimalStar": 3.2,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 15.7
    },
    "refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 5.5714,
      "decimalStar": 3.8,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 7.8
    },
    "lights_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0.5,
      "decimalStar": 4.7,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 0.7
    },
    "marked_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 3.7143,
      "decimalStar": 3.9,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 5.2
    },
    "raised_marked": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 4.5,
      "decimalStar": 3.9,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 6.3
    },
    "raised_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 3.3571,
      "decimalStar": 4,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 4.7
    },
    "raised_marked_refuge": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 2.2143,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 3.1
    }
  },
  "crossing_quality": {
    "adequate": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "poor": {
      "alongFactor": 1,
      "crossingMainFactor": 1.5263,
      "crossingSideFactor": 1.5,
      "decimalStar": 4.3,
      "along": 1.7,
      "crossingMain": 2.9,
      "crossingSide": 2.1
    },
    "na": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "crossing_flow": {
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1,
      "decimalStar": 4.9,
      "along": 1.7,
      "crossingMain": 0,
      "crossingSide": 1.4
    },
    "present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "right_side_flow": {
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "left_side_flow": {
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "intersection_type": {
    "merge_lane": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4,
      "along": 1.7,
      "crossingMain": 2.4,
      "crossingSide": 1.7
    },
    "3_leg": {
      "alongFactor": 1,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 0.9286,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.8,
      "crossingSide": 1.3
    },
    "3_leg_signal": {
      "alongFactor": 1,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 0.9286,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.8,
      "crossingSide": 1.3
    },
    "3_leg_turn_lane": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "3_leg_turn_signal": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "4_leg": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "4_leg_turn_lane": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1.0714,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.1,
      "crossingSide": 1.5
    },
    "4_leg_signal": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "4_leg_turn_signal": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1.0714,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.1,
      "crossingSide": 1.5
    },
    "roundabout": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4,
      "along": 1.7,
      "crossingMain": 2.4,
      "crossingSide": 1.7
    },
    "mini_roundabout": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1.0714,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.1,
      "crossingSide": 1.5
    },
    "formal_u_turn": {
      "alongFactor": 1,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 0.9286,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.8,
      "crossingSide": 1.3
    },
    "informal_u_turn": {
      "alongFactor": 1,
      "crossingMainFactor": 0.9474,
      "crossingSideFactor": 0.9286,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.8,
      "crossingSide": 1.3
    },
    "active_train": {
      "alongFactor": 1,
      "crossingMainFactor": 0.8421,
      "crossingSideFactor": 0.7857,
      "decimalStar": 4.7,
      "along": 1.7,
      "crossingMain": 1.6,
      "crossingSide": 1.1
    },
    "passive_train": {
      "alongFactor": 1,
      "crossingMainFactor": 0.8421,
      "crossingSideFactor": 0.7857,
      "decimalStar": 4.7,
      "along": 1.7,
      "crossingMain": 1.6,
      "crossingSide": 1.1
    },
    "no_intersection": {
      "alongFactor": 1,
      "crossingMainFactor": 0.8421,
      "crossingSideFactor": 0.7857,
      "decimalStar": 4.7,
      "along": 1.7,
      "crossingMain": 1.6,
      "crossingSide": 1.1
    },
    "short_merge": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2632,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.4,
      "along": 1.7,
      "crossingMain": 2.4,
      "crossingSide": 1.7
    },
    "diverge_lane": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1.1429,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.3,
      "crossingSide": 1.6
    }
  },
  "driveways": {
    "1_2_residential": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "2_plus_residential": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "commercial": {
      "alongFactor": 1.0588,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.8,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "not_applicable": {
      "alongFactor": 0.9412,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.6,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "intersection_quality": {
    "adequate": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "poor": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1.2143,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.3,
      "crossingSide": 1.7
    },
    "not_applicable": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "curve_type": {
    "straight": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "moderate": {
      "alongFactor": 1.8235,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 3.1,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "sharp": {
      "alongFactor": 3.6471,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 3.9,
      "along": 6.2,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "very_sharp": {
      "alongFactor": 6.2353,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 3.6,
      "along": 10.6,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "curve_quality": {
    "adequate": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "poor": {
      "alongFactor": 1.2941,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 2.2,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "not_curve": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "speed_management": {
    "present": {
      "alongFactor": 0.8235,
      "crossingMainFactor": 0.7895,
      "crossingSideFactor": 0.7857,
      "decimalStar": 4.8,
      "along": 1.4,
      "crossingMain": 1.5,
      "crossingSide": 1.1
    },
    "not_present": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    }
  },
  "motorcycle_percent": {
    "0": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "100": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.3,
      "crossingSide": 1.4
    },
    "not_recorded": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "1_5": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "6_10": {
      "alongFactor": 1,
      "crossingMainFactor": 1.0526,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 2,
      "crossingSide": 1.4
    },
    "11_20": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 2.1,
      "crossingSide": 1.4
    },
    "21_40": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1579,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.2,
      "crossingSide": 1.4
    },
    "41_60": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.3,
      "crossingSide": 1.4
    },
    "61_80": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.3,
      "crossingSide": 1.4
    },
    "81_99": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.3,
      "crossingSide": 1.4
    }
  },
  "hgv_percent": {
    "not_recorded": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "0_5": {
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1,
      "decimalStar": 4.6,
      "along": 1.7,
      "crossingMain": 1.9,
      "crossingSide": 1.4
    },
    "5_10": {
      "alongFactor": 1,
      "crossingMainFactor": 1.1053,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.1,
      "crossingSide": 1.4
    },
    "10_15": {
      "alongFactor": 1,
      "crossingMainFactor": 1.2105,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.3,
      "crossingSide": 1.4
    },
    "15_20": {
      "alongFactor": 1,
      "crossingMainFactor": 1.3158,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.5,
      "crossingSide": 1.4
    },
    "20_30": {
      "alongFactor": 1,
      "crossingMainFactor": 1.4211,
      "crossingSideFactor": 1,
      "decimalStar": 4.5,
      "along": 1.7,
      "crossingMain": 2.7,
      "crossingSide": 1.4
    },
    "30_40": {
      "alongFactor": 1,
      "crossingMainFactor": 1.5263,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 1.7,
      "crossingMain": 2.9,
      "crossingSide": 1.4
    },
    "40_plus": {
      "alongFactor": 1,
      "crossingMainFactor": 1.6316,
      "crossingSideFactor": 1,
      "decimalStar": 4.4,
      "along": 1.7,
      "crossingMain": 3.1,
      "crossingSide": 1.4
    }
  }
};

export const SR4S_OFFICIAL_FLOW_BRACKETS: FlowBracketFactor[] = [
  {
    "code": 1,
    "label": "1dan 100",
    "minAadt": 1,
    "maxAadt": 100,
    "along": 1.7,
    "main": 1.9,
    "side": 1.4,
    "star": 4.6,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 1
  },
  {
    "code": 2,
    "label": "100 dan 1999",
    "minAadt": 100,
    "maxAadt": 1999,
    "along": 1.7,
    "main": 1.9,
    "side": 1.4,
    "star": 4.6,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 1
  },
  {
    "code": 3,
    "label": "2000 dan 3999",
    "minAadt": 2000,
    "maxAadt": 3999,
    "along": 2.7,
    "main": 3,
    "side": 1.4,
    "star": 4.3,
    "alongFactor": 1.5882,
    "mainFactor": 1.5789,
    "sideFactor": 1
  },
  {
    "code": 4,
    "label": "4000 dan 5999",
    "minAadt": 4000,
    "maxAadt": 5999,
    "along": 3.5,
    "main": 3.9,
    "side": 1.4,
    "star": 4,
    "alongFactor": 2.0588,
    "mainFactor": 2.0526,
    "sideFactor": 1
  },
  {
    "code": 5,
    "label": "6000 dan 7999",
    "minAadt": 6000,
    "maxAadt": 7999,
    "along": 4.3,
    "main": 4.8,
    "side": 1.4,
    "star": 3.8,
    "alongFactor": 2.5294,
    "mainFactor": 2.5263,
    "sideFactor": 1
  },
  {
    "code": 6,
    "label": "8000 dan 9999",
    "minAadt": 8000,
    "maxAadt": 9999,
    "along": 4.9,
    "main": 5.5,
    "side": 1.4,
    "star": 3.8,
    "alongFactor": 2.8824,
    "mainFactor": 2.8947,
    "sideFactor": 1
  },
  {
    "code": 7,
    "label": "10000 dan 11999",
    "minAadt": 10000,
    "maxAadt": 11999,
    "along": 5.5,
    "main": 6.1,
    "side": 1.4,
    "star": 3.7,
    "alongFactor": 3.2353,
    "mainFactor": 3.2105,
    "sideFactor": 1
  },
  {
    "code": 8,
    "label": "12000 dan 13999",
    "minAadt": 12000,
    "maxAadt": 13999,
    "along": 6.1,
    "main": 6.8,
    "side": 1.4,
    "star": 3.6,
    "alongFactor": 3.5882,
    "mainFactor": 3.5789,
    "sideFactor": 1
  },
  {
    "code": 9,
    "label": "14000 dan 15999",
    "minAadt": 14000,
    "maxAadt": 15999,
    "along": 6.7,
    "main": 7.4,
    "side": 1.4,
    "star": 3.4,
    "alongFactor": 3.9412,
    "mainFactor": 3.8947,
    "sideFactor": 1
  },
  {
    "code": 10,
    "label": "16000 dan 17999",
    "minAadt": 16000,
    "maxAadt": 17999,
    "along": 7.3,
    "main": 8.1,
    "side": 1.4,
    "star": 3.4,
    "alongFactor": 4.2941,
    "mainFactor": 4.2632,
    "sideFactor": 1
  },
  {
    "code": 11,
    "label": "18000 dan 19999",
    "minAadt": 18000,
    "maxAadt": 19999,
    "along": 7.8,
    "main": 8.6,
    "side": 1.4,
    "star": 3.3,
    "alongFactor": 4.5882,
    "mainFactor": 4.5263,
    "sideFactor": 1
  },
  {
    "code": 12,
    "label": "20000 dan 21999",
    "minAadt": 20000,
    "maxAadt": 21999,
    "along": 8.2,
    "main": 9.2,
    "side": 1.4,
    "star": 3.2,
    "alongFactor": 4.8235,
    "mainFactor": 4.8421,
    "sideFactor": 1
  },
  {
    "code": 13,
    "label": "22000 dan 23999",
    "minAadt": 22000,
    "maxAadt": 23999,
    "along": 8.7,
    "main": 9.7,
    "side": 1.4,
    "star": 3.2,
    "alongFactor": 5.1176,
    "mainFactor": 5.1053,
    "sideFactor": 1
  },
  {
    "code": 14,
    "label": "24000 dan 25999",
    "minAadt": 24000,
    "maxAadt": 25999,
    "along": 9.2,
    "main": 10.2,
    "side": 1.4,
    "star": 3.1,
    "alongFactor": 5.4118,
    "mainFactor": 5.3684,
    "sideFactor": 1
  },
  {
    "code": 15,
    "label": "26000 dan 27999",
    "minAadt": 26000,
    "maxAadt": 27999,
    "along": 9.7,
    "main": 10.7,
    "side": 1.4,
    "star": 3,
    "alongFactor": 5.7059,
    "mainFactor": 5.6316,
    "sideFactor": 1
  },
  {
    "code": 16,
    "label": "28000 dan 29999",
    "minAadt": 28000,
    "maxAadt": 29999,
    "along": 10.1,
    "main": 11.3,
    "side": 1.4,
    "star": 3,
    "alongFactor": 5.9412,
    "mainFactor": 5.9474,
    "sideFactor": 1
  },
  {
    "code": 17,
    "label": "30000 dan 31999",
    "minAadt": 30000,
    "maxAadt": 31999,
    "along": 10.6,
    "main": 11.8,
    "side": 1.4,
    "star": 2.9,
    "alongFactor": 6.2353,
    "mainFactor": 6.2105,
    "sideFactor": 1
  },
  {
    "code": 18,
    "label": "32000 dan 33999",
    "minAadt": 32000,
    "maxAadt": 33999,
    "along": 11,
    "main": 12.2,
    "side": 1.4,
    "star": 2.9,
    "alongFactor": 6.4706,
    "mainFactor": 6.4211,
    "sideFactor": 1
  },
  {
    "code": 19,
    "label": "34000 dan 35999",
    "minAadt": 34000,
    "maxAadt": 35999,
    "along": 11.3,
    "main": 12.6,
    "side": 1.4,
    "star": 2.9,
    "alongFactor": 6.6471,
    "mainFactor": 6.6316,
    "sideFactor": 1
  },
  {
    "code": 20,
    "label": "36000 dan 37999",
    "minAadt": 36000,
    "maxAadt": 37999,
    "along": 11.6,
    "main": 13,
    "side": 1.4,
    "star": 2.9,
    "alongFactor": 6.8235,
    "mainFactor": 6.8421,
    "sideFactor": 1
  },
  {
    "code": 21,
    "label": "38000 dan  39999",
    "minAadt": 38000,
    "maxAadt": 39999,
    "along": 11.8,
    "main": 13.1,
    "side": 1.4,
    "star": 2.9,
    "alongFactor": 6.9412,
    "mainFactor": 6.8947,
    "sideFactor": 1
  },
  {
    "code": 22,
    "label": ">=40000",
    "minAadt": 40000,
    "maxAadt": 999999,
    "along": 11.8,
    "main": 13.1,
    "side": 1.4,
    "star": 2.9,
    "alongFactor": 6.9412,
    "mainFactor": 6.8947,
    "sideFactor": 1
  }
];

export const SR4S_OFFICIAL_SIDE_FLOW_BRACKETS: SideFlowBracketFactor[] = [
  {
    "code": 1,
    "label": "< 5000",
    "minVol": 0,
    "maxVol": 5000,
    "along": 1.7,
    "main": 1.9,
    "side": 1.4,
    "star": 4.6,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 1
  },
  {
    "code": 2,
    "label": "5000 dan  9999",
    "minVol": 5000,
    "maxVol": 9999,
    "along": 1.7,
    "main": 1.9,
    "side": 2.2,
    "star": 4.5,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 1.5714
  },
  {
    "code": 3,
    "label": "10000 dan 14999",
    "minVol": 10000,
    "maxVol": 14999,
    "along": 1.7,
    "main": 1.9,
    "side": 3.1,
    "star": 4.2,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 2.2143
  },
  {
    "code": 5,
    "label": "15000 dan 19999",
    "minVol": 15000,
    "maxVol": 19999,
    "along": 1.7,
    "main": 1.9,
    "side": 3.9,
    "star": 3.9,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 2.7857
  },
  {
    "code": 6,
    "label": "20000dan 29999",
    "minVol": 20000,
    "maxVol": 29999,
    "along": 1.7,
    "main": 1.9,
    "side": 5.55,
    "star": 3.9,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 3.9643
  },
  {
    "code": 7,
    "label": "30000 dan 39999",
    "minVol": 30000,
    "maxVol": 39999,
    "along": 1.7,
    "main": 1.9,
    "side": 7.25,
    "star": 3.8,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 5.1786
  },
  {
    "code": 8,
    "label": "40000 dan 49999",
    "minVol": 40000,
    "maxVol": 49999,
    "along": 1.7,
    "main": 1.9,
    "side": 8.8,
    "star": 3.7,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 6.2857
  },
  {
    "code": 9,
    "label": "50000dan 59999",
    "minVol": 50000,
    "maxVol": 59999,
    "along": 1.7,
    "main": 1.9,
    "side": 10.45,
    "star": 3.6,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 7.4643
  },
  {
    "code": 10,
    "label": "60000 dan 69999",
    "minVol": 60000,
    "maxVol": 69999,
    "along": 1.7,
    "main": 1.9,
    "side": 12,
    "star": 3.5,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 8.5714
  },
  {
    "code": 11,
    "label": "70000 ddan 79999",
    "minVol": 70000,
    "maxVol": 79999,
    "along": 1.7,
    "main": 1.9,
    "side": 13,
    "star": 3.4,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 9.2857
  },
  {
    "code": 12,
    "label": "80000 dan 89999",
    "minVol": 80000,
    "maxVol": 89999,
    "along": 1.9,
    "main": 1.9,
    "side": 13.8,
    "star": 3.4,
    "alongFactor": 1.1176,
    "mainFactor": 1,
    "sideFactor": 9.8571
  },
  {
    "code": 13,
    "label": ">=90000",
    "minVol": 90000,
    "maxVol": 999999,
    "along": 1.7,
    "main": 1.7,
    "side": 13.8,
    "star": 3.4,
    "alongFactor": 1,
    "mainFactor": 0.8947,
    "sideFactor": 9.8571
  }
];

export const SR4S_OFFICIAL_SPEED_LIMIT_BRACKETS: SpeedBracketFactor[] = [
  {
    "code": 1,
    "speed": 30,
    "along": 1.7,
    "main": 1.9,
    "side": 1.4,
    "star": 4.6,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 1
  },
  {
    "code": 2,
    "speed": 35,
    "along": 1.7,
    "main": 1.9,
    "side": 1.4,
    "star": 4.6,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 1
  },
  {
    "code": 3,
    "speed": 40,
    "along": 1.7,
    "main": 1.9,
    "side": 1.4,
    "star": 4.6,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 1
  },
  {
    "code": 4,
    "speed": 45,
    "along": 1.7,
    "main": 1.9,
    "side": 1.4,
    "star": 4.6,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 1
  },
  {
    "code": 5,
    "speed": 50,
    "along": 2.5,
    "main": 2.8,
    "side": 2.2,
    "star": 4.2,
    "alongFactor": 1.4706,
    "mainFactor": 1.4737,
    "sideFactor": 1.5714
  },
  {
    "code": 6,
    "speed": 55,
    "along": 3.6,
    "main": 4,
    "side": 2.8,
    "star": 3.9,
    "alongFactor": 2.1176,
    "mainFactor": 2.1053,
    "sideFactor": 2
  },
  {
    "code": 7,
    "speed": 60,
    "along": 4.6,
    "main": 5.2,
    "side": 3.7,
    "star": 3.6,
    "alongFactor": 2.7059,
    "mainFactor": 2.7368,
    "sideFactor": 2.6429
  },
  {
    "code": 8,
    "speed": 65,
    "along": 5.7,
    "main": 6.3,
    "side": 4.5,
    "star": 3.4,
    "alongFactor": 3.3529,
    "mainFactor": 3.3158,
    "sideFactor": 3.2143
  },
  {
    "code": 9,
    "speed": 70,
    "along": 6.6,
    "main": 7.3,
    "side": 5.3,
    "star": 3.3,
    "alongFactor": 3.8824,
    "mainFactor": 3.8421,
    "sideFactor": 3.7857
  },
  {
    "code": 10,
    "speed": 75,
    "along": 7.3,
    "main": 8.1,
    "side": 5.8,
    "star": 3.1,
    "alongFactor": 4.2941,
    "mainFactor": 4.2632,
    "sideFactor": 4.1429
  },
  {
    "code": 11,
    "speed": 80,
    "along": 7.7,
    "main": 8.6,
    "side": 6.2,
    "star": 3,
    "alongFactor": 4.5294,
    "mainFactor": 4.5263,
    "sideFactor": 4.4286
  },
  {
    "code": 12,
    "speed": 85,
    "along": 8.1,
    "main": 9,
    "side": 6.4,
    "star": 3,
    "alongFactor": 4.7647,
    "mainFactor": 4.7368,
    "sideFactor": 4.5714
  },
  {
    "code": 13,
    "speed": 90,
    "along": 8.3,
    "main": 9.2,
    "side": 6.6,
    "star": 2.9,
    "alongFactor": 4.8824,
    "mainFactor": 4.8421,
    "sideFactor": 4.7143
  },
  {
    "code": 14,
    "speed": 95,
    "along": 8.4,
    "main": 9.3,
    "side": 6.7,
    "star": 2.9,
    "alongFactor": 4.9412,
    "mainFactor": 4.8947,
    "sideFactor": 4.7857
  },
  {
    "code": 15,
    "speed": 100,
    "along": 8.5,
    "main": 9.4,
    "side": 6.8,
    "star": 2.9,
    "alongFactor": 5,
    "mainFactor": 4.9474,
    "sideFactor": 4.8571
  },
  {
    "code": 16,
    "speed": 105,
    "along": 8.5,
    "main": 9.5,
    "side": 6.8,
    "star": 2.9,
    "alongFactor": 5,
    "mainFactor": 5,
    "sideFactor": 4.8571
  },
  {
    "code": 17,
    "speed": 110,
    "along": 8.6,
    "main": 9.5,
    "side": 6.8,
    "star": 2.9,
    "alongFactor": 5.0588,
    "mainFactor": 5,
    "sideFactor": 4.8571
  },
  {
    "code": 18,
    "speed": 115,
    "along": 8.6,
    "main": 9.5,
    "side": 6.9,
    "star": 2.9,
    "alongFactor": 5.0588,
    "mainFactor": 5,
    "sideFactor": 4.9286
  },
  {
    "code": 19,
    "speed": 120,
    "along": 8.6,
    "main": 9.6,
    "side": 6.9,
    "star": 2.9,
    "alongFactor": 5.0588,
    "mainFactor": 5.0526,
    "sideFactor": 4.9286
  },
  {
    "code": 20,
    "speed": 120,
    "along": 8.6,
    "main": 9.6,
    "side": 6.9,
    "star": 2.9,
    "alongFactor": 5.0588,
    "mainFactor": 5.0526,
    "sideFactor": 4.9286
  }
];

export const SR4S_OFFICIAL_OPERATING_SPEED_BRACKETS: SpeedBracketFactor[] = [
  {
    "code": 1,
    "speed": 30,
    "along": 0.4,
    "main": 0.5,
    "side": 0.3,
    "star": 4.9,
    "alongFactor": 0.2353,
    "mainFactor": 0.2632,
    "sideFactor": 0.2143
  },
  {
    "code": 2,
    "speed": 35,
    "along": 0.7,
    "main": 0.8,
    "side": 0.5,
    "star": 4.9,
    "alongFactor": 0.4118,
    "mainFactor": 0.4211,
    "sideFactor": 0.3571
  },
  {
    "code": 3,
    "speed": 40,
    "along": 1.1,
    "main": 1.2,
    "side": 0.9,
    "star": 4.9,
    "alongFactor": 0.6471,
    "mainFactor": 0.6316,
    "sideFactor": 0.6429
  },
  {
    "code": 4,
    "speed": 45,
    "along": 1.7,
    "main": 1.9,
    "side": 1.4,
    "star": 4.6,
    "alongFactor": 1,
    "mainFactor": 1,
    "sideFactor": 1
  },
  {
    "code": 5,
    "speed": 50,
    "along": 2.5,
    "main": 2.8,
    "side": 2,
    "star": 4.2,
    "alongFactor": 1.4706,
    "mainFactor": 1.4737,
    "sideFactor": 1.4286
  },
  {
    "code": 6,
    "speed": 55,
    "along": 3.6,
    "main": 8,
    "side": 2.8,
    "star": 3.6,
    "alongFactor": 2.1176,
    "mainFactor": 4.2105,
    "sideFactor": 2
  },
  {
    "code": 7,
    "speed": 60,
    "along": 4.6,
    "main": 10.4,
    "side": 3.7,
    "star": 3.3,
    "alongFactor": 2.7059,
    "mainFactor": 5.4737,
    "sideFactor": 2.6429
  },
  {
    "code": 8,
    "speed": 65,
    "along": 5.7,
    "main": 12.7,
    "side": 4.5,
    "star": 3,
    "alongFactor": 3.3529,
    "mainFactor": 6.6842,
    "sideFactor": 3.2143
  },
  {
    "code": 9,
    "speed": 70,
    "along": 6.6,
    "main": 14.7,
    "side": 5.3,
    "star": 2.9,
    "alongFactor": 3.8824,
    "mainFactor": 7.7368,
    "sideFactor": 3.7857
  },
  {
    "code": 10,
    "speed": 75,
    "along": 7.3,
    "main": 16.2,
    "side": 5.8,
    "star": 2.8,
    "alongFactor": 4.2941,
    "mainFactor": 8.5263,
    "sideFactor": 4.1429
  },
  {
    "code": 11,
    "speed": 80,
    "along": 7.7,
    "main": 17.3,
    "side": 6.2,
    "star": 2.7,
    "alongFactor": 4.5294,
    "mainFactor": 9.1053,
    "sideFactor": 4.4286
  },
  {
    "code": 12,
    "speed": 85,
    "along": 8.1,
    "main": 27,
    "side": 19.4,
    "star": 1.9,
    "alongFactor": 4.7647,
    "mainFactor": 14.2105,
    "sideFactor": 13.8571
  },
  {
    "code": 13,
    "speed": 90,
    "along": 8.3,
    "main": 27.7,
    "side": 19.9,
    "star": 1.9,
    "alongFactor": 4.8824,
    "mainFactor": 14.5789,
    "sideFactor": 14.2143
  },
  {
    "code": 14,
    "speed": 95,
    "along": 8.4,
    "main": 28.1,
    "side": 20.2,
    "star": 1.9,
    "alongFactor": 4.9412,
    "mainFactor": 14.7895,
    "sideFactor": 14.4286
  },
  {
    "code": 15,
    "speed": 100,
    "along": 8.5,
    "main": 28.4,
    "side": 20.4,
    "star": 1.9,
    "alongFactor": 5,
    "mainFactor": 14.9474,
    "sideFactor": 14.5714
  },
  {
    "code": 16,
    "speed": 105,
    "along": 8.5,
    "main": 28.6,
    "side": 20.5,
    "star": 1.9,
    "alongFactor": 5,
    "mainFactor": 15.0526,
    "sideFactor": 14.6429
  },
  {
    "code": 17,
    "speed": 110,
    "along": 8.6,
    "main": 28.7,
    "side": 20.6,
    "star": 1.9,
    "alongFactor": 5.0588,
    "mainFactor": 15.1053,
    "sideFactor": 14.7143
  },
  {
    "code": 18,
    "speed": 115,
    "along": 8.6,
    "main": 28.7,
    "side": 20.7,
    "star": 1.9,
    "alongFactor": 5.0588,
    "mainFactor": 15.1053,
    "sideFactor": 14.7857
  },
  {
    "code": 19,
    "speed": 120,
    "along": 8.6,
    "main": 28.8,
    "side": 20.7,
    "star": 1.9,
    "alongFactor": 5.0588,
    "mainFactor": 15.1579,
    "sideFactor": 14.7857
  },
  {
    "code": 20,
    "speed": 120,
    "along": 8.6,
    "main": 28.8,
    "side": 20.7,
    "star": 1.9,
    "alongFactor": 5.0588,
    "mainFactor": 15.1579,
    "sideFactor": 14.7857
  }
];
