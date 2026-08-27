import { useState, type FormEvent, useEffect } from "react";
import type { Train, TrainFormValues, TrainStatus } from "../types/train";

interface TrainFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TrainFormValues) => Promise<void>;
  initialData?: Train | null;
}

const emptyForm: TrainFormValues = {
  name: "",
  trainNumber: "",
  type: "",
  capacity: 10,
  manufacturer: "",
  model: "",
  yearBuilt: "",
  status: "ACTIVE",
};

export default function TrainForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TrainFormProps) {
  const [values, setValues] = useState<TrainFormValues>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setValues({
        name: initialData?.name,
        trainNumber: initialData?.trainNumber,
        type: initialData?.type,
        capacity: initialData?.capacity,
        manufacturer: initialData?.manufacturer,
        model: initialData?.model,
        yearBuilt: initialData?.yearBuilt,
        status: initialData?.status,
      });
    } else {
      setValues(emptyForm);
    }
    setError(null);
  }, [initialData, isOpen]);
  if (!isOpen) return null;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          {isEditMode ? "Edit Station" : "Add Station"}
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              required
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              TrainNumber
            </label>
            <input
              required
              value={values.trainNumber}
              onChange={(e) =>
                setValues({
                  ...values,
                  trainNumber: e.target.value,
                })
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Type
            </label>
            <input
              required
              value={values.type}
              onChange={(e) => setValues({ ...values, type: e.target.value })}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Capacity
            </label>
            <input
              required
              type="number"
              min={1}
              value={values.capacity}
              onChange={(e) =>
                setValues({
                  ...values,
                  capacity: Number(e.target.value),
                })
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Manufacturer
            </label>
            <input
              required
              value={values.manufacturer}
              onChange={(e) =>
                setValues({
                  ...values,
                  manufacturer: e.target.value,
                })
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Model
            </label>
            <input
              required
              value={values.model}
              onChange={(e) =>
                setValues({
                  ...values,
                  model: e.target.value,
                })
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              YearBuilt
            </label>
            <input
              required
              value={values.yearBuilt}
              onChange={(e) =>
                setValues({
                  ...values,
                  yearBuilt: e.target.value,
                })
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              value={values.status}
              onChange={(e) =>
                setValues({
                  ...values,
                  status: e.target.value as TrainStatus,
                })
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="ACTIVE">Active</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="DELAYED">Delayed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md
                         hover:bg-slate-800 disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Add Station"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
