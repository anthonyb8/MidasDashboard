import React from 'react'
import log from 'loglevel';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './data/AuthContext'; // Adjust the path as necessary

// Set logging for whole app
log.setLevel('info')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
