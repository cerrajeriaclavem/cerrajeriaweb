'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Icon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import CarRentalIcon from '@mui/icons-material/CarRental';
import LockIcon from '@mui/icons-material/Lock';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import SecurityIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';

const services = [
  {
    title: 'Urgencias 24 Horas',
    description: 'Llegamos rápido para solucionar cualquier inconveniente, sin importar la hora.',
    icon: <FlashOnIcon sx={{ fontSize: 40 }} />,
    color: '#FFD700',
    link: '/cerrajero-urgente-caba'
  },
  {
    title: 'Apertura de Puertas',
    description: 'Aperturas residenciales y comerciales.',
    icon: <DoorFrontIcon sx={{ fontSize: 40 }} />,
    color: '#003366',
    link: '/apertura-de-puertas'
  },
  {
    title: 'Cerrajería Automotriz',
    description: 'Apertura y destrabe de puertas.',
    icon: <CarRentalIcon sx={{ fontSize: 40 }} />,
    color: '#003366',
    link: '/cerrajero-urgente-caba'
  },
  {
    title: 'Cajas Fuertes',
    description: 'Venta, instalación, apertura y reparación de cajas de seguridad.',
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    color: '#003366',
    link: '/apertura-de-puertas'
  },
  {
    title: 'Cambio de Combinación',
    description: 'Instalación y cambio de cilindros y cerraduras de alta seguridad.',
    icon: <LockIcon sx={{ fontSize: 40 }} />,
    color: '#003366',
    link: '/cambio-de-cerraduras'
  },
  {
    title: 'Reparación e Instalación',
    description: 'Hacemos instalación, mantenimiento y cambio de cierapuertas (de piso y aéreo). Servicio de Blindex, cambio de herrajes, bujes y cerraduras.',
    icon: <HomeRepairServiceIcon sx={{ fontSize: 40 }} />,
    color: '#003366',
    link: '/cambio-de-cerraduras'
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

        <Grid container spacing={4} sx={{ justifyContent: 'center', mb: 6 }}>
          {[services[0], services[1], services[4]].map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ height: '100%' }}
              >
                <Card
                  component={Link}
                  href={service.link || '#'}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    textDecoration: 'none',
                    border: '1px solid rgba(0, 51, 102, 0.05)',
                    boxShadow: '0 6px 16px rgba(0, 51, 102, 0.18)',
                    transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 40px rgba(0, 51, 102, 0.3)',
                      borderColor: 'primary.main',
                      '& .service-icon-box': {
                        bgcolor: 'primary.main',
                        color: 'secondary.main',
                        transform: 'rotate(10deg)'
                      },
                      '& .service-btn': {
                        bgcolor: 'primary.main',
                        color: 'secondary.main',
                        borderColor: 'primary.main'
                      },
                      '& .arrow-icon': {
                        transform: 'translateX(6px)'
                      }
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box
                      className="service-icon-box"
                      sx={{
                        display: 'inline-flex',
                        mb: 3,
                        mx: 'auto',
                        p: 2,
                        borderRadius: 3,
                        bgcolor: 'rgba(0, 51, 102, 0.05)',
                        color: 'primary.main',
                        transition: '0.4s'
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={800} color="primary.main" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 4, flexGrow: 1 }}>
                      {service.description}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      className="service-btn"
                      endIcon={<KeyboardArrowRightIcon className="arrow-icon" />}
                      sx={{
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderWidth: 2,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '1rem',
                        '&:hover': {
                          borderWidth: 2
                        },
                        '& .arrow-icon': {
                          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Paper sx={{ display: { xs: 'none', md: 'block' }, p: { xs: 4, md: 5 }, borderRadius: 4, bgcolor: '#003366', color: 'white', boxShadow: '0 20px 40px rgba(0,51,102,0.2)' }}>
            <Grid container spacing={5} alignItems="center">
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: 'secondary.main', mb: 2}}>
                  Otros servicios destacados
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, mb: 4 }}>
                  Soluciones integrales de cerrajería en un solo lugar, con personal altamente capacitado.
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  fullWidth 
                  sx={{ py: 1.5, fontWeight: 800, fontSize: '1.05rem' }}
                  href="https://wa.me/5491136219993"
                  target="_blank"
                >
                  Consultar Presupuesto
                </Button>
              </Grid>
              
              <Grid size={{ xs: 12, md: 8 }}>
                <Grid container spacing={3}>
                  {[services[2], services[3], services[5]].map((service, i) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={i}>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-start', 
                        p: 3, 
                        bgcolor: 'rgba(255,255,255,0.05)', 
                        borderRadius: 3, 
                        height: '100%',
                        transition: '0.3s',
                        border: '1px solid rgba(255,255,255,0.05)',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-5px)',
                          borderColor: 'secondary.main'
                        }
                      }}>
                        <Box sx={{ color: 'secondary.main', mb: 2, p: 1, bgcolor: 'rgba(255,215,0,0.1)', borderRadius: 2 }}>
                          {service.icon}
                        </Box>
                        <Typography fontWeight={700} sx={{ mb: 1, fontSize: '1.1rem' }}>
                          {service.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                          {service.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* MOBILE VERSION (ACCORDION) */}
          <Paper sx={{ display: { xs: 'block', md: 'none' }, borderRadius: 2.5, bgcolor: '#003366', color: 'white', boxShadow: '0 20px 40px rgba(0,51,102,0.2)', overflow: 'hidden' }}>
            <Accordion sx={{ bgcolor: 'transparent', color: 'white', boxShadow: 'none', '&:before': { display: 'none' } }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon sx={{ color: 'secondary.main', fontSize: 32 }} />} 
                sx={{ p: 3, '& .MuiAccordionSummary-content': { my: 0 } }}
              >
                <Typography variant="h5" fontWeight={800} sx={{ color: 'secondary.main'}}>
                  Otros servicios destacados
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 4, pt: 0 }}>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                  Soluciones integrales de cerrajería en un solo lugar, con personal altamente capacitado.
                </Typography>
                <Grid container spacing={2}>
                  {[services[2], services[3], services[5]].map((service, i) => (
                    <Grid size={12} key={i}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        p: 2, 
                        bgcolor: 'rgba(255,255,255,0.05)', 
                        borderRadius: 3, 
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}>
                        <Box sx={{ color: 'secondary.main', p: 1, bgcolor: 'rgba(255,215,0,0.1)', borderRadius: 2 }}>
                          {service.icon}
                        </Box>
                        <Box>
                          <Typography fontWeight={700} sx={{ fontSize: '1rem' }}>
                            {service.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {service.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  fullWidth 
                  sx={{ py: 1.5, fontWeight: 800, fontSize: '1.05rem', mt: 3 }}
                  href="https://wa.me/5491136219993"
                  target="_blank"
                >
                  Consultar Presupuesto
                </Button>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </motion.div>

      </Container>
    </Box>
  );
}
