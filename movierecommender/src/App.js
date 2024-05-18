import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './screens/loginPage';
import SignupPage from './screens/signupPage';
import HomePage from './screens/homePage';
import EmotionsPage from './screens/emotionsPage';
import CategoriesPage from './screens/categoriesPage';
import RecommendationsPage from './screens/recommendationsPage';
import FeedbackPage from './screens/feedbackPage';
import {AuthProvider} from "./contexts/AuthContext";
import {CategoriesProvider} from "./contexts/CategoriesContext";


function App() {
  return (
      <AuthProvider>
          <CategoriesProvider>
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/emotions" element={<EmotionsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
    </Router>
          </CategoriesProvider>
        </AuthProvider>
  );
}

export default App;
