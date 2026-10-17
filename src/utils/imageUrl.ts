/**
 * Resolves local image URLs reliably for both development and production (Vercel).
 * All static assets are served from /public/images/ at root path /images/...
 */
export function getSafeImageUrl(src?: string | null, fallback = '/images/product_pochampally_ikat_1792066860036.jpg'): string {
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return fallback;
  }
  
  // Transform legacy /src/assets/images/ paths to production-ready /images/
  if (src.startsWith('/src/assets/images/')) {
    return src.replace('/src/assets/images/', '/images/');
  }
  
  return src;
}
