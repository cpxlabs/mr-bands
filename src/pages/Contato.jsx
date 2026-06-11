import { useState } from "react";
import { useApp } from "../context/AppContext";
import useReveal from "../components/useReveal";

const INITIAL_FORM = {
  nome: "",
  email: "",
  assunto: "",
  mensagem: "",
};

const INFO_ITEMS = [
  {
    label: "Localização",
    value: "São Paulo, Brasil",
    href: null,
    shape: "triangle",
    color: "#00f0ff",
    clip: "polygon(50% 0, 100% 100%, 0 100%)",
  },
  {
    label: "E-mail",
    value: "contato@mrbands.art",
    href: "mailto:contato@mrbands.art",
    shape: "hex",
    color: "#f5ff00",
    clip: "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)",
  },
];

const SOCIALS = ["Instagram", "WhatsApp", "Behance"];

export default function Contato() {
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
    <section className="page-fade py-24">
      <div ref={revealRef} className="reveal w-[min(1120px,92vw)] mx-auto">
        <h2
          className="font-display text-3xl md:text-4xl tracking-widest mb-4"
          style={{ color: accent }}
        >
          Contato
        </h2>
        <p className="text-[#bcbcbc] mb-10 max-w-[56ch]">
          Para consultas, parcerias ou dúvidas sobre obras e encomendas, envie sua mensagem.
          Respondemos em até 48 horas úteis.
        </p>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-10">
          {/* Info panel */}
          <div className="flex flex-col gap-8">
            {INFO_ITEMS.map(({ label, value, href, color, clip }) => (
              <div key={label} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ background: color, clipPath: clip }}
                />
                <div>
                  <h3
                    className="font-display text-sm tracking-widest uppercase mb-0.5"
                    style={{ color: accent }}
                  >
                    {label}
                  </h3>
                  {href ? (
                    <a
                      href={href}
                      className="text-[#bcbcbc] hover:underline transition-colors text-sm"
                      onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-[#bcbcbc] text-sm m-0">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div>
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{
                    background: "#ff00c8",
                    clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                  }}
                />
                <div>
                  <h3
                    className="font-display text-sm tracking-widest uppercase mb-2"
                    style={{ color: accent }}
                  >
                    Redes sociais
                  </h3>
                  <ul className="flex flex-col gap-2 list-none p-0 m-0">
                    {SOCIALS.map((s) => (
                      <li key={s}>
                        <a
                          href="#"
                          className="text-[#bcbcbc] transition-colors font-mono text-sm"
                          onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                        >
                          ↗ {s}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Response time note */}
            <div
              className="border border-[#222] p-3 font-mono text-[0.7rem] text-[#555] leading-relaxed"
            >
              Tempo de resposta médio: <span style={{ color: accent }}>48h úteis</span>
            </div>
          </div>

          {/* Contact form */}
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
                ✓ Mensagem enviada! Até breve.
              </div>
            )}

            {[
              { name: "nome", label: "Nome", type: "text", required: true },
              { name: "email", label: "E-mail", type: "email", required: true },
              { name: "assunto", label: "Assunto", type: "text", required: true },
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

            <label className="grid gap-1 text-[0.85rem] uppercase tracking-[0.05em] font-mono">
              Mensagem
              <textarea
                name="mensagem"
                rows={5}
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
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
