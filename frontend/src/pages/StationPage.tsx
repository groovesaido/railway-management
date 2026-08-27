import StationForm from "../components/stationForm";
import ConfirmDialog from "../components/confirmDialog";
import { useState } from "react";
import { useStation } from "../hooks/useStation";
import type { Station, StationFormValues } from "../types/station";
export default function StationPage() {
  const { stations, addStation, editStation, removeStation } = useStation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [stationPendingDelete, setStationPendingDelete] =
    useState<Station | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openCreateModal = () => {
    setIsModalOpen(true);
    setEditingStation(null);
  };
  const openEditingModal = (station: Station) => {
    setIsModalOpen(true);
    setEditingStation(station);
  };
  const handleSubmit = async (values: StationFormValues) => {
    if (editingStation) {
      await editStation(editingStation.id, values);
    } else {
      await addStation(values);
    }
  };
  const requestDelete = (station: Station) => {
    setDeleteError(null);
    setStationPendingDelete(station);
  };
  const confirmDelete = async () => {
    if (!stationPendingDelete) return null;
    setIsDeleting(true);
    try {
      await removeStation(stationPendingDelete.id);
      setStationPendingDelete(null);
    } catch (err: any) {
      setDeleteError(
        err?.response?.data?.message ?? "Failed to delete station",
      );
      setStationPendingDelete(null);
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
          Add Station
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
                Code
              </th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                Address
              </th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                Platforms
              </th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                Status
              </th>
              <th className="text-right px-4 py-3 font-medium text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {stations.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center px-4 py-8 text-slate-400"
                >
                  No stations yet. Click "Add Station" to create one.
                </td>
              </tr>
            ) : (
              stations.map((station: Station) => (
                <tr
                  key={station.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-3 text-slate-900">{station.name}</td>
                  <td className="px-4 py-3 text-slate-600">{station.code}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {station.address}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {station.numberOfPlatforms}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        station.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-red-600"
                      }`}
                    >
                      {station.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => openEditingModal(station)}
                      className="text-slate-600 hover:text-slate-900 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => requestDelete(station)}
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

      <StationForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingStation}
      />

      <ConfirmDialog
        isOpen={stationPendingDelete !== null}
        title="Delete station?"
        message={
          stationPendingDelete
            ? `Are you sure you want to delete "${stationPendingDelete.name}"? This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        isDangerous
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setStationPendingDelete(null)}
        loadingTag="Deleting"
      />
    </div>
  );
}
