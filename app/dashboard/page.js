"use client";

import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPlus,
  FaShareSquare,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState({ date: "", time: "" });
  const [openModal, setOpenModal] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [profileImage, setProfileImage] = useState(""); // You can fetch user profile image here
  const [meetingID, setMeetingID] = useState(""); // State to hold the meeting ID

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
  const handleCloseModal = () => {
    setOpenModal(null);
    setAudioEnabled(true);
    setCameraEnabled(true);
  };

  const handleJoinMeeting = () => {
    // Logic to join meeting using meetingID and selected options
    console.log("Joining meeting", meetingID, audioEnabled, cameraEnabled);
    handleCloseModal();
  };

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

      {/* 🧩 New Meeting Modal */}
      {openModal === "new" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
            <h2 className="text-2xl font-bold text-center mb-6">
              Start New Meeting
            </h2>

            {/* Profile Picture Section */}
            <div className="relative w-28 h-28 mx-auto mb-4">
              <img
                src={
                  profileImage || "https://i.ibb.co/3dVBRZL/default-user.png"
                }
                alt="Profile"
                className="rounded-full w-full h-full object-cover border-4 border-indigo-300"
              />
              {/* Mic Icon */}
              <div className="absolute bottom-0 left-0 bg-white p-1 rounded-full shadow-md">
                {audioEnabled ? (
                  <FaMicrophone className="text-green-600 text-lg" />
                ) : (
                  <FaMicrophoneSlash className="text-red-600 text-lg" />
                )}
              </div>
              {/* Cam Icon */}
              <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md">
                {cameraEnabled ? (
                  <FaVideo className="text-green-600 text-lg" />
                ) : (
                  <FaVideoSlash className="text-red-600 text-lg" />
                )}
              </div>
            </div>

            {/* Audio & Camera Options */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Audio Option
                </label>
                <select
                  onChange={(e) => setAudioEnabled(e.target.value === "with")}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="with">With Audio</option>
                  <option value="without">Without Audio</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Camera Option
                </label>
                <select
                  onChange={(e) => setCameraEnabled(e.target.value === "with")}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="with">With Camera</option>
                  <option value="without">Without Camera</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // createMeeting();
                  handleCloseModal();
                }}
                className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧩 Join Meeting Modal */}
      {openModal === "join" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
            <h2 className="text-2xl font-bold text-center mb-6">
              Join a Meeting
            </h2>

            {/* Meeting ID Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting ID
              </label>
              <input
                type="text"
                value={meetingID}
                onChange={(e) => setMeetingID(e.target.value)}
                placeholder="Enter Meeting ID"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Audio & Camera Options */}
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Audio Option
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={audioEnabled}
                      onChange={() => setAudioEnabled(!audioEnabled)}
                      className="mr-2"
                    />
                    With Audio
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!audioEnabled}
                      onChange={() => setAudioEnabled(!audioEnabled)}
                      className="mr-2"
                    />
                    Without Audio
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Camera Option
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={cameraEnabled}
                      onChange={() => setCameraEnabled(!cameraEnabled)}
                      className="mr-2"
                    />
                    With Camera
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!cameraEnabled}
                      onChange={() => setCameraEnabled(!cameraEnabled)}
                      className="mr-2"
                    />
                    Without Camera
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinMeeting}
                className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scheduler Modal */}
      {openModal === "schedule" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
            <h2 className="text-2xl font-bold text-center mb-6">
              Schedule Meeting
            </h2>

            {/* Meeting Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter meeting title"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Date Picker */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]} // 🔒 Prevent past date
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Time Picker */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 30"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Video/Audio Settings */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video
                </label>
                <select className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500">
                  <option value="on">On</option>
                  <option value="off">Off</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Audio
                </label>
                <select className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500">
                  <option value="on">On</option>
                  <option value="off">Off</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // scheduleMeeting();
                  handleCloseModal();
                }}
                className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧩 Share Screen Modal */}
      {openModal === "share" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
            <h2 className="text-2xl font-bold text-center mb-6">
              Share Screen
            </h2>

            {/* Meeting ID Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting ID
              </label>
              <input
                type="text"
                value={meetingID}
                onChange={(e) => setMeetingID(e.target.value)}
                placeholder="Enter Meeting ID"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Sharing screen in meeting:", meetingID);
                  handleCloseModal();
                }}
                className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Card Component
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
