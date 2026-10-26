'use client';

import WhatsAppButton from '@/components/WhatsAppButton';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Box, Button, ButtonBase, Container, Dialog, IconButton, Typography } from '@mui/material';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import type { GalleryCategory, GalleryItem } from '@/lib/gallery';

const ALL = 'all';
const INITIAL_VISIBLE = 8;
const WHATSAPP_NUMBER = '5491136219993';
const CAROUSEL_GAP = 12;

const GOLD = '#FFD700';
const NAVY_DARK = '#001a33';
// Color de fondo aproximado detrás de los filtros, para que el degradado se funda.
const FILTERS_BG = '#00203d';

interface Props {
  categories: GalleryCategory[];
  items: GalleryItem[];
}

export default function GalleryClient({ categories, items }: Props) {
  const [active, setActive] = useState<string>(ALL);
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [pillsEdge, setPillsEdge] = useState({ start: true, end: true });

  const pillsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselRaf = useRef(0);
  const reduceMotion = useReducedMotion();

  const labels = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.slug, c.label])),
    [categories],
  );

  const filtered = useMemo(
    () => (active === ALL ? items : items.filter((i) => i.category === active)),
    [active, items],
  );
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filtered.length - visible.length;

  const activeCategory = categories.find((c) => c.slug === active);
  const description = activeCategory?.description || '';

  const pills = [
    { slug: ALL, label: 'Todos', count: items.length },
    ...categories.map((c) => ({
      slug: c.slug,
      label: c.label,
      count: items.filter((i) => i.category === c.slug).length,
    })),
  ];

  /* ---- Filtros: degradados de los bordes y pista de scroll en mobile ---- */

  const updatePillsEdges = useCallback(() => {
    const el = pillsRef.current;
    if (!el) return;
    setPillsEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updatePillsEdges();
    window.addEventListener('resize', updatePillsEdges);
    return () => window.removeEventListener('resize', updatePillsEdges);
  }, [updatePillsEdges]);

  // La primera vez que los filtros aparecen en pantalla, si no entran todos,
  // hacemos un pequeño deslizamiento de ida y vuelta para mostrar que hay más.
  useEffect(() => {
    const el = pillsRef.current;
    if (!el || reduceMotion) return;
    let timeout: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (el.scrollWidth <= el.clientWidth + 4 || el.scrollLeft > 0) return;
        el.scrollTo({ left: 56, behavior: 'smooth' });
        timeout = setTimeout(() => el.scrollTo({ left: 0, behavior: 'smooth' }), 700);
      },
      { threshold: 1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [reduceMotion]);

  const selectCategory = (slug: string, pill: HTMLElement) => {
    setActive(slug);
    setExpanded(false);
    setCarouselIndex(0);

    // Centra el filtro elegido para que se vean los vecinos (sin mover la página).
    const el = pillsRef.current;
    if (el) {
      el.scrollTo({ left: pill.offsetLeft - (el.clientWidth - pill.offsetWidth) / 2, behavior: 'smooth' });
    }
  };

  /* ---- Carrusel mobile: índice actual para la barra de progreso ---- */

  const onCarouselScroll = () => {
    if (carouselRaf.current) return;
    carouselRaf.current = requestAnimationFrame(() => {
      carouselRaf.current = 0;
      const el = carouselRef.current;
      const first = el?.firstElementChild as HTMLElement | null;
      if (!el || !first) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      const index = atEnd
        ? filtered.length - 1
        : Math.round(el.scrollLeft / (first.offsetWidth + CAROUSEL_GAP));
      setCarouselIndex(Math.min(filtered.length - 1, index));
    });
  };

  useEffect(() => () => cancelAnimationFrame(carouselRaf.current), []);

  /* ---- Lightbox: el "atrás" del celular lo cierra en vez de salir de la página ---- */

  // Al abrir se agrega una entrada al historial; el "atrás" la consume y cierra
  // el lightbox. Si se cierra de otra forma (X, Escape, fondo), se descarta esa
  // entrada a mano para que no quede un "atrás" de más.
  const lightboxOpen = lightboxIndex !== null;

  useEffect(() => {
    if (!lightboxOpen) return;
    window.history.pushState({ galleryLightbox: true }, '');
    let closedByBack = false;
    const onPopState = () => {
      closedByBack = true;
      setLightboxIndex(null);
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      if (!closedByBack) window.history.back();
    };
  }, [lightboxOpen]);

  const scrollCarousel = (step: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: step * (el.clientWidth + CAROUSEL_GAP), behavior: 'smooth' });
  };

  return (
    <Box
      id="galeria"
      component="section"
      sx={{
        // `section` tiene max-width global de 1200px; esta sección va a todo el ancho.
        maxWidth: 'none',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
        background: `radial-gradient(ellipse at 15% 0%, rgba(0, 76, 153, 0.55), transparent 55%),
          radial-gradient(ellipse at 90% 100%, rgba(255, 215, 0, 0.08), transparent 45%),
          linear-gradient(180deg, ${NAVY_DARK} 0%, #00264d 100%)`,
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Encabezado */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            component="span"
            sx={{
              display: 'inline-block',
              mb: 2,
              px: 1.5,
              py: 0.5,
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: GOLD,
              border: '1px solid rgba(255, 215, 0, 0.35)',
              bgcolor: 'rgba(255, 215, 0, 0.08)',
            }}
          >
            Galería
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, color: 'white' }}>
            Mirá nuestros{' '}
            <Box component="span" sx={{ color: GOLD }}>
              trabajos
            </Box>
          </Typography>
          <Box sx={{ width: 80, height: 4, bgcolor: GOLD, mx: 'auto', mb: 3, borderRadius: 2 }} />
          <AnimatePresence mode="wait">
            {description && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <Typography sx={{ maxWidth: 640, mx: 'auto', color: 'rgba(255,255,255,0.75)' }}>
                  {description}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Filtros por sección */}
        <Box
          sx={{
            position: 'relative',
            mb: { xs: 3, md: 5 },
            mx: { xs: -2, sm: 'auto' },
            width: { sm: 'fit-content' },
            maxWidth: { sm: '100%' },
          }}
        >
          <Box
            ref={pillsRef}
            role="tablist"
            aria-label="Secciones de la galería"
            onScroll={updatePillsEdges}
            sx={{
              position: 'relative',
              display: 'flex',
              gap: 1,
              px: { xs: 2, sm: 0.75 },
              py: 0.75,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              borderRadius: { sm: 999 },
              bgcolor: { sm: 'rgba(255,255,255,0.06)' },
              border: { sm: '1px solid rgba(255,255,255,0.1)' },
              backdropFilter: 'blur(8px)',
            }}
          >
            {pills.map((pill) => {
              const isActive = pill.slug === active;
              return (
                <ButtonBase
                  key={pill.slug}
                  role="tab"
                  aria-selected={isActive}
                  onClick={(e) => selectCategory(pill.slug, e.currentTarget)}
                  sx={{
                    position: 'relative',
                    flexShrink: 0,
                    px: { xs: 2, sm: 2.25 },
                    py: 1.1,
                    borderRadius: 999,
                    fontSize: { xs: '0.9rem', sm: '0.95rem' },
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    color: isActive ? NAVY_DARK : 'rgba(255,255,255,0.8)',
                    border: { xs: '1px solid rgba(255,255,255,0.14)', sm: '1px solid transparent' },
                    transition: 'color 0.25s',
                    '&:hover': { color: isActive ? NAVY_DARK : 'white' },
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      style={{ position: 'absolute', inset: -1, borderRadius: 999, background: GOLD }}
                    />
                  )}
                  <Box component="span" sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1 }}>
                    {pill.label}
                    <Box
                      component="span"
                      sx={{
                        display: { xs: 'none', sm: 'inline-block' },
                        minWidth: 22,
                        px: 0.75,
                        borderRadius: 999,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        lineHeight: '20px',
                        textAlign: 'center',
                        bgcolor: isActive ? 'rgba(0,26,51,0.12)' : 'rgba(255,255,255,0.1)',
                      }}
                    >
                      {pill.count}
                    </Box>
                  </Box>
                </ButtonBase>
              );
            })}
          </Box>
          <PillsFade side="left" visible={!pillsEdge.start} />
          <PillsFade side="right" visible={!pillsEdge.end} />
        </Box>

        {/* Escritorio / tablet: grilla uniforme */}
        {/* Al cambiar de filtro: la grilla actual se desvanece rápido y la nueva
            entra con las tarjetas apareciendo en cascada (sin saltos de layout). */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
            '--gallery-cols': { sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.2, ease: [0.4, 0, 1, 1] }}
              style={{ display: 'grid', gap: 16, gridTemplateColumns: 'var(--gallery-cols)' }}
            >
              {visible.map((item, index) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    // Cascada corta; al "Ver más" solo escalonan las tarjetas nuevas.
                    delay: 0.05 + (index % INITIAL_VISIBLE) * 0.05,
                  }}
                  style={{ aspectRatio: '4 / 5', minWidth: 0 }}
                >
                  <GalleryCard
                    item={item}
                    label={labels[item.category]}
                    sizes="(max-width: 900px) 33vw, 300px"
                    onOpen={() => setLightboxIndex(index)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Mobile: carrusel horizontal con scroll-snap */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Box sx={{ position: 'relative' }}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box
                ref={carouselRef}
                onScroll={onCarouselScroll}
                sx={{
                  display: 'flex',
                  gap: `${CAROUSEL_GAP}px`,
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  overscrollBehaviorX: 'contain',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {filtered.map((item, index) => (
                  <Box
                    key={item.src}
                    sx={{ flex: '0 0 100%', aspectRatio: '4 / 5', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
                  >
                    <GalleryCard
                      item={item}
                      label={labels[item.category]}
                      sizes="100vw"
                      onOpen={() => setLightboxIndex(index)}
                    />
                  </Box>
                ))}
              </Box>
            </motion.div>

            {filtered.length > 1 && (
              <>
                <CarouselArrow side="left" hidden={carouselIndex === 0} onClick={() => scrollCarousel(-1)} />
                <CarouselArrow
                  side="right"
                  hidden={carouselIndex === filtered.length - 1}
                  onClick={() => scrollCarousel(1)}
                />
              </>
            )}
          </Box>

          {filtered.length > 1 && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ flex: 1, height: 3, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
                <Box
                  sx={{
                    height: '100%',
                    width: `${((carouselIndex + 1) / filtered.length) * 100}%`,
                    bgcolor: GOLD,
                    borderRadius: 2,
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', minWidth: 44, textAlign: 'right' }}>
                {carouselIndex + 1} / {filtered.length}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Acciones */}
        <Box
          sx={{
            mt: { xs: 3, md: 6 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {hiddenCount > 0 && (
            <Button
              onClick={() => setExpanded(true)}
              variant="outlined"
              size="large"
              endIcon={<KeyboardArrowDownRoundedIcon />}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                borderRadius: 999,
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': { borderColor: GOLD, color: GOLD, bgcolor: 'rgba(255,215,0,0.06)' },
              }}
            >
              Ver {hiddenCount} más
            </Button>
          )}
          <WhatsAppButton
            href={whatsappUrl(activeCategory?.label)}
            target="_blank"
            rel="noopener"
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<WhatsAppIcon />}
            sx={{ borderRadius: 999, fontWeight: 700, boxShadow: '0 10px 30px rgba(255,215,0,0.2)' }}
          >
            Consultanos por WhatsApp
          </WhatsAppButton>
        </Box>
      </Container>

      <Lightbox
        items={filtered}
        labels={labels}
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </Box>
  );
}

function whatsappUrl(categoryLabel?: string) {
  const text = categoryLabel
    ? `¡Hola! Vi la galería de ${categoryLabel} en la web y quería hacer una consulta.`
    : '¡Hola! Vi la galería en la web y quería hacer una consulta.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Degradado en el borde de los filtros (solo mobile) que indica que hay más para deslizar.
function PillsFade({ side, visible }: { side: 'left' | 'right'; visible: boolean }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        [side]: 0,
        width: 56,
        display: { xs: 'flex', sm: 'none' },
        alignItems: 'center',
        justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
        pr: side === 'right' ? 0.5 : 0,
        background: `linear-gradient(to ${side}, transparent, ${FILTERS_BG} 65%)`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s',
        pointerEvents: 'none',
      }}
    >
      {side === 'right' && <ChevronRightRoundedIcon sx={{ color: GOLD, fontSize: 22 }} />}
    </Box>
  );
}

// Flecha sutil sobre el carrusel mobile para pasar a la tarjeta anterior/siguiente.
function CarouselArrow({ side, hidden, onClick }: { side: 'left' | 'right'; hidden: boolean; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeftRoundedIcon : ChevronRightRoundedIcon;
  return (
    <IconButton
      onClick={onClick}
      aria-label={side === 'left' ? 'Anterior' : 'Siguiente'}
      tabIndex={hidden ? -1 : 0}
      sx={{
        position: 'absolute',
        top: '50%',
        [side]: 8,
        transform: 'translateY(-50%)',
        width: 36,
        height: 36,
        color: 'white',
        bgcolor: 'rgba(0,26,51,0.45)',
        border: '1px solid rgba(255,255,255,0.18)',
        backdropFilter: 'blur(6px)',
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
        transition: 'opacity 0.25s, background-color 0.25s',
        '&:hover, &:active': { bgcolor: 'rgba(0,26,51,0.7)' },
      }}
    >
      <Icon sx={{ fontSize: 22 }} />
    </IconButton>
  );
}

/* -------------------------------------------------------------------------- */

interface CardProps {
  item: GalleryItem;
  label: string;
  sizes: string;
  onOpen: () => void;
}

// Tarjeta de la galería; ocupa todo el alto/ancho de su contenedor.
function GalleryCard({ item, label, sizes, onOpen }: CardProps) {
  const isVideo = item.type === 'video';

  return (
    <ButtonBase
      onClick={onOpen}
      aria-label={`Ver ${isVideo ? 'video' : 'foto'} de ${label} en grande`}
      sx={{
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: { xs: '16px', md: '18px' },
        bgcolor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        '& .tile-media': { transition: 'transform 0.7s cubic-bezier(0.2, 0, 0, 1)' },
        '& .tile-expand': { opacity: 0, transform: 'scale(0.8)', transition: 'all 0.3s' },
        '&:hover, &.Mui-focusVisible': {
          borderColor: 'rgba(255,215,0,0.5)',
          boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
          '& .tile-media': { transform: 'scale(1.06)' },
          '& .tile-expand': { opacity: 1, transform: 'scale(1)' },
        },
      }}
    >
      {isVideo ? (
        <VideoPreview src={item.src} />
      ) : (
        <Image
          className="tile-media"
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          style={{ objectFit: 'cover' }}
        />
      )}

      {/* Degradado inferior + etiqueta */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 55%, rgba(0,26,51,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />
      <Typography
        component="span"
        sx={{
          position: 'absolute',
          left: { xs: 12, md: 14 },
          bottom: { xs: 10, md: 12 },
          fontSize: { xs: '0.72rem', md: '0.78rem' },
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: GOLD,
          textAlign: 'left',
        }}
      >
        {label}
      </Typography>

      {isVideo && (
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 10, md: 12 },
            left: { xs: 10, md: 12 },
            display: 'flex',
            alignItems: 'center',
            gap: 0.25,
            pl: 0.5,
            pr: 1.25,
            py: 0.25,
            borderRadius: 999,
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'white',
            bgcolor: 'rgba(0,26,51,0.6)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <PlayArrowRoundedIcon sx={{ fontSize: 18, color: GOLD }} />
          Video
        </Box>
      )}

      <Box
        className="tile-expand"
        sx={{
          position: 'absolute',
          top: { xs: 8, md: 12 },
          right: { xs: 8, md: 12 },
          width: 34,
          height: 34,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          color: NAVY_DARK,
          bgcolor: GOLD,
        }}
      >
        <OpenInFullRoundedIcon sx={{ fontSize: 16 }} />
      </Box>
    </ButtonBase>
  );
}

// Los videos de la galería nunca tienen sonido: además del atributo `muted`,
// se vuelve a silenciar ante cualquier cambio de volumen y se bloquea el menú
// contextual (que permite "Mostrar controles" y desmutear).
const muteProps = {
  muted: true,
  disablePictureInPicture: true,
  controlsList: 'nodownload noremoteplayback',
  onVolumeChange: (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (!v.muted || v.volume > 0) {
      v.muted = true;
      v.volume = 0;
    }
  },
  onLoadedMetadata: (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.muted = true;
    e.currentTarget.volume = 0;
  },
  onContextMenu: (e: React.SyntheticEvent) => e.preventDefault(),
};

// Video silenciado que se reproduce solo mientras está visible en pantalla.
// El `src` se asigna recién cuando el video se acerca al viewport: así los de
// la vista oculta (grilla en mobile / carrusel en escritorio, con display:none)
// nunca se descargan y no saturan las conexiones del navegador.
function VideoPreview({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || load) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [load]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !load || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [load, reduceMotion]);

  return (
    <Box
      component="video"
      ref={ref}
      className="tile-media"
      // `#t=0.1` hace que el navegador muestre el primer cuadro como portada.
      src={load ? `${src}#t=0.1` : undefined}
      {...muteProps}
      loop
      playsInline
      preload="metadata"
      aria-hidden
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}

/* -------------------------------------------------------------------------- */

interface LightboxProps {
  items: GalleryItem[];
  labels: Record<string, string>;
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}

function Lightbox({ items, labels, index, onChange, onClose }: LightboxProps) {
  const [direction, setDirection] = useState(0);
  // Si el toque terminó siendo un swipe, no cuenta como tap para pausar el video.
  const dragged = useRef(false);
  const open = index !== null;
  const item = index !== null ? items[index] : null;

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      setDirection(step);
      onChange((index + step + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  const label = item ? labels[item.category] : '';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      aria-label="Galería ampliada"
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'rgba(0, 13, 26, 0.94)',
            backdropFilter: 'blur(12px)',
            backgroundImage: 'none',
            color: 'white',
          },
        },
      }}
    >
      {item && index !== null && (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Barra superior */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              px: { xs: 2, md: 4 },
              py: { xs: 1.5, md: 2 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
              <Typography
                component="span"
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 999,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: NAVY_DARK,
                  bgcolor: GOLD,
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                {index + 1} / {items.length}
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              aria-label="Cerrar"
              sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' } }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          {/* Medio */}
          <Box sx={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={item.src}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onPointerDown={() => {
                  dragged.current = false;
                }}
                onDragStart={() => {
                  dragged.current = true;
                }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 16px',
                }}
              >
                {item.type === 'video' ? (
                  <Box
                    component="video"
                    src={item.src}
                    // Sin sonido y sin controles nativos (que traen el volumen):
                    // se reproduce en loop y un toque lo pausa/reanuda.
                    {...muteProps}
                    loop
                    autoPlay
                    playsInline
                    onClick={(e: React.MouseEvent<HTMLVideoElement>) => {
                      if (dragged.current) return;
                      const v = e.currentTarget;
                      if (v.paused) v.play().catch(() => {});
                      else v.pause();
                    }}
                    sx={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '14px', bgcolor: 'black', cursor: 'pointer' }}
                  />
                ) : (
                  <Box sx={{ position: 'relative', width: '100%', height: '100%', maxWidth: 1200 }}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="100vw"
                      priority
                      draggable={false}
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                )}
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <NavButton side="left" onClick={() => go(-1)} />
                <NavButton side="right" onClick={() => go(1)} />
              </>
            )}
          </Box>

          {/* CTA */}
          <Box sx={{ display: 'flex', justifyContent: 'center', px: 2, py: { xs: 2, md: 3 } }}>
            <WhatsAppButton
              href={whatsappUrl(label)}
              target="_blank"
              rel="noopener"
              variant="contained"
              color="secondary"
              startIcon={<WhatsAppIcon />}
              sx={{ borderRadius: 999, fontWeight: 700 }}
            >
              Consultar por {label}
            </WhatsAppButton>
          </Box>
        </Box>
      )}
    </Dialog>
  );
}

const NAV_BUTTON_BG = 'rgba(0,26,51,0.6)';

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeftRoundedIcon : ChevronRightRoundedIcon;
  return (
    <IconButton
      onClick={onClick}
      aria-label={side === 'left' ? 'Anterior' : 'Siguiente'}
      sx={{
        position: 'absolute',
        top: '50%',
        [side]: { xs: 8, md: 24 },
        transform: 'translateY(-50%)',
        zIndex: 1,
        width: { xs: 40, md: 52 },
        height: { xs: 40, md: 52 },
        color: 'white',
        bgcolor: NAV_BUTTON_BG,
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(6px)',
        // En pantallas táctiles el :hover queda "pegado" después del toque: ahí se
        // mantiene el fondo base (MUI lo dejaría transparente) y el dorado queda
        // solo para dispositivos con mouse.
        '&:hover': { bgcolor: NAV_BUTTON_BG },
        '@media (hover: hover)': {
          '&:hover': { bgcolor: GOLD, color: NAVY_DARK, borderColor: GOLD },
        },
      }}
    >
      <Icon />
    </IconButton>
  );
}
