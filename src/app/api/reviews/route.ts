import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey) {
      console.warn("SERPAPI_KEY no encontrada en las variables de entorno.");
      return NextResponse.json({ success: false, error: "API Key not configured" }, { status: 500 });
    }

    const dataId = '0x236c9ef36e3bf293:0xc73ba8591207c7bd';
    const url = `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=${dataId}&api_key=${apiKey}&hl=es`;

    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cachear por 1 hora para no gastar créditos de SerpApi innecesariamente
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const placeInfo = data.place_info || {};
    const rawReviews = data.reviews || [];

    // Mapear al formato esperado por el cliente
    const reviews = rawReviews.map((r: any) => ({
      author_name: r.user?.name || "Usuario",
      rating: r.rating || 5,
      text: r.snippet || "",
      time: r.date || "Hace poco"
    }));

    return NextResponse.json({
      success: true,
      rating: placeInfo.rating || 5.0,
      reviewsCount: placeInfo.reviews || 0,
      reviews
    });
  } catch (error: any) {
    console.error("Error en API de reseñas:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
