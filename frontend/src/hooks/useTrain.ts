import {
  fetchTrains,
  deleteTrain as deleteTrainApi,
  updateTrain,
  createTrain,
} from "../api/train";
import type { Train, TrainFormValues } from "../types/train";
import { useState, useEffect, useCallback } from "react";

export function useTrain() {
  const [trains, setTrains] = useState<Train[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadTrains = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchTrains();
      setTrains(data);
    } catch (err) {
      setError("Failed tot load station");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrains();
  }, [loadTrains]);

  const addTrain = async (values: TrainFormValues) => {
    const newTrain = await createTrain(values);
    setTrains((prev) => [newTrain, ...prev]);
    return newTrain;
  };

  const editTrain = async (values: TrainFormValues, id: string) => {
    const updated = await updateTrain(values, id);
    setTrains((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return updated;
        } else {
          return t;
        }
      }),
    );
    return updateTrain;
  };
  const deleteTrain = async (id: string) => {
    await deleteTrainApi(id);
    setTrains((prev) => prev.filter((r) => r.id !== id));
  };

  return {
    isLoading,
    error,
    editTrain,
    deleteTrain,
    addTrain,
    updateTrain,
    trains,
    reload: loadTrains,
  };
}
