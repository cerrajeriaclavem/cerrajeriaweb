'use client';

import { useEffect, useState, useRef, UIEvent } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Rating, CircularProgress, Alert } from '@mui/material';

// Interfaz para el review de Google
interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

export default function GoogleReviewsWidget() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data.reviews) {
          // Filtramos para asegurar que solo cargue reseñas buenas (4+ estrellas)
          const bestReviews = data.reviews.filter((r: Review) => r.rating >= 4);
          setReviews(bestReviews.slice(0, 3)); 
        } else if (data.error) {
          setErrorDetails(`${data.error} - Detalles de Google: ${data.details || ''} ${data.message || ''}`);
        } else {
          setErrorDetails('No se encontraron reseñas validas.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setErrorDetails('Error de red al intentar cargar reseñas de la API.');
        setLoading(false);
      });
  }, []);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    
    // Ancho promedio de cada elemento. Redondeamos.
    if (reviews.length > 0) {
      const itemWidth = container.scrollWidth / reviews.length;
      const newIndex = Math.round(scrollLeft / itemWidth);
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < reviews.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollTo = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Obtenemos los elementos hijos de la caja principal (las reseñas)
    const cards = container.children;
    if (cards && cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      
      // Calculamos su posición exacta restando la mitad de la pantalla para centrarlo
      container.scrollTo({
        left: targetCard.offsetLeft - (container.clientWidth / 2 - targetCard.clientWidth / 2),
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, minHeight: '300px', alignItems: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (errorDetails || reviews.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, minHeight: '300px', alignItems: 'center' }}>
        <Alert severity="warning" sx={{ maxWidth: '600px' }}>
          <strong>No se pudieron cargar las reseñas de Google Maps.</strong><br/>
          Error de servicio técnico: <br/> 
          <code>{errorDetails}</code>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: 2, py: 2 }}>
      {/* Contenedor principal con scroll */}
      <Box 
        ref={containerRef}
        onScroll={handleScroll}
        sx={{ 
          display: 'flex', 
          flexWrap: 'nowrap',
          overflowX: 'auto',
          gap: 3,
          pb: 2, 
          scrollSnapType: 'x mandatory',
          '-webkit-overflow-scrolling': 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          }
        }}
      >
        {reviews.map((review, index) => (
          <Box 
            key={index}
            sx={{
              width: { xs: '85vw', sm: '320px', md: '350px' },
              flexShrink: 0, 
              scrollSnapAlign: 'center', 
            }}
          >
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 4,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={review.profile_photo_url}
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      mr: 2, 
                      bgcolor: 'primary.main',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {!review.profile_photo_url && review.author_name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                      {review.author_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.relative_time_description}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 'auto' }}>
                    <Box 
                      component="img" 
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                      alt="Google"
                      sx={{ width: 20, height: 20 }}
                    />
                  </Box>
                </Box>
                
                <Rating value={review.rating} readOnly size="small" sx={{ mb: 2 }} />
                
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{review.text}"
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Bullets (Paginador visual) */}
      {reviews.length > 1 && (
        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mt: 1, gap: 1.5 }}>
          {reviews.map((_, index) => (
            <Box
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Ver reseña ${index + 1}`}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: index === activeIndex ? 'primary.main' : 'rgba(0,0,0,0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)',
                '&:hover': {
                  backgroundColor: index === activeIndex ? 'primary.main' : 'rgba(0,0,0,0.35)',
                }
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
