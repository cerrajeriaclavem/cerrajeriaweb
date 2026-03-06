'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Icon
} from '@mui/material';
import { motion } from 'framer-motion';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import CarRentalIcon from '@mui/icons-material/CarRental';
import LockIcon from '@mui/icons-material/Lock';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import SecurityIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const services = [
  {
    title: 'Urgencias 24 Horas',
    description: 'Llegamos rápido para solucionar cualquier inconveniente, sin importar la hora.',
    icon: <FlashOnIcon sx={{ fontSize: 40 }} />,
    color: '#FFD700'
  },
  {
    title: 'Apertura de Puertas',
    description: 'Aperturas residenciales y comerciales sin daños al marco ni a la cerradura.',
    icon: <DoorFrontIcon sx={{ fontSize: 40 }} />,
    color: '#003366'
  },
  {
    title: 'Cerrajería Automotriz',
    description: 'Apertura de vehículos de todas las marcas y modelos, llaves y mandos.',
    icon: <CarRentalIcon sx={{ fontSize: 40 }} />,
    color: '#003366'
  },
  {
    title: 'Cajas Fuertes',
    description: 'Venta, instalación, apertura y reparación de cajas de seguridad.',
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    color: '#003366'
  },
  {
    title: 'Cambio de Combinación',
    description: 'Instalación y cambio de cilindros y cerraduras de alta seguridad.',
    icon: <LockIcon sx={{ fontSize: 40 }} />,
    color: '#003366'
  },
  {
    title: 'Reparación e Instalación',
    description: 'Mantenimiento preventivo y correctivo de todo tipo de herrajes.',
    icon: <HomeRepairServiceIcon sx={{ fontSize: 40 }} />,
    color: '#003366'
  }
];

export default function Services() {
  return (
    <Box id="servicios" component="section" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ fontWeight: 800, color: 'primary.main' }}
          >
            Nuestros Servicios
          </Typography>
          <Box 
            sx={{ 
              width: 80, 
              height: 4, 
              bgcolor: 'secondary.main', 
              mx: 'auto', 
              mb: 3,
              borderRadius: 2
            }} 
          />
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Ofrecemos soluciones integrales de cerrajería con la más alta calidad y garantía.
            Atendemos emergencias las 24 horas del día.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ height: '100%' }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    borderRadius: 4,
                    transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(0, 51, 102, 0.05)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 40px rgba(0, 51, 102, 0.12)',
                      borderColor: 'primary.main',
                      '& .service-icon-box': {
                        bgcolor: 'primary.main',
                        color: 'secondary.main',
                        transform: 'rotate(10deg)'
                      }
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 5, pb: 4, px: 3 }}>
                    <Box 
                      className="service-icon-box"
                      sx={{ 
                        display: 'inline-flex', 
                        mb: 3, 
                        p: 2,
                        borderRadius: 3,
                        bgcolor: 'rgba(0, 51, 102, 0.05)',
                        color: 'primary.main',
                        transition: '0.4s'
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h3" 
                      sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}
                    >
                      {service.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
