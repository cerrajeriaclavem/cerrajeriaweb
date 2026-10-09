import { getGalleryData } from '@/lib/gallery';
import GalleryClient from './GalleryClient';

// Server Component: arma la galería a partir de las carpetas de public/images/
// y delega la interacción (filtros, lightbox, videos) a GalleryClient.
export default function Gallery() {
  const { categories, items } = getGalleryData();

  if (items.length === 0) return null;

  return <GalleryClient categories={categories} items={items} />;
}
