import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AlbumManager from "./pages/AlbumManager";
import LandingPage from "./components/LandingPage";
import AddAlbum from "./pages/AddAlbum";


const App = () => {
  // axios.defaults.baseURL = "http://localhost:8080/api/v1";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AlbumManager" element={<AlbumManager />} />
        <Route path="/" element={<AddAlbum />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
