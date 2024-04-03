import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './screens/loginPage';
import LoginForm from './components/loginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<h1>Test</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
