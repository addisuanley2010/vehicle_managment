import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import React from "react";

const VehicleManagement = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicle);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  const deleteVehicle = (id: string) => {
    setVehicleToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (vehicleToDelete) {
      dispatch({ type: "DELETE_VEHICLES", id: vehicleToDelete });
      setShowDeleteConfirm(false);
      setVehicleToDelete(null);
    }
  };

  const editVehicle = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setShowVehicleForm(true);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      className="min-h-screen bg-slate-800 justify-center items-center p-8"
      id="Vehicle"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-white">Vehicles</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowVehicleForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Create Vehicle
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
        {showVehicleForm ? (
          <VehicleRegistration
            editData={editingVehicle ?? undefined}
            onClose={() => {
              setShowVehicleForm(false);
              setEditingVehicle(null);
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Vehicle Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Updated At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {vehicles?.vehicleData.length > 0 ? (
                  vehicles?.vehicleData.map((vehicle: any, index: any) => (
                    <tr key={index} className="text-white hover:bg-gray-600">
                      <td className="px-6 py-4 whitespace-nowrap">{vehicle.vehicle_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          vehicle.Status === 'sold' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {vehicle.Status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(vehicle.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(vehicle.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => editVehicle(vehicle)}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded transition duration-300 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteVehicle(vehicle._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-white">
                      No vehicles Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-white text-lg mb-4">Confirm Delete</h3>
              <p className="text-white mb-6">Are you sure you want to delete this vehicle?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleManagement;

interface VehicleRegistrationProps {
  editData?: {
    _id: string;
    vehicle_name: string;
    Status: string;
  };
  onClose?: () => void;
}

export const VehicleRegistration: React.FC<VehicleRegistrationProps> = ({
  editData,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    vehicle_name: "",
    Status: "active",
  });

  const vehicle = useSelector((state: RootState) => state.vehicle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editData) {
      setFormData({
        vehicle_name: editData.vehicle_name,
        Status: editData.Status,
      });
    }
  }, [editData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myFormData = { ...formData };
    if (editData) {
      await dispatch({
        type: "UPDATE_VEHICLES",
        payload: { ...editData, ...myFormData },
      });
    } else {
      await dispatch({ type: "ADD_VEHICLES", payload: myFormData });
    }

    if (onClose) onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-700 py-5 px-6 shadow-lg sm:rounded-xl sm:px-12 rounded-lg text-white">
      <button
        className=" text-red-500 hover:text-red-700 transition-colors duration-300 "
        onClick={onClose}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-3xl font-bold text-center mb-8">
        {editData ? "Update vehicle" : "Add New vehicle"}
      </h2>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="vehicle_name"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Vehicle Name
          </label>
          <div className="mt-2">
            <input
              id="vehicle_name"
              name="vehicle_name"
              type="text"
              required
              className="mt-1 block w-full border bg-gray-600 py-3 px-4 rounded-lg"
              value={formData.vehicle_name}
              onChange={handleChange}
              placeholder="Enter vehicle name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="Status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <div className="mt-2">
            <select
              id="Status"
              name="Status"
              required
              className="mt-1 block w-full border bg-gray-600 py-3 px-4 rounded-lg"
              value={formData.Status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center mb-20 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {vehicle.loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {vehicle.loading
              ? "Processing..."
              : editData
              ? "Update vehicle"
              : "Add vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
};