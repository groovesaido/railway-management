import type { Station, StationFormValues } from "../types/station";
import apiClient from "./client";

export const fetchStations = async (): Promise<Station[]> => {
  const { data } = await apiClient.get<Station[]>("/admin/station");
  return data;
};
export const fetchStationById = async (id: string): Promise<Station> => {
  const { data } = await apiClient.get<Station>(`/admin/station/${id}`);
  return data;
};
export const createStation = async (
  values: StationFormValues,
): Promise<Station> => {
  const { data } = await apiClient.post<Station>("/admin/station", values);
  return data;
};

export const updateStation = async (
  id: string,
  values: StationFormValues,
): Promise<Station> => {
  const { data } = await apiClient.put<Station>(`/admin/station/${id}`, values);
  return data;
};

export const deleteStation = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/station/${id}`);
};
