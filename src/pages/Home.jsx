import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import useReveal from "../components/useReveal";

export default function Home() {
  const { state } = useApp();
  const { accent } = state;
  const revealRef = useReveal();

  return (
    <section className="relative min-h-[calc(100vh-72px)] grid place-items-center overflow-hidden py-24">
      {/* Animated geometric rings */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center pointer-events-none -z-[1]"
      >
        <div
          className="ring absolute"
          style={{
            width: "min(68vw, 620px)",
            aspectRatio: "1",
            borderImage: `linear-gradient(45deg, #00f0ff, #ff00c8) 1`,
            animationDuration: "16s",
          }}
        />
        <div
          className="ring absolute"
          style={{
            width: "min(52vw, 480px)",
            aspectRatio: "1",
            borderImage: `linear-gradient(45deg, #f5ff00, #ff6a00) 1`,
            animationDuration: "12s",
            animationDirection: "reverse",
          }}
        />
        <div
          className="ring absolute"
          style={{
            width: "min(38vw, 360px)",
            aspectRatio: "1",
            borderImage: `linear-gradient(45deg, #ff00c8, #ff6a00) 1`,
            animationDuration: "9s",
          }}
        />
      </div>

      <div ref={revealRef} className="reveal text-center w-[min(1120px,92vw)] mx-auto">
        <p className="text-[#bcbcbc] uppercase tracking-[0.24em] text-xs mb-4">
          Portfólio de Arte Visual
        </p>
        <h1
          className="glitch font-display leading-[0.9] mb-4"
          data-text="MR. BANDS"
          style={{
            fontSize: "clamp(2.8rem, 13vw, 9rem)",
            color: "#f7f7f7",
          }}
        >
          MR. BANDS
        </h1>
        <p className="max-w-[48ch] mx-auto mt-4 mb-8 text-[#bcbcbc]">
          Arte Geométrica 3D — Cor, Forma e Dimensão.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/obras"
            className="inline-block px-5 py-3 uppercase tracking-[0.08em] text-sm font-bold transition-all duration-200 hover:shadow-lg"
            style={{
              background: `linear-gradient(120deg, ${accent}, ${accent}cc)`,
              color: "#111",
              border: "1px solid transparent",
            }}
          >
            Ver Obras
          </Link>
          <Link
            to="/encomendas"
            className="inline-block px-5 py-3 uppercase tracking-[0.08em] text-sm border border-[#222] transition-all duration-200 hover:border-current"
            style={{ color: "#f7f7f7" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accent;
              e.currentTarget.style.boxShadow = `0 0 20px ${accent}55`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#222";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            Encomendar
          </Link>
        </div>
      </div>
    </section>
  );
}
