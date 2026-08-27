import { useState, type FormEvent, useEffect } from "react";
import type {
  Station,
  StationFormValues,
  StationStatus,
} from "../types/station";

interface StationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: StationFormValues) => Promise<void>;
  initialData?: Station | null;
}

const emptyForm: StationFormValues = {
  name: "",
  code: "",
  address: "",
  numberOfPlatforms: 1,
  status: "ACTIVE",
};

export default function StationForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: StationFormProps) {
  const [values, setValues] = useState<StationFormValues>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setValues({
        name: initialData?.name,
        code: initialData?.code,
        address: initialData?.address,
        numberOfPlatforms: initialData?.numberOfPlatforms,
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
              Code
            </label>
            <input
              required
              value={values.code}
              onChange={(e) =>
                setValues({ ...values, code: e.target.value.toUpperCase() })
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="e.g. NBI"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Address
            </label>
            <input
              required
              value={values.address}
              onChange={(e) =>
                setValues({ ...values, address: e.target.value })
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Number of Platforms
            </label>
            <input
              required
              type="number"
              min={1}
              value={values.numberOfPlatforms}
              onChange={(e) =>
                setValues({
                  ...values,
                  numberOfPlatforms: Number(e.target.value),
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
                  status: e.target.value as StationStatus,
                })
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
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
