export interface AttributeOption {
  id: string;
  labelUz: string;
  labelEn: string;
  iconSrc: string;
  scoreWeight: number;
  badgeText?: string;
  badgeColor?: 'teal' | 'red' | 'purple' | 'orange' | 'dark';
}

export interface AttributeDefinition {
  id: string;
  code: string;
  nameUz: string;
  nameEn: string;
  currentValueId: string;
  customValue?: string;
  isInput?: boolean;
  isSlider?: boolean;
  min?: number;
  max?: number;
  step?: number;
  inputUnit?: string;
  options: AttributeOption[];
}

export const OFFICIAL_40_ATTRIBUTES_DATA: AttributeDefinition[] = [
  {
    "id": "land_use_left",
    "code": "SR4S-01",
    "nameUz": "Yerdan foydalanish chapda",
    "nameEn": "Land use left",
    "currentValueId": "residential",
    "options": [
      {
        "id": "undeveloped",
        "labelUz": "Bo‘sh yer / Ochiq maydon",
        "labelEn": "Undeveloped",
        "iconSrc": "/sr4s_icons/land-use-undeveloped.png",
        "scoreWeight": 5
      },
      {
        "id": "residential",
        "labelUz": "Aholi punkti (Turar joy)",
        "labelEn": "Residential",
        "iconSrc": "/sr4s_icons/land-use-residential.png",
        "scoreWeight": 4
      },
      {
        "id": "commercial",
        "labelUz": "Tijorat / Savdo",
        "labelEn": "Commercial",
        "iconSrc": "/sr4s_icons/land-use-commercial.png",
        "scoreWeight": 3
      },
      {
        "id": "industrial",
        "labelUz": "Sanoat korxonasi",
        "labelEn": "Industrial",
        "iconSrc": "/sr4s_icons/land-use-industrial.png",
        "scoreWeight": 2
      },
      {
        "id": "farming",
        "labelUz": "Qishloq xo‘jaligi",
        "labelEn": "Farming",
        "iconSrc": "/sr4s_icons/land-use-farming.png",
        "scoreWeight": 4
      },
      {
        "id": "school",
        "labelUz": "Maktab / Ta’lim hududi",
        "labelEn": "School",
        "iconSrc": "/sr4s_icons/school-warning-signs-markings.png",
        "scoreWeight": 5
      }
    ]
  },
  {
    "id": "land_use_right",
    "code": "SR4S-02",
    "nameUz": "Yerdan foydalanish o‘ngda",
    "nameEn": "Land Use Right",
    "currentValueId": "residential",
    "options": [
      {
        "id": "undeveloped",
        "labelUz": "Bo‘sh yer / Ochiq maydon",
        "labelEn": "Undeveloped",
        "iconSrc": "/sr4s_icons/land-use-undeveloped.png",
        "scoreWeight": 5
      },
      {
        "id": "residential",
        "labelUz": "Aholi punkti (Turar joy)",
        "labelEn": "Residential",
        "iconSrc": "/sr4s_icons/land-use-residential.png",
        "scoreWeight": 4
      },
      {
        "id": "commercial",
        "labelUz": "Tijorat / Savdo",
        "labelEn": "Commercial",
        "iconSrc": "/sr4s_icons/land-use-commercial.png",
        "scoreWeight": 3
      },
      {
        "id": "industrial",
        "labelUz": "Sanoat korxonasi",
        "labelEn": "Industrial",
        "iconSrc": "/sr4s_icons/land-use-industrial.png",
        "scoreWeight": 2
      },
      {
        "id": "farming",
        "labelUz": "Qishloq xo‘jaligi",
        "labelEn": "Farming",
        "iconSrc": "/sr4s_icons/land-use-farming.png",
        "scoreWeight": 4
      },
      {
        "id": "school",
        "labelUz": "Maktab / Ta’lim hududi",
        "labelEn": "School",
        "iconSrc": "/sr4s_icons/school-warning-signs-markings.png",
        "scoreWeight": 5
      }
    ]
  },
  {
    "id": "area_type",
    "code": "SR4S-03",
    "nameUz": "Maydon turi",
    "nameEn": "Area Type",
    "currentValueId": "urban",
    "options": [
      {
        "id": "rural",
        "labelUz": "Qishloq / Ochiq hudud",
        "labelEn": "Rural",
        "iconSrc": "/sr4s_icons/area-type-rural.png",
        "scoreWeight": 3
      },
      {
        "id": "urban",
        "labelUz": "Shahar hududi",
        "labelEn": "Urban",
        "iconSrc": "/sr4s_icons/area-type-urban.png",
        "scoreWeight": 4
      }
    ]
  },
  {
    "id": "vehicle_parking",
    "code": "SR4S-04",
    "nameUz": "Avtomobil to‘xtash joyi",
    "nameEn": "Vehicle Parking",
    "currentValueId": "none",
    "options": [
      {
        "id": "none",
        "labelUz": "To‘xtash joyi yo‘q",
        "labelEn": "None",
        "iconSrc": "/sr4s_icons/vehicle-parking-none.png",
        "scoreWeight": 5
      },
      {
        "id": "one_side",
        "labelUz": "Bir tomonda to‘xtash bor",
        "labelEn": "One Side",
        "iconSrc": "/sr4s_icons/vehicle-parking-one-side.png",
        "scoreWeight": 3
      },
      {
        "id": "two_side",
        "labelUz": "Ikki tomonda to‘xtash bor",
        "labelEn": "Two Side",
        "iconSrc": "/sr4s_icons/vehicle-parking-two-sides.png",
        "scoreWeight": 2
      }
    ]
  },
  {
    "id": "sight_distance",
    "code": "SR4S-05",
    "nameUz": "Ko‘rish masofasi",
    "nameEn": "Sight Distance",
    "currentValueId": "adequate",
    "options": [
      {
        "id": "adequate",
        "labelUz": "Yetarli ko‘rish masofasi",
        "labelEn": "Adequate",
        "iconSrc": "/sr4s_icons/icon-adequate.png",
        "scoreWeight": 5,
        "badgeText": "ADEQUATE",
        "badgeColor": "teal"
      },
      {
        "id": "poor",
        "labelUz": "Yetarli emas / Cheklangan",
        "labelEn": "Poor",
        "iconSrc": "/sr4s_icons/icon-poor.png",
        "scoreWeight": 2,
        "badgeText": "POOR",
        "badgeColor": "red"
      }
    ]
  },
  {
    "id": "number_of_lanes",
    "code": "SR4S-06",
    "nameUz": "Yo‘l qatorlari soni",
    "nameEn": "Number of Lanes",
    "currentValueId": "1_1",
    "options": [
      {
        "id": "1_1",
        "labelUz": "Har bir yo‘nalishda 1 tadan",
        "labelEn": "1 each way",
        "iconSrc": "/sr4s_icons/number-of-lanes-1.png",
        "scoreWeight": 5
      },
      {
        "id": "2_1",
        "labelUz": "1 va 2 qatorli",
        "labelEn": "1 & 2",
        "iconSrc": "/sr4s_icons/number-of-lanes-1-2.png",
        "scoreWeight": 4
      },
      {
        "id": "2_2",
        "labelUz": "Har bir yo‘nalishda 2 tadan",
        "labelEn": "2 each way",
        "iconSrc": "/sr4s_icons/number-of-lanes-2.png",
        "scoreWeight": 3
      },
      {
        "id": "3_2",
        "labelUz": "2 va 3 qatorli",
        "labelEn": "2 & 3",
        "iconSrc": "/sr4s_icons/number-of-lanes-2-3.png",
        "scoreWeight": 3
      },
      {
        "id": "3_3",
        "labelUz": "Har bir yo‘nalishda 3 tadan",
        "labelEn": "3 each way",
        "iconSrc": "/sr4s_icons/number-of-lanes-3.png",
        "scoreWeight": 2
      },
      {
        "id": "4_4",
        "labelUz": "Har bir yo‘nalishda 4 tadan",
        "labelEn": "4 each way",
        "iconSrc": "/sr4s_icons/number-of-lanes-4.png",
        "scoreWeight": 1
      }
    ]
  },
  {
    "id": "lane_width",
    "code": "SR4S-07",
    "nameUz": "Qator kengligi",
    "nameEn": "Lane Width",
    "currentValueId": "wide",
    "options": [
      {
        "id": "wide",
        "labelUz": "Keng yo‘l qatori (>= 3.25m)",
        "labelEn": "Wide",
        "iconSrc": "/sr4s_icons/lane-width-wide.png",
        "scoreWeight": 5,
        "badgeText": "WIDE",
        "badgeColor": "teal"
      },
      {
        "id": "medium",
        "labelUz": "O‘rtacha qator (2.75 - 3.25m)",
        "labelEn": "Medium",
        "iconSrc": "/sr4s_icons/icon-medium.png",
        "scoreWeight": 4,
        "badgeText": "MEDIUM",
        "badgeColor": "teal"
      },
      {
        "id": "narrow",
        "labelUz": "Tor qator (< 2.75m)",
        "labelEn": "Narrow",
        "iconSrc": "/sr4s_icons/lane-width-narrow.png",
        "scoreWeight": 2,
        "badgeText": "NARROW",
        "badgeColor": "teal"
      }
    ]
  },
  {
    "id": "shoulder_rumble_strips",
    "code": "SR4S-08",
    "nameUz": "Shovqinli ogohlantirish chiziqlari",
    "nameEn": "Shoulder Rumble Strips",
    "currentValueId": "not_present",
    "options": [
      {
        "id": "present",
        "labelUz": "Mavjud",
        "labelEn": "Present",
        "iconSrc": "/sr4s_icons/icon-present.png",
        "scoreWeight": 5,
        "badgeText": "PRESENT",
        "badgeColor": "teal"
      },
      {
        "id": "not_present",
        "labelUz": "Mavjud emas",
        "labelEn": "Not Present",
        "iconSrc": "/sr4s_icons/icon-not-present.png",
        "scoreWeight": 3,
        "badgeText": "NOT PRESENT",
        "badgeColor": "red"
      }
    ]
  },
  {
    "id": "road_condition",
    "code": "SR4S-09",
    "nameUz": "Yo‘l qoplamasi holati",
    "nameEn": "Road Condition",
    "currentValueId": "good",
    "options": [
      {
        "id": "good",
        "labelUz": "Yaxshi",
        "labelEn": "Good",
        "iconSrc": "/sr4s_icons/icon-good.png",
        "scoreWeight": 5,
        "badgeText": "GOOD",
        "badgeColor": "teal"
      },
      {
        "id": "medium",
        "labelUz": "O‘rtacha",
        "labelEn": "Medium",
        "iconSrc": "/sr4s_icons/icon-medium.png",
        "scoreWeight": 3,
        "badgeText": "MEDIUM",
        "badgeColor": "teal"
      },
      {
        "id": "poor",
        "labelUz": "Yomon / O‘nqir-cho‘nqir",
        "labelEn": "Poor",
        "iconSrc": "/sr4s_icons/icon-poor.png",
        "scoreWeight": 1,
        "badgeText": "POOR",
        "badgeColor": "red"
      }
    ]
  },
  {
    "id": "grip",
    "code": "SR4S-10",
    "nameUz": "Yo‘l tishlashish sifati (Grip)",
    "nameEn": "Grip",
    "currentValueId": "good",
    "options": [
      {
        "id": "good",
        "labelUz": "Yaxshi",
        "labelEn": "Good",
        "iconSrc": "/sr4s_icons/icon-good.png",
        "scoreWeight": 5,
        "badgeText": "GOOD",
        "badgeColor": "teal"
      },
      {
        "id": "medium",
        "labelUz": "O‘rtacha",
        "labelEn": "Medium",
        "iconSrc": "/sr4s_icons/icon-medium.png",
        "scoreWeight": 3,
        "badgeText": "MEDIUM",
        "badgeColor": "teal"
      },
      {
        "id": "poor",
        "labelUz": "Sirpanchiq / Yomon",
        "labelEn": "Poor",
        "iconSrc": "/sr4s_icons/icon-poor.png",
        "scoreWeight": 1,
        "badgeText": "POOR",
        "badgeColor": "red"
      }
    ]
  },
  {
    "id": "grade",
    "code": "SR4S-11",
    "nameUz": "Yo‘l qiyaligi (Grade)",
    "nameEn": "Grade",
    "currentValueId": "grade_low",
    "options": [
      {
        "id": "grade_low",
        "labelUz": "Nishablik 0 dan 7.5% gacha",
        "labelEn": "0 to 7.5%",
        "iconSrc": "/sr4s_icons/grade-low.png",
        "scoreWeight": 5
      },
      {
        "id": "grade_medium",
        "labelUz": "Nishablik 7.5% dan 10% gacha",
        "labelEn": "7.5% to 10%",
        "iconSrc": "/sr4s_icons/grade-medium.png",
        "scoreWeight": 3
      },
      {
        "id": "grade_high",
        "labelUz": "Nishablik 10% dan yuqori",
        "labelEn": "> 10%",
        "iconSrc": "/sr4s_icons/grade-high.png",
        "scoreWeight": 2
      }
    ]
  },
  {
    "id": "carriageway_type",
    "code": "SR4S-12",
    "nameUz": "Qatnov qismi turi",
    "nameEn": "Carriageway Type",
    "currentValueId": "undivided",
    "options": [
      {
        "id": "divided_north_east",
        "labelUz": "Shimol / Sharq (Divided A)",
        "labelEn": "North / East",
        "iconSrc": "/sr4s_icons/carriageway-north-east.png",
        "scoreWeight": 5
      },
      {
        "id": "divided_south_west",
        "labelUz": "Janub / G‘arb (Divided B)",
        "labelEn": "South / West",
        "iconSrc": "/sr4s_icons/carriageway-south-west.png",
        "scoreWeight": 5
      },
      {
        "id": "undivided",
        "labelUz": "Bo‘linmagan yo‘l (Undivided)",
        "labelEn": "Not Applicable",
        "iconSrc": "/sr4s_icons/carriageway-na.png",
        "scoreWeight": 3
      }
    ]
  },
  {
    "id": "middle_of_road",
    "code": "SR4S-13",
    "nameUz": "Yo‘l o‘rtasi ajratgichi",
    "nameEn": "Middle of Road",
    "currentValueId": "one_way",
    "options": [
      {
        "id": "center_line",
        "labelUz": "O‘q chiziq",
        "labelEn": "Center Line",
        "iconSrc": "/sr4s_icons/median-center-line.png",
        "scoreWeight": 3
      },
      {
        "id": "wide_line",
        "labelUz": "Keng chiziq < 1m",
        "labelEn": "Wide Line < 1m",
        "iconSrc": "/sr4s_icons/median-wide-line.png",
        "scoreWeight": 4
      },
      {
        "id": "hatching",
        "labelUz": "Shtrixli orolcha > 1m",
        "labelEn": "Hatching > 1m",
        "iconSrc": "/sr4s_icons/median-hatching.png",
        "scoreWeight": 4
      },
      {
        "id": "turn_lane",
        "labelUz": "Burilish qatori",
        "labelEn": "Turn Lane",
        "iconSrc": "/sr4s_icons/median-turn-lane.png",
        "scoreWeight": 4
      },
      {
        "id": "flexible_posts",
        "labelUz": "Moslashuvchan ustunchalar",
        "labelEn": "Flexible Posts",
        "iconSrc": "/sr4s_icons/median-flexible-posts.png",
        "scoreWeight": 4
      },
      {
        "id": "separated_0_1",
        "labelUz": "Ajratilgan 0 - 1m",
        "labelEn": "Separated 0 to 1m",
        "iconSrc": "/sr4s_icons/median-0-1.png",
        "scoreWeight": 4
      },
      {
        "id": "separated_1_5",
        "labelUz": "Ajratilgan 1 - 5m",
        "labelEn": "Separated 1 to 5m",
        "iconSrc": "/sr4s_icons/median-1-5.png",
        "scoreWeight": 5
      },
      {
        "id": "separated_5_10",
        "labelUz": "Ajratilgan 5 - 10m",
        "labelEn": "Separated 5 to 10m",
        "iconSrc": "/sr4s_icons/median-5-10.png",
        "scoreWeight": 5
      },
      {
        "id": "separated_10_20",
        "labelUz": "Ajratilgan 10 - 20m",
        "labelEn": "Separated 10 to 20m",
        "iconSrc": "/sr4s_icons/median-10-20.png",
        "scoreWeight": 5
      },
      {
        "id": "separated_20_plus",
        "labelUz": "Ajratilgan 20m+",
        "labelEn": "Separated 20+m",
        "iconSrc": "/sr4s_icons/median-20-plus.png",
        "scoreWeight": 5
      },
      {
        "id": "metal_barrier",
        "labelUz": "Metall to‘siq",
        "labelEn": "Metal Barrier",
        "iconSrc": "/sr4s_icons/median-metal-barrier.png",
        "scoreWeight": 5
      },
      {
        "id": "concrete_barrier",
        "labelUz": "Beton to‘siq",
        "labelEn": "Concrete Barrier",
        "iconSrc": "/sr4s_icons/median-concrete-barrier.png",
        "scoreWeight": 5
      },
      {
        "id": "wire_barrier",
        "labelUz": "Simli to‘siq",
        "labelEn": "Wire Barrier",
        "iconSrc": "/sr4s_icons/median-wire-barrier.png",
        "scoreWeight": 5
      },
      {
        "id": "motorcycle_barrier",
        "labelUz": "Mototsikl xavfsizlik to‘sig‘i",
        "labelEn": "Motorcycle Barrier",
        "iconSrc": "/sr4s_icons/median-motorcycle-barrier.png",
        "scoreWeight": 5
      },
      {
        "id": "one_way",
        "labelUz": "Bir tomonlama harakat",
        "labelEn": "One Way",
        "iconSrc": "/sr4s_icons/median-one-way.png",
        "scoreWeight": 5
      },
      {
        "id": "broken_wide_markings",
        "labelUz": "Keng uzuq chiziqli oraliq (>0.6m)",
        "labelEn": "Broken wide median markings (>0.6m)",
        "iconSrc": "/sr4s_icons/median-broken-wide-markings.png",
        "scoreWeight": 4
      }
    ]
  },
  {
    "id": "lines_and_signs",
    "code": "SR4S-14",
    "nameUz": "Chiziqlar va belgilar",
    "nameEn": "Lines & Signs",
    "currentValueId": "adequate",
    "options": [
      {
        "id": "adequate",
        "labelUz": "Yetarli va aniq",
        "labelEn": "Adequate",
        "iconSrc": "/sr4s_icons/icon-adequate.png",
        "scoreWeight": 5,
        "badgeText": "ADEQUATE",
        "badgeColor": "teal"
      },
      {
        "id": "poor",
        "labelUz": "Yetarli emas / O‘chgan",
        "labelEn": "Poor",
        "iconSrc": "/sr4s_icons/icon-poor.png",
        "scoreWeight": 1,
        "badgeText": "POOR",
        "badgeColor": "red"
      }
    ]
  },
  {
    "id": "street_lighting",
    "code": "SR4S-15",
    "nameUz": "Ko‘chalarni yoritish",
    "nameEn": "Street Lighting",
    "currentValueId": "present",
    "options": [
      {
        "id": "present",
        "labelUz": "Mavjud va yorug‘",
        "labelEn": "Present",
        "iconSrc": "/sr4s_icons/icon-present.png",
        "scoreWeight": 5,
        "badgeText": "PRESENT",
        "badgeColor": "teal"
      },
      {
        "id": "not_present",
        "labelUz": "Mavjud emas / Qorong‘i",
        "labelEn": "Not Present",
        "iconSrc": "/sr4s_icons/icon-not-present.png",
        "scoreWeight": 1,
        "badgeText": "NOT PRESENT",
        "badgeColor": "red"
      }
    ]
  },
  {
    "id": "school_warning",
    "code": "SR4S-16",
    "nameUz": "Maktab haqida ogohlantirish",
    "nameEn": "School Warning",
    "currentValueId": "signs_markings",
    "options": [
      {
        "id": "flashing_beacons",
        "labelUz": "Miltillovchi chiroqlar",
        "labelEn": "Flashing Beacons",
        "iconSrc": "/sr4s_icons/school-warning-flashing-beacons.png",
        "scoreWeight": 5
      },
      {
        "id": "signs_markings",
        "labelUz": "Belgilar va chiziqlar",
        "labelEn": "Signs / Markings",
        "iconSrc": "/sr4s_icons/school-warning-signs-markings.png",
        "scoreWeight": 4
      },
      {
        "id": "no_school_zone",
        "labelUz": "Maktab zonasi belgisi yo‘q",
        "labelEn": "No School Zone",
        "iconSrc": "/sr4s_icons/school-warning-no-school-zone.png",
        "scoreWeight": 2
      },
      {
        "id": "no_school_nearby",
        "labelUz": "Yaqin atrofda maktab yo‘q",
        "labelEn": "No School Nearby",
        "iconSrc": "/sr4s_icons/school-no.png",
        "scoreWeight": 3
      }
    ]
  },
  {
    "id": "crossing_supervisor",
    "code": "SR4S-17",
    "nameUz": "O‘tish nazoratchisi (Supervisor)",
    "nameEn": "Crossing Supervisor",
    "currentValueId": "no_supervisor",
    "options": [
      {
        "id": "supervisor",
        "labelUz": "Nazoratchi / Patrul bor",
        "labelEn": "Supervisor",
        "iconSrc": "/sr4s_icons/school-supervisor.png",
        "scoreWeight": 5
      },
      {
        "id": "no_supervisor",
        "labelUz": "Nazoratchi yo‘q",
        "labelEn": "No Supervisor",
        "iconSrc": "/sr4s_icons/school-supervisor-no.png",
        "scoreWeight": 2
      },
      {
        "id": "no_school_nearby",
        "labelUz": "Yaqin atrofda maktab yo‘q",
        "labelEn": "No School Nearby",
        "iconSrc": "/sr4s_icons/school-no.png",
        "scoreWeight": 3
      }
    ]
  },
  {
    "id": "sidewalk_left",
    "code": "SR4S-18",
    "nameUz": "Trotuar chap tomonda",
    "nameEn": "Sidewalk Left",
    "currentValueId": "1_3m",
    "options": [
      {
        "id": "none",
        "labelUz": "Trotuar yo‘q",
        "labelEn": "No sidewalk",
        "iconSrc": "/sr4s_icons/sidewalk-left-none.png",
        "scoreWeight": 1
      },
      {
        "id": "0_1m",
        "labelUz": "0 dan 1m gacha",
        "labelEn": "0 to 1m Away",
        "iconSrc": "/sr4s_icons/sidewalk-left-0-1.png",
        "scoreWeight": 3
      },
      {
        "id": "1_3m",
        "labelUz": "1 dan 3m gacha",
        "labelEn": "1 to 3m Away",
        "iconSrc": "/sr4s_icons/sidewalk-left-1-3.png",
        "scoreWeight": 4
      },
      {
        "id": "gt_3m",
        "labelUz": "3m dan uzoqda",
        "labelEn": "> 3m Away",
        "iconSrc": "/sr4s_icons/sidewalk-left-3-plus.png",
        "scoreWeight": 5
      },
      {
        "id": "barrier",
        "labelUz": "To‘siq orqasida",
        "labelEn": "Behind Barrier",
        "iconSrc": "/sr4s_icons/sidewalk-left-barrier.png",
        "scoreWeight": 5
      },
      {
        "id": "poor",
        "labelUz": "Yomon / Tuproq yo‘l",
        "labelEn": "Poor",
        "iconSrc": "/sr4s_icons/sidewalk-left-informal-0-1.png",
        "scoreWeight": 2
      },
      {
        "id": "moderate",
        "labelUz": "O‘rtacha yo‘lak",
        "labelEn": "Moderate",
        "iconSrc": "/sr4s_icons/sidewalk-left-informal-1-plus.png",
        "scoreWeight": 3
      },
      {
        "id": "shared",
        "labelUz": "Umumiy velo-piyoda yo‘lak",
        "labelEn": "Shared use path",
        "iconSrc": "/sr4s_icons/sidewalk-left-shared.png",
        "scoreWeight": 4
      }
    ]
  },
  {
    "id": "sidewalk_right",
    "code": "SR4S-19",
    "nameUz": "Trotuar o‘ng tomonda",
    "nameEn": "Sidewalk Right",
    "currentValueId": "0_1m",
    "options": [
      {
        "id": "none",
        "labelUz": "Trotuar yo‘q",
        "labelEn": "No sidewalk",
        "iconSrc": "/sr4s_icons/sidewalk-right-none.png",
        "scoreWeight": 1
      },
      {
        "id": "0_1m",
        "labelUz": "0 dan 1m gacha",
        "labelEn": "0 to 1m Away",
        "iconSrc": "/sr4s_icons/sidewalk-right-0-1.png",
        "scoreWeight": 3
      },
      {
        "id": "1_3m",
        "labelUz": "1 dan 3m gacha",
        "labelEn": "1 to 3m Away",
        "iconSrc": "/sr4s_icons/sidewalk-right-1-3.png",
        "scoreWeight": 4
      },
      {
        "id": "gt_3m",
        "labelUz": "3m dan uzoqda",
        "labelEn": "> 3m Away",
        "iconSrc": "/sr4s_icons/sidewalk-right-3-plus.png",
        "scoreWeight": 5
      },
      {
        "id": "barrier",
        "labelUz": "To‘siq orqasida",
        "labelEn": "Behind Barrier",
        "iconSrc": "/sr4s_icons/sidewalk-right-barrier.png",
        "scoreWeight": 5
      },
      {
        "id": "poor",
        "labelUz": "Yomon / Tuproq yo‘l",
        "labelEn": "Poor",
        "iconSrc": "/sr4s_icons/sidewalk-right-informal-0-1.png",
        "scoreWeight": 2
      },
      {
        "id": "moderate",
        "labelUz": "O‘rtacha yo‘lak",
        "labelEn": "Moderate",
        "iconSrc": "/sr4s_icons/sidewalk-right-informal-1-plus.png",
        "scoreWeight": 3
      },
      {
        "id": "shared",
        "labelUz": "Umumiy velo-piyoda yo‘lak",
        "labelEn": "Shared use path",
        "iconSrc": "/sr4s_icons/sidewalk-right-shared.png",
        "scoreWeight": 4
      }
    ]
  },
  {
    "id": "road_edge_left",
    "code": "SR4S-20",
    "nameUz": "Yo‘l chekkasi (Yelka) chapda",
    "nameEn": "Road Edge Left",
    "currentValueId": "0_1m",
    "options": [
      {
        "id": "none",
        "labelUz": "Yelka yo‘q",
        "labelEn": "None",
        "iconSrc": "/sr4s_icons/shoulder-left-none.png",
        "scoreWeight": 1
      },
      {
        "id": "0_1m",
        "labelUz": "0 dan 1m gacha",
        "labelEn": "0 to 1m Wide",
        "iconSrc": "/sr4s_icons/shoulder-left-narrow.png",
        "scoreWeight": 3
      },
      {
        "id": "1_2_4m",
        "labelUz": "1 dan 2.4m gacha",
        "labelEn": "1 to 2.4m Wide",
        "iconSrc": "/sr4s_icons/shoulder-left-medium.png",
        "scoreWeight": 4
      },
      {
        "id": "gt_2_4m",
        "labelUz": "2.4m dan ortiq",
        "labelEn": "> 2.4m Wide",
        "iconSrc": "/sr4s_icons/shoulder-left-wide.png",
        "scoreWeight": 5
      }
    ]
  },
  {
    "id": "road_edge_right",
    "code": "SR4S-21",
    "nameUz": "Yo‘l chekkasi (Yelka) o‘ngda",
    "nameEn": "Road Edge Right",
    "currentValueId": "0_1m",
    "options": [
      {
        "id": "none",
        "labelUz": "Yelka yo‘q",
        "labelEn": "None",
        "iconSrc": "/sr4s_icons/shoulder-right-none.png",
        "scoreWeight": 1
      },
      {
        "id": "0_1m",
        "labelUz": "0 dan 1m gacha",
        "labelEn": "0 to 1m Wide",
        "iconSrc": "/sr4s_icons/shoulder-right-narrow.png",
        "scoreWeight": 3
      },
      {
        "id": "1_2_4m",
        "labelUz": "1 dan 2.4m gacha",
        "labelEn": "1 to 2.4m Wide",
        "iconSrc": "/sr4s_icons/shoulder-right-medium.png",
        "scoreWeight": 4
      },
      {
        "id": "gt_2_4m",
        "labelUz": "2.4m dan ortiq",
        "labelEn": "> 2.4m Wide",
        "iconSrc": "/sr4s_icons/shoulder-right-wide.png",
        "scoreWeight": 5
      }
    ]
  },
  {
    "id": "pedestrian_channelisation",
    "code": "SR4S-22",
    "nameUz": "Piyodalarni yo‘naltiruvchi panjara",
    "nameEn": "Pedestrian Channelisation",
    "currentValueId": "not_present",
    "options": [
      {
        "id": "present",
        "labelUz": "Mavjud",
        "labelEn": "Present",
        "iconSrc": "/sr4s_icons/icon-present.png",
        "scoreWeight": 5,
        "badgeText": "PRESENT",
        "badgeColor": "teal"
      },
      {
        "id": "not_present",
        "labelUz": "Mavjud emas",
        "labelEn": "Not Present",
        "iconSrc": "/sr4s_icons/icon-not-present.png",
        "scoreWeight": 3,
        "badgeText": "NOT PRESENT",
        "badgeColor": "red"
      }
    ]
  },
  {
    "id": "crossing_main_road",
    "code": "SR4S-23",
    "nameUz": "Asosiy yo‘l piyodalar o‘tish joyi",
    "nameEn": "Crossing Main Road",
    "currentValueId": "marked",
    "options": [
      {
        "id": "none",
        "labelUz": "O‘tish joyi yo‘q",
        "labelEn": "None",
        "iconSrc": "/sr4s_icons/crossing-none.png",
        "scoreWeight": 1
      },
      {
        "id": "lights",
        "labelUz": "Svetoforli",
        "labelEn": "Lights",
        "iconSrc": "/sr4s_icons/crossing-lights.png",
        "scoreWeight": 5
      },
      {
        "id": "raised",
        "labelUz": "Ko‘tarilgan",
        "labelEn": "Raised",
        "iconSrc": "/sr4s_icons/crossing-raised.png",
        "scoreWeight": 5
      },
      {
        "id": "bridge_tunnel",
        "labelUz": "Ko‘prik / Tunnel",
        "labelEn": "Bridge / Tunnel",
        "iconSrc": "/sr4s_icons/crossing-bridge-tunnel.png",
        "scoreWeight": 5
      },
      {
        "id": "marked",
        "labelUz": "Chizilgan (Zebra)",
        "labelEn": "Marked",
        "iconSrc": "/sr4s_icons/crossing-marked.png",
        "scoreWeight": 4
      },
      {
        "id": "unmarked",
        "labelUz": "Belgilanmagan",
        "labelEn": "Unmarked",
        "iconSrc": "/sr4s_icons/crossing-unmarked.png",
        "scoreWeight": 2
      },
      {
        "id": "refuge",
        "labelUz": "Xavfsizlik orolchali",
        "labelEn": "Refuge",
        "iconSrc": "/sr4s_icons/crossing-refuge.png",
        "scoreWeight": 4
      },
      {
        "id": "lights_refuge",
        "labelUz": "Svetofor + orolcha",
        "labelEn": "Lights & Refuge",
        "iconSrc": "/sr4s_icons/crossing-lights-refuge.png",
        "scoreWeight": 5
      },
      {
        "id": "marked_refuge",
        "labelUz": "Zebra + orolcha",
        "labelEn": "Marked & Refuge",
        "iconSrc": "/sr4s_icons/crossing-marked-refuge.png",
        "scoreWeight": 5
      },
      {
        "id": "raised_marked",
        "labelUz": "Ko‘tarilgan + zebra",
        "labelEn": "Raised & Marked",
        "iconSrc": "/sr4s_icons/crossing-raised-marked.png",
        "scoreWeight": 5
      },
      {
        "id": "raised_refuge",
        "labelUz": "Ko‘tarilgan + orolcha",
        "labelEn": "Raised & Refuge",
        "iconSrc": "/sr4s_icons/crossing-raised-refuge.png",
        "scoreWeight": 5
      },
      {
        "id": "raised_marked_refuge",
        "labelUz": "Ko‘tarilgan, zebra va orolcha",
        "labelEn": "Raised, Marked & Refuge",
        "iconSrc": "/sr4s_icons/crossing-raised-marked-refuge.png",
        "scoreWeight": 5
      }
    ]
  },
  {
    "id": "crossing_side_road",
    "code": "SR4S-24",
    "nameUz": "Yon yo‘l piyodalar o‘tish joyi",
    "nameEn": "Crossing Side Road",
    "currentValueId": "lights",
    "options": [
      {
        "id": "none",
        "labelUz": "O‘tish joyi yo‘q",
        "labelEn": "None",
        "iconSrc": "/sr4s_icons/crossing-side-none.png",
        "scoreWeight": 1
      },
      {
        "id": "lights",
        "labelUz": "Svetoforli",
        "labelEn": "Lights",
        "iconSrc": "/sr4s_icons/crossing-side-lights.png",
        "scoreWeight": 5
      },
      {
        "id": "raised",
        "labelUz": "Ko‘tarilgan",
        "labelEn": "Raised",
        "iconSrc": "/sr4s_icons/crossing-side-raised.png",
        "scoreWeight": 5
      },
      {
        "id": "bridge_tunnel",
        "labelUz": "Ko‘prik / Tunnel",
        "labelEn": "Bridge / Tunnel",
        "iconSrc": "/sr4s_icons/crossing-side-bridge-tunnel.png",
        "scoreWeight": 5
      },
      {
        "id": "marked",
        "labelUz": "Chizilgan (Zebra)",
        "labelEn": "Marked",
        "iconSrc": "/sr4s_icons/crossing-side-marked.png",
        "scoreWeight": 4
      },
      {
        "id": "unmarked",
        "labelUz": "Belgilanmagan",
        "labelEn": "Unmarked",
        "iconSrc": "/sr4s_icons/crossing-side-unmarked.png",
        "scoreWeight": 2
      },
      {
        "id": "refuge",
        "labelUz": "Xavfsizlik orolchali",
        "labelEn": "Refuge",
        "iconSrc": "/sr4s_icons/crossing-side-refuge.png",
        "scoreWeight": 4
      },
      {
        "id": "lights_refuge",
        "labelUz": "Svetofor + orolcha",
        "labelEn": "Lights & Refuge",
        "iconSrc": "/sr4s_icons/crossing-side-lights-refuge.png",
        "scoreWeight": 5
      },
      {
        "id": "marked_refuge",
        "labelUz": "Zebra + orolcha",
        "labelEn": "Marked & Refuge",
        "iconSrc": "/sr4s_icons/crossing-side-marked-refuge.png",
        "scoreWeight": 5
      },
      {
        "id": "raised_marked",
        "labelUz": "Ko‘tarilgan + zebra",
        "labelEn": "Raised & Marked",
        "iconSrc": "/sr4s_icons/crossing-side-raised-marked.png",
        "scoreWeight": 5
      },
      {
        "id": "raised_refuge",
        "labelUz": "Ko‘tarilgan + orolcha",
        "labelEn": "Raised & Refuge",
        "iconSrc": "/sr4s_icons/crossing-side-raised-refuge.png",
        "scoreWeight": 5
      },
      {
        "id": "raised_marked_refuge",
        "labelUz": "Ko‘tarilgan, zebra va orolcha",
        "labelEn": "Raised, Marked & Refuge",
        "iconSrc": "/sr4s_icons/crossing-side-raised-marked-refuge.png",
        "scoreWeight": 5
      }
    ]
  },
  {
    "id": "crossing_quality",
    "code": "SR4S-25",
    "nameUz": "O‘tish joyi sifati",
    "nameEn": "Crossing Quality",
    "currentValueId": "adequate",
    "options": [
      {
        "id": "adequate",
        "labelUz": "Talabga to‘liq javob beradi",
        "labelEn": "Adequate",
        "iconSrc": "/sr4s_icons/icon-adequate.png",
        "scoreWeight": 5,
        "badgeText": "ADEQUATE",
        "badgeColor": "teal"
      },
      {
        "id": "poor",
        "labelUz": "Yomon / Yetarli emas",
        "labelEn": "Poor",
        "iconSrc": "/sr4s_icons/icon-poor.png",
        "scoreWeight": 2,
        "badgeText": "POOR",
        "badgeColor": "red"
      },
      {
        "id": "na",
        "labelUz": "Qo‘llanilmaydi",
        "labelEn": "Not Applicable",
        "iconSrc": "/sr4s_icons/icon-na.png",
        "scoreWeight": 4,
        "badgeText": "NA",
        "badgeColor": "orange"
      }
    ]
  },
  {
    "id": "vehicles_per_day",
    "code": "SR4S-26",
    "nameUz": "Kunlik transport oqimi",
    "nameEn": "Vehicles / Day",
    "currentValueId": "100",
    "customValue": "100",
    "isInput": true,
    "inputUnit": "avto/kun",
    "options": []
  },
  {
    "id": "crossing_flow",
    "code": "SR4S-27",
    "nameUz": "O‘tish joyi piyodalar oqimi",
    "nameEn": "Crossing Flow",
    "currentValueId": "present",
    "options": [
      {
        "id": "not_present",
        "labelUz": "Mavjud emas",
        "labelEn": "Not Present",
        "iconSrc": "/sr4s_icons/pedestrians-crossing-not-present.png",
        "scoreWeight": 5,
        "badgeText": "NOT PRESENT",
        "badgeColor": "red"
      },
      {
        "id": "present",
        "labelUz": "Mavjud",
        "labelEn": "Present",
        "iconSrc": "/sr4s_icons/pedestrians-crossing-present.png",
        "scoreWeight": 4,
        "badgeText": "PRESENT",
        "badgeColor": "teal"
      }
    ]
  },
  {
    "id": "right_side_flow",
    "code": "SR4S-28",
    "nameUz": "O‘ng tomon piyodalar oqimi",
    "nameEn": "Right Side Flow",
    "currentValueId": "present",
    "options": [
      {
        "id": "not_present",
        "labelUz": "Mavjud emas",
        "labelEn": "Not Present",
        "iconSrc": "/sr4s_icons/pedestrians-right-not-present.png",
        "scoreWeight": 5,
        "badgeText": "NOT PRESENT",
        "badgeColor": "red"
      },
      {
        "id": "present",
        "labelUz": "Mavjud",
        "labelEn": "Present",
        "iconSrc": "/sr4s_icons/pedestrians-right-present.png",
        "scoreWeight": 4,
        "badgeText": "PRESENT",
        "badgeColor": "teal"
      }
    ]
  },
  {
    "id": "left_side_flow",
    "code": "SR4S-29",
    "nameUz": "Chap tomon piyodalar oqimi",
    "nameEn": "Left Side Flow",
    "currentValueId": "present",
    "options": [
      {
        "id": "not_present",
        "labelUz": "Mavjud emas",
        "labelEn": "Not Present",
        "iconSrc": "/sr4s_icons/pedestrians-left-not-present.png",
        "scoreWeight": 5,
        "badgeText": "NOT PRESENT",
        "badgeColor": "red"
      },
      {
        "id": "present",
        "labelUz": "Mavjud",
        "labelEn": "Present",
        "iconSrc": "/sr4s_icons/pedestrians-left-present.png",
        "scoreWeight": 4,
        "badgeText": "PRESENT",
        "badgeColor": "teal"
      }
    ]
  },
  {
    "id": "intersection_type",
    "code": "SR4S-30",
    "nameUz": "Chorraha / Kesishish turi",
    "nameEn": "Intersection Type",
    "currentValueId": "4_leg",
    "options": [
      {
        "id": "merge_lane",
        "labelUz": "Qo‘shilish qatori",
        "labelEn": "Merge Lane",
        "iconSrc": "/sr4s_icons/intersection-merge-lane.png",
        "scoreWeight": 4
      },
      {
        "id": "3_leg",
        "labelUz": "3 tomonli (T-simon)",
        "labelEn": "3 Leg",
        "iconSrc": "/sr4s_icons/intersection-3-leg.png",
        "scoreWeight": 3
      },
      {
        "id": "3_leg_signal",
        "labelUz": "3 tomonli + svetofor",
        "labelEn": "3 Leg & Signal",
        "iconSrc": "/sr4s_icons/intersection-3-leg-signal.png",
        "scoreWeight": 5
      },
      {
        "id": "3_leg_turn_lane",
        "labelUz": "3 tomonli + burilish qatori",
        "labelEn": "3 Leg & Turn Lane",
        "iconSrc": "/sr4s_icons/intersection-3-leg-turn-lane.png",
        "scoreWeight": 4
      },
      {
        "id": "3_leg_turn_signal",
        "labelUz": "3 tomonli, burilish + svetofor",
        "labelEn": "3 Leg, Turn Lane & Signal",
        "iconSrc": "/sr4s_icons/intersection-3-leg-turn-lane-signal.png",
        "scoreWeight": 5
      },
      {
        "id": "4_leg",
        "labelUz": "4 yoki undan ortiq tomonli",
        "labelEn": "4 or More Leg",
        "iconSrc": "/sr4s_icons/intersection-4-leg.png",
        "scoreWeight": 2
      },
      {
        "id": "4_leg_turn_lane",
        "labelUz": "4 tomonli + burilish qatori",
        "labelEn": "4 or More Leg & Turn Lane",
        "iconSrc": "/sr4s_icons/intersection-4-leg-turn-lane.png",
        "scoreWeight": 4
      },
      {
        "id": "4_leg_signal",
        "labelUz": "4 tomonli + svetofor",
        "labelEn": "4 or More Leg & Signal",
        "iconSrc": "/sr4s_icons/intersection-4-leg-signal.png",
        "scoreWeight": 5
      },
      {
        "id": "4_leg_turn_signal",
        "labelUz": "4 tomonli, burilish + svetofor",
        "labelEn": "4 or More Leg, Turn Lane & Signal",
        "iconSrc": "/sr4s_icons/intersection-4-leg-turn-lane-signal.png",
        "scoreWeight": 5
      },
      {
        "id": "roundabout",
        "labelUz": "Aylanma harakat",
        "labelEn": "Roundabout",
        "iconSrc": "/sr4s_icons/intersection-roundabout.png",
        "scoreWeight": 4
      },
      {
        "id": "mini_roundabout",
        "labelUz": "Kichik aylanma harakat",
        "labelEn": "Mini Roundabout",
        "iconSrc": "/sr4s_icons/intersection-mini-roundabout.png",
        "scoreWeight": 4
      },
      {
        "id": "formal_u_turn",
        "labelUz": "Rasmiy qayrilib olish",
        "labelEn": "Formal U Turn",
        "iconSrc": "/sr4s_icons/intersection-formal-u-turn.png",
        "scoreWeight": 4
      },
      {
        "id": "informal_u_turn",
        "labelUz": "Norasmiy qayrilib olish",
        "labelEn": "Informal U Turn",
        "iconSrc": "/sr4s_icons/intersection-informal-u-turn.png",
        "scoreWeight": 2
      },
      {
        "id": "active_train",
        "labelUz": "Poyezd o‘tish joyi (Faol)",
        "labelEn": "Active Train",
        "iconSrc": "/sr4s_icons/intersection-active-train.png",
        "scoreWeight": 4
      },
      {
        "id": "passive_train",
        "labelUz": "Poyezd o‘tish joyi (Passiv)",
        "labelEn": "Passive Train",
        "iconSrc": "/sr4s_icons/intersection-passive-train.png",
        "scoreWeight": 2
      },
      {
        "id": "no_intersection",
        "labelUz": "Chorraha yo‘q",
        "labelEn": "No Intersection",
        "iconSrc": "/sr4s_icons/intersection-no.png",
        "scoreWeight": 5
      },
      {
        "id": "short_merge",
        "labelUz": "Qisqa qo‘shilish yo‘lagi",
        "labelEn": "Short merge/weaving lane",
        "iconSrc": "/sr4s_icons/intersection-short-merge.png",
        "scoreWeight": 3
      },
      {
        "id": "diverge_lane",
        "labelUz": "Ajralish qatori",
        "labelEn": "Diverge lane",
        "iconSrc": "/sr4s_icons/intersection-diverge-lane.png",
        "scoreWeight": 4
      }
    ]
  },
  {
    "id": "driveways",
    "code": "SR4S-31",
    "nameUz": "Hovli va tijorat kirish yo‘llari",
    "nameEn": "Driveways",
    "currentValueId": "2_plus_residential",
    "options": [
      {
        "id": "1_2_residential",
        "labelUz": "1 yoki 2 ta turar-joy kirish yo‘li",
        "labelEn": "1 or 2 Residential",
        "iconSrc": "/sr4s_icons/driveway-1-2.png",
        "scoreWeight": 4
      },
      {
        "id": "2_plus_residential",
        "labelUz": "> 2 ta turar-joy kirish yo‘li",
        "labelEn": "> 2 Residential",
        "iconSrc": "/sr4s_icons/driveway-3-plus.png",
        "scoreWeight": 3
      },
      {
        "id": "commercial",
        "labelUz": "Tijorat kirish yo‘li",
        "labelEn": "Commercial",
        "iconSrc": "/sr4s_icons/driveway-commercial.png",
        "scoreWeight": 2
      },
      {
        "id": "not_applicable",
        "labelUz": "Qo‘llanmaydi",
        "labelEn": "Not Applicable",
        "iconSrc": "/sr4s_icons/icon-na.png",
        "scoreWeight": 5,
        "badgeText": "NA",
        "badgeColor": "orange"
      }
    ]
  },
  {
    "id": "intersection_side_flow",
    "code": "SR4S-32",
    "nameUz": "Chorraha yon yo‘l transport oqimi",
    "nameEn": "Intersection Side Flow",
    "currentValueId": "4999.00",
    "customValue": "4999.00",
    "isInput": true,
    "inputUnit": "avto",
    "options": []
  },
  {
    "id": "intersection_quality",
    "code": "SR4S-33",
    "nameUz": "Chorraha xavfsizligi sifati",
    "nameEn": "Intersection Quality",
    "currentValueId": "adequate",
    "options": [
      {
        "id": "adequate",
        "labelUz": "Yetarli / Xavfsiz",
        "labelEn": "Adequate",
        "iconSrc": "/sr4s_icons/icon-adequate.png",
        "scoreWeight": 5,
        "badgeText": "ADEQUATE",
        "badgeColor": "teal"
      },
      {
        "id": "poor",
        "labelUz": "Xavfli / Ko‘rinishi yomon",
        "labelEn": "Poor",
        "iconSrc": "/sr4s_icons/icon-poor.png",
        "scoreWeight": 1,
        "badgeText": "POOR",
        "badgeColor": "red"
      },
      {
        "id": "not_applicable",
        "labelUz": "Chorraha yo‘q",
        "labelEn": "Not Applicable",
        "iconSrc": "/sr4s_icons/icon-na.png",
        "scoreWeight": 5,
        "badgeText": "NA",
        "badgeColor": "orange"
      }
    ]
  },
  {
    "id": "curve_type",
    "code": "SR4S-34",
    "nameUz": "Yo‘l burilishi turi",
    "nameEn": "Curve Type",
    "currentValueId": "straight",
    "options": [
      {
        "id": "straight",
        "labelUz": "To‘g‘ri yo‘l",
        "labelEn": "Straight",
        "iconSrc": "/sr4s_icons/curve-straight.png",
        "scoreWeight": 5
      },
      {
        "id": "moderate",
        "labelUz": "O‘rtacha burilish",
        "labelEn": "Moderate",
        "iconSrc": "/sr4s_icons/curve-moderate.png",
        "scoreWeight": 3
      },
      {
        "id": "sharp",
        "labelUz": "O‘tkir burilish",
        "labelEn": "Sharp",
        "iconSrc": "/sr4s_icons/curve-sharp.png",
        "scoreWeight": 2
      },
      {
        "id": "very_sharp",
        "labelUz": "O‘ta keskin burilish",
        "labelEn": "Very Sharp",
        "iconSrc": "/sr4s_icons/curve-very-sharp.png",
        "scoreWeight": 1
      }
    ]
  },
  {
    "id": "curve_quality",
    "code": "SR4S-35",
    "nameUz": "Burilish sifati va ko‘rinishi",
    "nameEn": "Curve Quality",
    "currentValueId": "not_curve",
    "options": [
      {
        "id": "adequate",
        "labelUz": "Yetarli ko‘rish",
        "labelEn": "Adequate",
        "iconSrc": "/sr4s_icons/icon-adequate.png",
        "scoreWeight": 5,
        "badgeText": "ADEQUATE",
        "badgeColor": "teal"
      },
      {
        "id": "poor",
        "labelUz": "Ko‘rinish xavfli",
        "labelEn": "Poor",
        "iconSrc": "/sr4s_icons/icon-poor.png",
        "scoreWeight": 1,
        "badgeText": "POOR",
        "badgeColor": "red"
      },
      {
        "id": "not_curve",
        "labelUz": "Burilish emas",
        "labelEn": "Not Curve",
        "iconSrc": "/sr4s_icons/icon-na.png",
        "scoreWeight": 5,
        "badgeText": "NA",
        "badgeColor": "orange"
      }
    ]
  },
  {
    "id": "speed_limit",
    "code": "SR4S-36",
    "nameUz": "Tezlik cheklovi belgisi",
    "nameEn": "Speed Limit",
    "currentValueId": "40",
    "customValue": "40",
    "isSlider": true,
    "min": 10,
    "max": 130,
    "step": 5,
    "inputUnit": "km/h",
    "options": [
      {
        "id": "40",
        "labelUz": "40 km/h",
        "labelEn": "40 km/h",
        "iconSrc": "/sr4s_icons/speed-limit.png",
        "scoreWeight": 4,
        "badgeText": "40 km/h"
      }
    ]
  },
  {
    "id": "operating_speed",
    "code": "SR4S-37",
    "nameUz": "Haqiqiy harakat tezligi (Operating Speed)",
    "nameEn": "Operating Speed",
    "currentValueId": "40",
    "customValue": "40",
    "isSlider": true,
    "min": 10,
    "max": 130,
    "step": 5,
    "inputUnit": "km/h",
    "options": [
      {
        "id": "40",
        "labelUz": "40 km/h",
        "labelEn": "40 km/h",
        "iconSrc": "/sr4s_icons/operating-speed.png",
        "scoreWeight": 4,
        "badgeText": "40 km/h"
      }
    ]
  },
  {
    "id": "speed_management",
    "code": "SR4S-38",
    "nameUz": "Tezlikni majburiy pasaytirgichlar",
    "nameEn": "Speed Management",
    "currentValueId": "not_present",
    "options": [
      {
        "id": "present",
        "labelUz": "Mavjud",
        "labelEn": "Present",
        "iconSrc": "/sr4s_icons/icon-present.png",
        "scoreWeight": 5,
        "badgeText": "PRESENT",
        "badgeColor": "teal"
      },
      {
        "id": "not_present",
        "labelUz": "Mavjud emas",
        "labelEn": "Not Present",
        "iconSrc": "/sr4s_icons/icon-not-present.png",
        "scoreWeight": 2,
        "badgeText": "NOT PRESENT",
        "badgeColor": "red"
      }
    ]
  },
  {
    "id": "motorcycle_percent",
    "code": "SR4S-39",
    "nameUz": "Mototsikl va mopedlar ulushi",
    "nameEn": "Motorcycle %",
    "currentValueId": "not_recorded",
    "options": [
      {
        "id": "not_recorded",
        "labelUz": "Yozib olinmagan",
        "labelEn": "Not recorded",
        "iconSrc": "/sr4s_icons/motorcycle-percent-na.png",
        "scoreWeight": 5,
        "badgeText": "NA"
      },
      {
        "id": "0",
        "labelUz": "0%",
        "labelEn": "0%",
        "iconSrc": "/sr4s_icons/motorcycle-percent-0.png",
        "scoreWeight": 5
      },
      {
        "id": "1_5",
        "labelUz": "1% - 5%",
        "labelEn": "1% - 5%",
        "iconSrc": "/sr4s_icons/motorcycle-percent-1-5.png",
        "scoreWeight": 4
      },
      {
        "id": "6_10",
        "labelUz": "6% - 10%",
        "labelEn": "6% - 10%",
        "iconSrc": "/sr4s_icons/motorcycle-percent-6-10.png",
        "scoreWeight": 4
      },
      {
        "id": "11_20",
        "labelUz": "11% - 20%",
        "labelEn": "11% - 20%",
        "iconSrc": "/sr4s_icons/motorcycle-percent-11-20.png",
        "scoreWeight": 3
      },
      {
        "id": "21_40",
        "labelUz": "21% - 40%",
        "labelEn": "21% - 40%",
        "iconSrc": "/sr4s_icons/motorcycle-percent-21-40.png",
        "scoreWeight": 3
      },
      {
        "id": "41_60",
        "labelUz": "41% - 60%",
        "labelEn": "41% - 60%",
        "iconSrc": "/sr4s_icons/motorcycle-percent-41-60.png",
        "scoreWeight": 2
      },
      {
        "id": "61_80",
        "labelUz": "61% - 80%",
        "labelEn": "61% - 80%",
        "iconSrc": "/sr4s_icons/motorcycle-percent-61-80.png",
        "scoreWeight": 2
      },
      {
        "id": "81_99",
        "labelUz": "81% - 99%",
        "labelEn": "81% - 99%",
        "iconSrc": "/sr4s_icons/motorcycle-percent-81-99.png",
        "scoreWeight": 1
      },
      {
        "id": "100",
        "labelUz": "100%",
        "labelEn": "100%",
        "iconSrc": "/sr4s_icons/motorcycle-percent-100.png",
        "scoreWeight": 1
      }
    ]
  },
  {
    "id": "hgv_percent",
    "code": "SR4S-40",
    "nameUz": "Og‘ir yuk mashinalari ulushi",
    "nameEn": "HGV %",
    "currentValueId": "not_recorded",
    "options": [
      {
        "id": "not_recorded",
        "labelUz": "Yozib olinmagan",
        "labelEn": "Not recorded",
        "iconSrc": "/sr4s_icons/hgv-percent-na.png",
        "scoreWeight": 5,
        "badgeText": "NA"
      },
      {
        "id": "0_5",
        "labelUz": "0% dan <5% gacha",
        "labelEn": "0% to <5%",
        "iconSrc": "/sr4s_icons/hgv-percent-0-5.png",
        "scoreWeight": 5
      },
      {
        "id": "5_10",
        "labelUz": "5% dan <10% gacha",
        "labelEn": "5% to <10%",
        "iconSrc": "/sr4s_icons/hgv-percent-5-10.png",
        "scoreWeight": 4
      },
      {
        "id": "10_15",
        "labelUz": "10% dan <15% gacha",
        "labelEn": "10% to <15%",
        "iconSrc": "/sr4s_icons/hgv-percent-10-15.png",
        "scoreWeight": 3
      },
      {
        "id": "15_20",
        "labelUz": "15% dan <20% gacha",
        "labelEn": "15% to <20%",
        "iconSrc": "/sr4s_icons/hgv-percent-15-20.png",
        "scoreWeight": 3
      },
      {
        "id": "20_30",
        "labelUz": "20% dan <30% gacha",
        "labelEn": "20% to <30%",
        "iconSrc": "/sr4s_icons/hgv-percent-20-30.png",
        "scoreWeight": 2
      },
      {
        "id": "30_40",
        "labelUz": "30% dan <40% gacha",
        "labelEn": "30% to <40%",
        "iconSrc": "/sr4s_icons/hgv-percent-30-40.png",
        "scoreWeight": 2
      },
      {
        "id": "40_plus",
        "labelUz": ">= 40%",
        "labelEn": ">= 40%",
        "iconSrc": "/sr4s_icons/hgv-percent-40-plus.png",
        "scoreWeight": 1
      }
    ]
  }
];
