/**
 * Rasmiy iRAP v3.10 / SR4S koeffitsiyentlari va multiplikatorlari bazasi.
 * Manba: results.starratingforschools.org/model/V31a
 */

export interface OptionRiskFactor {
  along: number;
  crossingMain: number;
  crossingSide: number;
  srsScore: number;
  decimalStar: number;
  alongFactor: number;
  crossingMainFactor: number;
  crossingSideFactor: number;
}

export const SR4S_BASELINE = {
  "srsScore": 5.4,
  "along": 2.3,
  "crossingMain": 1.8,
  "crossingSide": 1.3,
  "decimalStar": 4.6,
  "banding": [
    200,
    54,
    24,
    9,
    3
  ]
};

export const SR4S_OFFICIAL_FACTORS: Record<string, Record<string, OptionRiskFactor>> = {
  "vehicle_parking": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 3.3,
      "crossingSide": 2.4,
      "srsScore": 9.3,
      "decimalStar": 3.9,
      "alongFactor": 1,
      "crossingMainFactor": 1.2222,
      "crossingSideFactor": 1.2
    },
    "3": {
      "along": 3.5,
      "crossingMain": 3.7,
      "crossingSide": 2.6,
      "srsScore": 9.9,
      "decimalStar": 3.9,
      "alongFactor": 1,
      "crossingMainFactor": 1.3704,
      "crossingSideFactor": 1.3
    }
  },
  "sight_distance": {
    "1": {
      "along": 2.4,
      "crossingMain": 1.9,
      "crossingSide": 1.4,
      "srsScore": 5.8,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.4583,
      "crossingMainFactor": 1.4211,
      "crossingSideFactor": 1.4286
    }
  },
  "number_of_lanes": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 4.9,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 12.5,
      "decimalStar": 3.7,
      "alongFactor": 1.4,
      "crossingMainFactor": 2.037,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 0.4,
      "crossingMain": 0.5,
      "crossingSide": 2,
      "srsScore": 2.9,
      "decimalStar": 5,
      "alongFactor": 0.1143,
      "crossingMainFactor": 0.1852,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 0.5,
      "crossingMain": 0.7,
      "crossingSide": 2,
      "srsScore": 3.2,
      "decimalStar": 4.9,
      "alongFactor": 0.1429,
      "crossingMainFactor": 0.2593,
      "crossingSideFactor": 1
    }
  },
  "lane_width": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.6,
      "crossingSide": 2,
      "srsScore": 8.2,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 0.963,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.5,
      "crossingSide": 2,
      "srsScore": 8,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 0.9259,
      "crossingSideFactor": 1
    }
  },
  "shoulder_rumble_strips": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.25,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 2.8,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 7.6,
      "decimalStar": 4.2,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "road_condition": {
    "1": {
      "along": 2.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 7.3,
      "decimalStar": 4.2,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 7.8,
      "decimalStar": 4.1,
      "alongFactor": 1.2,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.4,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "skid_resistance_grip": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 4.9,
      "crossingMain": 3.9,
      "crossingSide": 2.8,
      "srsScore": 11.6,
      "decimalStar": 3.8,
      "alongFactor": 1.4,
      "crossingMainFactor": 1.4444,
      "crossingSideFactor": 1.4
    },
    "3": {
      "along": 7,
      "crossingMain": 5.5,
      "crossingSide": 4,
      "srsScore": 16.6,
      "decimalStar": 3.4,
      "alongFactor": 2,
      "crossingMainFactor": 2.037,
      "crossingSideFactor": 2
    },
    "4": {
      "along": 10.5,
      "crossingMain": 8.3,
      "crossingSide": 6,
      "srsScore": 25,
      "decimalStar": 2.9,
      "alongFactor": 3,
      "crossingMainFactor": 3.0741,
      "crossingSideFactor": 3
    },
    "5": {
      "along": 19.4,
      "crossingMain": 15.3,
      "crossingSide": 11,
      "srsScore": 45.8,
      "decimalStar": 2.2,
      "alongFactor": 5.5429,
      "crossingMainFactor": 5.6667,
      "crossingSideFactor": 5.5
    }
  },
  "grade": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 0,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 4.8,
      "decimalStar": 4.6,
      "alongFactor": 0,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 0,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 4.8,
      "decimalStar": 4.6,
      "alongFactor": 0,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 4.2,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 9,
      "decimalStar": 3.9,
      "alongFactor": 1.2,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "carriageway": {
    "1": {
      "along": 3.3,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.2,
      "decimalStar": 4.1,
      "alongFactor": 0.9429,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.3,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.2,
      "decimalStar": 4.1,
      "alongFactor": 0.9429,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "median_type": {
    "1": {
      "along": 3.5,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.1,
      "decimalStar": 3.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.1,
      "decimalStar": 3.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.1,
      "decimalStar": 3.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.5,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.1,
      "decimalStar": 3.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "5": {
      "along": 3.5,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.1,
      "decimalStar": 3.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "6": {
      "along": 3.5,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.1,
      "decimalStar": 3.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "7": {
      "along": 3.5,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.1,
      "decimalStar": 3.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "8": {
      "along": 4.2,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.8,
      "decimalStar": 3.8,
      "alongFactor": 1.2,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "9": {
      "along": 4.2,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.8,
      "decimalStar": 3.8,
      "alongFactor": 1.2,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "10": {
      "along": 4.2,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.8,
      "decimalStar": 3.8,
      "alongFactor": 1.2,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "11": {
      "along": 4.2,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.8,
      "decimalStar": 3.8,
      "alongFactor": 1.2,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "12": {
      "along": 3.5,
      "crossingMain": 5.5,
      "crossingSide": 2,
      "srsScore": 11.1,
      "decimalStar": 3.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "13": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 0.4909,
      "crossingSideFactor": 1
    }
  },
  "delineation": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 4.2,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 9,
      "decimalStar": 3.9,
      "alongFactor": 1.2,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "street_lighting": {
    "1": {
      "along": 4.4,
      "crossingMain": 3.4,
      "crossingSide": 2.5,
      "srsScore": 10.4,
      "decimalStar": 3.9,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 0.7955,
      "crossingMainFactor": 0.7941,
      "crossingSideFactor": 0.8
    }
  },
  "school_zone_warning": {
    "1": {
      "along": 3.3,
      "crossingMain": 2.6,
      "crossingSide": 1.9,
      "srsScore": 7.9,
      "decimalStar": 4.1,
      "alongFactor": 0.9429,
      "crossingMainFactor": 0.963,
      "crossingSideFactor": 0.95
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.7,
      "crossingMain": 2.9,
      "crossingSide": 2.1,
      "srsScore": 8.7,
      "decimalStar": 4,
      "alongFactor": 1.0571,
      "crossingMainFactor": 1.0741,
      "crossingSideFactor": 1.05
    }
  },
  "school_zone_crossing_supervisor": {
    "1": {
      "along": 3.5,
      "crossingMain": 1.6,
      "crossingSide": 1.8,
      "srsScore": 7,
      "decimalStar": 4.3,
      "alongFactor": 1,
      "crossingMainFactor": 0.5926,
      "crossingSideFactor": 0.9
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "sidewalk_driver_side": {
    "1": {
      "along": 1.8,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 6.6,
      "decimalStar": 4.3,
      "alongFactor": 0.6429,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 2.2,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 7,
      "decimalStar": 4.3,
      "alongFactor": 0.7857,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 2.8,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 7.7,
      "decimalStar": 4.2,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.25,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "5": {
      "along": 23.8,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 28.6,
      "decimalStar": 2.8,
      "alongFactor": 8.5,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "sidewalk_passenger_side": {
    "1": {
      "along": 1.8,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 6.6,
      "decimalStar": 4.3,
      "alongFactor": 0.8182,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 2.2,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 7,
      "decimalStar": 4.3,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 2.8,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 7.7,
      "decimalStar": 4.2,
      "alongFactor": 1.2727,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.5909,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "5": {
      "along": 23.8,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 28.6,
      "decimalStar": 2.8,
      "alongFactor": 10.8182,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "paved_shoulder_driver_side": {
    "1": {
      "along": 3.3,
      "crossingMain": 3,
      "crossingSide": 2,
      "srsScore": 8.4,
      "decimalStar": 4,
      "alongFactor": 0.9706,
      "crossingMainFactor": 1.0345,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.4,
      "crossingMain": 2.9,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0294,
      "crossingMainFactor": 0.931,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0294,
      "crossingMainFactor": 0.931,
      "crossingSideFactor": 1
    }
  },
  "paved_shoulder_passenger_side": {
    "1": {
      "along": 3.3,
      "crossingMain": 3,
      "crossingSide": 2,
      "srsScore": 8.4,
      "decimalStar": 4,
      "alongFactor": 0.9706,
      "crossingMainFactor": 1.0345,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.4,
      "crossingMain": 2.9,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0294,
      "crossingMainFactor": 0.931,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0294,
      "crossingMainFactor": 0.931,
      "crossingSideFactor": 1
    }
  },
  "ped_channelisation": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1.08,
      "crossingSideFactor": 1.1111
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.5,
      "crossingSide": 1.8,
      "srsScore": 7.8,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "pedestrian_crossing_facilities_inspected_road": {
    "1": {
      "along": 3.5,
      "crossingMain": 0,
      "crossingSide": 2,
      "srsScore": 5.5,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 0.2,
      "crossingSide": 2,
      "srsScore": 5.8,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 0.0741,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 0.5,
      "crossingSide": 2,
      "srsScore": 6.1,
      "decimalStar": 4.4,
      "alongFactor": 1,
      "crossingMainFactor": 0.1852,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.5,
      "crossingMain": 1.3,
      "crossingSide": 2,
      "srsScore": 6.9,
      "decimalStar": 4.3,
      "alongFactor": 1,
      "crossingMainFactor": 0.4815,
      "crossingSideFactor": 1
    },
    "5": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "6": {
      "along": 3.5,
      "crossingMain": 2,
      "crossingSide": 2,
      "srsScore": 7.6,
      "decimalStar": 4.2,
      "alongFactor": 1,
      "crossingMainFactor": 0.7407,
      "crossingSideFactor": 1
    },
    "7": {
      "along": 3.5,
      "crossingMain": 4.1,
      "crossingSide": 2,
      "srsScore": 9.7,
      "decimalStar": 3.9,
      "alongFactor": 1,
      "crossingMainFactor": 1.5185,
      "crossingSideFactor": 1
    },
    "8": {
      "along": 3.5,
      "crossingMain": 4.1,
      "crossingSide": 2,
      "srsScore": 9.7,
      "decimalStar": 3.9,
      "alongFactor": 1,
      "crossingMainFactor": 1.5185,
      "crossingSideFactor": 1
    },
    "9": {
      "along": 3.5,
      "crossingMain": 0,
      "crossingSide": 2,
      "srsScore": 5.5,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1
    },
    "10": {
      "along": 3.5,
      "crossingMain": 0,
      "crossingSide": 2,
      "srsScore": 5.5,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1
    },
    "11": {
      "along": 3.5,
      "crossingMain": 0,
      "crossingSide": 2,
      "srsScore": 5.5,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1
    },
    "12": {
      "along": 3.5,
      "crossingMain": 0,
      "crossingSide": 2,
      "srsScore": 5.5,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1
    },
    "13": {
      "along": 3.5,
      "crossingMain": 0,
      "crossingSide": 2,
      "srsScore": 5.5,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 0,
      "crossingSideFactor": 1
    },
    "14": {
      "along": 3.5,
      "crossingMain": 0.8,
      "crossingSide": 2,
      "srsScore": 6.3,
      "decimalStar": 4.4,
      "alongFactor": 1,
      "crossingMainFactor": 0.2963,
      "crossingSideFactor": 1
    }
  },
  "pedestrian_crossing_facilities_intersecting_road": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 0.1,
      "srsScore": 6.4,
      "decimalStar": 4.4,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0.1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 1,
      "srsScore": 7.3,
      "decimalStar": 4.2,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 2
    },
    "4": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 7.4,
      "srsScore": 13.7,
      "decimalStar": 3.6,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 7.4
    },
    "5": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 14.9,
      "srsScore": 21.2,
      "decimalStar": 3.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 14.9
    },
    "6": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 11.1,
      "srsScore": 17.5,
      "decimalStar": 3.4,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 11.1
    },
    "7": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 22.3,
      "srsScore": 28.7,
      "decimalStar": 2.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 22.3
    },
    "8": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 22.3,
      "srsScore": 28.7,
      "decimalStar": 2.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 22.3
    },
    "9": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 0,
      "srsScore": 6.3,
      "decimalStar": 4.4,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0
    },
    "10": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 0,
      "srsScore": 6.3,
      "decimalStar": 4.4,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0
    },
    "11": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 0,
      "srsScore": 6.3,
      "decimalStar": 4.4,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0
    },
    "12": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 0,
      "srsScore": 6.3,
      "decimalStar": 4.4,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0
    },
    "13": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 0,
      "srsScore": 6.3,
      "decimalStar": 4.4,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 0
    },
    "14": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 4.4,
      "srsScore": 10.8,
      "decimalStar": 3.8,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 4.4
    }
  },
  "pedestrian_crossing_quality": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 4.1,
      "crossingSide": 3,
      "srsScore": 10.7,
      "decimalStar": 3.8,
      "alongFactor": 1,
      "crossingMainFactor": 1.5185,
      "crossingSideFactor": 1.5
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "speed_limit": {
    "20": {
      "along": 0.5,
      "crossingMain": 0.4,
      "crossingSide": 0.3,
      "srsScore": 1.3,
      "decimalStar": 5.5,
      "alongFactor": 0.1429,
      "crossingMainFactor": 0.1481,
      "crossingSideFactor": 0.15
    },
    "30": {
      "along": 1.4,
      "crossingMain": 1.1,
      "crossingSide": 0.8,
      "srsScore": 3.4,
      "decimalStar": 4.9,
      "alongFactor": 0.4,
      "crossingMainFactor": 0.4074,
      "crossingSideFactor": 0.4
    },
    "40": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "50": {
      "along": 7.1,
      "crossingMain": 11.3,
      "crossingSide": 4,
      "srsScore": 22.6,
      "decimalStar": 3,
      "alongFactor": 2.0286,
      "crossingMainFactor": 4.1852,
      "crossingSideFactor": 2
    },
    "60": {
      "along": 11.4,
      "crossingMain": 18.1,
      "crossingSide": 6.5,
      "srsScore": 36,
      "decimalStar": 2.5,
      "alongFactor": 3.2571,
      "crossingMainFactor": 6.7037,
      "crossingSideFactor": 3.25
    },
    "70": {
      "along": 14.5,
      "crossingMain": 23,
      "crossingSide": 8.3,
      "srsScore": 45.9,
      "decimalStar": 2.2,
      "alongFactor": 4.1429,
      "crossingMainFactor": 8.5185,
      "crossingSideFactor": 4.15
    },
    "80": {
      "along": 16.1,
      "crossingMain": 38.4,
      "crossingSide": 27.6,
      "srsScore": 82.2,
      "decimalStar": 1.8,
      "alongFactor": 4.6,
      "crossingMainFactor": 14.2222,
      "crossingSideFactor": 13.8
    }
  },
  "operating_speed_85th_percentile": {
    "20": {
      "along": 2.3,
      "crossingMain": 1.8,
      "crossingSide": 1.3,
      "srsScore": 5.4,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "30": {
      "along": 2.3,
      "crossingMain": 1.8,
      "crossingSide": 1.3,
      "srsScore": 5.4,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "40": {
      "along": 2.3,
      "crossingMain": 1.8,
      "crossingSide": 1.3,
      "srsScore": 5.4,
      "decimalStar": 4.5,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "45": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.5217,
      "crossingMainFactor": 1.5,
      "crossingSideFactor": 1.5385
    },
    "50": {
      "along": 5.1,
      "crossingMain": 4,
      "crossingSide": 2.9,
      "srsScore": 12.2,
      "decimalStar": 3.7,
      "alongFactor": 2.2174,
      "crossingMainFactor": 2.2222,
      "crossingSideFactor": 2.2308
    },
    "60": {
      "along": 9.3,
      "crossingMain": 14.8,
      "crossingSide": 5.3,
      "srsScore": 29.4,
      "decimalStar": 2.8,
      "alongFactor": 4.0435,
      "crossingMainFactor": 8.2222,
      "crossingSideFactor": 4.0769
    },
    "70": {
      "along": 13.1,
      "crossingMain": 20.9,
      "crossingSide": 7.5,
      "srsScore": 41.6,
      "decimalStar": 2.4,
      "alongFactor": 5.6957,
      "crossingMainFactor": 11.6111,
      "crossingSideFactor": 5.7692
    },
    "80": {
      "along": 15.4,
      "crossingMain": 24.5,
      "crossingSide": 8.8,
      "srsScore": 48.9,
      "decimalStar": 2.1,
      "alongFactor": 6.6957,
      "crossingMainFactor": 13.6111,
      "crossingSideFactor": 6.7692
    }
  },
  "speed_management_traffic_calming": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.25,
      "crossingMainFactor": 1.2273,
      "crossingSideFactor": 1.25
    },
    "2": {
      "along": 2.8,
      "crossingMain": 2.2,
      "crossingSide": 1.6,
      "srsScore": 6.6,
      "decimalStar": 4.3,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "motorcycle_percent": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.5,
      "crossingMain": 2.9,
      "crossingSide": 2,
      "srsScore": 8.4,
      "decimalStar": 4,
      "alongFactor": 1,
      "crossingMainFactor": 1.0741,
      "crossingSideFactor": 1
    }
  },
  "hgv_percent": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 3,
      "crossingSide": 2,
      "srsScore": 8.6,
      "decimalStar": 4,
      "alongFactor": 1,
      "crossingMainFactor": 1.1111,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.5,
      "crossingMain": 3.3,
      "crossingSide": 2,
      "srsScore": 8.9,
      "decimalStar": 4,
      "alongFactor": 1,
      "crossingMainFactor": 1.2222,
      "crossingSideFactor": 1
    },
    "5": {
      "along": 3.5,
      "crossingMain": 3.6,
      "crossingSide": 2,
      "srsScore": 9.1,
      "decimalStar": 3.9,
      "alongFactor": 1,
      "crossingMainFactor": 1.3333,
      "crossingSideFactor": 1
    }
  },
  "land_use_driver_side": {
    "1": {
      "along": 3.3,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.2,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.3,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.2,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0606,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0606,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "5": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0606,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "6": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0606,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "land_use_passenger_side": {
    "1": {
      "along": 3.3,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.2,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.3,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.2,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0606,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0606,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "5": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0606,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "6": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1.0606,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "area_type": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "intersection_type": {
    "1": {
      "along": 3.5,
      "crossingMain": 3.4,
      "crossingSide": 2.5,
      "srsScore": 9.5,
      "decimalStar": 3.9,
      "alongFactor": 1,
      "crossingMainFactor": 1.36,
      "crossingSideFactor": 1.3889
    },
    "2": {
      "along": 3.5,
      "crossingMain": 3.4,
      "crossingSide": 2.5,
      "srsScore": 9.5,
      "decimalStar": 3.9,
      "alongFactor": 1,
      "crossingMainFactor": 1.36,
      "crossingSideFactor": 1.3889
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1.08,
      "crossingSideFactor": 1.1111
    },
    "4": {
      "along": 3.5,
      "crossingMain": 2.5,
      "crossingSide": 1.8,
      "srsScore": 7.9,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "5": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1.08,
      "crossingSideFactor": 1.1111
    },
    "6": {
      "along": 3.5,
      "crossingMain": 2.5,
      "crossingSide": 1.8,
      "srsScore": 7.9,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "7": {
      "along": 3.5,
      "crossingMain": 3,
      "crossingSide": 2.1,
      "srsScore": 8.7,
      "decimalStar": 4,
      "alongFactor": 1,
      "crossingMainFactor": 1.2,
      "crossingSideFactor": 1.1667
    },
    "8": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1.08,
      "crossingSideFactor": 1.1111
    }
  },
  "property_access_points": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.4,
      "decimalStar": 4,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.4,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.2,
      "decimalStar": 4.1,
      "alongFactor": 0.9714,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 3.2,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8,
      "decimalStar": 4.1,
      "alongFactor": 0.9143,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "intersection_quality": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 3.5,
      "crossingMain": 3.3,
      "crossingSide": 2.4,
      "srsScore": 9.3,
      "decimalStar": 3.9,
      "alongFactor": 1,
      "crossingMainFactor": 1.2222,
      "crossingSideFactor": 1.2
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "curvature": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 6.3,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 11.1,
      "decimalStar": 3.8,
      "alongFactor": 1.8,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 12.3,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 17.1,
      "decimalStar": 3.4,
      "alongFactor": 3.5143,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "4": {
      "along": 21.1,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 25.9,
      "decimalStar": 2.9,
      "alongFactor": 6.0286,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  },
  "quality_of_curve": {
    "1": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "2": {
      "along": 4.4,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 9.2,
      "decimalStar": 3.9,
      "alongFactor": 1.2571,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    },
    "3": {
      "along": 3.5,
      "crossingMain": 2.7,
      "crossingSide": 2,
      "srsScore": 8.3,
      "decimalStar": 4.1,
      "alongFactor": 1,
      "crossingMainFactor": 1,
      "crossingSideFactor": 1
    }
  }
};
