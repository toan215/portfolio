import "./App.css";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Home />
      <About />
      <Portfolio />
      <Contact />
    </BrowserRouter>
  );
}

export default App;
