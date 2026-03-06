'use client';

import React from 'react';
import { Box, Fab, Zoom } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function FloatingContact() {
  const phone = '541136219993'; // Argentina prefix + number
  const whatsappUrl = `https://wa.me/${phone}`;
  const instagramUrl = 'https://www.instagram.com/cerrajeriaclavem';

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 1000,
      }}
    >
      <Zoom in timeout={500} style={{ transitionDelay: '200ms' }}>
        <Fab
          color="secondary"
          size="medium"
          aria-label="instagram"
          href={instagramUrl}
          target="_blank"
          sx={{
            backgroundColor: '#E1306C',
            color: 'white',
            '&:hover': {
              backgroundColor: '#C13584',
              transform: 'scale(1.1)',
            },
          }}
        >
          <InstagramIcon />
        </Fab>
      </Zoom>
      
      <Zoom in timeout={500}>
        <Fab
          color="success"
          size="large"
          aria-label="whatsapp"
          href={whatsappUrl}
          target="_blank"
          sx={{
            backgroundColor: '#25D366',
            color: 'white',
            '&:hover': {
              backgroundColor: '#128C7E',
              transform: 'scale(1.1)',
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 32 }} />
        </Fab>
      </Zoom>
    </Box>
  );
}
