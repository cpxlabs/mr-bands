import React, { createContext, useContext, useState, useEffect, useReducer } from "react";

const ACCENTS = ["#00F0FF", "#FF00C8", "#F5FF00", "#FF6A00"];

const initialState = {
  accent: ACCENTS[0],
  accentIndex: 0,
  menuOpen: false,
  galleryFilter: "all",
  reducedMotion: typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false,
};

function appReducer(state, action) {
  switch (action.type) {
    case "CYCLE_ACCENT": {
      const next = (state.accentIndex + 1) % ACCENTS.length;
      return { ...state, accentIndex: next, accent: ACCENTS[next] };
    }
    case "TOGGLE_MENU":
      return { ...state, menuOpen: !state.menuOpen };
    case "CLOSE_MENU":
      return { ...state, menuOpen: false };
    case "SET_FILTER":
      return { ...state, galleryFilter: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (state.reducedMotion) return;
    const id = setInterval(() => dispatch({ type: "CYCLE_ACCENT" }), 3500);
    return () => clearInterval(id);
  }, [state.reducedMotion]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", state.accent);
  }, [state.accent]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
