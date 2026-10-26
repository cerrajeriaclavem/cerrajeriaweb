# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Sitio de Cerrajería Clavem (https://www.cerrajeriaclavem.com.ar), cerrajería 24 hs en CABA, Argentina. Next.js 16 (App Router) + React 19 + MUI 7 (Emotion) + Tailwind 4 + framer-motion + Swiper. Todo el contenido y copy está en español rioplatense. El sitio existe para recibir tráfico pago de Google Ads; la conversión principal es el clic en "Llamar".

## Comandos

- `npm run dev` — servidor de desarrollo
- `npm run build` / `npm start` — build y servidor de producción
- `npm run lint` — ESLint (no hay tests configurados)

## Arquitectura

- **Páginas** (`src/app/`): la home (`page.tsx`) compone secciones de `src/components/`. Las landings de servicio/zona (`apertura-de-puertas`, `cambio-de-cerraduras`, `cerrajero-urgente-caba`) siguen todas la misma estructura visual (Navbar → hero → contenido → Contact → Footer → FloatingContact). Al agregar una landing, copiar ese patrón (hay una skill local en `.claude/skills/landing-cerrajeria`, que está en .gitignore) y registrarla en `src/app/sitemap.ts`, que lista las URLs a mano.
- **Tema y estilos**: `ThemeRegistry.tsx` + `EmotionCache.tsx` + `src/theme.ts` configuran MUI/Emotion; los componentes usan `sx` y colores del tema (`primary.main`, etc.).
- **`template.tsx`** envuelve cada página en una animación de fade (framer-motion).
- **Metadata/SEO**: `layout.tsx` define metadata global, JSON-LD `Locksmith` y los scripts de gtag. Cada landing exporta su propio `metadata` con `alternates.canonical`.
- **Redirects** (`next.config.ts`): el dominio sin `www` redirige a `www.cerrajeriaclavem.com.ar`; `/cerrajero-urgente-buenos-aires` → `/cerrajero-urgente-caba`.

### Seguimiento de conversiones (Google Ads)

- `src/lib/gtag.ts` tiene el ID de Ads y `trackPhoneCallConversion`, que hace `preventDefault()` en el enlace `tel:` y navega recién cuando gtag confirma el evento (o a los 2 s).
- Todo botón de llamada debe usar `src/components/CallButton.tsx` en vez de `<Button href="tel:...">`: es un Client Component, así que funciona dentro de Server Components (las landings).
- Todo enlace de WhatsApp debe usar `WhatsAppButton` (`src/components/WhatsAppButton.tsx`). Dispara `trackWhatsAppConversion` con `transport_type: 'beacon'` y NO hace `preventDefault`, para que el enlace abra normalmente. Para elementos que no son `Button` (Fab, Paper) se pasa `as={Fab}` / `as={Paper}`.
- El teléfono (`1136219993`) aparece en varios lugares (gtag, JSON-LD en `layout.tsx`, enlaces de WhatsApp); cambiarlo implica buscarlo en todo el repo.

### Galería

`Gallery.tsx` (Server Component) llama a `getGalleryData()` de `src/lib/gallery.ts`, que lee en build time cada subcarpeta de `public/images/` como una sección (fotos jpg/png/webp/avif y videos mp4/webm). `CATEGORY_CONFIG` define orden, título y descripción; una carpeta que no figure ahí aparece igual, al final. `GalleryClient.tsx` maneja los filtros, el grid bento, la reproducción de videos en viewport y el lightbox.

### Reseñas de Google

`Reviews.tsx` → `ReviewsApi.tsx` hace fetch a `/api/reviews` (`src/app/api/reviews/route.ts`), que consulta SerpApi (`google_maps_reviews`) con `data_id` hardcodeado y devuelve las 3 reseñas más recientes. Usa `unstable_cache` (24 h) en lugar de `fetch` con `revalidate` a propósito: así los errores de la API no quedan cacheados.

### Variables de entorno

`.env.local` (ignorado por git) define `NEXT_PUBLIC_SERPAPI_KEY` (la que usa realmente la ruta de reseñas), `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` y `NEXT_PUBLIC_FEATURABLE_WIDGET_ID`. Ojo: al ser `NEXT_PUBLIC_` la key de SerpApi se expone al cliente.

## Docs

`docs/marketing/google-ads-clavem.md` tiene el plan de campañas de Google Ads (landings destino, conversiones, segmentación) — consultarlo antes de tocar landings o tracking.
