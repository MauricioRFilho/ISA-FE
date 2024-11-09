"use client";

import React, { useState } from 'react';
import Header from './common/Header';
import { Card, Typography, Box, Stack, Avatar, IconButton } from '@mui/material';
import { ArrowRightAlt, AccountBalanceWallet, Savings, ListAlt, AttachMoney } from '@mui/icons-material';

interface InfoCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

interface HomePageProps {
  user: {
    id: string;
    name: string;
    email: string;
    token: string;
  };
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
  const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', color: '#000', p: 3, pt: 9 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Resumo de {user.name}</Typography>
        <Avatar sx={{ bgcolor: '#fff', color: '#002f8e' }}>
          <AccountBalanceWallet />
        </Avatar>
      </Stack>
      
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Atualizado hoje, às 13:37
      </Typography>
      
      <Box component="button" sx={{ bgcolor: '#0044cc', color: '#fff', py: 0.5, px: 2, borderRadius: 20, mb: 2, border: 'none' }}>
        {months[selectedMonth]}
      </Box>
      
      <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', mb: 2 }}>
        <Typography variant="body1">Você ainda não informou sua renda. É importante fazer isso para que eu te ajude melhor!</Typography>
      </Card>
      
      <Stack spacing={2}>
        <InfoCard title="Quanto gastei" value="R$ 6.132,59" description="Incluindo gastos variáveis e fixos" icon={<AttachMoney />} />
        <InfoCard title="Quanto recebi" value="R$ 8.250,00" description="Você não recebeu nada até o momento." icon={<AccountBalanceWallet />} />
        <InfoCard title="Quanto economizei" value="R$ 500,00" description="Você ainda não criou uma meta de economia." icon={<Savings />} />
        <InfoCard title="Outros" value="R$ 1.523,42" description="Aqui é listado tudo o que não foi considerado nos outros cálculos ou transações não categorizadas." icon={<ListAlt />} />
      </Stack>

      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: '#002f8e', py: 1 }}>
        <Stack direction="row" justifyContent="space-around">
          <IconButton color="inherit">
            <AccountBalanceWallet />
          </IconButton>
          <IconButton color="inherit">
            <Savings />
          </IconButton>
          <IconButton color="inherit">
            <ListAlt />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

const InfoCard: React.FC<InfoCardProps> = ({ title, value, description, icon }) => (
  <Card sx={{ bgcolor: '#0033a0', color: '#fff', p: 2, borderRadius: 2 }}>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar sx={{ bgcolor: '#0044cc' }}>{icon}</Avatar>
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Stack>
  </Card>
);

export default HomePage;