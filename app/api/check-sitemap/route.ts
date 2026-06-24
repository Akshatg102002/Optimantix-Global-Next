import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url } = (await req.json()) as { url: string };
  try {
    const origin = new URL(url).origin;
    const candidates = url.endsWith('.xml') ? [url] : [
      `${origin}/sitemap.xml`,
      `${origin}/sitemap_index.xml`,
    ];
    for (const u of candidates) {
      try {
        const r = await fetch(u);
        if (r.ok) {
          const content = await r.text();
          return NextResponse.json({ content, url: u, status: r.status, found: true });
        }
      } catch {
        continue;
      }
    }
    return NextResponse.json({ error: 'No sitemap found at common paths.', found: false });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message });
  }
}
