export type TrainStatus = "ACTIVE" | "MAINTENANCE" | "DELAYED" | "CANCELLED";

export interface Train {
  id: string;
  trainNumber: string;
  name: string;
  type: string;
  capacity: number;
  status: TrainStatus;
  manufacturer: string;
  model: string;
  yearBuilt: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrainFormValues {
  trainNumber: string;
  name: string;
  type: string;
  capacity: number;
  status: TrainStatus;
  manufacturer: string;
  model: string;
  yearBuilt: string;
}
