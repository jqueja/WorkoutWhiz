import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavHeader from './components/NavHeader';
import Home from './components/Home';
import Analytics from './components/Analytics';
import Settings from './components/Settings'
import './App.scss';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <NavHeader></NavHeader>
      </div>
    </Router>
  );
}

export default App;