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
  title: 'Apertura de Puertas en CABA | Cerrajero a Domicilio 24hs | Clavem',
  description: 'Apertura de puertas sin rotura en Buenos Aires. Servicio técnico especializado para casas, departamentos y comercios. Atención las 24 horas en CABA. ¡Llámanos!',
  keywords: ['apertura de puertas', 'abrir puerta trabada', 'cerrajero a domicilio caba', 'apertura de cerraduras sin llaves'],
};

export default function AperturaPuertasPage() {
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
            Apertura de Puertas 24 Horas sin Roturas
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            ¿Te olvidaste las llaves adentro? ¿La cerradura se trabó? 
            Abrimos cualquier tipo de puerta en el acto en toda la Ciudad de Buenos Aires.
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
              Consultar por WhatsApp
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* SEO Content Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
              Expertos en Apertura de Puertas Residenciales y Comerciales
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              En <strong>Cerrajería Clavem</strong>, nos especializamos en la <strong>apertura de puertas</strong> utilizando técnicas no invasivas. 
              Nuestro objetivo es abrir tu propiedad sin causar daños colaterales en la cerradura, el marco o la estructura de la puerta. 
              Contamos con herramientas de precisión y ganzúas profesionales para cada tipo de cilindro.
            </Typography>
            
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2, fontSize: '1.75rem' }}>
              ¿Qué tipo de puertas abrimos?
            </Typography>
            <Typography variant="body1" paragraph>
              Trabajamos con todo tipo de tecnologías, desde las más antiguas hasta sistemas de alta seguridad modernos:
            </Typography>
            
            <Box component="ul" sx={{ pl: 3, mb: 4 }}>
              <li><Typography variant="body1"><strong>Puertas Blindadas y Semiblindadas:</strong> Conocemos los mecanismos de marcas como Pentágono, Potent y más.</Typography></li>
              <li><Typography variant="body1"><strong>Cerraduras de Doble Paleta:</strong> Apertura técnica para cerraduras trabadas o con llaves rotas.</Typography></li>
              <li><Typography variant="body1"><strong>Puertas de Blindex:</strong> Especialistas en locales comerciales y edificios.</Typography></li>
              <li><Typography variant="body1"><strong>Portones y Rejas:</strong> Soluciones rápidas para accesos exteriores.</Typography></li>
            </Box>

            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2, fontSize: '1.75rem' }}>
              Servicio de Cerrajero a Domicilio en CABA
            </Typography>
            <Typography variant="body1" paragraph>
              Nuestra cobertura abarca barrios como Almagro, Palermo, Belgrano, Recoleta y Microcentro. 
              Si necesitas <strong>abrir una puerta urgente</strong>, no dudes en contactarnos. Un técnico saldrá de inmediato hacia tu domicilio.
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={4} sx={{ p: 4, bgcolor: '#f8faff', borderRadius: 4, position: 'sticky', top: 100 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, color: 'primary.main' }}>
                Tu seguridad es primero
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Antes de realizar cualquier apertura, solicitamos acreditar la titularidad de la propiedad o la autorización de ingreso correspondiente.
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                  <Typography variant="body2">Servicio garantizado</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                  <Typography variant="body2">Técnicos especializados</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                  <Typography variant="body2">Atención inmediata</Typography>
                </Box>
              </Stack>
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ mt: 4, py: 2, fontWeight: 700 }}
                href="tel:1136219993"
              >
                Pedir Cerrajero
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Internal Links SEO */}
      <Box sx={{ bgcolor: '#eee', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>Explora más servicios:</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <Link href="/cerrajero-urgente-buenos-aires" style={{ color: '#003366', textDecoration: 'underline' }}>Cerrajero 24 Horas Buenos Aires</Link>
            <Link href="/cambio-de-cerraduras" style={{ color: '#003366', textDecoration: 'underline' }}>Cambio y Reparación de Cerraduras</Link>
            <Link href="/" style={{ color: '#003366', textDecoration: 'underline' }}>Volver al Inicio</Link>
          </Stack>
        </Container>
      </Box>

      <Contact />
      <Footer />
      <FloatingContact />
    </Box>
  );
}
