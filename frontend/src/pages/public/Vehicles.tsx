import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Vehicles = () => {
  const vehicles = useSelector((state: RootState) => state.vehicle);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-slate-900 px-20 py-20 text-white"
      id="Vehicles"
    >
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Vehicles</h1>
          <button 
            onClick={handleLogin}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-xl text-base font-semibold transform transition-all duration-200 hover:scale-105">
            Login
          </button>
        </div>
        {vehicles?.vehicleData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-slate-800 rounded-lg">
              <thead>
                <tr className="bg-slate-700">
                  <th className="px-6 py-4 text-left">Vehicle Name</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Created At</th>
                  <th className="px-6 py-4 text-left">Updated At</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles?.vehicleData.map((vehicle: any, index: any) => (
                  <tr key={index} className="border-t border-slate-600 hover:bg-slate-700">
                    <td className="px-6 py-4">{vehicle.vehicle_name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        vehicle.Status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {vehicle.Status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(vehicle.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(vehicle.updatedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button 
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm"
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setIsDialogOpen(true);
                        }}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-slate-800 rounded-lg">
            <h2 className="text-xl">No Vehicles Found</h2>
          </div>
        )}

        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl w-full max-w-3xl transform transition-all duration-300 scale-100 shadow-2xl border border-slate-700">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Vehicle Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <p className="text-lg"><span className="font-semibold text-blue-400">Vehicle Name:</span></p>
                  <p className="text-xl mt-1">{selectedVehicle?.vehicle_name}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <p className="text-lg"><span className="font-semibold text-blue-400">Status:</span></p>
                  <span className={`inline-block mt-1 px-4 py-2 rounded-lg text-base ${
                    selectedVehicle?.Status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedVehicle?.Status}
                  </span>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <p className="text-lg"><span className="font-semibold text-blue-400">Created At:</span></p>
                  <p className="text-xl mt-1">{new Date(selectedVehicle?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <p className="text-lg"><span className="font-semibold text-blue-400">Updated At:</span></p>
                  <p className="text-xl mt-1">{new Date(selectedVehicle?.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-xl text-base font-semibold transform transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;