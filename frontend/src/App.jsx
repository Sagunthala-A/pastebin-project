import React from 'react';
import { Routes, Route } from "react-router-dom";
import ViewPaste from "./pages/ViewPaste";
import CreatePaste from "./pages/CreatePaste";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreatePaste />} />
      <Route path="/p/:id" element={<ViewPaste />} />
    </Routes>
  );
}
