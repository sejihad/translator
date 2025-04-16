import Link from "next/link";
import {
  FaBell,
  FaCalendarAlt,
  FaComments,
  FaCrown,
  FaEllipsisH,
  FaHome,
  FaVideo,
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🧠 Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold text-indigo-600">ZoomX</div>

          {/* Center Nav Icons */}
          <nav className="hidden md:flex space-x-6 text-gray-600">
            <NavItem href="/dashboard" icon={<FaHome />} label="Home" />
            <NavItem href="/meetings" icon={<FaVideo />} label="Meetings" />
            <NavItem href="/chat" icon={<FaComments />} label="Team Chat" />
            <NavItem
              href="/scheduler"
              icon={<FaCalendarAlt />}
              label="Scheduler"
            />
            <NavItem href="/pro" icon={<FaCrown />} label="Pro" pro />
            <NavItem href="/more" icon={<FaEllipsisH />} label="More" />
          </nav>

          {/* Right side: Notification & Profile */}
          <div className="flex items-center space-x-4">
            <button className="relative group">
              <FaBell className="text-xl text-gray-600 hover:text-indigo-600 transition" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
            </button>
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-indigo-500 hover:scale-105 transition"
            />
          </div>
        </div>
      </header>

      {/* 👇 Main Content */}
      <main className="p-6">{children}</main>

      {/* 🧑‍💻 Mobile Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 md:hidden">
        <div className="flex justify-around p-2">
          <NavItem href="/dashboard" icon={<FaHome />} label="Home" />
          <NavItem href="/meetings" icon={<FaVideo />} label="Meetings" />
          <NavItem href="/chat" icon={<FaComments />} label="Chat" />
          <NavItem
            href="/scheduler"
            icon={<FaCalendarAlt />}
            label="Scheduler"
          />
          <NavItem href="/pro" icon={<FaCrown />} label="Pro" pro />
        </div>
      </nav>
    </div>
  );
}

// Reusable NavItem Component
function NavItem({ href, icon, label, pro }) {
  return (
    <Link href={href} className="flex flex-col items-center text-sm group">
      <div
        className={`text-xl group-hover:text-indigo-600 transition ${
          pro ? "text-yellow-500" : ""
        }`}
      >
        {icon}
      </div>
      <span className="group-hover:text-indigo-600 transition">{label}</span>
    </Link>
  );
}
