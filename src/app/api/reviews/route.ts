export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

// Envuelta en unstable_cache para que solo se cacheen respuestas exitosas de
// SerpApi por 24hs. A diferencia de pasarle `next: { revalidate }` al fetch
// directamente, acá un error (rate limit, créditos agotados, etc.) no queda
// "congelado" en caché: el próximo pedido vuelve a intentar contra la API real.
const getGoogleReviews = unstable_cache(
  async (apiKey: string) => {
    const dataId = '0x236c9ef36e3bf293:0xc73ba8591207c7bd';
    const url = `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=${dataId}&api_key=${apiKey}&hl=es&sort_by=newestFirst`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const placeInfo = data.place_info || {};
    const rawReviews = data.reviews || [];

    // Tomar solo las últimas 3 reseñas más recientes y mapear al formato esperado por el cliente
    const reviews = rawReviews.slice(0, 3).map((r: any) => ({
      author_name: r.user?.name || "Usuario",
      rating: r.rating || 5,
      text: r.snippet || "",
      time: r.date || "Hace poco"
    }));

    return {
      rating: placeInfo.rating || 5.0,
      reviewsCount: placeInfo.reviews || 0,
      reviews
    };
  },
  ['google-reviews'],
  { revalidate: 86400 }
);

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_SERPAPI_KEY;
    if (!apiKey) {
      console.warn("NEXT_PUBLIC_SERPAPI_KEY no encontrada en las variables de entorno.");
      return NextResponse.json({ success: false, error: "API Key not configured" }, { status: 500 });
    }

    const { rating, reviewsCount, reviews } = await getGoogleReviews(apiKey);

    return NextResponse.json({ success: true, rating, reviewsCount, reviews });
  } catch (error: any) {
    console.error("Error en API de reseñas:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
