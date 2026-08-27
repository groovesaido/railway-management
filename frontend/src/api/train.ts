import type { Train, TrainFormValues } from "../types/train";

import apiClient from "./client";

export const fetchTrains = async (): Promise<Train[]> => {
  const { data } = await apiClient.get<Train[]>("/admin/train");
  return data;
};

export const fetchTrainById = async (id: string): Promise<Train> => {
  const { data } = await apiClient.get<Train>(`/admin/train/${id}`);
  return data;
};

export const createTrain = async (values: TrainFormValues): Promise<Train> => {
  const { data } = await apiClient.post<Train>("/admin/train", values);
  return data;
};

export const updateTrain = async (
  values: TrainFormValues,
  id: string,
): Promise<Train> => {
  const { data } = await apiClient.put<Train>(`/admin/train/${id}`, values);
  return data;
};

export const deleteTrain = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/train/${id}`);
};
