import React, { useContext, useState } from 'react';
import './Login.css'; 
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/AuthContext'; 


const Login = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useContext(AuthContext);

  // Login Submit button click
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      await handleLogin(username, password); 
    } catch (err) {
      setError('Failed to login');
      console.error(err);
    }
  };

  return (
    <div className="login-overlay">
      <div className='login-title'>
        <img src={logo} className="login-logo"/>
        <h1>MIDAS</h1>
        <h2>TERMINAL</h2>
      </div>
      <div className="login-container">
        <h2>LOGIN</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
