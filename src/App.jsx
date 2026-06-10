import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ParticleCanvas from "./components/ParticleCanvas";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Obras from "./pages/Obras";
import Encomendas from "./pages/Encomendas";
import Contato from "./pages/Contato";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ParticleCanvas />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/obras" element={<Obras />} />
            <Route path="/encomendas" element={<Encomendas />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}
