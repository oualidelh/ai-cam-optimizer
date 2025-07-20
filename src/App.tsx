import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Analyses from "./pages/Analyses";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyses" element={<Analyses />} />
      </Routes>
    </>
  );
}

export default App;
