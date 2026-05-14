'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Stack, IconButton, Divider, Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyIcon from '@mui/icons-material/Key';
import Image from 'next/image';

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        pt: 8, 
        pb: 4,
        position: 'relative',
        zIndex: 1
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image src="/images/logo.png" alt="Cerrajería Clavem Logo" width={100} height={100} />
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 300 }}>
                Cerrajería integral 24 horas. Soluciones de seguridad para tu hogar, comercio y vehículo.
              </Typography>
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>Enlaces</Typography>
            <Stack spacing={1}>
              {['Inicio', 'Servicios', 'Galería', 'Opiniones', 'Contacto'].map((item) => (
                <Typography 
                  key={item} 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    cursor: 'pointer',
                    '&:hover': { color: 'secondary.main' }
                  }}
                  onClick={() => {
                    const targetId = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const el = document.getElementById(targetId);
                    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>Servicios SEO</Typography>
            <Stack spacing={1}>
              {[
                { name: 'Cerrajero Urgente', url: '/cerrajero-urgente-buenos-aires' },
                { name: 'Apertura de Puertas', url: '/apertura-de-puertas' },
                { name: 'Cambio de Cerraduras', url: '/cambio-de-cerraduras' }
              ].map((service) => (
                <Typography 
                  key={service.url} 
                  variant="body2" 
                  component="a"
                  href={service.url}
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    textDecoration: 'none',
                    display: 'block',
                    '&:hover': { color: 'secondary.main' }
                  }}
                >
                  {service.name}
                </Typography>
              ))}
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>Redes Sociales</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton 
                sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'secondary.main', color: 'primary.main' } }}
                href="https://www.instagram.com/cerrajeriaclavem"
                target="_blank"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)', '&:hover': { bgcolor: '#25D366', color: 'white' } }}
                href="https://wa.me/541136219993"
                target="_blank"
              >
                <WhatsAppIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 4 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            &copy; {currentYear} Cerrajería Clavem. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
