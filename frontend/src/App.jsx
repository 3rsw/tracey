import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import Questions from "./pages/Questions";
import Walkthrough from "./pages/Walkthrough";
import Quiz from "./pages/Quiz"
import Topics from "./pages/Topics";
import Topic from "./pages/Topic";
import HomePage from "./pages/HomePage";

const App = () => {

  console.log('Rendering App...');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/question/:qnId/walkthrough" element={<Walkthrough />} />
        <Route path="/question/:qnId/quiz" element={<Quiz />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topic/:topic" element={<Topic />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;