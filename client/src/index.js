import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { NameProvider } from './Components/LoginSignUp/LoginSignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NameProvider>
        <App />
      </NameProvider>
    </BrowserRouter>
  </React.StrictMode>
);
