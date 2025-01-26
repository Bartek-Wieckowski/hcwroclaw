import { ImageResponse } from 'next/og';
import { locales, Locale } from '@/i18n/i18n';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default async function Image({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  if (!locales.includes(lng)) {
    return new Response('Not Found', { status: 404 });
  }

  try {
    const fontData = await fetch(
      new URL('../../../assets/fonts/RobotoCondensed-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            background: '#1a1a1a',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px',
            fontFamily: 'RobotoCondensed',
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '24px',
            }}
          >
            HC Wrocław
          </div>
          <div
            style={{
              fontSize: 48,
              color: '#ffffff',
              opacity: 0.8,
            }}
          >
            {lng === 'pl' ? 'Drużyna hokejowa' : 'Hockey Team'}
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'RobotoCondensed',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e) {
    console.error('Failed to generate OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
