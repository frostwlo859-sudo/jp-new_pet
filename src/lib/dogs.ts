export type DogStatus = "available" | "reserved" | "sold";

export type Dog = {
  id: string;
  name: string;
  sex: "Male" | "Female";
  color: "Blue" | "Red Speckle" | "Blue Mottled";
  birthDate: string;
  price: number;
  status: DogStatus;
  description: string;
  image: string;
  traits: string[];
  sire: string;
  dam: string;
  registered: boolean;
  updatedAt: string;
};

export function dogAgeLabel(birthDate: string): string {
  const born = new Date(birthDate);
  const now = new Date();
  const months =
    (now.getFullYear() - born.getFullYear()) * 12 +
    (now.getMonth() - born.getMonth());
  if (months < 1) return "Newborn";
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem === 0 ? `${years} yr` : `${years} yr ${rem} mo`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function statusLabel(status: DogStatus): string {
  if (status === "available") return "Available to adopt";
  if (status === "reserved") return "Reserved";
  return "Adopted";
}
