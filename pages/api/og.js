import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Definimos qué datos queremos recibir de Webflow
    const title = searchParams.get('title') || 'Mi Gran Idea';
    const image = searchParams.get('image') || 'https://via.placeholder.com/1080';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundColor: '#000',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '40px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: '20px',
              margin: '20px',
            }}
          >
            <h1
              style={{
                fontSize: '80px',
                color: 'white',
                textAlign: 'center',
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}