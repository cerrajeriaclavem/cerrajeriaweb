'use client';

import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box 
      id="inicio"
      sx={{
        pt: { xs: 12, md: 18 },
        pb: { xs: 8, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(0, 20, 40, 0.9) 0%, rgba(0, 40, 80, 0.6) 100%)',
          zIndex: -1,
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="overline" 
                sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: 3, mb: 1, display: 'block' }}
              >
                CERRAJERÍA DE CONFIANZA
              </Typography>
              <Typography 
                variant="h1" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 900, 
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  lineHeight: 1.1,
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  color: 'white'
                }}
              >
                Cerrajería <span style={{ color: '#FFD700' }}>Clavem</span>
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 5, 
                  color: 'rgba(255,255,255,0.9)', 
                  maxWidth: 600,
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  fontWeight: 400
                }}
              >
                Servicio profesional las 24 horas. Soluciones rápidas y efectivas para hogares, comercios y vehículos. Fernando a tu disposición.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 8 }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  onClick={scrollToContact}
                  sx={{ 
                    px: 6, 
                    py: 2, 
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 30px rgba(255, 215, 0, 0.3)',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 40px rgba(255, 215, 0, 0.4)' }
                  }}
                >
                  Solicitar Presupuesto
                </Button>
                <Button 
                  variant="contained" 
                  size="large"
                  href="tel:1144481404"
                  sx={{ 
                    px: 6, 
                    py: 2, 
                    fontSize: '1.1rem', 
                    fontWeight: 800,
                    bgcolor: 'white',
                    color: 'primary.main',
                    boxShadow: '0 8px 30px rgba(255, 255, 255, 0.2)',
                    '&:hover': { bgcolor: '#f0f0f0', transform: 'translateY(-2px)' }
                  }}
                >
                  Llamar 11-4448-1404
                </Button>
              </Box>

              <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'secondary.main', p: 1, borderRadius: 2 }}>
                      <AccessTimeIcon sx={{ fontSize: 30, color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: 'white' }}>Urgencias 24/7</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Atención inmediata los 365 días del año.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'secondary.main', p: 1, borderRadius: 2 }}>
                      <SupportAgentIcon sx={{ fontSize: 30, color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: 'white' }}>Servicio Garantizado</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Trabajos realizados por Fernando con máxima calidad.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
