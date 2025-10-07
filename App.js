import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TopicsPage from "./components/TopicsPage";
import AlphabetsPage from "./components/AlphabetsGridPage";
import SingleLetterPage from "./components/SingleLetterPage";
import NumbersPage from "./components/NumbersPage";
import SingleNumberPage from "./components/SingleNumberPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/topics" element={<TopicsPage />} />

        {/* Alphabets routes */}
        <Route path="/alphabets" element={<AlphabetsPage />} />
        <Route path="/alphabets/:letter" element={<SingleLetterPage />} />

        {/* Numbers routes */}
        <Route path="/numbers" element={<NumbersPage />} />
        <Route path="/numbers/:number" element={<SingleNumberPage />} />
      </Routes>
    </Router>
  );
}

export default App;
