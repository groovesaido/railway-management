import {
  fetchStations,
  createStation as createStationApi,
  deleteStation as deleteStationApi,
  updateStation as updateStationApi,
} from "../api/station";
import { useCallback, useState, useEffect } from "react";
import type { Station, StationFormValues } from "../types/station";

export function useStation() {
  const [stations, setStations] = useState<Station[]>([]);
  const [error, setError] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loadStations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchStations();
      setStations(data);
    } catch (err) {
      setError("Failed to load stations");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    loadStations();
  }, [loadStations]);
  const addStation = async (values: StationFormValues) => {
    const newStation = await createStationApi(values);
    setStations((prev) => [newStation, ...prev]);
    return newStation;
  };
  const editStation = async (id: string, values: StationFormValues) => {
    const updated = await updateStationApi(id, values);
    setStations((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return updated;
        } else {
          return r;
        }
      }),
    );
    return updated;
  };
  const removeStation = async (id: string) => {
    await deleteStationApi(id);
    setStations((prev) => prev.filter((r) => r.id !== id));
  };
  return {
    isLoading,
    error,
    addStation,
    stations,
    editStation,
    removeStation,
    reload: loadStations,
  };
}
