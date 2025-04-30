import React, { useState } from 'react';
import "./App.css";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SakuraEffect from "./components/SakuraEffect";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "./pages/WelcomeScreen";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>
      {!showWelcome && (
        <>
          <Navbar />
          <SakuraEffect windSpeed={0.2} />
          <Home />
          <About />
          <Portfolio />
          <Contact />
        </>
      )}
    </>
  );
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              showWelcome={showWelcome}
              setShowWelcome={setShowWelcome}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
