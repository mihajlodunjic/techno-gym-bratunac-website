import type { EquipmentRecord } from "@/types/business";

export const equipment: EquipmentRecord[] = [
  {
    key: "selection",
    title: "Technogym Selection linija",
    code: "SELECTION / 01",
    manufacturer: "Technogym",
    line: "Selection",
    description:
      "Originalne Technogym Selection sprave omogućavaju podešavanje opterećenja za trening različitih mišićnih grupa.",
    sourceStatus: "confirmed"
  },
  {
    key: "cardio",
    title: "Cardio zona",
    code: "TECHNOGYM / CARDIO",
    manufacturer: "Technogym",
    line: "Cardio zona",
    description:
      "Cardio zona raspolaže sa četiri originalne Technogym trake za trčanje.",
    quantity: 4,
    quantityLabel: "trake za trčanje",
    sourceStatus: "confirmed"
  }
];

export const equipmentFacts = [
  "Originalna Technogym oprema",
  "Technogym Selection linija",
  "Cardio zona sa četiri trake",
  "Prostor sa dosta prirodnog svjetla"
] as const;
