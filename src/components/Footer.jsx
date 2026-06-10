import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { state } = useApp();
  const { accent } = state;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#222] overflow-hidden py-16">
      {/* Geometric watermark */}
      <div
        aria-hidden="true"
        className="absolute w-[320px] aspect-square right-[8%] top-[18%] border border-white/[0.08] rotate-[20deg]"
        style={{ clipPath: "polygon(50% 0, 100% 35%, 82% 100%, 18% 100%, 0 35%)" }}
      />

      <div className="reveal w-[min(1120px,92vw)] mx-auto">
        <h2
          className="font-display text-3xl mb-2 tracking-widest"
          style={{ color: accent }}
        >
          MR. BANDS
        </h2>
        <p className="text-[#bcbcbc] mb-4">
          São Paulo, Brasil ·{" "}
          <a
            href="mailto:contato@mrbands.art"
            className="transition-colors hover:underline"
            style={{ color: accent }}
          >
            contato@mrbands.art
          </a>
        </p>

        <ul className="flex gap-4 list-none p-0 mb-6">
          {[
            { label: "Instagram", href: "#" },
            { label: "WhatsApp", href: "#" },
            { label: "Behance", href: "#" },
          ].map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="text-[#bcbcbc] transition-colors duration-200"
                style={{ "--hover-color": accent }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = accent)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "")
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <nav className="flex gap-4 flex-wrap mb-6" aria-label="Rodapé">
          {[
            { to: "/sobre", label: "Sobre" },
            { to: "/obras", label: "Obras" },
            { to: "/encomendas", label: "Encomendas" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-mono text-xs tracking-widest uppercase text-[#bcbcbc] transition-colors duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <small className="text-[#555] font-mono text-xs">
          © {year} MR. BANDS. Todos os direitos reservados.
        </small>
      </div>
    </footer>
  );
}
