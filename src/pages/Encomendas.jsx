import { useState } from "react";
import { useApp } from "../context/AppContext";
import useReveal from "../components/useReveal";

const STEPS = [
  {
    shape: "triangle",
    title: "Consulta",
    desc: "Conversamos sobre conceito, ambiente, paleta e intenção da peça.",
    clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
    color: "#00f0ff",
  },
  {
    shape: "hex",
    title: "Proposta",
    desc: "Você recebe estudo visual, dimensões, materiais e orçamento detalhado.",
    clipPath: "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)",
    color: "#f5ff00",
  },
  {
    shape: "diamond",
    title: "Criação",
    desc: "Produção autoral com acompanhamento de etapas até a entrega final.",
    clipPath: "none",
    color: "#ff00c8",
    rotate: true,
  },
];

const PRICING = [
  { label: "Impressão Fine Art", range: "R$ 800 – R$ 2.000" },
  { label: "Original (acrílica / mixed)", range: "R$ 3.500 – R$ 8.000" },
  { label: "Escultura geométrica", range: "R$ 5.000 – R$ 12.000" },
  { label: "Encomenda digital", range: "R$ 400 – R$ 1.200" },
];

const TIPO_OPTIONS = [
  "Impressão Fine Art",
  "Pintura original",
  "Escultura geométrica",
  "Arte digital",
  "Mixed media",
  "Outro",
];

const INITIAL_FORM = {
  nome: "",
  email: "",
  tipo: "",
  dimensoes: "",
  orcamento: "",
  mensagem: "",
};

export default function Encomendas() {
  const { state } = useApp();
  const { accent } = state;
  const revealRef = useReveal();

  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputCls =
    "w-full border border-[#222] bg-[#0d0d0d] text-[#f7f7f7] px-3 py-2 font-[inherit] focus:outline-none transition-all duration-200";

  return (
    <section
      className="page-fade py-24"
      style={{
        background:
          "linear-gradient(180deg, transparent, #0f0f0f 25%, #0f0f0f 75%, transparent)",
      }}
    >
      <div ref={revealRef} className="reveal w-[min(1120px,92vw)] mx-auto">
        <h2
          className="font-display text-3xl md:text-4xl tracking-widest mb-8"
          style={{ color: accent }}
        >
          Encomendar uma Obra Exclusiva
        </h2>

        <div className="grid md:grid-cols-[1fr_1.1fr] gap-5">
          {/* Steps + Pricing */}
          <div className="flex flex-col gap-4">
            {STEPS.map(({ shape, title, desc, clipPath, color, rotate }) => (
              <article
                key={shape}
                className="border border-[#222] p-4 bg-[#121212]"
              >
                <span
                  aria-hidden="true"
                  className="inline-block w-5 h-5 mb-2"
                  style={{
                    background: color,
                    clipPath: clipPath !== "none" ? clipPath : undefined,
                    transform: rotate ? "rotate(45deg)" : undefined,
                  }}
                />
                <h3 className="font-display text-base tracking-wide mb-1">{title}</h3>
                <p className="text-[#bcbcbc] text-sm m-0">{desc}</p>
              </article>
            ))}

            {/* Pricing reference */}
            <div className="border border-[#222] p-4 bg-[#121212] mt-2">
              <h3
                className="font-display text-xs tracking-[0.18em] uppercase mb-3"
                style={{ color: accent }}
              >
                Referência de Preços
              </h3>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {PRICING.map(({ label, range }) => (
                  <li key={label} className="flex justify-between items-center gap-2 text-xs font-mono">
                    <span className="text-[#bcbcbc]">{label}</span>
                    <span style={{ color: accent }}>{range}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#555] text-[0.7rem] font-mono mt-3 leading-relaxed">
                * Valores variam conforme dimensões, materiais e complexidade.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            className="border border-[#222] bg-[#121212] p-5 flex flex-col gap-3"
            onSubmit={handleSubmit}
            noValidate
          >
            {submitted && (
              <div
                className="border p-3 text-sm font-mono"
                style={{ borderColor: accent, color: accent }}
              >
                ✓ Encomenda enviada! Entraremos em contato em breve.
              </div>
            )}

            {[
              { name: "nome", label: "Nome", type: "text", required: true },
              { name: "email", label: "E-mail", type: "email", required: true },
            ].map(({ name, label, type, required }) => (
              <label
                key={name}
                className="grid gap-1 text-[0.85rem] uppercase tracking-[0.05em] font-mono"
              >
                {label}
                <input
                  type={type}
                  name={name}
                  required={required}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputCls}
                  onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                />
              </label>
            ))}

            {/* Styled select for tipo */}
            <label className="grid gap-1 text-[0.85rem] uppercase tracking-[0.05em] font-mono">
              Tipo de obra desejada
              <select
                name="tipo"
                required
                value={form.tipo}
                onChange={handleChange}
                className={inputCls + " cursor-pointer appearance-none"}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23bcbcbc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  paddingRight: "2.2rem",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
              >
                <option value="" disabled>Selecione...</option>
                {TIPO_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>

            {[
              { name: "dimensoes", label: "Dimensões aproximadas", type: "text" },
              { name: "orcamento", label: "Orçamento estimado", type: "text" },
            ].map(({ name, label, type }) => (
              <label
                key={name}
                className="grid gap-1 text-[0.85rem] uppercase tracking-[0.05em] font-mono"
              >
                {label}
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputCls}
                  onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                />
              </label>
            ))}

            <label className="grid gap-1 text-[0.85rem] uppercase tracking-[0.05em] font-mono">
              Mensagem
              <textarea
                name="mensagem"
                rows={4}
                required
                value={form.mensagem}
                onChange={handleChange}
                className={inputCls + " resize-y"}
                onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
              />
            </label>

            <button
              type="submit"
              className="mt-2 px-5 py-3 uppercase tracking-[0.08em] text-sm font-bold transition-all duration-200 focus-ring"
              style={{
                background: `linear-gradient(120deg, ${accent}, ${accent}cc)`,
                color: "#111",
                border: "1px solid transparent",
              }}
            >
              Enviar Encomenda
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
