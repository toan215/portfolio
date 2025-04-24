import "./App.css";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <>
      {/* <h1 className="text-4xl bg-gradient-to-r from-sky-400 to-fuchsia-500">My Portfolio</h1> */}
      <Navbar />
      <About />
      <Portfolio />
    </>
  );
}

export default App;
