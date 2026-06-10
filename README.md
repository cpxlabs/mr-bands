# MR. BANDS — Portfólio de Arte Geométrica 3D

Site de portfólio para **MR. BANDS**, artista visual especializado em arte geométrica 3D. A página apresenta obras disponíveis, processo de encomenda e informações de contato — tudo em uma experiência visual imersiva com estética dark, neon e animações CSS/Canvas.

---

## Visão Geral

| Recurso | Detalhe |
|---|---|
| Linguagem | HTML · CSS · JavaScript (vanilla) |
| Fontes | Inter · Space Grotesk · JetBrains Mono (Google Fonts) |
| Animações | CSS keyframes + Canvas 2D API |
| Responsividade | Breakpoints em 920 px e 720 px |
| Acessibilidade | `aria-label`, `aria-expanded`, `role`, `prefers-reduced-motion` |

---

## Estrutura de Arquivos

```
mr-bands/
├── index.html   # Estrutura e conteúdo da página
├── styles.css   # Estilização completa (variáveis, layout, animações, media queries)
├── script.js    # Interatividade (partículas, filtros, nav ativa, menu mobile)
└── README.md
```

---

## Seções da Página

### Hero
Tela de entrada com título em efeito glitch, três anéis geométricos animados (CSS `rotate`) e chamadas para as seções de obras e encomendas.

### Sobre
Bio do artista em grid de duas colunas (foto estilizada + texto). Inclui ticker horizontal animado com palavras-chave.

### Obras Disponíveis
Grade de seis cards com arte gerada em CSS (gradientes + `conic-gradient`). Filtros por categoria — **Todas / Impressões / Originais / Esculturas** — ocultam/exibem cards via `hidden`.

### Encomendas
Apresenta o processo em três etapas (Consulta → Proposta → Criação) ao lado de um formulário de contato com campos de nome, e-mail, tipo de obra, dimensões, orçamento e mensagem.

### Rodapé / Contato
Localização, e-mail e links para redes sociais (Instagram, WhatsApp, Behance).

---

## Funcionalidades JavaScript (`script.js`)

| Funcionalidade | Descrição |
|---|---|
| Troca de accent color | A cada 3,5 s o CSS custom property `--accent` alterna entre ciano, magenta, amarelo e laranja. Desativado quando `prefers-reduced-motion` está ativo. |
| Reveal on scroll | `IntersectionObserver` adiciona a classe `.in-view` aos elementos `.reveal` ao entrar na viewport (threshold 15 %). |
| Nav ativa | Segundo `IntersectionObserver` marca o link da seção visível como `.active` na barra de navegação (threshold 45 %). |
| Menu mobile | Botão hambúrguer alterna a classe `.open` na lista de links e atualiza `aria-expanded`. Fecha ao clicar em qualquer link. |
| Filtros de galeria | Botões de filtro atualizam `aria-checked` e ocultam/exibem `.card` conforme `data-category`. |
| Ano dinâmico | `#year` recebe o ano corrente via `new Date().getFullYear()`. |
| Partículas Canvas | Pontos flutuantes animados no fundo (Canvas 2D). Quantidade proporcional à largura da janela (`innerWidth / 45`, mínimo 20). Reajusta ao redimensionar. Loop pausado em `prefers-reduced-motion`. |

---

## Como Executar

Não há dependências ou etapas de build. Basta abrir o arquivo `index.html` em qualquer navegador moderno:

```bash
# Opção 1 — abrir diretamente
open index.html

# Opção 2 — servidor local simples (Python 3)
python3 -m http.server 8080
# acesse http://localhost:8080
```

---

## Personalização

### Cores
As variáveis CSS em `:root` no início de `styles.css` controlam toda a paleta:

```css
:root {
  --bg:      #0a0a0a;  /* fundo principal */
  --cyan:    #00f0ff;
  --magenta: #ff00c8;
  --yellow:  #f5ff00;
  --orange:  #ff6a00;
  --text:    #f7f7f7;
  --accent:  var(--cyan); /* cor de destaque atual (trocada pelo JS) */
}
```

### Adicionar obra ao portfólio
1. Em `index.html`, duplique um `<article class="card" data-category="…">` dentro de `.art-grid`.
2. Em `styles.css`, adicione uma classe `.art-N` com o gradiente desejado.
3. Atualize título, descrição e preço dentro do `<article>`.

### Adicionar link social
Adicione um `<li>` na `<ul class="socials">` no `<footer>`, com `href` e `aria-label` apropriados.

---

## Acessibilidade

- Todas as imagens decorativas têm `aria-hidden="true"`.
- O canvas de partículas possui `aria-hidden="true"`.
- O menu mobile usa `aria-expanded` e `aria-controls`.
- Os botões de filtro usam `role="radiogroup"` / `role="radio"` com `aria-checked`.
- Texto invisível de apoio para leitores de tela via `.sr-only`.
- Animações CSS e JS são desativadas/simplificadas respeitando `prefers-reduced-motion`.

---

## Licença

© MR. BANDS. Todos os direitos reservados.