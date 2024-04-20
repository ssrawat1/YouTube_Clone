import React, { useState } from "react";
import "./index.css";
import Navbar from "./ytComponents/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [sidebar, setSidebar] = useState(true);
  return (
    <>
      <Router>
        <Navbar setSidebar={setSidebar} />
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar} />} />
          <Route path="/video/:categoryId/:videoId" element={<Video />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
