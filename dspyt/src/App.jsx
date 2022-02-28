import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Home, Upload } from "./components";
import { RecoilRoot } from "recoil";
const App = ({ contract, currentUser, nearConfig, wallet }) => {
  return (
    <RecoilRoot>
      <Router>
        <Navigation />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
