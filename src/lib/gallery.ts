import fs from 'node:fs';
import path from 'node:path';

export type GalleryMediaType = 'image' | 'video';

export interface GalleryItem {
  src: string;
  type: GalleryMediaType;
  category: string;
  alt: string;
}

export interface GalleryCategory {
  slug: string;
  label: string;
  description: string;
}

// Orden y textos de las secciones de la galería. Cada `slug` es el nombre de
// una carpeta dentro de `public/images/`. Para sumar una sección nueva alcanza
// con crear la carpeta y agregarle fotos/videos: si no figura acá se muestra
// igual (al final, con el nombre de la carpeta como título); agregarla a esta
// lista solo sirve para elegir su posición, título y descripción.
const CATEGORY_CONFIG: GalleryCategory[] = [
  {
    slug: 'cerraduras-digitales',
    label: 'Cerraduras Digitales',
    description: '',
  },
  {
    slug: 'cerraduras',
    label: 'Cerraduras',
    description: 'Cerraduras de seguridad, cambio de combinación e instalación en puertas.',
  },
  {
    slug: 'caja-fuerte',
    label: 'Cajas Fuertes',
    description: 'Venta, instalación y apertura de cajas de seguridad.',
  },
  {
    slug: 'nuestros-productos',
    label: 'Nuestros Productos',
    description: 'Candados, lingas y accesorios de seguridad disponibles en nuestro local.',
  },
];

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const VIDEO_EXT = new Set(['.mp4', '.webm']);

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

const naturalSort = (a: string, b: string) =>
  a.localeCompare(b, 'es', { numeric: true, sensitivity: 'base' });

function slugToLabel(slug: string) {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Lee las carpetas de `public/images/` en build time (la home es estática).
export function getGalleryData(): { categories: GalleryCategory[]; items: GalleryItem[] } {
  let folders: string[] = [];
  try {
    folders = fs
      .readdirSync(IMAGES_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return { categories: [], items: [] };
  }

  const known = CATEGORY_CONFIG.filter((c) => folders.includes(c.slug));
  const extra = folders
    .filter((f) => !CATEGORY_CONFIG.some((c) => c.slug === f))
    .sort(naturalSort)
    .map((slug) => ({ slug, label: slugToLabel(slug), description: '' }));

  const categories: GalleryCategory[] = [];
  const itemsByCategory: GalleryItem[][] = [];

  for (const category of [...known, ...extra]) {
    const files = fs
      .readdirSync(path.join(IMAGES_DIR, category.slug))
      .filter((f) => {
        const ext = path.extname(f).toLowerCase();
        return IMAGE_EXT.has(ext) || VIDEO_EXT.has(ext);
      })
      .sort(naturalSort);

    if (files.length === 0) continue;

    const items = files.map((file, i): GalleryItem => {
      const isVideo = VIDEO_EXT.has(path.extname(file).toLowerCase());
      return {
        src: `/images/${encodeURIComponent(category.slug)}/${encodeURIComponent(file)}`,
        type: isVideo ? 'video' : 'image',
        category: category.slug,
        alt: `${category.label} - Cerrajería Clavem (${isVideo ? 'video' : 'foto'} ${i + 1})`,
      };
    });

    categories.push(category);
    itemsByCategory.push(interleave(items));
  }

  // En la vista "Todos" alternamos secciones para que no quede todo agrupado.
  const items: GalleryItem[] = [];
  const longest = Math.max(0, ...itemsByCategory.map((list) => list.length));
  for (let i = 0; i < longest; i++) {
    for (const list of itemsByCategory) {
      if (list[i]) items.push(list[i]);
    }
  }

  return { categories, items };
}

// Intercala videos entre las fotos (aprox. 2 fotos : 1 video) para dar ritmo
// visual al grid en lugar de mostrar todos los videos juntos al final.
function interleave(items: GalleryItem[]): GalleryItem[] {
  const images = items.filter((i) => i.type === 'image');
  const videos = items.filter((i) => i.type === 'video');
  const result: GalleryItem[] = [];
  while (images.length || videos.length) {
    if (images.length) result.push(images.shift()!);
    if (videos.length) result.push(videos.shift()!);
    if (images.length) result.push(images.shift()!);
  }
  return result;
}
