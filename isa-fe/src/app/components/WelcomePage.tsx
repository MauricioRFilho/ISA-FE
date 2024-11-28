import React from "react";
import Image from "next/image";

interface WelcomePageProps {
  onProceed: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onProceed }) => {
  return (
    <main
      style={{
        backgroundColor: "#002f8e",
        color: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
        paddingTop: "40%",
      }}
    >
      <Image 
        src="/img/logo-white.png" 
        alt="Logo da Isa" 
        width={260} 
        height={112} 
        priority
      />
      <h1 style={{ fontSize: "32px", fontWeight: "600", marginTop: "30px", width: "80%" }}>
        Sua guia para uma vida financeira tranquila!
      </h1>
      <p style={{ fontSize: "16px", fontWeight: "400", marginTop: "30px", width: "80%" }}>
        Gerenciar suas finanças nunca foi tão fácil. Isa foi projetada para ajudá-lo a atingir seus objetivos financeiros de maneira eficiente e sem estresse.
      </p>
      <button
        onClick={onProceed}
        aria-label="Primeiro acesso"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#fff",
          color: "#002f8e",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "95%",
          height: "54px",
        }}
      >
        Primeiro acesso
      </button>
      <button
        onClick={onProceed}
        aria-label="Entrar com minha conta"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#002f8e",
          color: "#fff",
          border: "1px solid #fff",
          borderRadius: "5px",
          cursor: "pointer",
          width: "95%",
          height: "54px",
        }}
      >
        Entrar com minha conta
      </button>
    </main>
  );
};

export default WelcomePage;
