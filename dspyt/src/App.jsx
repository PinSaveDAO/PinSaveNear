import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Home, Upload } from "./components";
import { useStore } from "./store";
const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const initNear = useStore(state=>state.setUpStore);
  useEffect(()=> {
    initNear(contract,currentUser,nearConfig,wallet);
  },[]);
  ///TODO: Add global state management for these NEAR Params pls!!
  return (
      <Router>
        <Navigation />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
  );
};

export default App;
