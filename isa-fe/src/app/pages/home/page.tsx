"use client"; // Adicionando a diretiva para habilitar client-side rendering

import React, { useEffect, useState } from "react";
import { User } from "../../types/types"; // Ajuste o caminho
import { Card, Typography, Box, Stack, Avatar, IconButton, MenuItem, Select } from '@mui/material';
import { ArrowRightAlt, AccountBalanceWallet, Savings, ListAlt, AttachMoney, ChevronRight, BorderAllRounded } from '@mui/icons-material';

interface HomePageProps {
  user: User;
}

interface Resum {
  others: number;
  othersMessage: string;
  spend: number;
  spendMessage: string;
  saves: number;
  savesMessage: string;
  earn: number;
  earnMessage: string;
}

interface InfoCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
  const [resum, setResum] = useState<Resum | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()); // Adicionando controle do mês selecionado

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  useEffect(() => {
    if (!user || !user.token) {
      setError("Usuário não autenticado.");
      return;
    }

    const fetchResum = async () => {
      setLoading(true);
      setError(null);

      // Calculando a data de início e fim do mês atual
      const currentMonth = new Date().getMonth();
      const year = new Date().getFullYear();
      const filterStart = new Date(year, currentMonth, 1).toISOString();
      const filterEnd = new Date(year, currentMonth + 1, 0, 23, 59, 59).toISOString();

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/resum/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            filterStart,
            filterEnd,
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do resumo financeiro.");
        }

        const data = await response.json();
        setResum(data.resum);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchResum();
  }, [user, selectedMonth]); // Adicionando selectedMonth para atualizar os dados com base no mês

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMonth(event.target.value as number);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>Erro: {error}</p>;

  return (
    <Box sx={{ bgcolor: '#0047FF', minHeight: '100vh', color: '#fff' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#003CD7', borderRadius: '36px', padding: '20px', paddingLeft: '23px', pt: 8 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: '700' }}>Resumo</Typography>
          <Avatar sx={{ bgcolor: 'transparent', color: '#fff' }}>
            {/* <Image src="/img/mini-icon.png" alt="Logo" width={40} height={40} /> */}
          </Avatar>
        </Stack>

        <Typography variant="subtitle2" sx={{ mb: 1, color: '#fff' }}>
          Atualizado hoje, às 13:37
        </Typography>

        {/* Selector de mês */}
        <Select sx={{
            bgcolor: '#08287A',
            color: '#fff',
            borderRadius: 15,
            padding: '4px 10px',
            mb: 3,
            minWidth: '140px',
            '& .MuiSelect-icon': { color: '#fff' }
          }} value={selectedMonth} onChange={handleMonthChange} displayEmpty variant="outlined">
          {months.map((month, index) => (
            <MenuItem key={index} value={index} sx={{ padding: '6px 14px' }}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Aviso */}
        <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', mb: 2 }}>
          <Typography variant="body1" sx={{ color: '#fff' }}>
            Você ainda não informou sua renda. É importante fazer isso para que eu te ajude melhor!
          </Typography>
        </Card>

        {/* Cards */}
        <Stack spacing={2}>
          {resum && (
            <>
              <InfoCard title="Quanto gastei" value={`R$ ${resum.spend.toFixed(2)}`} description={resum.spendMessage} icon={<ChevronRight />} />
              <InfoCard title="Quanto recebi" value={`R$ ${resum.earn.toFixed(2)}`} description={resum.earnMessage} icon={<ChevronRight />} />
              <InfoCard title="Quanto economizei" value={`R$ ${resum.saves.toFixed(2)}`} description={resum.savesMessage} icon={<ChevronRight />} />
              <InfoCard title="Outros" value={`R$ ${resum.others.toFixed(2)}`} description={resum.othersMessage} icon={<ChevronRight />} />
            </>
          )}
        </Stack>

        {/* Footer */}
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: '#002f8e', py: 1 }}>
          <Stack direction="row" justifyContent="space-around">
            <IconButton sx={{ color: '#fff' }}>
              <AccountBalanceWallet />
            </IconButton>
            <IconButton sx={{ color: '#fff' }}>
              <Savings />
            </IconButton>
            <IconButton sx={{ color: '#fff' }}>
              <ListAlt />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

const InfoCard: React.FC<InfoCardProps> = ({ title, value, description, icon }) => (
  <Box sx={{ bgcolor: '#0047FF', color: '#fff', py: 2, borderBottom: '1px solid #E8E8E8' }}>
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <Avatar sx={{ bgcolor: 'transparent', alignContent: 'center', justifyContent: 'flex-end', position: 'relative', left: '0px' }}>
        {icon}
      </Avatar>
    </Stack>
  </Box>
);

export default HomePage;
