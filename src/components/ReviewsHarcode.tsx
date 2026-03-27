'use client';

import { useRef, useState, UIEvent, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Rating, CircularProgress } from '@mui/material';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: string;
}

export default function GoogleReviewsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const widgetId = process.env.NEXT_PUBLIC_FEATURABLE_WIDGET_ID || '94641a6d-c3e3-474f-aa8c-b174ee15f55b';
        const res = await fetch(`https://featurable.com/api/v2/widgets/${widgetId}`);
        const data = await res.json();
        
        if (data.success && data.widget && data.widget.reviews) {
          const parsed = data.widget.reviews.map((r: any) => {
            const dateStr = r.publishedAt || r.createdAt;
            const date = dateStr ? new Date(dateStr) : new Date();
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
            
            let timeStr = "";
            const diffInDays = Math.floor(diffInSeconds / (3600 * 24));
            if (diffInDays < 7) {
              timeStr = diffInDays <= 0 ? "hoy" : `hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
            } else if (diffInDays < 30) {
              const weeks = Math.floor(diffInDays / 7);
              timeStr = `hace ${weeks} semana${weeks !== 1 ? 's' : ''}`;
            } else if (diffInDays < 365) {
              const months = Math.floor(diffInDays / 30);
              timeStr = `hace ${months} mes${months !== 1 ? 'es' : ''}`;
            } else {
              const years = Math.floor(diffInDays / 365);
              timeStr = `hace ${years} año${years !== 1 ? 's' : ''}`;
            }

            return {
              author_name: r.author?.name || "Usuario",
              rating: r.rating?.value || 5,
              text: r.originalText || r.text || "",
              time: timeStr
            };
          });
          setReviews(parsed);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    
    // Ancho promedio de cada elemento
    const itemWidth = container.scrollWidth / (reviews.length || 1);
    const newIndex = Math.round(scrollLeft / itemWidth);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < reviews.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const cards = container.children;
    if (cards && cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      
      container.scrollTo({
        left: targetCard.offsetLeft - (container.clientWidth / 2 - targetCard.clientWidth / 2),
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: 2, py: 2 }}>
      {/* Contenedor del scroll invisible */}
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
          WebkitOverflowScrolling: 'touch', // Scroll suave en iOS
          
          // Ocultar barra de scroll en todos los navegadores
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
              // Usamos anchos estrictos (vw o px) para evitar que flexbox rompa la caja en móviles
              width: { xs: '85vw', sm: '320px', md: '350px' },
              flexShrink: 0, // Evita que se encojan
              scrollSnapAlign: 'center', // Centra la tarjeta magnéticamente al soltar
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
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      mr: 2, 
                      bgcolor: 'primary.main',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {review.author_name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                      {review.author_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.time}
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
    </Box>
  );
}
