import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Landing } from "./pages/Landing";
import { GameBoard } from "./pages/GameBoard";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Landing />} />
          <Route path="/board" element={<GameBoard />} />
          {/* </Route> */}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
