"use client";

import { useEffect, useState } from "react";
import { FaCalendarAlt, FaPlus, FaShareSquare, FaVideo } from "react-icons/fa";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState({ date: "", time: "" });
  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      setCurrentTime({
        date: now.toLocaleDateString("en-US", dateOptions),
        time: now.toLocaleTimeString("en-US", timeOptions),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = (type) => setOpenModal(type);
  const handleCloseModal = () => setOpenModal(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-white to-indigo-50">
      {/* 🕒 Live Time */}
      <div className="text-center text-gray-800 mb-8">
        <h2 className="text-2xl font-semibold">{currentTime.date}</h2>
        <p className="text-lg text-indigo-600 font-medium mt-1">
          {currentTime.time}
        </p>
      </div>

      {/* 📦 Main Icons */}
      <div className="grid grid-cols-2 gap-6">
        <ActionCard
          label="New Meeting"
          icon={<FaPlus className="text-2xl" />}
          onClick={() => handleOpenModal("new")}
        />
        <ActionCard
          label="Join"
          icon={<FaVideo className="text-2xl" />}
          onClick={() => handleOpenModal("join")}
        />
        <ActionCard
          label="Schedule"
          icon={<FaCalendarAlt className="text-2xl" />}
          onClick={() => handleOpenModal("schedule")}
        />
        <ActionCard
          label="Share Screen"
          icon={<FaShareSquare className="text-2xl" />}
          onClick={() => handleOpenModal("share")}
        />
      </div>

      {/* 🧩 Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {openModal} Details
            </h2>
            <input
              type="text"
              placeholder="Enter details..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseModal}
                className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionCard({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:bg-indigo-100 transition text-indigo-600 w-32 h-32"
    >
      {icon}
      <span className="mt-2 text-sm font-medium">{label}</span>
    </button>
  );
}
