// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import log from './utils/logger.js';  // custom logger
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
