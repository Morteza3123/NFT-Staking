import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import ExchangeCard from "./Components/Home";
import Navbar from "./Components/Navbar";
import Mint from "./pages/mint";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
