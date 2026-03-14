'use client';

import dynamic from 'next/dynamic';
import { Box, Container, Typography } from '@mui/material';

const TrustindexWidget = dynamic(() => import('./TrustindexWidget'), {
  ssr: false,
});

export default function Reviews() {
  return (
    <Box id="opiniones" sx={{ py: 5, backgroundColor: 'background.default' }}>
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

        <Box sx={{ minHeight: '300px', display: 'flex', justifyContent: 'center', mt: 4 }}>              
          <Box 
            id="opiniones-widget" 
            sx={{ 
              minHeight: '300px', 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 4,
              '& .ti-footer-filter-text': {
                display: 'none !important'
              }
            }} 
          >
           <TrustindexWidget />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
