'use client';

import { useRef, useState, UIEvent } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Rating } from '@mui/material';

// Estas son reseñas destacadas estáticas. 
// Es la forma más fácil, rápida y 100% gratuita de mostrar excelentes reseñas de tus clientes.
// No dependes de ningún plugin de terceros ni pagos mensuales. Puedes actualizarlas cuando quieras.
const REVIEWS = [
  {
    author_name: "Luis Fiorda",
    rating: 5,
    text: "Excelente servicio, rápido y muy prolijo para trabajar. Recomiendo ampliamente.",
    time: "hace 2 semanas"
  },
  {
    author_name: "Debora Salcedo",
    rating: 5,
    text: "Excelente servicio. Llamé ante una urgencia,  respondieron inmediatamente. Llegaron en el tiempo que me dijeron y solucionaron mi problema de manera muy prolija.",
    time: "hace 3 semanas"
  },
  {
    author_name: "Myriam Tawil",
    rating: 5,
    text: "Un genio Fernando. Excelente persona y profesional. Te contesta al instante y no se retira, aunque sea tarde, hasta no terminar por completo el trabajo. Muy recomendable. Excelentes precios.",
    time: "hace 2 semanas"
  }
];

export default function GoogleReviewsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Calcula qué tarjeta está más centrada en la pantalla según el scroll
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    
    // Ancho promedio de cada elemento (incluyendo el gap aproximado). Redondeamos.
    const itemWidth = container.scrollWidth / REVIEWS.length;
    const newIndex = Math.round(scrollLeft / itemWidth);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < REVIEWS.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Obtenemos los elementos hijos de la caja principal (las reseñas)
    const cards = container.children;
    if (cards && cards[index]) {
      // Usamos el método nativo para scrollear hacia la tarjeta calculada, sin romper responsive
      const targetCard = cards[index] as HTMLElement;
      
      // Calculamos su posición exacta restando la mitad de la pantalla para centrarlo (si es móvil)
      container.scrollTo({
        left: targetCard.offsetLeft - (container.clientWidth / 2 - targetCard.clientWidth / 2),
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

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
          '-webkit-overflow-scrolling': 'touch', // Scroll suave en iOS
          
          // Ocultar barra de scroll en todos los navegadores
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          }
        }}
      >
        {REVIEWS.map((review, index) => (
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
        {REVIEWS.map((_, index) => (
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
