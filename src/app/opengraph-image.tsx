import { ImageResponse } from 'next/og'

// removed edge runtime — using default Node.js runtime for reliability
export const alt = "One Bill — Every Bill. One Payment."
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px 100px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              background: '#1d4ed8',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            1B
          </div>
          <span style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
            One Bill
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '28px',
            maxWidth: '900px',
          }}
        >
          Every bill.
          <br />
          <span style={{ color: '#93c5fd' }}>One payment.</span>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '56px',
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          Hydro, internet, insurance, phone — we handle it all. Serving Durham Region, Ontario.
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Essential — $39/mo', 'Premium — $69/mo', 'onebill.ca'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '100px',
                padding: '10px 24px',
                fontSize: '20px',
                color: 'rgba(255,255,255,0.85)',
                fontWeight: '500',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
