// page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verifica se há dados de usuário no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData: User) => {
    // Salva o objeto de usuário no localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <div>
      {user ? (
        <>
          <Header />
          <HomePage user={user} />
        </>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Page;
