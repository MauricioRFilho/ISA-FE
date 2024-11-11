// page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import WelcomePage from './components/WelcomePage';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcome, setShowWelcome] = useState(true); // Controle para a página de boas-vindas

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setShowWelcome(false);
    }
  }, []);

  const handleLoginSuccess = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const proceedToLogin = () => {
    setShowWelcome(false); // Avança para a página de login
  };

  const handleBackToWelcome = () => {
    setShowWelcome(true); // Volta para a página de boas-vindas
  };

  return (
    <div style={{ height: '100vh' }}>
      {showWelcome ? (
        <WelcomePage onProceed={proceedToLogin} />
      ) : user ? (
        <>
          <Header />
          <HomePage user={user} />
        </>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} onBack={handleBackToWelcome} />
      )}
    </div>
  );
};

export default Page;
