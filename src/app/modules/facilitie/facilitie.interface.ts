export type TFacility = {
  name: string;
  location: string;
  image: string;
  description?: string;
  availableSlots: number;
  pricePerHour: number;
  isDeleted: boolean;
};
