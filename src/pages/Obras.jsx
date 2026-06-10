import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import useReveal from "../components/useReveal";

const WORKS = [
  {
    id: 1,
    title: "Prisma Vivo I",
    desc: "Acrílica sobre painel · 80×80 cm",
    price: "R$ 4.800",
    category: "originais",
    artClass: "art-1",
  },
  {
    id: 2,
    title: "Vetor Pulsante",
    desc: "Fine Art Print · 60×90 cm",
    price: "R$ 1.200",
    category: "impressoes",
    artClass: "art-2",
  },
  {
    id: 3,
    title: "Nó Hexagonal",
    desc: "Resina pigmentada · 45 cm",
    price: "R$ 6.300",
    category: "esculturas",
    artClass: "art-3",
  },
  {
    id: 4,
    title: "Campo Fractal",
    desc: "Mixed media · 100×70 cm",
    price: "R$ 5.100",
    category: "originais",
    artClass: "art-4",
  },
  {
    id: 5,
    title: "Ponto de Fuga 3D",
    desc: "Giclée · 50×70 cm",
    price: "R$ 980",
    category: "impressoes",
    artClass: "art-5",
  },
  {
    id: 6,
    title: "Órbita Angular",
    desc: "Metal + acrílico · 55 cm",
    price: "R$ 7.400",
    category: "esculturas",
    artClass: "art-6",
  },
];

const FILTERS = [
  { id: "all", label: "Todas" },
  { id: "impressoes", label: "Impressões" },
  { id: "originais", label: "Originais" },
  { id: "esculturas", label: "Esculturas" },
];

export default function Obras() {
  const { state, dispatch } = useApp();
  const { accent, galleryFilter } = state;
  const revealRef = useReveal();

  const visible = WORKS.filter(
    (w) => galleryFilter === "all" || w.category === galleryFilter
  );

  return (
    <section className="py-24">
      <div ref={revealRef} className="reveal w-[min(1120px,92vw)] mx-auto">
        <h2
          className="font-display text-3xl md:text-4xl tracking-widest inline-block border-b pb-1 mb-6"
          style={{ color: "#f7f7f7", borderColor: accent }}
        >
          Obras Disponíveis
        </h2>

        {/* Filter bar */}
        <div
          className="flex flex-wrap gap-2 mb-6"
          role="radiogroup"
          aria-label="Filtrar por categoria"
        >
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              role="radio"
              aria-checked={galleryFilter === id}
              onClick={() => dispatch({ type: "SET_FILTER", payload: id })}
              className="border px-3 py-2 uppercase font-mono text-xs tracking-widest cursor-pointer transition-all duration-200"
              style={
                galleryFilter === id
                  ? { borderColor: accent, color: accent }
                  : { borderColor: "#222", color: "#bcbcbc" }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((work) => (
            <article
              key={work.id}
              className="group bg-[#111] border border-[#222] p-4 flex flex-col gap-1 transition-all duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.boxShadow = `0 0 22px ${accent}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.borderColor = "#222";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Art preview */}
              <div
                className={`art-bg ${work.artClass} h-[210px] border border-[#222] mb-2 relative`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background:
                      "linear-gradient(130deg, rgba(0,240,255,0.26), rgba(255,0,200,0.2), rgba(245,255,0,0.15))",
                  }}
                />
              </div>

              <h3 className="font-display text-base tracking-wide">{work.title}</h3>
              <p className="text-[#bcbcbc] text-sm m-0">{work.desc}</p>
              <strong className="font-mono">{work.price}</strong>

              <Link
                to="/encomendas"
                className="mt-2 text-sm uppercase tracking-widest font-mono opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
                style={{ color: accent }}
              >
                Ver Detalhes →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
