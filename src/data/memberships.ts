import type { MembershipRecord } from "@/types/business";

export const memberships: MembershipRecord[] = [
  {
    category: "women",
    durationMonths: 1,
    label: "Mjesečna članarina",
    amount: 30,
    currency: "KM",
    priceType: "regular",
    verificationStatus: "needs-production-confirmation"
  },
  {
    category: "women",
    durationMonths: 3,
    label: "Tromjesečna članarina",
    amount: 70,
    currency: "KM",
    priceType: "regular",
    verificationStatus: "needs-production-confirmation"
  },
  {
    category: "women",
    durationMonths: 6,
    label: "Šestomjesečna članarina",
    amount: 150,
    currency: "KM",
    priceType: "regular",
    verificationStatus: "needs-production-confirmation"
  },
  {
    category: "women",
    durationMonths: 12,
    label: "Godišnja članarina",
    amount: 300,
    currency: "KM",
    priceType: "regular",
    verificationStatus: "needs-production-confirmation"
  },
  {
    category: "men",
    durationMonths: 1,
    label: "Mjesečna članarina",
    amount: 40,
    currency: "KM",
    priceType: "regular",
    verificationStatus: "needs-production-confirmation"
  },
  {
    category: "men",
    durationMonths: 3,
    label: "Tromjesečna članarina",
    amount: 100,
    currency: "KM",
    priceType: "regular",
    verificationStatus: "needs-production-confirmation"
  },
  {
    category: "men",
    durationMonths: 6,
    label: "Šestomjesečna članarina",
    amount: 200,
    currency: "KM",
    priceType: "regular",
    verificationStatus: "needs-production-confirmation"
  },
  {
    category: "men",
    durationMonths: 12,
    label: "Godišnja članarina",
    amount: 400,
    currency: "KM",
    priceType: "regular",
    verificationStatus: "needs-production-confirmation"
  }
];

export const membershipCategories = [
  { key: "women", label: "Žene" },
  { key: "men", label: "Muškarci" }
] as const;

export const formatPrice = (amount: number) => `${amount} KM`;
