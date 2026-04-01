'use client';

import { useRef, useState, UIEvent, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Rating, CircularProgress } from '@mui/material';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: string;
}

const FALLBACK_REVIEWS_API_DATA = [
    {
    author: { name: "Lazaro cerrajeria 24 horas" },
    originalText: "Excelente servicio y cálidad 💪",
    rating: { value: 5 },
    publishedAt: "2026-03-12T22:44:34.000Z"
  },
  {
    author: { name: "Alejandro Morreale" },
    originalText: "Servicio profesional y prolijo. Recomendable!",
    rating: { value: 5 },
    publishedAt: "2026-03-23T11:25:36.000Z"
  },
  {
    author: { name: "Esteban Fernandez" },
    originalText: "Excelente atención.",
    rating: { value: 5 },
    publishedAt: "2026-03-13T13:02:20.000Z"
  }
];

const parseReviewsData = (rawReviews: any[]) => {
  return rawReviews.map((r: any) => {
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
};

export default function GoogleReviewsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const widgetId = process.env.NEXT_PUBLIC_FEATURABLE_WIDGET_ID;
        const res = await fetch(`https://featurable.com/api/v2/widgets/${widgetId}`);
        const data = await res.json();
        
        if (data.success && data.widget && data.widget.reviews && data.widget.reviews.length > 0) {
          setReviews(parseReviewsData(data.widget.reviews));
        } else {
          console.warn("La API no devolvió reviews. Mostrando array de respaldo.");
          setReviews(parseReviewsData(FALLBACK_REVIEWS_API_DATA));
        }
      } catch (error) {
        console.error("Error obteniendo reviews de la API. Mostrando array de respaldo:", error);
        setReviews(parseReviewsData(FALLBACK_REVIEWS_API_DATA));
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    
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
    <Box sx={{ width: '100%', mx: 'auto', position: 'relative' }}>
      <Box 
        ref={containerRef}
        onScroll={handleScroll}
        sx={{ 
          display: 'flex', 
          flexWrap: 'nowrap',
          overflowX: 'auto',
          overflowY: 'hidden', 
          gap: { xs: 2, sm: 3 },
          // Padding justo para evitar recortar la sombra, sin ensanchar demasiado
          px: { xs: 1.5, sm: 3, md: 2 }, 
          py: 3, 
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          
          msOverflowStyle: 'none', 
          scrollbarWidth: 'none', 
          '&::-webkit-scrollbar': {
            display: 'none', 
          },
          '&::after': {
            content: '""',
            minWidth: { xs: '1px', sm: '8px' }, 
            display: 'block'
          }
        }}
      >
        {reviews.map((review, index) => (
          <Box 
            key={index}
            sx={{
              width: { xs: '270px', sm: '300px', md: '330px' }, 
              flexShrink: 0, 
              scrollSnapAlign: 'center', 
            }}
          >
            <Card 
              elevation={0}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: '24px', 
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                boxShadow: '0 6px 18px rgba(0,0,0,0.06)', 
                overflow: 'hidden', 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: { xs: 2.5, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: { xs: 42, sm: 48 }, 
                      height: { xs: 42, sm: 48 }, 
                      mr: 1.5, 
                      bgcolor: 'primary.main',
                      fontSize: { xs: '1.1rem', sm: '1.2rem' },
                      fontWeight: 'bold'
                    }}
                  >
                    {review.author_name.charAt(0)}
                  </Avatar>
                  <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="bold" 
                      sx={{ 
                        lineHeight: 1.2, 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        fontSize: { xs: '0.95rem', sm: '1rem' }
                      }}
                    >
                      {review.author_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.time}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 'auto', pl: 1, display: 'flex' }}>
                    <Box 
                      component="img" 
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                      alt="Google"
                      sx={{ width: 18, height: 18 }}
                    />
                  </Box>
                </Box>
                
                <Rating value={review.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ fontStyle: 'italic', lineHeight: 1.6, fontSize: { xs: '0.85rem', sm: '0.875rem' } }}
                >
                  "{review.text}"
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Bullets (Paginador visual) */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', pb: 1, gap: 1.5 }}>
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
              transform: index === activeIndex ? 'scale(1.3)' : 'scale(1)',
              '&:hover': {
                backgroundColor: index === activeIndex ? 'primary.main' : 'rgba(0,0,0,0.3)',
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
