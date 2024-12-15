import { useDispatch } from "react-redux";

const User = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="h-screen bg-slate-800 text-gray-50 flex flex-col items-center justify-center">
      <p className="text-xl mb-2">You are not an admin user.</p>
      <p className="text-lg text-gray-400">Please contact addisu anley to request admin privileges.</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
      >
        Logout
      </button>
    </div>
  )
}

export default User