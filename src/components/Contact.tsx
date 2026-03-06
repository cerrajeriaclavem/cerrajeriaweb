'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  Stack,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado con éxito. Te contactaremos pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <Box id="contacto" component="section" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ fontWeight: 800, color: 'primary.main' }}
          >
            Contacto
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
            ¿Tienes alguna urgencia o consulta? Fernando te atenderá a la brevedad.
            Atendemos emergencias las 24 horas del día.
          </Typography>
        </Box>

        {/* Info Row (Horizontal on Desktop) */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {[
            { icon: <PhoneIcon />, title: 'Teléfono', content: '11-4448-1404', color: '#003366' },
            { icon: <EmailIcon />, title: 'Email', content: 'cerrajeriaclavem@gmail.com', color: '#003366' },
            { icon: <LocationOnIcon />, title: 'Cobertura', content: 'Buenos Aires y alrededores', color: '#003366' }
          ].map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    bgcolor: '#f8faff', 
                    borderRadius: 4,
                    height: '100%',
                    border: '1px solid rgba(0,51,102,0.05)',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-5px)', bgcolor: 'primary.main', color: 'white' }
                  }}
                >
                  <Box sx={{ color: 'secondary.main', mb: 2, display: 'inline-flex', p: 1.5, bgcolor: 'primary.main', borderRadius: '50%' }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={800} gutterBottom>{item.title}</Typography>
                  <Typography variant="body1">{item.content}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Contact Form Container (Centered and Balanced) */}
        {/* <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Paper 
              elevation={10} 
              sx={{ 
                p: { xs: 3, md: 6 }, 
                borderRadius: 6,
                boxShadow: '0 20px 60px rgba(0, 51, 102, 0.1)'
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Nombre Completo"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Teléfono de contacto"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Correo electrónico"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Escríbenos tu consulta..."
                      name="message"
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      endIcon={<SendIcon />}
                      sx={{ 
                        px: 8, 
                        py: 2, 
                        fontSize: '1.1rem', 
                        fontWeight: 800,
                        boxShadow: '0 10px 30px rgba(0, 51, 102, 0.2)'
                      }}
                    >
                      Enviar Consulta
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>
        </Box> */}
      </Container>
    </Box>
  );
}
