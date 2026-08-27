export type StationStatus = "ACTIVE" | "INACTIVE";

export interface Station {
  id: string;
  name: string;
  code: string;
  address: string;
  numberOfPlatforms: number;
  status: StationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface StationFormValues {
  name: string;
  code: string;
  address: string;
  numberOfPlatforms: number;
  status: StationStatus;
}
