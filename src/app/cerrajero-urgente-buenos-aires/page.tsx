import React from 'react';
import { Metadata } from 'next';
import { Box, Container, Typography, Button, Grid, Paper, Stack } from '@mui/material';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cerrajero Urgente Buenos Aires | 24 Horas CABA | Clavem',
  description: '¿Buscas un cerrajero urgente en Buenos Aires? Servicio 24 horas en CABA. Llegamos en 20 minutos para aperturas de puertas, autos y cajas fuertes. ¡Llamanos ahora!',
  keywords: ['cerrajero urgente buenos aires', 'cerrajero 24 horas caba', 'cerrajero domicilio buenos aires', 'cerrajeria de emergencia'],
};

export default function UrgenteBuenosAiresPage() {
  return (
    <Box component="main">
      <Navbar />
      
      {/* Hero Section Localizado */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          pt: { xs: 15, md: 20 }, 
          pb: { xs: 10, md: 15 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              fontWeight: 800, 
              mb: 3,
              lineHeight: 1.2
            }}
          >
            Cerrajero Urgente en Buenos Aires 24 Horas
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Servicio de cerrajería de emergencia en toda la Capital Federal (CABA). 
            Llegamos rápido a tu ubicación para solucionar cualquier problema de llaves o cerraduras.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              startIcon={<PhoneIcon />}
              href="tel:1136219993"
              sx={{ px: 4, py: 2, fontSize: '1.1rem', fontWeight: 700 }}
            >
              Llamar ahora: 11-3621-9993
            </Button>
            <Button 
              variant="outlined" 
              sx={{ color: 'white', borderColor: 'white', px: 4, py: 2, fontSize: '1.1rem', fontWeight: 700 }}
              href="https://wa.me/5491136219993"
              startIcon={<WhatsAppIcon />}
            >
              WhatsApp 24hs
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* SEO Content Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
              Cerrajería de Emergencia en CABA y GBA
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Entendemos lo estresante que es quedarse fuera de casa o perder las llaves del auto. 
              Por eso, en <strong>Cerrajería Clavem</strong> ofrecemos un servicio de <strong>cerrajero urgente en Buenos Aires</strong> 
              que destaca por su rapidez y profesionalismo. Estamos estratégicamente ubicados para cubrir todos los barrios de CABA en menos de 20 minutos.
            </Typography>
            
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2, fontSize: '1.75rem' }}>
              Servicios de Cerrajero 24 Horas Cerca de Mí
            </Typography>
            <Typography variant="body1" paragraph>
              No importa si es feriado, domingo o las 3 de la mañana. Nuestro equipo está operativo los 365 días del año.
              Realizamos trabajos de alta complejidad con herramientas de última tecnología para no dañar tus aberturas.
            </Typography>
            
            <Box component="ul" sx={{ pl: 3, mb: 4 }}>
              <li><Typography variant="body1"><strong>Apertura de puertas residenciales:</strong> Sin rotura, cuidando tu marco y cerradura.</Typography></li>
              <li><Typography variant="body1"><strong>Cerrajero de autos:</strong> Aperturas de vehículos nacionales e importados.</Typography></li>
              <li><Typography variant="body1"><strong>Cambio de combinaciones:</strong> Si te robaron las llaves, lo solucionamos en el acto.</Typography></li>
              <li><Typography variant="body1"><strong>Cajas fuertes:</strong> Apertura y reparación técnica.</Typography></li>
            </Box>

            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2, fontSize: '1.75rem' }}>
              Zonas de cobertura en Buenos Aires
            </Typography>
            <Typography variant="body1" paragraph>
              Brindamos asistencia inmediata en: Palermo, Belgrano, Recoleta, Caballito, Almagro, Villa Urquiza, 
              San Telmo, Puerto Madero y todos los puntos estratégicos de la Ciudad Autónoma de Buenos Aires.
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={4} sx={{ p: 4, bgcolor: '#f8faff', borderRadius: 4, position: 'sticky', top: 100 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, color: 'primary.main' }}>
                ¿Por qué elegirnos?
              </Typography>
              <Stack spacing={3} sx={{ mt: 3 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>Llegada en 20 min</Typography>
                  <Typography variant="body2">Contamos con móviles en puntos clave de CABA para una respuesta inmediata.</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>Precios Transparentes</Typography>
                  <Typography variant="body2">Te damos un presupuesto estimado por teléfono sin sorpresas finales.</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>Personal Identificado</Typography>
                  <Typography variant="body2">Tu seguridad es nuestra prioridad. Técnicos confiables y con experiencia.</Typography>
                </Box>
              </Stack>
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ mt: 4, py: 2, fontWeight: 700 }}
                href="tel:1136219993"
              >
                Llamar Urgente
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Internal Links SEO */}
      <Box sx={{ bgcolor: '#eee', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>Otros servicios de cerrajería:</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <Link href="/apertura-de-puertas" style={{ color: '#003366', textDecoration: 'underline' }}>Apertura de Puertas en el acto</Link>
            <Link href="/cambio-de-cerraduras" style={{ color: '#003366', textDecoration: 'underline' }}>Cambio de Cerraduras y Blindajes</Link>
            <Link href="/" style={{ color: '#003366', textDecoration: 'underline' }}>Inicio</Link>
          </Stack>
        </Container>
      </Box>

      <Contact />
      <Footer />
      <FloatingContact />
    </Box>
  );
}
