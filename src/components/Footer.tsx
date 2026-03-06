'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Stack, IconButton, Divider, Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyIcon from '@mui/icons-material/Key';

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
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <KeyIcon sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h5" fontWeight={800}>CLAVEM</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 300 }}>
                Cerrajería integral 24 horas. Soluciones de seguridad para tu hogar, comercio y vehículo.
              </Typography>
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
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
                    const el = document.getElementById(item.toLowerCase());
                    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
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
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', mt: 1, display: 'block' }}>
            Diseñado con profesionalismo y confianza.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
