// WelcomePage.tsx
import React from 'react';

interface WelcomePageProps {
  onProceed: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onProceed }) => {
  return (
    <div style={{ backgroundColor: '#002f8e', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Isa</h1>
      <p>Sua guia para uma vida financeira tranquila!</p>
      <p>Gerenciar suas finanças nunca foi tão fácil. Isa foi projetada para ajudá-lo a atingir seus objetivos financeiros de maneira eficiente e sem estresse.</p>
      <button onClick={onProceed} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#fff', color: '#002f8e', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Entrar com minha conta
      </button>
    </div>
  );
};

export default WelcomePage;
