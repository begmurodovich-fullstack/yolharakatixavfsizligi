/**
 * Mijoz taqdim etgan vazifa2.xlsx etalon jadvallari bo'yicha farqlar (Deltalar) bazasi.
 * Har bir mezon bo'yicha:
 *  - diffBoylama: Boylama farqi (manfiy bo'lsa biznikidan ortiqcha, ayirilishi kerak)
 *  - diffAsosiy: Asosiy farqi (musbat bo'lsa biznikida kam, qo'shilishi kerak)
 *  - diffYon: Yon farqi
 */

export interface Vazifa2DeltaItem {
  code: number;
  optionId: string;
  name: string;
  diffBoylama: number;
  diffAsosiy: number;
  diffYon: number;
}

export const SR4S_VAZIFA2_DELTAS: Record<string, Record<string, Vazifa2DeltaItem>> = {
  "land_use_left": {
    "1": {
      "code": 1,
      "optionId": "undeveloped",
      "name": "Bo`sh yer,ochiq maydon",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "residential",
      "name": "Aholi punkiti (turar joy )",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "commercial",
      "name": "Tijorat /savdo",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "4": {
      "code": 4,
      "optionId": "industrial",
      "name": "Sanoat korxonasi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "5": {
      "code": 5,
      "optionId": "farming",
      "name": "Qishloq xo`jaligi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "6": {
      "code": 6,
      "optionId": "school",
      "name": "Maktab/ talim hududi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "undeveloped": {
      "code": 1,
      "optionId": "undeveloped",
      "name": "Bo`sh yer,ochiq maydon",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "residential": {
      "code": 2,
      "optionId": "residential",
      "name": "Aholi punkiti (turar joy )",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "commercial": {
      "code": 3,
      "optionId": "commercial",
      "name": "Tijorat /savdo",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "industrial": {
      "code": 4,
      "optionId": "industrial",
      "name": "Sanoat korxonasi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "farming": {
      "code": 5,
      "optionId": "farming",
      "name": "Qishloq xo`jaligi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "school": {
      "code": 6,
      "optionId": "school",
      "name": "Maktab/ talim hududi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    }
  },
  "land_use_right": {
    "1": {
      "code": 1,
      "optionId": "undeveloped",
      "name": "Bo`sh yer,ochiq maydon",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "residential",
      "name": "Aholi punkiti (turar joy )",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "commercial",
      "name": "Tijorat /savdo",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "4": {
      "code": 4,
      "optionId": "industrial",
      "name": "Sanoat korxonasi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "5": {
      "code": 5,
      "optionId": "farming",
      "name": "Qishloq xo`jaligi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "6": {
      "code": 6,
      "optionId": "school",
      "name": "Maktab/ talim hududi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "undeveloped": {
      "code": 1,
      "optionId": "undeveloped",
      "name": "Bo`sh yer,ochiq maydon",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "residential": {
      "code": 2,
      "optionId": "residential",
      "name": "Aholi punkiti (turar joy )",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "commercial": {
      "code": 3,
      "optionId": "commercial",
      "name": "Tijorat /savdo",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "industrial": {
      "code": 4,
      "optionId": "industrial",
      "name": "Sanoat korxonasi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "farming": {
      "code": 5,
      "optionId": "farming",
      "name": "Qishloq xo`jaligi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "school": {
      "code": 6,
      "optionId": "school",
      "name": "Maktab/ talim hududi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    }
  },
  "area_type": {
    "1": {
      "code": 1,
      "optionId": "rural",
      "name": "Qishloq /ochiq hudud",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "urban",
      "name": "Shahar hudud",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "rural": {
      "code": 1,
      "optionId": "rural",
      "name": "Qishloq /ochiq hudud",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "urban": {
      "code": 2,
      "optionId": "urban",
      "name": "Shahar hudud",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    }
  },
  "vehicle_parking": {
    "1": {
      "code": 1,
      "optionId": "none",
      "name": "toxtash joyi yoq",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "one_side",
      "name": "bir tomonlama bor",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "two_side",
      "name": "ikki tomonlama bor",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "none": {
      "code": 1,
      "optionId": "none",
      "name": "toxtash joyi yoq",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "one_side": {
      "code": 2,
      "optionId": "one_side",
      "name": "bir tomonlama bor",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "two_side": {
      "code": 3,
      "optionId": "two_side",
      "name": "ikki tomonlama bor",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    }
  },
  "sight_distance": {
    "1": {
      "code": 1,
      "optionId": "adequate",
      "name": "yetarli ko`rish masofasi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "poor",
      "name": "yetarli emas/cheklangan",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "adequate": {
      "code": 1,
      "optionId": "adequate",
      "name": "yetarli ko`rish masofasi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "poor": {
      "code": 2,
      "optionId": "poor",
      "name": "yetarli emas/cheklangan",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    }
  },
  "number_of_lanes": {
    "1": {
      "code": 1,
      "optionId": "1_1",
      "name": "1&amp;1",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "2_1",
      "name": "2&amp;1",
      "diffBoylama": 0,
      "diffAsosiy": -0.1,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "2_2",
      "name": "2&amp;2",
      "diffBoylama": 0,
      "diffAsosiy": -0.1,
      "diffYon": 0
    },
    "4": {
      "code": 4,
      "optionId": "3_2",
      "name": "3&amp;2",
      "diffBoylama": 0,
      "diffAsosiy": -0.2,
      "diffYon": 0
    },
    "5": {
      "code": 5,
      "optionId": "3_3",
      "name": "3&amp;3",
      "diffBoylama": 0,
      "diffAsosiy": -0.1,
      "diffYon": 0
    },
    "6": {
      "code": 6,
      "optionId": "4_4",
      "name": "4&amp;4",
      "diffBoylama": 0,
      "diffAsosiy": -0.1,
      "diffYon": 0
    },
    "1_1": {
      "code": 1,
      "optionId": "1_1",
      "name": "1&amp;1",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2_1": {
      "code": 2,
      "optionId": "2_1",
      "name": "2&amp;1",
      "diffBoylama": 0,
      "diffAsosiy": -0.1,
      "diffYon": 0
    },
    "2_2": {
      "code": 3,
      "optionId": "2_2",
      "name": "2&amp;2",
      "diffBoylama": 0,
      "diffAsosiy": -0.1,
      "diffYon": 0
    },
    "3_2": {
      "code": 4,
      "optionId": "3_2",
      "name": "3&amp;2",
      "diffBoylama": 0,
      "diffAsosiy": -0.2,
      "diffYon": 0
    },
    "3_3": {
      "code": 5,
      "optionId": "3_3",
      "name": "3&amp;3",
      "diffBoylama": 0,
      "diffAsosiy": -0.1,
      "diffYon": 0
    },
    "4_4": {
      "code": 6,
      "optionId": "4_4",
      "name": "4&amp;4",
      "diffBoylama": 0,
      "diffAsosiy": -0.1,
      "diffYon": 0
    }
  },
  "lane_width": {
    "1": {
      "code": 1,
      "optionId": "wide",
      "name": "Keng qator",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "medium",
      "name": "O`rta qator",
      "diffBoylama": 0,
      "diffAsosiy": -0.2,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "narrow",
      "name": "tor qator",
      "diffBoylama": 0,
      "diffAsosiy": -0.1,
      "diffYon": 0
    },
    "wide": {
      "code": 1,
      "optionId": "wide",
      "name": "Keng qator",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "medium": {
      "code": 2,
      "optionId": "medium",
      "name": "O`rta qator",
      "diffBoylama": 0,
      "diffAsosiy": -0.2,
      "diffYon": 0
    },
    "narrow": {
      "code": 3,
      "optionId": "narrow",
      "name": "tor qator",
      "diffBoylama": 0,
      "diffAsosiy": -0.1,
      "diffYon": 0
    }
  },
  "shoulder_rumble_strips": {
    "1": {
      "code": 1,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -0.1,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "present": {
      "code": 1,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -0.1,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "not_present": {
      "code": 2,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    }
  },
  "road_condition": {
    "1": {
      "code": 1,
      "optionId": "good",
      "name": "yaxshi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "medium",
      "name": "o`rtacha",
      "diffBoylama": -0.1,
      "diffAsosiy": -0.2,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "poor",
      "name": "yomon",
      "diffBoylama": 0,
      "diffAsosiy": -0.2,
      "diffYon": 0
    },
    "good": {
      "code": 1,
      "optionId": "good",
      "name": "yaxshi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "medium": {
      "code": 2,
      "optionId": "medium",
      "name": "o`rtacha",
      "diffBoylama": -0.1,
      "diffAsosiy": -0.2,
      "diffYon": 0
    },
    "poor": {
      "code": 3,
      "optionId": "poor",
      "name": "yomon",
      "diffBoylama": 0,
      "diffAsosiy": -0.2,
      "diffYon": 0
    }
  },
  "grip": {
    "1": {
      "code": 1,
      "optionId": "good",
      "name": "yaxshi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "medium",
      "name": "o`rtacha",
      "diffBoylama": 0,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    },
    "3": {
      "code": 3,
      "optionId": "poor",
      "name": "yomon",
      "diffBoylama": 0,
      "diffAsosiy": -0.5,
      "diffYon": 0.1
    },
    "good": {
      "code": 1,
      "optionId": "good",
      "name": "yaxshi",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "medium": {
      "code": 2,
      "optionId": "medium",
      "name": "o`rtacha",
      "diffBoylama": 0,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    },
    "poor": {
      "code": 3,
      "optionId": "poor",
      "name": "yomon",
      "diffBoylama": 0,
      "diffAsosiy": -0.5,
      "diffYon": 0.1
    }
  },
  "grade": {
    "1": {
      "code": 1,
      "optionId": "grade_low",
      "name": "nishablik 0 dan 7,5% gacha",
      "diffBoylama": 0,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    },
    "2": {
      "code": 2,
      "optionId": "grade_medium",
      "name": "nishablik 7,5%  dan 10% gacha",
      "diffBoylama": -0.1,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    },
    "3": {
      "code": 3,
      "optionId": "grade_high",
      "name": "nishablik 10 %dan  yuqori",
      "diffBoylama": -0.1,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    },
    "grade_low": {
      "code": 1,
      "optionId": "grade_low",
      "name": "nishablik 0 dan 7,5% gacha",
      "diffBoylama": 0,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    },
    "grade_medium": {
      "code": 2,
      "optionId": "grade_medium",
      "name": "nishablik 7,5%  dan 10% gacha",
      "diffBoylama": -0.1,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    },
    "grade_high": {
      "code": 3,
      "optionId": "grade_high",
      "name": "nishablik 10 %dan  yuqori",
      "diffBoylama": -0.1,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    }
  },
  "carriageway_type": {
    "1": {
      "code": 1,
      "optionId": "divided_north_east",
      "name": "Shimol/ sharq  bo`lingan",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "divided_south_west",
      "name": "Janub /g`arb  bo`lingan",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "undivided",
      "name": "bo`linmagan",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "divided_north_east": {
      "code": 1,
      "optionId": "divided_north_east",
      "name": "Shimol/ sharq  bo`lingan",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "divided_south_west": {
      "code": 2,
      "optionId": "divided_south_west",
      "name": "Janub /g`arb  bo`lingan",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "undivided": {
      "code": 3,
      "optionId": "undivided",
      "name": "bo`linmagan",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    }
  },
  "middle_of_road": {
    "1": {
      "code": 1,
      "optionId": "center_line",
      "name": "o`q chiziq",
      "diffBoylama": 0.2,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "2": {
      "code": 2,
      "optionId": "wide_line",
      "name": "keng chiziq&lt;1 m",
      "diffBoylama": -0.3,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "3": {
      "code": 3,
      "optionId": "hatching",
      "name": "shtrixli orolcha&gt;1m",
      "diffBoylama": -0.3,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "4": {
      "code": 4,
      "optionId": "turn_lane",
      "name": "burilish qatori",
      "diffBoylama": -0.3,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "5": {
      "code": 5,
      "optionId": "flexible_posts",
      "name": "moslashuvchan ustunchalar",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "6": {
      "code": 6,
      "optionId": "separated_0_1",
      "name": "ajratilgan 0-1 m",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "7": {
      "code": 7,
      "optionId": "separated_1_5",
      "name": "ajratilgan 1-5 m",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "8": {
      "code": 8,
      "optionId": "separated_5_10",
      "name": "ajratilgan 5-10",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "9": {
      "code": 9,
      "optionId": "separated_10_20",
      "name": "ajratilgan 10-20 m",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "10": {
      "code": 10,
      "optionId": "separated_20_plus",
      "name": "ajratilgan 20m +",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "11": {
      "code": 11,
      "optionId": "metal_barrier",
      "name": "metal to`siq",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "12": {
      "code": 12,
      "optionId": "concrete_barrier",
      "name": "beton to`siq",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "13": {
      "code": 13,
      "optionId": "wire_barrier",
      "name": "simli to`siq",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "14": {
      "code": 14,
      "optionId": "motorcycle_barrier",
      "name": "motosikl xavfsizlik to`sigì",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "15": {
      "code": 15,
      "optionId": "one_way",
      "name": "bir tomonlama harakat",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    },
    "16": {
      "code": 16,
      "optionId": "broken_wide_markings",
      "name": "keng uzuq chiziqli orolcha(.0,6m)",
      "diffBoylama": -3,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "center_line": {
      "code": 1,
      "optionId": "center_line",
      "name": "o`q chiziq",
      "diffBoylama": 0.2,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "wide_line": {
      "code": 2,
      "optionId": "wide_line",
      "name": "keng chiziq&lt;1 m",
      "diffBoylama": -0.3,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "hatching": {
      "code": 3,
      "optionId": "hatching",
      "name": "shtrixli orolcha&gt;1m",
      "diffBoylama": -0.3,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "turn_lane": {
      "code": 4,
      "optionId": "turn_lane",
      "name": "burilish qatori",
      "diffBoylama": -0.3,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "flexible_posts": {
      "code": 5,
      "optionId": "flexible_posts",
      "name": "moslashuvchan ustunchalar",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "separated_0_1": {
      "code": 6,
      "optionId": "separated_0_1",
      "name": "ajratilgan 0-1 m",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "separated_1_5": {
      "code": 7,
      "optionId": "separated_1_5",
      "name": "ajratilgan 1-5 m",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "separated_5_10": {
      "code": 8,
      "optionId": "separated_5_10",
      "name": "ajratilgan 5-10",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "separated_10_20": {
      "code": 9,
      "optionId": "separated_10_20",
      "name": "ajratilgan 10-20 m",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "separated_20_plus": {
      "code": 10,
      "optionId": "separated_20_plus",
      "name": "ajratilgan 20m +",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "metal_barrier": {
      "code": 11,
      "optionId": "metal_barrier",
      "name": "metal to`siq",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "concrete_barrier": {
      "code": 12,
      "optionId": "concrete_barrier",
      "name": "beton to`siq",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "wire_barrier": {
      "code": 13,
      "optionId": "wire_barrier",
      "name": "simli to`siq",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "motorcycle_barrier": {
      "code": 14,
      "optionId": "motorcycle_barrier",
      "name": "motosikl xavfsizlik to`sigì",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    },
    "one_way": {
      "code": 15,
      "optionId": "one_way",
      "name": "bir tomonlama harakat",
      "diffBoylama": -2.6,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    },
    "broken_wide_markings": {
      "code": 16,
      "optionId": "broken_wide_markings",
      "name": "keng uzuq chiziqli orolcha(.0,6m)",
      "diffBoylama": -3,
      "diffAsosiy": -0.8,
      "diffYon": 0.2
    }
  },
  "lines_and_signs": {
    "1": {
      "code": 1,
      "optionId": "adequate",
      "name": "yetarli va aniq",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "poor",
      "name": "yetarli emas/o`chgan",
      "diffBoylama": -3.3,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    },
    "adequate": {
      "code": 1,
      "optionId": "adequate",
      "name": "yetarli va aniq",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "poor": {
      "code": 2,
      "optionId": "poor",
      "name": "yetarli emas/o`chgan",
      "diffBoylama": -3.3,
      "diffAsosiy": -0.3,
      "diffYon": 0.2
    }
  },
  "street_lighting": {
    "1": {
      "code": 1,
      "optionId": "present",
      "name": "mavjud va yorug`",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "not_present",
      "name": "mavjud emas /qorong`u",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "present": {
      "code": 1,
      "optionId": "present",
      "name": "mavjud va yorug`",
      "diffBoylama": 0,
      "diffAsosiy": 0,
      "diffYon": 0
    },
    "not_present": {
      "code": 2,
      "optionId": "not_present",
      "name": "mavjud emas /qorong`u",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    }
  },
  "school_warning": {
    "1": {
      "code": 1,
      "optionId": "flashing_beacons",
      "name": "miltillovchi chiziq",
      "diffBoylama": -4.1,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "2": {
      "code": 2,
      "optionId": "signs_markings",
      "name": "belgilar va chiziqlar",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "3": {
      "code": 3,
      "optionId": "no_school_zone",
      "name": "maktab zonasi belgisi yoq",
      "diffBoylama": -4.7,
      "diffAsosiy": -0.5,
      "diffYon": 0.4
    },
    "4": {
      "code": 4,
      "optionId": "no_school_nearby",
      "name": "yaqin atrofda maktab yoq",
      "diffBoylama": -4.7,
      "diffAsosiy": -0.5,
      "diffYon": 0.4
    },
    "flashing_beacons": {
      "code": 1,
      "optionId": "flashing_beacons",
      "name": "miltillovchi chiziq",
      "diffBoylama": -4.1,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "signs_markings": {
      "code": 2,
      "optionId": "signs_markings",
      "name": "belgilar va chiziqlar",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "no_school_zone": {
      "code": 3,
      "optionId": "no_school_zone",
      "name": "maktab zonasi belgisi yoq",
      "diffBoylama": -4.7,
      "diffAsosiy": -0.5,
      "diffYon": 0.4
    },
    "no_school_nearby": {
      "code": 4,
      "optionId": "no_school_nearby",
      "name": "yaqin atrofda maktab yoq",
      "diffBoylama": -4.7,
      "diffAsosiy": -0.5,
      "diffYon": 0.4
    }
  },
  "crossing_supervisor": {
    "1": {
      "code": 1,
      "optionId": "supervisor",
      "name": "nazoratchi/patrol bor",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.1,
      "diffYon": 0.4
    },
    "2": {
      "code": 2,
      "optionId": "no_supervisor",
      "name": "nazoratchi yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "3": {
      "code": 3,
      "optionId": "no_school_nearby",
      "name": "yaqin atrofda maktab yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "supervisor": {
      "code": 1,
      "optionId": "supervisor",
      "name": "nazoratchi/patrol bor",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.1,
      "diffYon": 0.4
    },
    "no_supervisor": {
      "code": 2,
      "optionId": "no_supervisor",
      "name": "nazoratchi yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "no_school_nearby": {
      "code": 3,
      "optionId": "no_school_nearby",
      "name": "yaqin atrofda maktab yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    }
  },
  "sidewalk_left": {
    "1": {
      "code": 1,
      "optionId": "none",
      "name": "trotuar yo`q",
      "diffBoylama": -21,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "2": {
      "code": 2,
      "optionId": "0_1m",
      "name": "0 dan 1 m gacha",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "3": {
      "code": 3,
      "optionId": "1_3m",
      "name": "1 dan 3 m gacha",
      "diffBoylama": -3.7,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "4": {
      "code": 4,
      "optionId": "gt_3m",
      "name": "3 m dan uzoqroq",
      "diffBoylama": -3,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "5": {
      "code": 5,
      "optionId": "barrier",
      "name": "to`siq orqasida",
      "diffBoylama": -2.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "6": {
      "code": 6,
      "optionId": "poor",
      "name": "yomon/tuproq yo`l",
      "diffBoylama": -6.7,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "7": {
      "code": 7,
      "optionId": "moderate",
      "name": "o`rtacha yo`lak",
      "diffBoylama": -7.1,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "8": {
      "code": 8,
      "optionId": "shared",
      "name": "umumiy velopiyoda yo`lak",
      "diffBoylama": -7.1,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "none": {
      "code": 1,
      "optionId": "none",
      "name": "trotuar yo`q",
      "diffBoylama": -21,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "0_1m": {
      "code": 2,
      "optionId": "0_1m",
      "name": "0 dan 1 m gacha",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "1_3m": {
      "code": 3,
      "optionId": "1_3m",
      "name": "1 dan 3 m gacha",
      "diffBoylama": -3.7,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "gt_3m": {
      "code": 4,
      "optionId": "gt_3m",
      "name": "3 m dan uzoqroq",
      "diffBoylama": -3,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "barrier": {
      "code": 5,
      "optionId": "barrier",
      "name": "to`siq orqasida",
      "diffBoylama": -2.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "poor": {
      "code": 6,
      "optionId": "poor",
      "name": "yomon/tuproq yo`l",
      "diffBoylama": -6.7,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "moderate": {
      "code": 7,
      "optionId": "moderate",
      "name": "o`rtacha yo`lak",
      "diffBoylama": -7.1,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "shared": {
      "code": 8,
      "optionId": "shared",
      "name": "umumiy velopiyoda yo`lak",
      "diffBoylama": -7.1,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    }
  },
  "sidewalk_right": {
    "1": {
      "code": 1,
      "optionId": "none",
      "name": "trotuar yo`q",
      "diffBoylama": -21,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "2": {
      "code": 2,
      "optionId": "0_1m",
      "name": "0 dan 1 m gacha",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "3": {
      "code": 3,
      "optionId": "1_3m",
      "name": "1 dan 3 m gacha",
      "diffBoylama": -3.7,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "4": {
      "code": 4,
      "optionId": "gt_3m",
      "name": "3 m dan uzoqroq",
      "diffBoylama": -3,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "5": {
      "code": 5,
      "optionId": "barrier",
      "name": "to`siq orqasida",
      "diffBoylama": -2.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "6": {
      "code": 6,
      "optionId": "poor",
      "name": "yomon/tuproq yo`l",
      "diffBoylama": -6.7,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "7": {
      "code": 7,
      "optionId": "moderate",
      "name": "o`rtacha yo`lak",
      "diffBoylama": -7.1,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "8": {
      "code": 8,
      "optionId": "shared",
      "name": "umumiy velopiyoda yo`lak",
      "diffBoylama": -7.1,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "none": {
      "code": 1,
      "optionId": "none",
      "name": "trotuar yo`q",
      "diffBoylama": -21,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "0_1m": {
      "code": 2,
      "optionId": "0_1m",
      "name": "0 dan 1 m gacha",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "1_3m": {
      "code": 3,
      "optionId": "1_3m",
      "name": "1 dan 3 m gacha",
      "diffBoylama": -3.7,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "gt_3m": {
      "code": 4,
      "optionId": "gt_3m",
      "name": "3 m dan uzoqroq",
      "diffBoylama": -3,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "barrier": {
      "code": 5,
      "optionId": "barrier",
      "name": "to`siq orqasida",
      "diffBoylama": -2.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "poor": {
      "code": 6,
      "optionId": "poor",
      "name": "yomon/tuproq yo`l",
      "diffBoylama": -6.7,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "moderate": {
      "code": 7,
      "optionId": "moderate",
      "name": "o`rtacha yo`lak",
      "diffBoylama": -7.1,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "shared": {
      "code": 8,
      "optionId": "shared",
      "name": "umumiy velopiyoda yo`lak",
      "diffBoylama": -7.1,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    }
  },
  "road_edge_left": {
    "1": {
      "code": 1,
      "optionId": "none",
      "name": "yelka yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "2": {
      "code": 2,
      "optionId": "0_1m",
      "name": "0 dan 1 m gacha",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "3": {
      "code": 3,
      "optionId": "1_2_4m",
      "name": "1 dan 2,4 m gacha",
      "diffBoylama": -4.6,
      "diffAsosiy": -0.5,
      "diffYon": 0.3
    },
    "4": {
      "code": 4,
      "optionId": "gt_2_4m",
      "name": "2,4 m dan ortiq",
      "diffBoylama": -4.1,
      "diffAsosiy": -0.5,
      "diffYon": 0.3
    },
    "none": {
      "code": 1,
      "optionId": "none",
      "name": "yelka yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "0_1m": {
      "code": 2,
      "optionId": "0_1m",
      "name": "0 dan 1 m gacha",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "1_2_4m": {
      "code": 3,
      "optionId": "1_2_4m",
      "name": "1 dan 2,4 m gacha",
      "diffBoylama": -4.6,
      "diffAsosiy": -0.5,
      "diffYon": 0.3
    },
    "gt_2_4m": {
      "code": 4,
      "optionId": "gt_2_4m",
      "name": "2,4 m dan ortiq",
      "diffBoylama": -4.1,
      "diffAsosiy": -0.5,
      "diffYon": 0.3
    }
  },
  "road_edge_right": {
    "1": {
      "code": 1,
      "optionId": "none",
      "name": "yelka yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "2": {
      "code": 2,
      "optionId": "0_1m",
      "name": "0 dan 1 m gacha",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "3": {
      "code": 3,
      "optionId": "1_2_4m",
      "name": "1 dan 2,4 m gacha",
      "diffBoylama": -4.6,
      "diffAsosiy": -0.5,
      "diffYon": 0.3
    },
    "4": {
      "code": 4,
      "optionId": "gt_2_4m",
      "name": "2,4 m dan ortiq",
      "diffBoylama": -4.1,
      "diffAsosiy": -0.5,
      "diffYon": 0.3
    },
    "none": {
      "code": 1,
      "optionId": "none",
      "name": "yelka yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "0_1m": {
      "code": 2,
      "optionId": "0_1m",
      "name": "0 dan 1 m gacha",
      "diffBoylama": -4.4,
      "diffAsosiy": -0.4,
      "diffYon": 0.3
    },
    "1_2_4m": {
      "code": 3,
      "optionId": "1_2_4m",
      "name": "1 dan 2,4 m gacha",
      "diffBoylama": -4.6,
      "diffAsosiy": -0.5,
      "diffYon": 0.3
    },
    "gt_2_4m": {
      "code": 4,
      "optionId": "gt_2_4m",
      "name": "2,4 m dan ortiq",
      "diffBoylama": -4.1,
      "diffAsosiy": -0.5,
      "diffYon": 0.3
    }
  },
  "pedestrian_channelisation": {
    "1": {
      "code": 1,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "2": {
      "code": 2,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": -4.4,
      "diffAsosiy": -1.3,
      "diffYon": -0.1
    },
    "present": {
      "code": 1,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "not_present": {
      "code": 2,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": -4.4,
      "diffAsosiy": -1.3,
      "diffYon": -0.1
    }
  },
  "crossing_main_road": {
    "1": {
      "code": 1,
      "optionId": "none",
      "name": "o`tish joyi yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "2": {
      "code": 2,
      "optionId": "lights",
      "name": "svetaforli",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.4,
      "diffYon": 0.8
    },
    "3": {
      "code": 3,
      "optionId": "raised",
      "name": "ko`tarilgan",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "4": {
      "code": 4,
      "optionId": "bridge_tunnel",
      "name": "ko`prik/tunnel",
      "diffBoylama": -4.4,
      "diffAsosiy": -7.3,
      "diffYon": 0.8
    },
    "5": {
      "code": 5,
      "optionId": "marked",
      "name": "chizilgan (zebra )",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "6": {
      "code": 6,
      "optionId": "unmarked",
      "name": "belgilanmagan",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "7": {
      "code": 7,
      "optionId": "refuge",
      "name": "xavfsizlik orolchali",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "8": {
      "code": 8,
      "optionId": "lights_refuge",
      "name": "svetafor orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.4,
      "diffYon": 0.8
    },
    "9": {
      "code": 9,
      "optionId": "marked_refuge",
      "name": "zebra orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "10": {
      "code": 10,
      "optionId": "raised_marked",
      "name": "ko`tarilgan +zebra",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "11": {
      "code": 11,
      "optionId": "raised_refuge",
      "name": "ko`tarilgan+orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "12": {
      "code": 12,
      "optionId": "raised_marked_refuge",
      "name": "ko`tarilga,zebra va orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "none": {
      "code": 1,
      "optionId": "none",
      "name": "o`tish joyi yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "lights": {
      "code": 2,
      "optionId": "lights",
      "name": "svetaforli",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.4,
      "diffYon": 0.8
    },
    "raised": {
      "code": 3,
      "optionId": "raised",
      "name": "ko`tarilgan",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "bridge_tunnel": {
      "code": 4,
      "optionId": "bridge_tunnel",
      "name": "ko`prik/tunnel",
      "diffBoylama": -4.4,
      "diffAsosiy": -7.3,
      "diffYon": 0.8
    },
    "marked": {
      "code": 5,
      "optionId": "marked",
      "name": "chizilgan (zebra )",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "unmarked": {
      "code": 6,
      "optionId": "unmarked",
      "name": "belgilanmagan",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "refuge": {
      "code": 7,
      "optionId": "refuge",
      "name": "xavfsizlik orolchali",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "lights_refuge": {
      "code": 8,
      "optionId": "lights_refuge",
      "name": "svetafor orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.4,
      "diffYon": 0.8
    },
    "marked_refuge": {
      "code": 9,
      "optionId": "marked_refuge",
      "name": "zebra orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "raised_marked": {
      "code": 10,
      "optionId": "raised_marked",
      "name": "ko`tarilgan +zebra",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "raised_refuge": {
      "code": 11,
      "optionId": "raised_refuge",
      "name": "ko`tarilgan+orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    },
    "raised_marked_refuge": {
      "code": 12,
      "optionId": "raised_marked_refuge",
      "name": "ko`tarilga,zebra va orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.5,
      "diffYon": 0.8
    }
  },
  "crossing_side_road": {
    "1": {
      "code": 1,
      "optionId": "none",
      "name": "o`tish joyi yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 36.7
    },
    "2": {
      "code": 2,
      "optionId": "lights",
      "name": "svetaforli",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "3": {
      "code": 3,
      "optionId": "raised",
      "name": "ko`tarilgan",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 4.9
    },
    "4": {
      "code": 4,
      "optionId": "bridge_tunnel",
      "name": "ko`prik/tunnel",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.1
    },
    "5": {
      "code": 5,
      "optionId": "marked",
      "name": "chizilgan (zebra )",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 5.3
    },
    "6": {
      "code": 6,
      "optionId": "unmarked",
      "name": "belgilanmagan",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 8.2
    },
    "7": {
      "code": 7,
      "optionId": "refuge",
      "name": "xavfsizlik orolchali",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 4.1
    },
    "8": {
      "code": 8,
      "optionId": "lights_refuge",
      "name": "svetafor orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.3
    },
    "9": {
      "code": 9,
      "optionId": "marked_refuge",
      "name": "zebra orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 2.8
    },
    "10": {
      "code": 10,
      "optionId": "raised_marked",
      "name": "ko`tarilgan +zebra",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 3.2
    },
    "11": {
      "code": 11,
      "optionId": "raised_refuge",
      "name": "ko`tarilgan+orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 2.5
    },
    "12": {
      "code": 12,
      "optionId": "raised_marked_refuge",
      "name": "ko`tarilga,zebra va orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 1.7
    },
    "none": {
      "code": 1,
      "optionId": "none",
      "name": "o`tish joyi yoq",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 36.7
    },
    "lights": {
      "code": 2,
      "optionId": "lights",
      "name": "svetaforli",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "raised": {
      "code": 3,
      "optionId": "raised",
      "name": "ko`tarilgan",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 4.9
    },
    "bridge_tunnel": {
      "code": 4,
      "optionId": "bridge_tunnel",
      "name": "ko`prik/tunnel",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.1
    },
    "marked": {
      "code": 5,
      "optionId": "marked",
      "name": "chizilgan (zebra )",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 5.3
    },
    "unmarked": {
      "code": 6,
      "optionId": "unmarked",
      "name": "belgilanmagan",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 8.2
    },
    "refuge": {
      "code": 7,
      "optionId": "refuge",
      "name": "xavfsizlik orolchali",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 4.1
    },
    "lights_refuge": {
      "code": 8,
      "optionId": "lights_refuge",
      "name": "svetafor orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.3
    },
    "marked_refuge": {
      "code": 9,
      "optionId": "marked_refuge",
      "name": "zebra orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 2.8
    },
    "raised_marked": {
      "code": 10,
      "optionId": "raised_marked",
      "name": "ko`tarilgan +zebra",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 3.2
    },
    "raised_refuge": {
      "code": 11,
      "optionId": "raised_refuge",
      "name": "ko`tarilgan+orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 2.5
    },
    "raised_marked_refuge": {
      "code": 12,
      "optionId": "raised_marked_refuge",
      "name": "ko`tarilga,zebra va orolcha",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 1.7
    }
  },
  "crossing_quality": {
    "1": {
      "code": 1,
      "optionId": "adequate",
      "name": "talabga toliq javob beradi",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "2": {
      "code": 2,
      "optionId": "poor",
      "name": "yomon/yetarli emas",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 1.1
    },
    "3": {
      "code": 3,
      "optionId": "na",
      "name": "qo`llanilmaydi",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "adequate": {
      "code": 1,
      "optionId": "adequate",
      "name": "talabga toliq javob beradi",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "poor": {
      "code": 2,
      "optionId": "poor",
      "name": "yomon/yetarli emas",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 1.1
    },
    "na": {
      "code": 3,
      "optionId": "na",
      "name": "qo`llanilmaydi",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    }
  },
  "vehicles_per_day": {
    "1": {
      "code": 1,
      "optionId": "1",
      "name": "1dan 100",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "2": {
      "code": 2,
      "optionId": "2",
      "name": "100 dan 1999",
      "diffBoylama": -4.4,
      "diffAsosiy": 0.6,
      "diffYon": 0.8
    },
    "3": {
      "code": 3,
      "optionId": "3",
      "name": "2000 dan 3999",
      "diffBoylama": -10,
      "diffAsosiy": -4.1,
      "diffYon": 0.8
    },
    "4": {
      "code": 4,
      "optionId": "4",
      "name": "4000 dan 5999",
      "diffBoylama": -11.1,
      "diffAsosiy": 2.4,
      "diffYon": 0.8
    },
    "5": {
      "code": 5,
      "optionId": "5",
      "name": "6000 dan 7999",
      "diffBoylama": -16.2,
      "diffAsosiy": -1.4,
      "diffYon": 0.8
    },
    "6": {
      "code": 6,
      "optionId": "6",
      "name": "8000 dan 9999",
      "diffBoylama": -17.2,
      "diffAsosiy": 7.8,
      "diffYon": 0.8
    },
    "7": {
      "code": 7,
      "optionId": "7",
      "name": "10000 dan 11999",
      "diffBoylama": -20.5,
      "diffAsosiy": 5.2,
      "diffYon": 0.8
    },
    "8": {
      "code": 8,
      "optionId": "8",
      "name": "12000 dan 13999",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "9": {
      "code": 9,
      "optionId": "9",
      "name": "14000 dan 15999",
      "diffBoylama": -25.1,
      "diffAsosiy": 17.8,
      "diffYon": 0.8
    },
    "10": {
      "code": 10,
      "optionId": "10",
      "name": "16000 dan 17999",
      "diffBoylama": -26.4,
      "diffAsosiy": 38.6,
      "diffYon": 0.8
    },
    "11": {
      "code": 11,
      "optionId": "11",
      "name": "18000 dan 19999",
      "diffBoylama": -29.3,
      "diffAsosiy": 36.4,
      "diffYon": 0.8
    },
    "12": {
      "code": 12,
      "optionId": "12",
      "name": "20000 dan 21999",
      "diffBoylama": -29.7,
      "diffAsosiy": 69.3,
      "diffYon": 0.8
    },
    "13": {
      "code": 13,
      "optionId": "13",
      "name": "22000 dan 23999",
      "diffBoylama": -32.5,
      "diffAsosiy": 67.1,
      "diffYon": 0.8
    },
    "14": {
      "code": 14,
      "optionId": "14",
      "name": "24000 dan 25999",
      "diffBoylama": -33.7,
      "diffAsosiy": 107.5,
      "diffYon": 0.8
    },
    "15": {
      "code": 15,
      "optionId": "15",
      "name": "26000 dan 27999",
      "diffBoylama": -36.5,
      "diffAsosiy": 105.4,
      "diffYon": 0.8
    },
    "16": {
      "code": 16,
      "optionId": "16",
      "name": "28000 dan 29999",
      "diffBoylama": -37,
      "diffAsosiy": 118.5,
      "diffYon": 0.8
    },
    "17": {
      "code": 17,
      "optionId": "17",
      "name": "30000 dan 31999",
      "diffBoylama": -39.8,
      "diffAsosiy": 116.4,
      "diffYon": 0.8
    },
    "18": {
      "code": 18,
      "optionId": "18",
      "name": "32000 dan 33999",
      "diffBoylama": -40.4,
      "diffAsosiy": 128,
      "diffYon": 0.8
    },
    "19": {
      "code": 19,
      "optionId": "19",
      "name": "34000 dan 35999",
      "diffBoylama": -42,
      "diffAsosiy": 126.2,
      "diffYon": 0.8
    },
    "20": {
      "code": 20,
      "optionId": "20",
      "name": "36000 dan 37999",
      "diffBoylama": -42.2,
      "diffAsosiy": 135.6,
      "diffYon": 0.8
    },
    "21": {
      "code": 21,
      "optionId": "21",
      "name": "38000 dan  39999",
      "diffBoylama": -43.4,
      "diffAsosiy": 135.2,
      "diffYon": 0.8
    },
    "22": {
      "code": 22,
      "optionId": "22",
      "name": "&gt;=40000",
      "diffBoylama": -42.1,
      "diffAsosiy": 147.4,
      "diffYon": 0.8
    }
  },
  "crossing_flow": {
    "1": {
      "code": 1,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": -21.7,
      "diffAsosiy": 0,
      "diffYon": 0.8
    },
    "2": {
      "code": 2,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "not_present": {
      "code": 1,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": -21.7,
      "diffAsosiy": 0,
      "diffYon": 0.8
    },
    "present": {
      "code": 2,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    }
  },
  "right_side_flow": {
    "1": {
      "code": 1,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "2": {
      "code": 2,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "not_present": {
      "code": 1,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "present": {
      "code": 2,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    }
  },
  "left_side_flow": {
    "1": {
      "code": 1,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "2": {
      "code": 2,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "not_present": {
      "code": 1,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "present": {
      "code": 2,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    }
  },
  "intersection_type": {
    "1": {
      "code": 1,
      "optionId": "merge_lane",
      "name": "qoshilish qator",
      "diffBoylama": -21.7,
      "diffAsosiy": 25,
      "diffYon": 1
    },
    "2": {
      "code": 2,
      "optionId": "3_leg",
      "name": "3 tomonli (T simon)",
      "diffBoylama": -21.7,
      "diffAsosiy": 17.7,
      "diffYon": 0.6
    },
    "3": {
      "code": 3,
      "optionId": "3_leg_signal",
      "name": "3 tomonli +svetafor",
      "diffBoylama": -21.7,
      "diffAsosiy": 17.7,
      "diffYon": 0.6
    },
    "4": {
      "code": 4,
      "optionId": "3_leg_turn_lane",
      "name": "3 tomonli+ burilish qatori",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "5": {
      "code": 5,
      "optionId": "3_leg_turn_signal",
      "name": "3 tomonli,burilish+svetafor",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "6": {
      "code": 6,
      "optionId": "4_leg",
      "name": "4 yoki undan ortiq tomonli",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "7": {
      "code": 7,
      "optionId": "4_leg_turn_lane",
      "name": "4 tomonli+burilish qatorli",
      "diffBoylama": -21.7,
      "diffAsosiy": 21.4,
      "diffYon": 0.8
    },
    "8": {
      "code": 8,
      "optionId": "4_leg_signal",
      "name": "4 tomonli+svetaforli",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "9": {
      "code": 9,
      "optionId": "4_leg_turn_signal",
      "name": "4 tomonli,burilish+svetafor",
      "diffBoylama": -21.7,
      "diffAsosiy": 21.4,
      "diffYon": 0.8
    },
    "10": {
      "code": 10,
      "optionId": "roundabout",
      "name": "aylanma harakat",
      "diffBoylama": -21.7,
      "diffAsosiy": 25,
      "diffYon": 0.8
    },
    "11": {
      "code": 11,
      "optionId": "mini_roundabout",
      "name": "kichik aylanma harakat",
      "diffBoylama": -21.7,
      "diffAsosiy": 21.4,
      "diffYon": 0.8
    },
    "12": {
      "code": 12,
      "optionId": "formal_u_turn",
      "name": "rasmiy qayrilib olish",
      "diffBoylama": -21.7,
      "diffAsosiy": 17.7,
      "diffYon": 0.6
    },
    "13": {
      "code": 13,
      "optionId": "informal_u_turn",
      "name": "norasmiy qayrilib olish",
      "diffBoylama": -21.7,
      "diffAsosiy": 17.7,
      "diffYon": 0.6
    },
    "14": {
      "code": 14,
      "optionId": "active_train",
      "name": "poyezd o`tish joyi(faol)",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.9,
      "diffYon": 0.7
    },
    "15": {
      "code": 15,
      "optionId": "passive_train",
      "name": "poyezd otish joyi( passiv)",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0.7
    },
    "16": {
      "code": 16,
      "optionId": "no_intersection",
      "name": "chorraha yoq",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "17": {
      "code": 17,
      "optionId": "short_merge",
      "name": "qisqa qoshilish yolagi",
      "diffBoylama": -21.7,
      "diffAsosiy": 25,
      "diffYon": 1
    },
    "18": {
      "code": 18,
      "optionId": "diverge_lane",
      "name": "ajratish qatori",
      "diffBoylama": -21.7,
      "diffAsosiy": 22.4,
      "diffYon": 0.9
    },
    "merge_lane": {
      "code": 1,
      "optionId": "merge_lane",
      "name": "qoshilish qator",
      "diffBoylama": -21.7,
      "diffAsosiy": 25,
      "diffYon": 1
    },
    "3_leg": {
      "code": 2,
      "optionId": "3_leg",
      "name": "3 tomonli (T simon)",
      "diffBoylama": -21.7,
      "diffAsosiy": 17.7,
      "diffYon": 0.6
    },
    "3_leg_signal": {
      "code": 3,
      "optionId": "3_leg_signal",
      "name": "3 tomonli +svetafor",
      "diffBoylama": -21.7,
      "diffAsosiy": 17.7,
      "diffYon": 0.6
    },
    "3_leg_turn_lane": {
      "code": 4,
      "optionId": "3_leg_turn_lane",
      "name": "3 tomonli+ burilish qatori",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "3_leg_turn_signal": {
      "code": 5,
      "optionId": "3_leg_turn_signal",
      "name": "3 tomonli,burilish+svetafor",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "4_leg": {
      "code": 6,
      "optionId": "4_leg",
      "name": "4 yoki undan ortiq tomonli",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "4_leg_turn_lane": {
      "code": 7,
      "optionId": "4_leg_turn_lane",
      "name": "4 tomonli+burilish qatorli",
      "diffBoylama": -21.7,
      "diffAsosiy": 21.4,
      "diffYon": 0.8
    },
    "4_leg_signal": {
      "code": 8,
      "optionId": "4_leg_signal",
      "name": "4 tomonli+svetaforli",
      "diffBoylama": -21.7,
      "diffAsosiy": 20.3,
      "diffYon": 0.8
    },
    "4_leg_turn_signal": {
      "code": 9,
      "optionId": "4_leg_turn_signal",
      "name": "4 tomonli,burilish+svetafor",
      "diffBoylama": -21.7,
      "diffAsosiy": 21.4,
      "diffYon": 0.8
    },
    "roundabout": {
      "code": 10,
      "optionId": "roundabout",
      "name": "aylanma harakat",
      "diffBoylama": -21.7,
      "diffAsosiy": 25,
      "diffYon": 0.8
    },
    "mini_roundabout": {
      "code": 11,
      "optionId": "mini_roundabout",
      "name": "kichik aylanma harakat",
      "diffBoylama": -21.7,
      "diffAsosiy": 21.4,
      "diffYon": 0.8
    },
    "formal_u_turn": {
      "code": 12,
      "optionId": "formal_u_turn",
      "name": "rasmiy qayrilib olish",
      "diffBoylama": -21.7,
      "diffAsosiy": 17.7,
      "diffYon": 0.6
    },
    "informal_u_turn": {
      "code": 13,
      "optionId": "informal_u_turn",
      "name": "norasmiy qayrilib olish",
      "diffBoylama": -21.7,
      "diffAsosiy": 17.7,
      "diffYon": 0.6
    },
    "active_train": {
      "code": 14,
      "optionId": "active_train",
      "name": "poyezd o`tish joyi(faol)",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.9,
      "diffYon": 0.7
    },
    "passive_train": {
      "code": 15,
      "optionId": "passive_train",
      "name": "poyezd otish joyi( passiv)",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0.7
    },
    "no_intersection": {
      "code": 16,
      "optionId": "no_intersection",
      "name": "chorraha yoq",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "short_merge": {
      "code": 17,
      "optionId": "short_merge",
      "name": "qisqa qoshilish yolagi",
      "diffBoylama": -21.7,
      "diffAsosiy": 25,
      "diffYon": 1
    },
    "diverge_lane": {
      "code": 18,
      "optionId": "diverge_lane",
      "name": "ajratish qatori",
      "diffBoylama": -21.7,
      "diffAsosiy": 22.4,
      "diffYon": 0.9
    }
  },
  "driveways": {
    "1": {
      "code": 1,
      "optionId": "1_2_residential",
      "name": "1 yoki 2 ta turar-joy kirish yoli",
      "diffBoylama": -22,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "2": {
      "code": 2,
      "optionId": "2_plus_residential",
      "name": "&gt;2 ta turar-joy kirish yoli",
      "diffBoylama": -22,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "3": {
      "code": 3,
      "optionId": "commercial",
      "name": "tijorat kirish yoli",
      "diffBoylama": -23.4,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "4": {
      "code": 4,
      "optionId": "not_applicable",
      "name": "qollanilmaydi",
      "diffBoylama": -20.6,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "1_2_residential": {
      "code": 1,
      "optionId": "1_2_residential",
      "name": "1 yoki 2 ta turar-joy kirish yoli",
      "diffBoylama": -22,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "2_plus_residential": {
      "code": 2,
      "optionId": "2_plus_residential",
      "name": "&gt;2 ta turar-joy kirish yoli",
      "diffBoylama": -22,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "commercial": {
      "code": 3,
      "optionId": "commercial",
      "name": "tijorat kirish yoli",
      "diffBoylama": -23.4,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "not_applicable": {
      "code": 4,
      "optionId": "not_applicable",
      "name": "qollanilmaydi",
      "diffBoylama": -20.6,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    }
  },
  "intersection_side_flow": {
    "1": {
      "code": 1,
      "optionId": "1",
      "name": "&lt; 5000",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "2": {
      "code": 2,
      "optionId": "2",
      "name": "5000 dan  9999",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 4.2
    },
    "3": {
      "code": 3,
      "optionId": "3",
      "name": "10000 dan 14999",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 6
    },
    "5": {
      "code": 5,
      "optionId": "5",
      "name": "15000 dan 19999",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 7.6
    },
    "6": {
      "code": 6,
      "optionId": "6",
      "name": "20000dan 29999",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 11.6
    },
    "7": {
      "code": 7,
      "optionId": "7",
      "name": "30000 dan 39999",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 15
    },
    "8": {
      "code": 8,
      "optionId": "8",
      "name": "40000 dan 49999",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 18
    },
    "9": {
      "code": 9,
      "optionId": "9",
      "name": "50000dan 59999",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 21.4
    },
    "10": {
      "code": 10,
      "optionId": "10",
      "name": "60000 dan 69999",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 23.9
    },
    "11": {
      "code": 11,
      "optionId": "11",
      "name": "70000 ddan 79999",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 26.9
    },
    "12": {
      "code": 12,
      "optionId": "12",
      "name": "",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 26.9
    },
    "13": {
      "code": 13,
      "optionId": "13",
      "name": "",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 26.9
    }
  },
  "intersection_quality": {
    "1": {
      "code": 1,
      "optionId": "adequate",
      "name": "yetarli/xavfsiz",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "2": {
      "code": 2,
      "optionId": "poor",
      "name": "xavfli/korinish yomon",
      "diffBoylama": -21.7,
      "diffAsosiy": 19.8,
      "diffYon": 3.3
    },
    "3": {
      "code": 3,
      "optionId": "not_applicable",
      "name": "chorraha yoq",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "adequate": {
      "code": 1,
      "optionId": "adequate",
      "name": "yetarli/xavfsiz",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    },
    "poor": {
      "code": 2,
      "optionId": "poor",
      "name": "xavfli/korinish yomon",
      "diffBoylama": -21.7,
      "diffAsosiy": 19.8,
      "diffYon": 3.3
    },
    "not_applicable": {
      "code": 3,
      "optionId": "not_applicable",
      "name": "chorraha yoq",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 2.7
    }
  },
  "curve_type": {
    "1": {
      "code": 1,
      "optionId": "straight",
      "name": "togri yol",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "moderate",
      "name": "ortacha burilish",
      "diffBoylama": -39.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "sharp",
      "name": "otkir burilish",
      "diffBoylama": -80.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "4": {
      "code": 4,
      "optionId": "very_sharp",
      "name": "ota keskin burilish",
      "diffBoylama": -137.8,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "straight": {
      "code": 1,
      "optionId": "straight",
      "name": "togri yol",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "moderate": {
      "code": 2,
      "optionId": "moderate",
      "name": "ortacha burilish",
      "diffBoylama": -39.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "sharp": {
      "code": 3,
      "optionId": "sharp",
      "name": "otkir burilish",
      "diffBoylama": -80.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "very_sharp": {
      "code": 4,
      "optionId": "very_sharp",
      "name": "ota keskin burilish",
      "diffBoylama": -137.8,
      "diffAsosiy": 16.6,
      "diffYon": 0
    }
  },
  "curve_quality": {
    "1": {
      "code": 1,
      "optionId": "adequate",
      "name": "yetarli korinish",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "poor",
      "name": "korinish xavfli",
      "diffBoylama": -28.6,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "not_curve",
      "name": "burilish mavjud emas",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "adequate": {
      "code": 1,
      "optionId": "adequate",
      "name": "yetarli korinish",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "poor": {
      "code": 2,
      "optionId": "poor",
      "name": "korinish xavfli",
      "diffBoylama": -28.6,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "not_curve": {
      "code": 3,
      "optionId": "not_curve",
      "name": "burilish mavjud emas",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    }
  },
  "speed_limit": {
    "1": {
      "code": 1,
      "optionId": "40",
      "name": "&lt;=30",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "2",
      "name": "35",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "3",
      "name": "40",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "4": {
      "code": 4,
      "optionId": "4",
      "name": "45",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "5": {
      "code": 5,
      "optionId": "5",
      "name": "50",
      "diffBoylama": -31.9,
      "diffAsosiy": 24.1,
      "diffYon": 0
    },
    "6": {
      "code": 6,
      "optionId": "6",
      "name": "55",
      "diffBoylama": -46.9,
      "diffAsosiy": 32,
      "diffYon": 0
    },
    "7": {
      "code": 7,
      "optionId": "7",
      "name": "60",
      "diffBoylama": -59.3,
      "diffAsosiy": 41.9,
      "diffYon": 0
    },
    "8": {
      "code": 8,
      "optionId": "8",
      "name": "65",
      "diffBoylama": -74,
      "diffAsosiy": 52.1,
      "diffYon": 0
    },
    "9": {
      "code": 9,
      "optionId": "9",
      "name": "70",
      "diffBoylama": -85.8,
      "diffAsosiy": 59.8,
      "diffYon": 0
    },
    "10": {
      "code": 10,
      "optionId": "10",
      "name": "75",
      "diffBoylama": -95,
      "diffAsosiy": 65.3,
      "diffYon": 0
    },
    "11": {
      "code": 11,
      "optionId": "11",
      "name": "80",
      "diffBoylama": -99.7,
      "diffAsosiy": 70,
      "diffYon": 0
    },
    "12": {
      "code": 12,
      "optionId": "12",
      "name": "85",
      "diffBoylama": -105.4,
      "diffAsosiy": 72.4,
      "diffYon": 0
    },
    "13": {
      "code": 13,
      "optionId": "13",
      "name": "90",
      "diffBoylama": -108,
      "diffAsosiy": 74.6,
      "diffYon": 0
    },
    "14": {
      "code": 14,
      "optionId": "14",
      "name": "95",
      "diffBoylama": -109.1,
      "diffAsosiy": 76.3,
      "diffYon": 0
    },
    "15": {
      "code": 15,
      "optionId": "15",
      "name": "100",
      "diffBoylama": -110.5,
      "diffAsosiy": 76.9,
      "diffYon": 0
    },
    "16": {
      "code": 16,
      "optionId": "16",
      "name": "105",
      "diffBoylama": -110.2,
      "diffAsosiy": 76.7,
      "diffYon": 0
    },
    "17": {
      "code": 17,
      "optionId": "17",
      "name": "110",
      "diffBoylama": -111.9,
      "diffAsosiy": 77.4,
      "diffYon": 0
    },
    "18": {
      "code": 18,
      "optionId": "18",
      "name": "115",
      "diffBoylama": -111.8,
      "diffAsosiy": 77.8,
      "diffYon": 0
    },
    "19": {
      "code": 19,
      "optionId": "19",
      "name": "120",
      "diffBoylama": -111.7,
      "diffAsosiy": 76.7,
      "diffYon": 0
    },
    "20": {
      "code": 20,
      "optionId": "20",
      "name": "&gt;=120",
      "diffBoylama": -111.7,
      "diffAsosiy": 76.9,
      "diffYon": 0
    },
    "40": {
      "code": 1,
      "optionId": "40",
      "name": "&lt;=30",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    }
  },
  "operating_speed": {
    "1": {
      "code": 1,
      "optionId": "45",
      "name": "&gt;=30",
      "diffBoylama": -4.9,
      "diffAsosiy": 4.2,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "2",
      "name": "35",
      "diffBoylama": -8.9,
      "diffAsosiy": 6.8,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "3",
      "name": "40",
      "diffBoylama": -13.9,
      "diffAsosiy": 11.4,
      "diffYon": 0
    },
    "4": {
      "code": 4,
      "optionId": "4",
      "name": "45",
      "diffBoylama": -21.7,
      "diffAsosiy": 16.6,
      "diffYon": 0
    },
    "5": {
      "code": 5,
      "optionId": "5",
      "name": "50",
      "diffBoylama": -31.9,
      "diffAsosiy": 24.1,
      "diffYon": 0
    },
    "6": {
      "code": 6,
      "optionId": "6",
      "name": "55",
      "diffBoylama": -46.9,
      "diffAsosiy": 64.1,
      "diffYon": 0
    },
    "7": {
      "code": 7,
      "optionId": "7",
      "name": "60",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "8": {
      "code": 8,
      "optionId": "8",
      "name": "65",
      "diffBoylama": -74,
      "diffAsosiy": 102.8,
      "diffYon": 0
    },
    "9": {
      "code": 9,
      "optionId": "9",
      "name": "70",
      "diffBoylama": -85.8,
      "diffAsosiy": 118.4,
      "diffYon": 0
    },
    "10": {
      "code": 10,
      "optionId": "10",
      "name": "75",
      "diffBoylama": -95,
      "diffAsosiy": 130.6,
      "diffYon": 0
    },
    "11": {
      "code": 11,
      "optionId": "11",
      "name": "80",
      "diffBoylama": -99.7,
      "diffAsosiy": 138.9,
      "diffYon": 0
    },
    "12": {
      "code": 12,
      "optionId": "12",
      "name": "85",
      "diffBoylama": -105.4,
      "diffAsosiy": 217.2,
      "diffYon": 0
    },
    "13": {
      "code": 13,
      "optionId": "13",
      "name": "90",
      "diffBoylama": -108,
      "diffAsosiy": 222.6,
      "diffYon": 0
    },
    "14": {
      "code": 14,
      "optionId": "14",
      "name": "95",
      "diffBoylama": -109.1,
      "diffAsosiy": 226.5,
      "diffYon": 0
    },
    "15": {
      "code": 15,
      "optionId": "15",
      "name": "100",
      "diffBoylama": -110.5,
      "diffAsosiy": 228.2,
      "diffYon": 0
    },
    "16": {
      "code": 16,
      "optionId": "16",
      "name": "105",
      "diffBoylama": -110.2,
      "diffAsosiy": 228.9,
      "diffYon": 0
    },
    "17": {
      "code": 17,
      "optionId": "17",
      "name": "110",
      "diffBoylama": -111.9,
      "diffAsosiy": 229.7,
      "diffYon": 0
    },
    "18": {
      "code": 18,
      "optionId": "18",
      "name": "115",
      "diffBoylama": -111.8,
      "diffAsosiy": 231,
      "diffYon": 0
    },
    "19": {
      "code": 19,
      "optionId": "19",
      "name": "120",
      "diffBoylama": -111.7,
      "diffAsosiy": 230.4,
      "diffYon": 0
    },
    "20": {
      "code": 20,
      "optionId": "20",
      "name": "&gt;=120",
      "diffBoylama": -111.7,
      "diffAsosiy": 230.9,
      "diffYon": 0
    },
    "45": {
      "code": 1,
      "optionId": "45",
      "name": "&gt;=30",
      "diffBoylama": -4.9,
      "diffAsosiy": 4.2,
      "diffYon": 0
    }
  },
  "speed_management": {
    "1": {
      "code": 1,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -49.6,
      "diffAsosiy": 68.4,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "present": {
      "code": 1,
      "optionId": "present",
      "name": "mavjud",
      "diffBoylama": -49.6,
      "diffAsosiy": 68.4,
      "diffYon": 0
    },
    "not_present": {
      "code": 2,
      "optionId": "not_present",
      "name": "mavjud emas",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    }
  },
  "motorcycle_percent": {
    "0": {
      "code": 2,
      "optionId": "0",
      "name": "0",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "1": {
      "code": 1,
      "optionId": "not_recorded",
      "name": "NA yozib olinmagan",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "0",
      "name": "0",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "1_5",
      "name": "1-5%",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "4": {
      "code": 4,
      "optionId": "6_10",
      "name": "6-10%",
      "diffBoylama": -59.3,
      "diffAsosiy": 87.8,
      "diffYon": 0
    },
    "5": {
      "code": 5,
      "optionId": "11_20",
      "name": "11-20%",
      "diffBoylama": -59.3,
      "diffAsosiy": 91.5,
      "diffYon": 0
    },
    "6": {
      "code": 6,
      "optionId": "21_40",
      "name": "21-40%",
      "diffBoylama": -59.3,
      "diffAsosiy": 95.3,
      "diffYon": 0
    },
    "7": {
      "code": 7,
      "optionId": "41_60",
      "name": "41-60%",
      "diffBoylama": -59.3,
      "diffAsosiy": 99.1,
      "diffYon": 0
    },
    "8": {
      "code": 8,
      "optionId": "61_80",
      "name": "61-80%",
      "diffBoylama": -59.3,
      "diffAsosiy": 99.1,
      "diffYon": 0
    },
    "9": {
      "code": 9,
      "optionId": "81_99",
      "name": "81-99%",
      "diffBoylama": -59.3,
      "diffAsosiy": 99.1,
      "diffYon": 0
    },
    "10": {
      "code": 10,
      "optionId": "100",
      "name": "1",
      "diffBoylama": -59.3,
      "diffAsosiy": 99.1,
      "diffYon": 0
    },
    "100": {
      "code": 10,
      "optionId": "100",
      "name": "1",
      "diffBoylama": -59.3,
      "diffAsosiy": 99.1,
      "diffYon": 0
    },
    "not_recorded": {
      "code": 1,
      "optionId": "not_recorded",
      "name": "NA yozib olinmagan",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "1_5": {
      "code": 3,
      "optionId": "1_5",
      "name": "1-5%",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "6_10": {
      "code": 4,
      "optionId": "6_10",
      "name": "6-10%",
      "diffBoylama": -59.3,
      "diffAsosiy": 87.8,
      "diffYon": 0
    },
    "11_20": {
      "code": 5,
      "optionId": "11_20",
      "name": "11-20%",
      "diffBoylama": -59.3,
      "diffAsosiy": 91.5,
      "diffYon": 0
    },
    "21_40": {
      "code": 6,
      "optionId": "21_40",
      "name": "21-40%",
      "diffBoylama": -59.3,
      "diffAsosiy": 95.3,
      "diffYon": 0
    },
    "41_60": {
      "code": 7,
      "optionId": "41_60",
      "name": "41-60%",
      "diffBoylama": -59.3,
      "diffAsosiy": 99.1,
      "diffYon": 0
    },
    "61_80": {
      "code": 8,
      "optionId": "61_80",
      "name": "61-80%",
      "diffBoylama": -59.3,
      "diffAsosiy": 99.1,
      "diffYon": 0
    },
    "81_99": {
      "code": 9,
      "optionId": "81_99",
      "name": "81-99%",
      "diffBoylama": -59.3,
      "diffAsosiy": 99.1,
      "diffYon": 0
    }
  },
  "hgv_percent": {
    "1": {
      "code": 1,
      "optionId": "not_recorded",
      "name": "yozib olinmagan",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "2": {
      "code": 2,
      "optionId": "0_5",
      "name": "0dan &lt;5% gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "3": {
      "code": 3,
      "optionId": "5_10",
      "name": "5% dan &lt;10 % gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 91.5,
      "diffYon": 0
    },
    "4": {
      "code": 4,
      "optionId": "10_15",
      "name": "10% dan &lt;15 % gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 99.1,
      "diffYon": 0
    },
    "5": {
      "code": 5,
      "optionId": "15_20",
      "name": "15% dan &lt;20% gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 106.8,
      "diffYon": 0
    },
    "6": {
      "code": 6,
      "optionId": "20_30",
      "name": "20% dan&lt; 30% gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 114.5,
      "diffYon": 0
    },
    "7": {
      "code": 7,
      "optionId": "30_40",
      "name": "30% dan&lt; 40% gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 122.2,
      "diffYon": 0
    },
    "8": {
      "code": 8,
      "optionId": "40_plus",
      "name": "&gt;=40%",
      "diffBoylama": -59.3,
      "diffAsosiy": 129.9,
      "diffYon": 0
    },
    "not_recorded": {
      "code": 1,
      "optionId": "not_recorded",
      "name": "yozib olinmagan",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "0_5": {
      "code": 2,
      "optionId": "0_5",
      "name": "0dan &lt;5% gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 83.8,
      "diffYon": 0
    },
    "5_10": {
      "code": 3,
      "optionId": "5_10",
      "name": "5% dan &lt;10 % gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 91.5,
      "diffYon": 0
    },
    "10_15": {
      "code": 4,
      "optionId": "10_15",
      "name": "10% dan &lt;15 % gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 99.1,
      "diffYon": 0
    },
    "15_20": {
      "code": 5,
      "optionId": "15_20",
      "name": "15% dan &lt;20% gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 106.8,
      "diffYon": 0
    },
    "20_30": {
      "code": 6,
      "optionId": "20_30",
      "name": "20% dan&lt; 30% gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 114.5,
      "diffYon": 0
    },
    "30_40": {
      "code": 7,
      "optionId": "30_40",
      "name": "30% dan&lt; 40% gacha",
      "diffBoylama": -59.3,
      "diffAsosiy": 122.2,
      "diffYon": 0
    },
    "40_plus": {
      "code": 8,
      "optionId": "40_plus",
      "name": "&gt;=40%",
      "diffBoylama": -59.3,
      "diffAsosiy": 129.9,
      "diffYon": 0
    }
  }
};
