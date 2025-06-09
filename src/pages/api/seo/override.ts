
import { supabase } from '@/integrations/supabase/client';

export async function POST(request: Request) {
  try {
    const { path, title, description, keywords, source = 'manual' } = await request.json();

    const { data, error } = await supabase
      .from('ai_seo_overrides')
      .upsert({
        path,
        title,
        description,
        keywords,
        source
      })
      .select()
      .single();

    if (error) throw error;

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Error updating SEO override:', error);
    return Response.json(
      { error: 'Failed to update SEO override' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const path = url.searchParams.get('path');

    if (!path) {
      return Response.json({ error: 'Path parameter required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('ai_seo_overrides')
      .select('*')
      .eq('path', path)
      .maybeSingle();

    if (error) throw error;

    return Response.json({ data });
  } catch (error) {
    console.error('Error fetching SEO override:', error);
    return Response.json(
      { error: 'Failed to fetch SEO override' },
      { status: 500 }
    );
  }
}
