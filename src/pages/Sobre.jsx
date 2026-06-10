import useReveal from "../components/useReveal";
import { useApp } from "../context/AppContext";

export default function Sobre() {
  const revealRef = useReveal();
  const { state } = useApp();
  const { accent } = state;

  return (
    <section className="py-24 relative">
      <div ref={revealRef} className="reveal w-[min(1120px,92vw)] mx-auto">
        <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
          {/* Stylised artist portrait */}
          <div
            role="img"
            aria-label="Retrato estilizado do artista MR. BANDS"
            className="relative min-h-[420px] border border-[#222]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.04)), linear-gradient(145deg, #00f0ff, transparent 60%), linear-gradient(310deg, #ff00c8, transparent 62%), #111",
              clipPath: "polygon(0 0, 100% 0, 100% 86%, 74% 100%, 0 100%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(140deg, transparent 50%, rgba(0,240,255,0.25) 52%)",
                mixBlendMode: "screen",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(45deg, rgba(255,0,200,0.25) 30%, transparent 32%)",
                mixBlendMode: "screen",
              }}
            />
          </div>

          {/* Copy */}
          <div>
            <h2
              className="font-display text-3xl md:text-4xl mb-6 tracking-widest"
              style={{ color: accent }}
            >
              Sobre Mim
            </h2>
            <p className="text-[#bcbcbc] mb-4">
              Minha pesquisa parte da geometria como linguagem emocional. Cada plano, volume e eixo
              cria uma sensação precisa — tensão, ritmo e silêncio visual em equilíbrio.
            </p>
            <p className="text-[#bcbcbc] mb-4">
              Trabalho com teoria da cor para construir profundidade em camadas. Tons neon e
              contrastes extremos guiam o olhar dentro da composição tridimensional.
            </p>
            <p className="text-[#bcbcbc]">
              Minhas influências atravessam a arte óptica, o design brutalista e a cultura digital,
              transformando estruturas matemáticas em peças únicas e pulsantes.
            </p>

            <div className="mt-8 flex gap-6 flex-wrap">
              {[
                { value: "8+", label: "Anos de trajetória" },
                { value: "200+", label: "Obras criadas" },
                { value: "40+", label: "Colecionadores" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div
                    className="font-display text-3xl font-bold"
                    style={{ color: accent }}
                  >
                    {value}
                  </div>
                  <div className="text-[#bcbcbc] text-sm uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Running ticker */}
      <div
        className="mt-14 overflow-hidden border-y border-[#222]"
        aria-hidden="true"
      >
        <div
          className="ticker-track whitespace-nowrap uppercase tracking-[0.2em] font-mono text-sm py-3"
          style={{ color: "#f5ff00" }}
        >
          GEOMETRIA · COR · DIMENSÃO · FORMA · ARTE · ORIGINALIDADE · GEOMETRIA · COR · DIMENSÃO ·
          FORMA · ARTE · ORIGINALIDADE ·&nbsp;&nbsp;GEOMETRIA · COR · DIMENSÃO · FORMA · ARTE ·
          ORIGINALIDADE · GEOMETRIA · COR · DIMENSÃO · FORMA · ARTE · ORIGINALIDADE ·
        </div>
      </div>
    </section>
  );
}
