export type GymMachineCategory =
  | "SELECTION"
  | "STRENGTH"
  | "CARDIO";

export interface GymMapRect {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface GymMachine extends GymMapRect {
  id: string;
  label: string;
  name: string;
  category: GymMachineCategory;
  image: string;
  imageAlt: string;
  labelRotation?: number;
  touchPadding?: number;
}

export interface GymLandmark extends GymMapRect {
  id: string;
  label: string;
  labelRotation?: number;
}

export interface GymWallPath {
  id: string;
  d: string;
}

const placeholderImage = "/images/equipment/placeholder.svg";

const machine = (
  id: string,
  label: string,
  name: string,
  category: GymMachineCategory,
  rect: GymMapRect,
  labelRotation = 0,
  touchPadding = 8
): GymMachine => ({
  id,
  label,
  name,
  category,
  image: placeholderImage,
  imageAlt: `Placeholder za fotografiju sprave ${name}`,
  labelRotation,
  touchPadding,
  ...rect
});

export const gymFloorPlan = {
  viewBox: {
    width: 1448,
    height: 1086
  },
  wallPaths: [
    {
      id: "upper-main-room",
      d: "M360 47 H1038 V389"
    },
    {
      id: "upper-left-indentation",
      d: "M360 221 V289 H164 V354"
    },
    {
      id: "left-and-lower-main-room",
      d: "M164 505 V1018 H1030"
    },
    {
      id: "right-cardio-room",
      d: "M1038 291 H1388 V1018 H1030 V801"
    },
    {
      id: "middle-right-opening-post",
      d: "M1029 470 V619"
    }
  ] satisfies GymWallPath[],
  landmarks: [
    {
      id: "pult",
      label: "PULT",
      x: 360,
      y: 48,
      width: 122,
      height: 173,
      rotation: 0,
      labelRotation: 90
    },
    {
      id: "ulaz",
      label: "ULAZ",
      x: 95,
      y: 354,
      width: 70,
      height: 151,
      rotation: 0,
      labelRotation: 90
    },
    {
      id: "bucice",
      label: "BUČICE",
      x: 380,
      y: 946,
      width: 480,
      height: 53,
      rotation: 0
    }
  ] satisfies GymLandmark[],
  machines: [
    machine("m1", "M1", "Technogym Selection Lat Pulldown", "SELECTION", {
      x: 498,
      y: 61,
      width: 132,
      height: 68,
      rotation: 0
    }),
    machine("m2", "M2", "Technogym Selection Kickback", "SELECTION", {
      x: 654,
      y: 61,
      width: 132,
      height: 68,
      rotation: 0
    }),
    machine("m3", "M3", "Technogym Selection Lateral Raise", "SELECTION", {
      x: 822,
      y: 61,
      width: 132,
      height: 68,
      rotation: 0
    }),
    machine("m4", "M4", "Cable Row / Lat Pulldown", "STRENGTH", {
      x: 917,
      y: 145,
      width: 89,
      height: 69,
      rotation: 0
    }, 0, 5),
    machine("m5", "M5", "Technogym Selection Leg Extension", "SELECTION", {
      x: 917,
      y: 227,
      width: 89,
      height: 68,
      rotation: 0
    }, 0, 5),
    machine("m6", "M6", "Technogym Selection Incline Chest Press", "SELECTION", {
      x: 919,
      y: 310,
      width: 89,
      height: 69,
      rotation: 0
    }, 0, 5),
    machine("m7", "M7", "Power Tower", "STRENGTH", {
      x: 921,
      y: 489,
      width: 88,
      height: 114,
      rotation: 0
    }, 0, 6),
    machine("m8", "M8", "Smith Machine", "STRENGTH", {
      x: 921,
      y: 857,
      width: 88,
      height: 119,
      rotation: 0
    }, 0, 6),
    machine("m9", "M9", "Incline Bench Press", "STRENGTH", {
      x: 189,
      y: 839,
      width: 123,
      height: 87,
      rotation: 0
    }),
    machine("m10", "M10", "Flat Bench Press", "STRENGTH", {
      x: 189,
      y: 694,
      width: 123,
      height: 87,
      rotation: 0
    }),
    machine("m11", "M11", "Squat Rack", "STRENGTH", {
      x: 442,
      y: 538,
      width: 145,
      height: 112,
      rotation: 0
    }),
    machine("m12", "M12", "Technogym Selection Leg Curl", "SELECTION", {
      x: 458,
      y: 330,
      width: 142,
      height: 71,
      rotation: 0
    }, 0, 5),
    machine("m13", "M13", "Technogym Selection Cable Jungle", "SELECTION", {
      x: 618,
      y: 270,
      width: 139,
      height: 78,
      rotation: 0
    }),
    machine("m14", "M14", "Technogym Selection Hip Abduction", "SELECTION", {
      x: 1054,
      y: 817,
      width: 136,
      height: 88,
      rotation: 0
    }, 0, 7),
    machine("m15", "M15", "Technogym Selection Hip Adduction", "SELECTION", {
      x: 1054,
      y: 928,
      width: 136,
      height: 75,
      rotation: 0
    }, 0, 7),
    machine("m16", "M16", "Technogym Selection Ab Crunch", "SELECTION", {
      x: 1063,
      y: 311,
      width: 136,
      height: 70,
      rotation: 0
    }),
    machine("m17", "M17", "Back Extension Bench", "STRENGTH", {
      x: 1220,
      y: 311,
      width: 136,
      height: 70,
      rotation: 0
    }),
    machine("m18", "M18", "Technogym Selection Chest Press", "SELECTION", {
      x: 458,
      y: 410,
      width: 142,
      height: 70,
      rotation: 0
    }, 0, 5),
    machine("m19", "M19", "Technogym Selection Cable Crossover", "SELECTION", {
      x: 638,
      y: 460,
      width: 206,
      height: 63,
      rotation: 0
    }),
    machine("c1", "C", "Technogym traka za trčanje", "CARDIO", {
      x: 1200,
      y: 432,
      width: 165,
      height: 80,
      rotation: 0
    }, 0, 5),
    machine("c2", "C", "Technogym traka za trčanje", "CARDIO", {
      x: 1200,
      y: 530,
      width: 165,
      height: 80,
      rotation: 0
    }, 0, 5),
    machine("c3", "C", "Technogym traka za trčanje", "CARDIO", {
      x: 1200,
      y: 629,
      width: 165,
      height: 80,
      rotation: 0
    }, 0, 5),
    machine("c4", "C", "Technogym traka za trčanje", "CARDIO", {
      x: 1200,
      y: 729,
      width: 165,
      height: 80,
      rotation: 0
    }, 0, 5)
  ] satisfies GymMachine[]
};
