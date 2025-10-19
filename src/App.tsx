import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { CompanyDashboard } from "./components/CompanyDashboard";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleLogin = (role: string) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster position="top-right" />
      </>
    );
  }

  if (userRole === "admin") {
    return (
      <>
        <AdminDashboard onLogout={handleLogout} />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <>
      <CompanyDashboard onLogout={handleLogout} />
      <Toaster position="top-right" />
    </>
  );
}
