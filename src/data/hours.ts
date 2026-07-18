import type { HoursEntry, HoursGroup } from "@/types/business";

export const hours: HoursEntry[] = [
  {
    index: 1,
    label: "Ponedjeljak",
    shortLabel: "PON",
    opensAt: "10:00",
    closesAt: "22:00",
    isWeekend: false
  },
  {
    index: 2,
    label: "Utorak",
    shortLabel: "UTO",
    opensAt: "10:00",
    closesAt: "22:00",
    isWeekend: false
  },
  {
    index: 3,
    label: "Srijeda",
    shortLabel: "SRI",
    opensAt: "10:00",
    closesAt: "22:00",
    isWeekend: false
  },
  {
    index: 4,
    label: "Četvrtak",
    shortLabel: "ČET",
    opensAt: "10:00",
    closesAt: "22:00",
    isWeekend: false
  },
  {
    index: 5,
    label: "Petak",
    shortLabel: "PET",
    opensAt: "10:00",
    closesAt: "22:00",
    isWeekend: false
  },
  {
    index: 6,
    label: "Subota",
    shortLabel: "SUB",
    opensAt: "10:00",
    closesAt: "20:00",
    isWeekend: true
  },
  {
    index: 7,
    label: "Nedjelja",
    shortLabel: "NED",
    opensAt: "10:00",
    closesAt: "20:00",
    isWeekend: true
  }
];

export const hourGroups: HoursGroup[] = [
  {
    key: "weekday",
    label: "Radni dani",
    daysLabel: "PON–PET",
    timeLabel: "10:00–22:00"
  },
  {
    key: "weekend",
    label: "Vikend",
    daysLabel: "SUB–NED",
    timeLabel: "10:00–20:00"
  }
];

export const openingHoursSpecification = hours.map((entry) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ][entry.index - 1],
  opens: entry.opensAt,
  closes: entry.closesAt
}));
