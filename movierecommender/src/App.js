import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './screens/loginPage';
import LoginForm from './components/loginForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
