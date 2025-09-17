import { ImageResponse } from 'next/og';

export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '80px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '400px',
              height: '400px',
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/logo-home-hero.png`}
              alt="HC Wrocław Logo"
              width="350"
              height="350"
              style={{
                objectFit: 'contain',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              flex: 1,
              marginLeft: '60px',
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/text-club-name.png`}
              alt="HC Wrocław"
              width="400"
              height="120"
              style={{
                objectFit: 'contain',
                marginBottom: '30px',
              }}
            />
            
          </div>

          {/* Dekoracyjne elementy */}
          <div
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              width: '80px',
              height: '80px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '30px',
              width: '50px',
              height: '50px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '100px',
              width: '30px',
              height: '30px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (e) {
    console.error('Failed to generate OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}