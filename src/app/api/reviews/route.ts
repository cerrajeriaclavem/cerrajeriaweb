import { NextResponse } from 'next/server';

export async function GET() {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID; 
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!API_KEY || !PLACE_ID || PLACE_ID === 'TU_PLACE_ID') {
    return NextResponse.json({ 
      error: 'Falta configurar tu GOOGLE_PLACE_ID real en el archivo .env.local' 
    }, { status: 500 });
  }

  try {
    // Usamos el NUEVO endpoint de Google (Places API New) ya que la clásica no estaba habilitada
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`,
      {
        headers: {
          'X-Goog-Api-Key': API_KEY,
          // Especificamos qué campos usar (FieldMask requerido por la API Nueva)
          'X-Goog-FieldMask': 'reviews,rating,displayName'
        },
        // Almacenamos el resultado en caché por 1 día (86400 segundos).
        next: { revalidate: 86400 } 
      }
    );
    
    // Manejo de errores nativos de la API Nueva
    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ 
        error: 'Google API Nueva rechazó la petición', 
        details: res.statusText,
        message: errorText 
      }, { status: res.status });
    }

    const data = await res.json();
    
    // Adaptamos las reseñas del nuevo formato al formato que espera nuestro componente React
    const mappedReviews = (data.reviews || []).map((r: any) => ({
      author_name: r.authorAttribution?.displayName || 'Cliente',
      rating: r.rating || 5,
      text: r.text?.text || '',
      relative_time_description: r.relativePublishTimeDescription || '',
      profile_photo_url: r.authorAttribution?.photoUri || ''
    }));

    return NextResponse.json({
      rating: data.rating,
      reviews: mappedReviews
    });

  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Error interno del servidor al conectar con Google', 
      details: error.message 
    }, { status: 500 });
  }
}
