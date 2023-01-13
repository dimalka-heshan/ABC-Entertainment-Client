import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlbumManager from "./pages/AlbumManagerPage/AlbumManager";
import LandingPage from "./pages/LandingPage";
import axios from "axios";

const App = () => {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AlbumManager" element={<AlbumManager />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
