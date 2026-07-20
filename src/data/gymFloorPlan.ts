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
  touchPadding = 9
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
    width: 804,
    height: 695
  },
  wallPaths: [
    {
      id: "upper-left-and-top",
      d: "M190 29 L190 146 L261 146 L261 32 L579 32 L579 248"
    },
    {
      id: "left-wall-and-bottom",
      d: "M190 146 L190 188 L78 188 L78 649 L575 649"
    },
    {
      id: "right-cardio-room",
      d: "M579 186 L777 186 L777 651 L575 649 L575 510"
    },
    {
      id: "middle-right-opening-post",
      d: "M575 303 L575 393"
    },
    {
      id: "entry-marker",
      d: "M43 229 L79 229 L79 324 L43 324 Z"
    }
  ] satisfies GymWallPath[],
  landmarks: [
    {
      id: "pult",
      label: "PULT",
      x: 191,
      y: 32,
      width: 70,
      height: 114,
      rotation: 0,
      labelRotation: 90
    },
    {
      id: "ulaz",
      label: "ULAZ",
      x: 43,
      y: 229,
      width: 36,
      height: 95,
      rotation: 0,
      labelRotation: 90
    },
    {
      id: "bucice",
      label: "BUČICE",
      x: 206,
      y: 604,
      width: 274,
      height: 30,
      rotation: 0
    }
  ] satisfies GymLandmark[],
  machines: [
    machine("m1", "M1", "Technogym Selection Lat Pulldown", "SELECTION", {
      x: 271,
      y: 46,
      width: 73,
      height: 38,
      rotation: 0
    }),
    machine("m2", "M2", "Technogym Selection Kickback", "SELECTION", {
      x: 363,
      y: 43,
      width: 69,
      height: 43,
      rotation: 0
    }),
    machine("m3", "M3", "Technogym Selection Lateral Raise", "SELECTION", {
      x: 464,
      y: 43,
      width: 61,
      height: 43,
      rotation: 0
    }),
    machine("m4", "M4", "Cable Row / Lat Pulldown", "STRENGTH", {
      x: 513,
      y: 95,
      width: 44,
      height: 51,
      rotation: 0
    }, 90, 12),
    machine("m5", "M5", "Technogym Selection Leg Extension", "SELECTION", {
      x: 508,
      y: 160,
      width: 49,
      height: 50,
      rotation: 0
    }, 90, 12),
    machine("m6", "M6", "Technogym Selection Incline Chest Press", "SELECTION", {
      x: 509,
      y: 213,
      width: 49,
      height: 45,
      rotation: 0
    }, 90, 12),
    machine("m7", "M7", "Power Tower", "STRENGTH", {
      x: 514,
      y: 313,
      width: 51,
      height: 72,
      rotation: 0
    }, 90, 12),
    machine("m8", "M8", "Smith Machine", "STRENGTH", {
      x: 513,
      y: 547,
      width: 51,
      height: 74,
      rotation: 0
    }, 90, 12),
    machine("m9", "M9", "Incline Bench Press", "STRENGTH", {
      x: 92,
      y: 541,
      width: 65,
      height: 52,
      rotation: 0
    }, 0, 12),
    machine("m10", "M10", "Flat Bench Press", "STRENGTH", {
      x: 94,
      y: 446,
      width: 70,
      height: 53,
      rotation: 0
    }, 0, 12),
    machine("m11", "M11", "Squat Rack", "STRENGTH", {
      x: 237,
      y: 349,
      width: 82,
      height: 64,
      rotation: 0
    }),
    machine("m12", "M12", "Technogym Selection Leg Curl", "SELECTION", {
      x: 248,
      y: 216,
      width: 82,
      height: 47,
      rotation: 0
    }, 0, 12),
    machine("m13", "M13", "Technogym Selection Cable Jungle", "SELECTION", {
      x: 331,
      y: 170,
      width: 86,
      height: 59,
      rotation: 0
    }),
    machine("m14", "M14", "Technogym Selection Hip Abduction", "SELECTION", {
      x: 591,
      y: 525,
      width: 73,
      height: 53,
      rotation: 0
    }, 0, 12),
    machine("m15", "M15", "Technogym Selection Hip Adduction", "SELECTION", {
      x: 592,
      y: 597,
      width: 79,
      height: 47,
      rotation: 0
    }, 0, 12),
    machine("m16", "M16", "Technogym Selection Ab Crunch", "SELECTION", {
      x: 594,
      y: 198,
      width: 72,
      height: 48,
      rotation: 0
    }),
    machine("m17", "M17", "Back Extension Bench", "STRENGTH", {
      x: 683,
      y: 198,
      width: 70,
      height: 47,
      rotation: 0
    }),
    machine("m18", "M18", "Technogym Selection Chest Press", "SELECTION", {
      x: 250,
      y: 263,
      width: 76,
      height: 45,
      rotation: 0
    }, 0, 12),
    machine("m19", "M19", "Technogym Selection Cable Crossover", "SELECTION", {
      x: 351,
      y: 302,
      width: 129,
      height: 34,
      rotation: 0
    }, 0, 12),
    machine("c1", "C", "Technogym traka za trčanje", "CARDIO", {
      x: 671,
      y: 283,
      width: 94,
      height: 48,
      rotation: 0
    }, 0, 10),
    machine("c2", "C", "Technogym traka za trčanje", "CARDIO", {
      x: 671,
      y: 345,
      width: 94,
      height: 47,
      rotation: 0
    }, 0, 10),
    machine("c3", "C", "Technogym traka za trčanje", "CARDIO", {
      x: 671,
      y: 408,
      width: 94,
      height: 47,
      rotation: 0
    }, 0, 10),
    machine("c4", "C", "Technogym traka za trčanje", "CARDIO", {
      x: 671,
      y: 471,
      width: 94,
      height: 47,
      rotation: 0
    }, 0, 10)
  ] satisfies GymMachine[]
};
