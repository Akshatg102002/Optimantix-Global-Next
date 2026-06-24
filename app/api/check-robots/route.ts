import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url } = (await req.json()) as { url: string };
  try {
    const origin = new URL(url).origin;
    const robotsUrl = `${origin}/robots.txt`;
    const response = await fetch(robotsUrl, {
      headers: { 'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' },
    });
    const content = await response.text();
    return NextResponse.json({ content, url: robotsUrl, status: response.status });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message });
  }
}
