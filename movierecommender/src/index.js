import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter} from 'react-router-dom';
import LoginPage from './screens/loginPage';

const router = createBrowserRouter([
  { path: '/', element: <h1>Home</h1> },
  { path: '/login', element: <LoginPage />},

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);

