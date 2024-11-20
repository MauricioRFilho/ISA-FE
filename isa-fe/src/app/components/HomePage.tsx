"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // Para carregamento otimizado de imagens no Next.js
import { Card, Typography, Box, Stack, Avatar, IconButton, MenuItem, Select } from '@mui/material';
import { ArrowRightAlt, AccountBalanceWallet, Savings, ListAlt, AttachMoney,ChevronRight , BorderAllRounded } from
'@mui/icons-material';

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

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMonth(Number(event.target.value));
    };

    return (
    <Box sx={{ bgcolor: '#0047FF', minHeight: '100vh', color: '#fff'}}>
      {/* Header */}
      <Box sx={{ bgcolor: '#003CD7', borderRadius: '36px',  padding: '20px',  paddingLeft: '23px', pt: 8  }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: '700' }}>Resumo</Typography>
          <Avatar sx={{ bgcolor: 'transparent', color: '#fff' }}>
            <Image src="/img/mini-icon.png" alt="Logo" width={40} height={40} />
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
            minWidth:'140px',
            '& .MuiSelect-icon': { color: '#fff' }
          }} value={selectedMonth} onChange={handleMonthChange} displayEmpty variant="outlined">
          {months.map((month, index) => (
          <MenuItem key={index} value={index} sx={{ padding: '6px 14px'}}>
          {month}
          </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ p:3 }}>
        {/* Aviso */}
        <Card sx={{ bgcolor: 'transparent', boxShadow: 'none', mb: 2 }}>
          <Typography variant="body1" sx={{ color:'#fff'}}>
            Você ainda não informou sua renda. É importante fazer isso para que eu te ajude melhor!
          </Typography>
        </Card>

        {/* Cards */}
        <Stack spacing={2}>
          <InfoCard title="Quanto gastei" value="R$ 6.132,59" description="Incluindo gastos variáveis e fixos"
            icon={<ChevronRight  />}
          />
          <InfoCard title="Quanto recebi" value="R$ 8.250,00" description="Você não recebeu nada até o momento."
            icon={<ChevronRight />}
          />
          <InfoCard title="Quanto economizei" value="R$ 500,00" description="Você ainda não criou uma meta de economia."
            icon={<ChevronRight />}
          />
          <InfoCard title="Outros" value="R$ 1.523,42"
            description="Aqui é listado tudo o que não foi considerado nos outros cálculos ou transações não categorizadas."
            icon={<ChevronRight />}
          />
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
          <Avatar sx={{ bgcolor: 'transparent', alignContent: 'center', justifyContent:'flex-end', position: 'relative', left: '0px' }}>{icon}</Avatar>
        </Stack>
      </Box>
      );

      export default HomePage;