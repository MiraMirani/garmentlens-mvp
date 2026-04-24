import { Navigate, Route, Routes } from "react-router-dom";
import Navbar  from "./components/Navbar.tsx";
import HomePage from "./pages/Home";
import ListPage from "./pages/List";
import UploadPage from "./pages/Upload";

import './App.css'


function App() {
  return (
      <main className="container">
        <h1>GarmentLens</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
  );
}


export default App
