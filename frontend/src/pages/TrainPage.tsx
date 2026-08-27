import TrainForm from "../components/TrainForm";
import ConfirmDialog from "../components/confirmDialog";
import { useState } from "react";
import { useTrain } from "../hooks/useTrain";
import type { Train, TrainFormValues } from "../types/train";
export default function StationPage() {
  const { trains, addTrain, editTrain, deleteTrain } = useTrain();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrain, setEditingTrain] = useState<Train | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [TrainPendingDelete, setTrainPendingDelete] = useState<Train | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const openCreateModal = () => {
    setIsModalOpen(true);
    setEditingTrain(null);
  };
  const openEditingModal = (train: Train) => {
    setIsModalOpen(true);
    setEditingTrain(train);
  };
  const handleSubmit = async (values: TrainFormValues) => {
    if (editingTrain) {
      await editTrain(values, editingTrain.id);
    } else {
      await addTrain(values);
    }
  };
  const requestDelete = (train: Train) => {
    setDeleteError(null);
    setTrainPendingDelete(train);
  };
  const confirmDelete = async () => {
    if (!TrainPendingDelete) return null;
    setIsDeleting(true);
    try {
      await deleteTrain(TrainPendingDelete.id);
      setTrainPendingDelete(null);
    } catch (err: any) {
      setDeleteError(err?.response?.data?.message ?? "Failed to delete train");
      setTrainPendingDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Stations</h1>
          <p className="text-sm text-slate-500 mt-1">Manage railway stations</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800"
        >
          Add Train
        </button>
      </div>

      {deleteError && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {deleteError}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                Name
              </th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                TrainNumber
              </th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                type
              </th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                Capacity
              </th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                manufacturer
              </th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                Model
              </th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                year built
              </th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                status
              </th>
              <th className="text-right px-4 py-3 font-medium text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {trains.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center px-4 py-8 text-slate-400"
                >
                  No Trains yet. Click "Add Train" to create one.
                </td>
              </tr>
            ) : (
              trains.map((train: Train) => (
                <tr
                  key={train.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-3 text-slate-900">{train.name}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {train.trainNumber}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{train.type}</td>
                  <td className="px-4 py-3 text-slate-600">{train.capacity}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {train.manufacturer}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{train.model}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {train.yearBuilt}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        train.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700"
                          : train.status === "MAINTENANCE"
                            ? "bg-emerald-50 text-slate-700"
                            : "bg-slate-100 text-red-600"
                      }`}
                    >
                      {train.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => openEditingModal(train)}
                      className="text-slate-600 hover:text-slate-900 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => requestDelete(train)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TrainForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingTrain}
      />

      <ConfirmDialog
        isOpen={TrainPendingDelete !== null}
        title="Delete station?"
        message={
          TrainPendingDelete
            ? `Are you sure you want to delete "${TrainPendingDelete.name}"? This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        isDangerous
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setTrainPendingDelete(null)}
        loadingTag="Deleting"
      />
    </div>
  );
}
