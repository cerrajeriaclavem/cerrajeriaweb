'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800',
    title: 'Cerraduras de Seguridad',
  },
  {
    img: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800',
    title: 'Aperturas Profesionales',
  },
  {
    img: 'https://images.unsplash.com/photo-1563914041221-995b2c7e0f80?q=80&w=800',
    title: 'Cajas Fuertes',
  },
  {
    img: 'https://images.unsplash.com/photo-1510820377515-68344844594c?q=80&w=800',
    title: 'Instalaciones Premium',
  },
  {
    img: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800',
    title: 'Sistemas Digitales',
  },
  {
    img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800',
    title: 'Cerrajería Integral',
  },
];

export default function Gallery() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box id="galeria" component="section" sx={{ bgcolor: '#f0f5ff', py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ height: 400, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 4 }} />
        </Container>
      </Box>
    );
  }

  return (
    <Box id="galeria" component="section" sx={{ bgcolor: '#f0f5ff', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ fontWeight: 800, color: 'primary.main' }}
          >
            Galería de Trabajos
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
            Nuestros trabajos realizados con precisión y profesionalismo. Calidad garantizada en cada intervención.
          </Typography>
        </Box>

        <Box sx={{ 
          px: { xs: 2, md: 4 },
          position: 'relative',
          mb: 4,
          '.swiper-pagination-bullet-active': { bgcolor: 'secondary.main' } 
        }}>
          <Swiper
            spaceBetween={30}
            centeredSlides={false}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            style={{ paddingBottom: '50px' }}
          >
            {itemData.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ height: '400px' }}
                >
                  <Box 
                    sx={{ 
                      position: 'relative', 
                      height: '100%', 
                      borderRadius: 4, 
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0, 51, 102, 0.1)',
                      '&:hover img': { transform: 'scale(1.1)' },
                      '&:hover .gallery-overlay': { opacity: 1 }
                    }}
                  >
                    <Box
                      component="img"
                      src={item.img}
                      alt={item.title}
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        transition: 'transform 0.6s ease' 
                      }}
                    />
                    <Box
                      className="gallery-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0,51,102,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        backdropFilter: 'blur(3px)'
                      }}
                    >
                      <Typography variant="h6" color="white" textAlign="center" fontWeight={700}>
                        {item.title}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
}
