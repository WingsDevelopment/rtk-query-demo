import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./ui/layout/navbar";
import SingleElement from "./ui/single-element";
import AddNew from "./ui/add-new";
import ListAll from "./ui/list-all";

import "./App.css";
import ListByPage from "./ui/list-by-page";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ListAll />} />
        <Route path="/ListByPage" element={<ListByPage />} />
        <Route path="AddNew" element={<AddNew />} />
        <Route path="details/:id" element={<SingleElement />} />
      </Routes>
    </div>
  );
}

export default App;
