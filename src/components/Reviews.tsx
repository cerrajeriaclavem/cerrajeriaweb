'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Rating,
  Avatar,
  Paper,
  Grid,
  Button,
  Divider,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import StarIcon from '@mui/icons-material/Star';

// Mock data structured similarly to Google Business Profile API responses
const MOCK_REVIEWS = [
  {
    reviewId: '1',
    reviewer: {
      displayName: 'Juan Pérez',
      profilePhotoUrl: '', // Will use initial if empty
    },
    starRating: 5,
    comment: 'Excelente servicio. El cerrajero llegó en menos de 20 minutos y resolvió el problema de la cerradura trabada con mucha profesionalidad. Totalmente recomendado.',
    createTime: 'Hace 2 semanas',
  },
  {
    reviewId: '2',
    reviewer: {
      displayName: 'María García',
      profilePhotoUrl: '',
    },
    starRating: 5,
    comment: 'Me quedé afuera un domingo a la noche y fueron los únicos que respondieron rápido. Súper amables y precio justo para la urgencia.',
    createTime: 'Hace 1 mes',
  },
  {
    reviewId: '3',
    reviewer: {
      displayName: 'Carlos Rodríguez',
      profilePhotoUrl: '',
    },
    starRating: 4,
    comment: 'Muy buen trabajo en el cambio de combinación de las llaves. Prolijos y puntuales. Los volvería a contratar.',
    createTime: 'Hace 2 meses',
  },
  {
    reviewId: '4',
    reviewer: {
      displayName: 'Laura Martínez',
      profilePhotoUrl: '',
    },
    starRating: 5,
    comment: 'Instalaron una cerradura de seguridad en mi local. Muy conformes con el asesoramiento y la calidad de los materiales.',
    createTime: 'Hace 3 meses',
  },
];

export default function Reviews() {
  return (
    <Box id="opiniones" sx={{ py: 10, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          textAlign="center" 
          gutterBottom 
          sx={{ mb: 2, color: 'primary.main' }}
        >
          Opiniones de Nuestros Clientes
        </Typography>
        <Typography 
          variant="body1" 
          textAlign="center" 
          color="text.secondary" 
          sx={{ mb: 6 }}
        >
          La confianza de quienes nos eligen es nuestro mejor aval. 
        </Typography>

        {/* Google Header Simulation */}
        <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mr: 2 }}>4.9</Typography>
                <Box>
                  <Rating value={5} readOnly size="medium" />
                  <Typography variant="body2" color="text.secondary">Basado en 48 reseñas</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <GoogleIcon sx={{ color: '#4285F4', fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Reseñas de Google</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Button 
                variant="outlined" 
                startIcon={<StarIcon />}
                sx={{ 
                  borderRadius: 20, 
                  borderColor: '#dadce0', 
                  color: '#1a73e8',
                  '&:hover': { borderColor: '#1a73e8', backgroundColor: 'rgba(26, 115, 232, 0.04)' }
                }}
              >
                Escribir una reseña
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Reviews Grid */}
        <Grid container spacing={3}>
          {MOCK_REVIEWS.map((review) => (
            <Grid size={{ xs: 12, md: 6 }} key={review.reviewId}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  borderRadius: 4, 
                  border: '1px solid', 
                  borderColor: 'divider',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={review.reviewer.profilePhotoUrl} 
                    sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', fontWeight: 600 }}
                  >
                    {review.reviewer.displayName.charAt(0)}
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                      {review.reviewer.displayName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Reseña local • {review.createTime}
                    </Typography>
                  </Box>
                </Box>
                <Rating 
                  value={review.starRating} 
                  readOnly 
                  size="small" 
                  sx={{ mb: 1 }} 
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <Typography variant="body2" color="text.secondary">
                  "{review.comment}"
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button 
            variant="text" 
            sx={{ color: '#1a73e8', fontWeight: 700 }}
            onClick={() => window.open('https://www.google.com/maps', '_blank')}
          >
            Ver todas las reseñas en Google
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
