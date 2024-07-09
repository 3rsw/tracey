import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import Questions from "./pages/Questions";
import Question from "./pages/Question";
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
        <Route path="/question/:qnId" element={<Question />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topic/:topic" element={<Topic />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;