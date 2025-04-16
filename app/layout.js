import { Poppins } from "next/font/google";
import "./globals.css";

// 👇 Load Poppins with subsets and weight
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins", // use for Tailwind custom font
});

export const metadata = {
  title: "ZoomX - Video Meetings Simplified",
  description: "Real-time multilingual meetings platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-white text-gray-900 font-sans">{children}</body>
    </html>
  );
}
