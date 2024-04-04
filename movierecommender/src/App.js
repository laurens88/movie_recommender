import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './screens/loginPage';
import SignupPage from './screens/signupPage';
import HomePage from './screens/homePage';
//import RecommendationsPage from './screens/recommendationsPage';
//import EmotionsPage from './screens/emotionsPage';
//import FeedbackPage from './screens/feedbackPage';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/recommendations" element={<h1>Recommendations</h1>} />
          <Route path="/emotions" element={<h1>How do you feel</h1>} />
          <Route path="/feedback" element={<h1>Feedback</h1>} />
        </Routes>
    </Router>
  );
}

export default App;
