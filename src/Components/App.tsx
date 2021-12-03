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
import Logout from "./Pages/Logout";

/**
 * The main component with routing logic.
 *
 * @return {*}  {JSX.Element}
 */
const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <div className="document">
        <Header />

        <main className="document__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
