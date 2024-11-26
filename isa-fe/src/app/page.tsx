"use client";

import React, { useEffect } from "react";
import { useAuth } from "./context/AuthContext"; // Importa o contexto de autenticação
import Header from "./components/common/Header";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import WelcomePage from "./components/WelcomePage";

const Page: React.FC = () => {
  const { user, setUser, token } = useAuth(); // Consumindo o contexto de autenticação
  const [showWelcome, setShowWelcome] = React.useState(true);

  useEffect(() => {
    // Verifica o usuário armazenado e ajusta o estado inicial
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // Define o usuário no contexto
      setShowWelcome(false);
    }
  }, [setUser]);

  const handleLoginSuccess = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Armazena o usuário localmente
    setUser(userData); // Atualiza o contexto
  };

  const proceedToLogin = () => {
    setShowWelcome(false); // Avança para a página de login
  };

  const handleBackToWelcome = () => {
    setShowWelcome(true); // Volta para a página de boas-vindas
  };

  return (
    <div style={{ height: "100vh" }}>
      {showWelcome ? (
        <WelcomePage onProceed={proceedToLogin} />
      ) : user && token ? ( // Verifica se há usuário e token
        <>
          <Header user={user} />
          <HomePage user={user} />
        </>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} onBack={handleBackToWelcome} />
      )}
    </div>
  );
};

export default Page;
