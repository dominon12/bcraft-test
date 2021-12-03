import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
// components
import Header from "./Organisms/Header";
// pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import ChangePassword from "./Pages/ChangePassword";

function App() {
  return (
    <Router>
      <div className="document">
        <Header />

        <main className="document__content">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/registration" element={<Registration />} exact />
            <Route path="/change-password" element={<ChangePassword />} exact />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
