import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const title = (searchParams.get("title") || "Untitled").trim();
    const rating = (searchParams.get("rating") || "—").trim();
    const creator = (searchParams.get("creator") || "Unknown").trim();
    const platform = (searchParams.get("platform") || "YouTube").trim();
    const genre = (searchParams.get("genre") || "scifi").trim().toLowerCase();
    const duration = (searchParams.get("duration") || "").trim();

    const GENRE_HEX = {
      scifi: "#00B7FF",
      action: "#FF3B30",
      fantasy: "#4F52DE",
      horror: "#00C853",
      romance: "#FF2D55",
      drama: "#B61E3A",
      thriller: "#00D4E1",
      adventure: "#FF6C00",
      animation: "#F9A825",
      documentary: "#546E7A",
    };

    const accentHex = GENRE_HEX[genre] || "#15B6F3";
    const { r, g, b } = hexToRgb(accentHex);

    const bg = "linear-gradient(180deg, #0B1220 0%, #070B14 100%)";

    const safeTitle = clamp(title, 48);
    const safeCreator = clamp(creator, 26);
    const safePlatform = clamp(platform, 16);
    const safeDuration = clamp(duration, 14);
    const genreLabel = prettifyGenre(genre);

// 1. Patrón SUPERIOR: Luz emana desde arriba hacia abajo
const filmStripPattern = `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDMyIDgwIj48cmVjdCB4PSI4IiB5PSIyOCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjI0IiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')`;


// Color de fondo para TODO el enmarcado de la película: NEGRO PURO
const filmFrameColor = '#000000';

    return new ImageResponse(
      (
        <div
         style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: bg, // Fondo oscuro del póster
        position: "relative",
        // Aumentamos padding vertical y añadimos horizontal para el enmarcado completo
        paddingTop: 80, // Espacio para banda superior ancha
        paddingBottom: 80, // Espacio para banda inferior ancha
        paddingLeft: 30, // Espacio para marco lateral izquierdo
        paddingRight: 30, // Espacio para marco lateral derecho
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
      }}
        >		
		
		{/* 1. Cinta SUPERIOR: MÁS ANCHA (80px) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 70, // Aumentado de 50 a 80
          display: 'flex',
          background: filmStripPattern,
          // backgroundRepeat: 'repeat-x', // Opcional: asegura que solo repita horizontalmente
          backgroundColor: filmFrameColor, // NEGRO
          borderBottom: '1px solid rgba(255,255,255,0.05)', // Línea sutil de separación
          zIndex: 3, // Por encima de los glows
        }}
      />
	  {/* 2. Cinta INFERIOR: MÁS ANCHA (80px) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70, // Aumentado de 50 a 80
          display: 'flex',
          background: filmStripPattern,
          backgroundColor: filmFrameColor, // NEGRO
          borderTop: '1px solid rgba(255,255,255,0.05)', // Línea sutil de separación
          zIndex: 3,
        }}
      />
	  {/* 3. Marco LATERAL IZQUIERDO (Línea sólida) */}
      <div
        style={{
          position: 'absolute',
          top: 60, // Empieza debajo de la cinta superior
          bottom: 60, // Termina antes de la cinta inferior
          left: 0,
          width: 25, // Anchura del marco lateral
          display: 'flex',
          backgroundColor: filmFrameColor, // Mismo NEGRO
          borderRight: '1px solid rgba(255,255,255,0.05)', // Línea sutil divisoria
          zIndex: 3,
        }}
      />
	  
	  {/* 4. Marco LATERAL DERECHO (Línea sólida) */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          bottom: 60,
          right: 0,
          width: 25, // Misma anchura
          display: 'flex',
          backgroundColor: filmFrameColor, // Mismo NEGRO
          borderLeft: '1px solid rgba(255,255,255,0.05)', // Línea sutil divisoria
          zIndex: 3,
        }}
      />
	  {/* =========================================
          CONTENIDO DEL PÓSTER (Tu código actual)
         ========================================= */}
	  
		
		{/* Glow Superior (Réplica del inferior) */}
          <div
            style={{
              position: "absolute",
              top: -160, // Reflejado del bottom -160
              left: -160,
              right: -160,
              height: 250,
              display: "flex",
              // Cambiamos el degradado para que proyecte desde arriba (at 50% 100%)
              background: `radial-gradient(65% 120% at 50% 100%, rgba(${r},${g},${b},0.12) 0%, rgba(${r},${g},${b},0.05) 38%, rgba(0,0,0,0) 72%)`,
              filter: "blur(18px)",
            }}
          />
		  
		{/* GRUPO SUPERIOR: Línea + LOOM */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginBottom: 40, 
          position: 'relative' // Necesario para que el glow absoluto se posicione respecto a este grupo
        }}>
         
		  
          {/* 1. Línea superior */}
          <div
            style={{
              width: 520,
              height: 1,
              borderRadius: 999,			  
              background: `linear-gradient(90deg, rgba(${r},${g},${b},0) 0%, rgba(${r},${g},${b},0.8) 50%, rgba(${r},${g},${b},0) 100%)`,
              zIndex: 2, // Por encima del glow
            }}
          />
		  
        </div>
		
{/* 3. LOGOTIPO LOOM - COLORES OFICIALES */}
<div
  style={{
    marginTop: -25, 
    display: "flex",
    fontSize: 40, 
    fontWeight: 800, 
    fontFamily: 'Manrope, ui-sans-serif, sans-serif',
    textTransform: "uppercase",
    letterSpacing: 12,
  }}
>
  <span style={{ color: "#E9EDF5" }}>L</span>
  <span style={{ color: "#E9EDF5" }}>O</span>
  <span style={{ color: "#1C8ED6" }}>O</span>
  <span style={{ color: "#E9EDF5" }}>M</span>
</div>
			
          {/* Title */}
          <div
            style={{
          width: 1100, // Un poco más de ancho para el título
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          // CAMBIO DE FUENTE: Pasamos de serif a una sans-serif con MUCHO CUERPO
          fontFamily: 'Impact, "Arial Narrow", sans-serif', 
          fontSize: 80, // MUCHO MÁS GRANDE (Impacto total)
          fontWeight: 900, // PESO BLACK (El máximo posible)
          lineHeight: 0.95, // Interlineado más apretado para fuerza visual
          color: "rgba(255,255,255,0.98)", // Casi blanco puro
          // Efecto de relieve sutil para dar más grosor percibido
          textShadow: `0 0 2px rgba(255,255,255,0.4), 0 0 15px rgba(255,255,255,0.2)`, 
          paddingTop: 30,
          paddingBottom: 15, // Espacio extra abajo
        }}
          >
            {safeTitle}
          </div>

          {/* rating */}
          <div
            style={{
              marginTop: 25,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Esta línea genera automáticamente la URL correcta en local y en Vercel */}			
<div style={{
  display: "flex",
  width: 42,
  height: 42,
  filter: 'drop-shadow(0 0 8px rgba(245, 200, 75, 0.4))' // Se eliminó el cierre prematuro y se agregó la coma implícita al cerrar el objeto
}}>
			<svg
				viewBox="0 0 24 24"
				style={{ width: 42, height: 42 }}
			>
				<defs>
				{/* Definimos un degradado para que no sea un color plano */}
					<linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="#FFE082" /> {/* Amarillo claro arriba */}
					<stop offset="100%" stopColor="#F5C84B" /> {/* Amarillo dorado abajo */}
					</linearGradient>
				</defs>
				<path 
				d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" 
				fill="url(#starGradient)" // Aplicamos el degradado aquí
				/>
			</svg>
        </div>
		
            <div
              style={{
                display: "flex",
                fontSize: 34,
                color: "rgba(255,255,255,0.92)",
                fontWeight: 900,
              }}
            >
              {rating}
            </div>
          </div>

          {/* creator + platform */}
          <div
            style={{
              marginTop: 35,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              color: "rgba(255,255,255,0.78)",
              fontSize: 22,
            }}
          >
            <div style={{ display: "flex" }}>{safeCreator}</div>
            <div style={{ display: "flex", opacity: 0.75 }}>·</div>
            <div style={{ display: "flex" }}>{safePlatform}</div>
          </div>

          {/* divider */}
          <div
            style={{
              width: 760,
              height: 2,
              marginTop: 26,
              display: "flex",
              borderRadius: 999,
              background: `linear-gradient(90deg, rgba(${r},${g},${b},0) 0%, rgba(${r},${g},${b},0.30) 30%, rgba(${r},${g},${b},0.55) 50%, rgba(${r},${g},${b},0.30) 70%, rgba(${r},${g},${b},0) 100%)`,
              boxShadow: `0 0 14px rgba(${r},${g},${b},0.18)`,
            }}
          />

          {/* chips */}
          <div
            style={{
              marginTop: 26,
              display: "flex",
              flexDirection: "row",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 18,
            }}
          >
            <Chip label={genreLabel} r={r} g={g} b={b} />
            {safeDuration ? <Chip label={safeDuration} r={r} g={g} b={b} /> : null}
          </div>

          {/* glow inferior */}
          <div
            style={{
              position: "absolute",
              bottom: -160,
              left: -160,
              right: -160,
              height: 250,
              display: "flex",
              background: `radial-gradient(65% 120% at 50% 0%, rgba(${r},${g},${b},0.12) 0%, rgba(${r},${g},${b},0.05) 38%, rgba(0,0,0,0) 72%)`,
              filter: "blur(18px)",
            }}
          />
		
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (err) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}

function Chip({ label, r, g, b }) {
  return (
    <div
      style={{
        display: "flex",
        padding: "10px 16px",
        borderRadius: 999,
        border: `1px solid rgba(${r},${g},${b},0.55)`,
        background: `rgba(${r},${g},${b},0.06)`,
        color: "rgba(255,255,255,0.92)",
        boxShadow: `0 0 16px rgba(${r},${g},${b},0.12)`,
      }}
    >
      {label}
    </div>
  );
}

function clamp(str, max) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

function prettifyGenre(g) {
  const map = {
    scifi: "Ciencia Ficción",
    action: "Acción",
    fantasy: "Fantasía",
    horror: "Terror",
    romance: "Romance",
    drama: "Drama",
    thriller: "Thriller",
    adventure: "Aventura",
    animation: "Animación",
    documentary: "Documental",
  };
  return map[g] || g.toUpperCase();
}

function hexToRgb(hex) {
  const h = (hex || "#15B6F3").replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}