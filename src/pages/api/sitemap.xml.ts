
import { supabase } from '@/integrations/supabase/client';

export async function GET() {
  try {
    const baseUrl = 'https://freeproplist.com'; // Replace with actual domain
    
    // Get all published listings
    const { data: listings, error } = await supabase
      .from('listings')
      .select('id, updated_at')
      .eq('status', 'published')
      .limit(50000); // Google sitemap limit

    if (error) throw error;

    // Static routes
    const staticRoutes = [
      { url: '/', changefreq: 'daily', priority: '1.0' },
      { url: '/search', changefreq: 'daily', priority: '0.9' },
      { url: '/listing/all', changefreq: 'daily', priority: '0.8' },
      { url: '/ai', changefreq: 'weekly', priority: '0.7' },
      { url: '/join', changefreq: 'monthly', priority: '0.6' },
      { url: '/list-property', changefreq: 'monthly', priority: '0.6' },
      { url: '/compare', changefreq: 'weekly', priority: '0.5' },
    ];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`).join('\n')}
${listings?.map(listing => `  <url>
    <loc>${baseUrl}/property/${listing.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date(listing.updated_at).toISOString()}</lastmod>
  </url>`).join('\n') || ''}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400', // 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
