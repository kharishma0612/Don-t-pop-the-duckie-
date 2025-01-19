import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DuckieGame from "./DuckieGame";
import Wheel from "./Wheel";
import Home from "./Home";
import Categories from "./Categories";
import "./App.css";  // Import the CSS file

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<DuckieGame />} />
          <Route path="/wheel" element={<Wheel />} />
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
        
        <div className="mt-4">
          <Link to="/wheel" className="button">
            Go to Spinning Wheel
          </Link>
        </div>
        <div className="mt-4">
          <Link to="/home" className="button">
            Go to home page
          </Link>
        </div>
        <div className="mt-4">
          <Link to="/categories" className="button">
            Go to categories page
          </Link>
        </div>
      </div>
    </Router>
  );
}

export default App;
