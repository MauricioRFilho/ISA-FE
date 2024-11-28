"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation"; // Importando o useRouter
import Header from "./components/common/Header";
import HomePage from "./pages/home/page";
import LoginPage from "./components/LoginPage";
import WelcomePage from "./components/WelcomePage";
import { User } from "./types/types";

const Page: React.FC = () => {
  const { user, setUser, token } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showHome, setShowHome] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setShowWelcome(false);
      } catch (error) {
        console.error("Erro ao recuperar usuário do localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, [setUser]);

  const handleLoginSuccess = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setShowHome(true);
  };

  const proceedToLogin = () => setShowWelcome(false);
  const handleBackToWelcome = () => setShowWelcome(true);

  return (
    <div style={{ height: "100vh" }}>
      {showWelcome ? (
        <WelcomePage onProceed={proceedToLogin} />
      ) : showHome && user ? (
        <>
          {/* <Header /> */}
          <HomePage user={user} />
        </>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} onBack={handleBackToWelcome} />
      )}
    </div>
  );
};

export default Page;
