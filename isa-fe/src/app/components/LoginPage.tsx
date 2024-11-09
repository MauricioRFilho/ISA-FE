import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: (userData: User) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("mauricio.srfh@gmail.com");
  const [password, setPassword] = useState("hashed_password1");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Validar campos antes de enviar
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    if (!isFormValid) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Falha no login. Verifique suas credenciais.");
      }

      const data = await response.json();
      console.log("Login bem-sucedido:", data);

      // Passa o objeto `user` completo para `Page.tsx`
      const userData: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
      };

      onLoginSuccess(userData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Digite seu e-mail"
        />
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Digite sua senha"
        />
      </div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Carregando..." : "Entrar"}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
