'use client'

import { useSelector } from "react-redux";
import { redirect } from "next/navigation"; // Import redirect for navigation
import Navbar from "../component/navbar";
import Header from "../component/header";
import DashboardCharts from "../component/dashboardchart";

export default function Dashboard() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to /login if not authenticated
  if (!isAuthenticated) {
    redirect("/login"); // Redirect directly without useRouter
  }

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 space-y-4 bg-gray-50">
          <DashboardCharts />
        </main>
      </div>
    </div>
  );
}
