import { NavLink, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const navItems = [
  { to: "/sobre", label: "Sobre" },
  { to: "/obras", label: "Obras" },
  { to: "/encomendas", label: "Encomendas" },
  { to: "/contato", label: "Contato" },
];

export default function Header() {
  const { state, dispatch } = useApp();
  const { menuOpen, accent } = state;

  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-[14px] border-b"
      style={{
        background: "rgb(10 10 10 / 0.72)",
        borderColor: "rgb(255 255 255 / 0.08)",
      }}
    >
      <nav
        className="flex items-center justify-between min-h-[72px] w-[min(1120px,92vw)] mx-auto"
        aria-label="Navegação principal"
      >
        <Link
          to="/"
          className="font-mono text-[0.92rem] tracking-[0.08em] uppercase transition-colors duration-200"
          onClick={() => dispatch({ type: "CLOSE_MENU" })}
          style={{ color: accent }}
        >
          MR. BANDS
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-5 list-none p-0 m-0">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `font-mono text-[0.92rem] tracking-[0.08em] uppercase pb-[0.2rem] border-b transition-all duration-200 ${
                    isActive
                      ? "border-current"
                      : "border-transparent text-[#bcbcbc] hover:border-current"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { color: accent, textShadow: `0 0 12px ${accent}99` } : {}
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden border border-[#222] bg-transparent p-2 cursor-pointer"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => dispatch({ type: "TOGGLE_MENU" })}
        >
          <span className="block w-[22px] h-[2px] my-1 bg-[#f7f7f7]" />
          <span className="block w-[22px] h-[2px] my-1 bg-[#f7f7f7]" />
          <span className="block w-[22px] h-[2px] my-1 bg-[#f7f7f7]" />
          <span className="sr-only">Abrir menu</span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul
          id="mobile-menu"
          className="md:hidden absolute right-[4vw] bg-[#101010] border border-[#222] p-4 flex flex-col gap-3 list-none z-40"
        >
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `font-mono text-[0.92rem] tracking-[0.08em] uppercase transition-colors duration-200 ${
                    isActive ? "" : "text-[#bcbcbc]"
                  }`
                }
                style={({ isActive }) => (isActive ? { color: accent } : {})}
                onClick={() => dispatch({ type: "CLOSE_MENU" })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
