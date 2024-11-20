import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: (userData: User) => void;
  onBack: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState("mauricio.srfh@gmail.com");
  const [password, setPassword] = useState("hashed_password1");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

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
    <div style={{ backgroundColor: '#ffffff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
      <div style={{ width: '90%', maxWidth: '400px', padding: '20px' }}>
        <button style={{ background: 'none', border: 'none', color: '#000', fontSize: '1rem', marginBottom: '20px', position: 'fixed', top: '10px', left: '5px'  }} onClick={onBack}>
          &larr; Voltar
        </button>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Entre com a senha</h2>
        {/* Formulário de login */}
        <div style={{ margin: '20px 0' }}>
          <label 
            style={{
              display: 'block', 
              marginBottom: '8px', 
              color: focusedInput === 'email' ? '#002f8e' : '#000',
              fontWeight: focusedInput === 'email' ? '600' : '400'
            }}
          >
            E-mail
          </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Digite seu e-mail"
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: `1px solid ${focusedInput === 'email' ? '#002f8e' : '#ddd'}`,
              outline: 'none'
            }}
          />
        </div>
        <div style={{ margin: '20px 0' }}>
          <label 
            style={{
              display: 'block', 
              marginBottom: '8px', 
              color: focusedInput === 'password' ? '#002f8e' : '#000',
              fontWeight: focusedInput === 'password' ? '600' : '400'
            }}
          >
            Senha
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Digite sua senha"
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: `1px solid ${focusedInput === 'password' ? '#002f8e' : '#ddd'}`,
              outline: 'none'
            }}
          />
        </div>
        <button 
          onClick={handleLogin} 
          disabled={loading} 
          style={{ width: '100%', padding: '12px', backgroundColor: '#002f8e', color: '#fff', borderRadius: '5px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', border: 'none' }}
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="#" style={{ color: '#002f8e', textDecoration: 'none' }}>Esqueceu sua senha?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
