// import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading...</h2>
      </div>
    </div>
  )
}

export default Loading