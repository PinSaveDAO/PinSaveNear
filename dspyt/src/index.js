import ReactDOM from "react-dom";
import "./index.css";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  Upload
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <Toaster />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);