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
  title: 'Cambio de Cerraduras en CABA | Reparación e Instalación | Clavem',
  description: 'Servicio profesional de cambio de cerraduras en Buenos Aires. Instalación de cerraduras de alta seguridad, blindajes y service oficial. Atención 24hs en CABA.',
  keywords: ['cambio de cerraduras', 'instalacion de cerraduras', 'reparar cerradura caba', 'cerraduras de alta seguridad buenos aires'],
};

export default function CambioCerradurasPage() {
  return (
    <Box component="main">
      <Navbar />
      
      {/* Hero Section */}
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
            Cambio y Reparación de Cerraduras en CABA
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Mejora la seguridad de tu hogar o comercio. Trabajamos con todas las marcas y 
            modelos de cerraduras de alta seguridad en Buenos Aires.
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
              Pedir Presupuesto
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* SEO Content Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
              Instalación de Cerraduras de Seguridad y Blindajes
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              En <strong>Cerrajería Clavem</strong> sabemos que la seguridad de tu familia es lo más importante. 
              Realizamos el <strong>cambio de cerraduras</strong> de manera rápida y eficiente, asegurando que 
              cada componente quede perfectamente alineado y funcional. Ya sea por mudanza, robo de llaves o desgaste, 
              te asesoramos sobre la mejor opción para tu puerta.
            </Typography>
            
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2, fontSize: '1.75rem' }}>
              Servicio Técnico Multimarca
            </Typography>
            <Typography variant="body1" paragraph>
              Trabajamos con las marcas líderes del mercado argentino para garantizar repuestos originales y durabilidad:
            </Typography>
            
            <Box component="ul" sx={{ pl: 3, mb: 4 }}>
              <li><Typography variant="body1"><strong>Cerraduras de Alta Seguridad:</strong> Acytra, Trabex, Kallay, Giaco y Privé.</Typography></li>
              <li><Typography variant="body1"><strong>Cilindros Europerfil:</strong> Cambio de bombines y núcleos de seguridad.</Typography></li>
              <li><Typography variant="body1"><strong>Cerraduras Digitales:</strong> Instalación y configuración de cerraduras electrónicas modernas.</Typography></li>
              <li><Typography variant="body1"><strong>Service de Blindajes:</strong> Ajuste de cerraduras multianclaje y refuerzos.</Typography></li>
            </Box>

            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2, fontSize: '1.75rem' }}>
              ¿Cuándo es necesario cambiar la cerradura?
            </Typography>
            <Typography variant="body1" paragraph>
              Recomendamos el cambio inmediato si has perdido tus llaves, si la llave gira con dificultad (posible desgaste del rotor) 
              o si has sufrido un intento de forzado. Un <strong>cerrajero profesional en CABA</strong> puede evaluar si es necesaria 
              la sustitución completa o solo una reparación del cilindro.
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={4} sx={{ p: 4, bgcolor: '#f8faff', borderRadius: 4, position: 'sticky', top: 100 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, color: 'primary.main' }}>
                Presupuestos sin cargo
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Envíanos una foto de tu cerradura por WhatsApp y te daremos un presupuesto estimado en el acto.
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                  <Typography variant="body2">Garantía por escrito</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                  <Typography variant="body2">Repuestos originales</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                  <Typography variant="body2">Trabajos en el día</Typography>
                </Box>
              </Stack>
              <Button 
                fullWidth 
                variant="contained" 
                color="secondary"
                sx={{ mt: 4, py: 2, fontWeight: 700 }}
                href="https://wa.me/5491136219993"
              >
                Enviar Foto WhatsApp
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Internal Links SEO */}
      <Box sx={{ bgcolor: '#eee', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>Otros servicios disponibles:</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <Link href="/cerrajero-urgente-buenos-aires" style={{ color: '#003366', textDecoration: 'underline' }}>Cerrajero 24 Horas Urgente</Link>
            <Link href="/apertura-de-puertas" style={{ color: '#003366', textDecoration: 'underline' }}>Apertura de Puertas sin llaves</Link>
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
