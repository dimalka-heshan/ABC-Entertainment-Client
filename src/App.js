import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
//import axios from "axios";
import AlbumManager from "./pages/AlbumManager";

const App = () => {
  // axios.defaults.baseURL = "http://localhost:8080/api/v1";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AlbumManager />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
