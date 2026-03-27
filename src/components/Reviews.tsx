'use client';

import dynamic from 'next/dynamic';
import { Box, Container, Typography, Button } from '@mui/material';
import GoogleReviewsHarcode from './GoogleReviewsHarcode';

const GoogleReviewsWidget = dynamic(() => import('./GoogleReviewsWidget'), {
  ssr: false,
});

export default function Reviews() {
  return (
    <Box id="opiniones" component="section" sx={{ py: 5, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          textAlign="center" 
          gutterBottom 
          sx={{ mb: 2, color: 'primary.main' }}
        >
          Algunas Opiniones de Nuestros Clientes!
        </Typography>
        <Typography 
          variant="body1" 
          textAlign="center" 
          color="text.secondary" 
        >
          La confianza de quienes nos eligen es nuestro mejor aval. 
        </Typography>

        <Box sx={{ mt: 4, width: '100%' }}>              
          <Box 
            id="opiniones-widget" 
            sx={{ width: '100%' }} 
          >
           <GoogleReviewsHarcode />
          </Box>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography color="text.primary" sx={{ fontWeight: 'regular' }}>
            ¿Te gustaría contarnos tu experiencia?
          </Typography>
          <Button 
            variant="outlined" 
            color="inherit" 
            size="large"
            href="https://www.google.com/maps/place/Cerrajeria+24+hs+a+domicilio/data=!4m2!3m1!1s0x10c350a4a77d3e1:0xaa22284143a46608!18m1!1e1"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              mt: 1, 
              borderRadius: 8, 
              px: 4, 
              py: 1.5,
              textTransform: 'none', 
              fontSize: '1.1rem',
              borderColor: '#dadce0',
              backgroundColor: 'white',
              color: '#3c4043',
              '&:hover': {
                backgroundColor: '#f8f9fa',
                borderColor: '#d2e3fc'
              }
            }}
            startIcon={
              <Box 
                component="img" 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google"
                sx={{ width: 24, height: 24, mr: 0.5 }}
              />
            }
          >
            Dejar una reseña en Google
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
