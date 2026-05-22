import { Box, Container, Typography, Button } from '@mui/material';
import GoogleReviewsWidget from './ReviewsApi';

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

        <Box sx={{ mt: 4, width: '100%' }}>
          <GoogleReviewsWidget />
        </Box>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography color="text.primary" sx={{ fontWeight: 'regular' }}>
            ¿Te gustaría contarnos tu experiencia?
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href="https://www.google.com/maps/place/Cerrajeria+24+hs+clavem/@-34.6156548,-58.5156999,21835m/data=!3m2!1e3!4b1!4m6!3m5!1s0x236c9ef36e3bf293:0xc73ba8591207c7bd!8m2!3d-34.6158238!4d-58.4332985!16s%2Fg%2F11z21f03ry!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D"
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