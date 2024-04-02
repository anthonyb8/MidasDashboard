import React, { useContext, useState } from 'react';
import { AuthContext } from '../../data/AuthContext'; // Adjust the import path based on your project structure
import './Login.css'; // Assuming you have a separate CSS file for login styles

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      await login(username, password); // Implement this function in your AuthContext
    } catch (err) {
      setError('Failed to login');
      console.error(err);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <h2>Login</h2>
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
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
