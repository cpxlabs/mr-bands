const accents = ["#00F0FF", "#FF00C8", "#F5FF00", "#FF6A00"];
const root = document.documentElement;
let accentIndex = 0;
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const reducedMotion = reducedMotionQuery.matches;

if (!reducedMotion) {
  setInterval(() => {
    accentIndex = (accentIndex + 1) % accents.length;
    root.style.setProperty("--accent", accents[accentIndex]);
  }, 3500);
}

const sections = [...document.querySelectorAll("main section, footer")];
const navLinks = [...document.querySelectorAll(".menu-list a")];
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === id));
    });
  },
  { threshold: 0.45 }
);

sections.forEach((section) => {
  if (section.id) navObserver.observe(section);
});

const menuToggle = document.querySelector(".menu-toggle");
const menuList = document.querySelector(".menu-list");

menuToggle?.addEventListener("click", () => {
  if (!menuList) return;
  const isOpen = menuList.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

menuList?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuList.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

const filters = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".card")];

filters.forEach((filterBtn) => {
  filterBtn.addEventListener("click", () => {
    filters.forEach((btn) => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-checked", "false");
    });
    filterBtn.classList.add("is-active");
    filterBtn.setAttribute("aria-checked", "true");
    const selected = filterBtn.dataset.filter;

    cards.forEach((card) => {
      const visible = selected === "all" || card.dataset.category === selected;
      card.hidden = !visible;
    });
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const orderForm = document.querySelector(".order-form");
orderForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  orderForm.reset();
});

const canvas = document.getElementById("bg-particles");
const ctx = canvas?.getContext("2d");
const dots = [];

if (canvas && ctx) {
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const buildDots = () => {
    dots.length = 0;
    const count = Math.max(20, Math.floor(window.innerWidth / 45));
    for (let i = 0; i < count; i += 1) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      });
    }
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 240, 255, 0.3)";
    dots.forEach((dot) => {
      dot.x += dot.vx;
      dot.y += dot.vy;
      if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
      if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.s, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reducedMotion) requestAnimationFrame(render);
  };

  window.addEventListener("resize", () => {
    resize();
    buildDots();
  });

  resize();
  buildDots();
  render();
}
