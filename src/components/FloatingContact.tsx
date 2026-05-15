'use client';

import React, { useState, useEffect } from 'react';
import { Box, Fab, Zoom, SvgIcon } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

// Custom Google Maps Multi-colored Icon
function GoogleMapsMultiIcon(props: any) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="google-maps-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#EA4335' }} />
          <stop offset="25%" style={{ stopColor: '#FBBC05' }} />
          <stop offset="50%" style={{ stopColor: '#34A853' }} />
          <stop offset="75%" style={{ stopColor: '#4285F4' }} />
        </linearGradient>
      </defs>
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="url(#google-maps-gradient)"
      />
    </SvgIcon>
  );
}

export default function FloatingContact() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const phone = '541136219993'; // Argentina prefix + number
  const whatsappUrl = `https://wa.me/${phone}`;
  const instagramUrl = 'https://www.instagram.com/cerrajeriaclavem';
  const mapsUrl = 'https://www.google.com/maps/place/Cerrajeria+24+hs+Clavem/@-34.5982428,-58.4214406,17z/data=!3m1!4b1!4m6!3m5!1s0x236c9ef36e3bf293:0xc73ba8591207c7bd!8m2!3d-34.5982472!4d-58.4188657!16s%2Fg%2F11z21f03ry?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D';

  if (!mounted) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 16, sm: 32 },
        right: { xs: 12, sm: 32 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1.5, sm: 2 },
        zIndex: 1000,
      }}
    >
      <Zoom in timeout={500} style={{ transitionDelay: '400ms' }}>
        <Fab
          aria-label="google-maps"
          href={mapsUrl}
          target="_blank"
          sx={{
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
            backgroundColor: 'white',
            border: '1px solid #f1f3f4',
            '&:hover': {
              backgroundColor: '#f8f9fa',
              transform: 'scale(1.1)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            },
            '& .MuiSvgIcon-root': {
              fontSize: { xs: 32, sm: 40 }, // Enlarged icon
            }
          }}
        >
          <GoogleMapsMultiIcon />
        </Fab>
      </Zoom>

      <Zoom in timeout={500} style={{ transitionDelay: '200ms' }}>
        <Fab
          aria-label="instagram"
          href={instagramUrl}
          target="_blank"
          sx={{
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
            backgroundColor: '#E1306C',
            color: 'white',
            '&:hover': {
              backgroundColor: '#C13584',
              transform: 'scale(1.1)',
            },
            '& .MuiSvgIcon-root': {
              fontSize: { xs: 24, sm: 28 },
            }
          }}
        >
          <InstagramIcon />
        </Fab>
      </Zoom>
      
      <Zoom in timeout={500}>
        <Fab
          aria-label="whatsapp"
          href={whatsappUrl}
          target="_blank"
          sx={{
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
            backgroundColor: '#25D366',
            color: 'white',
            '&:hover': {
              backgroundColor: '#128C7E',
              transform: 'scale(1.1)',
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
        </Fab>
      </Zoom>
    </Box>
  );
}
