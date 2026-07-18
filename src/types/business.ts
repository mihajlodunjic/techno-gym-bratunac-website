export type VerificationStatus =
  | "confirmed"
  | "needs-production-confirmation"
  | "not-confirmed";

export interface BusinessData {
  name: string;
  shortName: string;
  description: string;
  phoneDisplay: string;
  phoneHref: string;
  streetAddress: string;
  addressDisplay: string;
  locality: string;
  postalCode: string;
  countryCode: "BA";
  localityLabel: string;
  language: string;
  timezone: string;
  instagramHandle: string;
  instagramUrl: string;
  mapQueryUrl: string;
  verificationStatus: VerificationStatus;
}

export interface HoursEntry {
  index: number;
  label: string;
  shortLabel: string;
  opensAt: string;
  closesAt: string;
  isWeekend: boolean;
}

export interface HoursGroup {
  key: "weekday" | "weekend";
  label: string;
  daysLabel: string;
  timeLabel: string;
}

export interface MembershipRecord {
  category: "women" | "men";
  durationMonths: number;
  label: string;
  amount: number;
  currency: "KM";
  priceType: "regular";
  verificationStatus: VerificationStatus;
  lastConfirmedAt?: string;
}

export interface EquipmentRecord {
  key: string;
  title: string;
  code: string;
  manufacturer: string;
  line: string;
  description: string;
  quantity?: number;
  quantityLabel?: string;
  sourceStatus: VerificationStatus;
}

export interface NavigationItem {
  href: string;
  label: string;
  shortLabel?: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface BreadcrumbItem {
  href: string;
  label: string;
}

export interface VerificationItem {
  key: string;
  title: string;
  status: VerificationStatus;
  note: string;
}
