import React, { useState } from 'react';
import api from '../../utils/api';
import { setToken } from '../../utils/auth';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input type="email" placeholder="Email" value={email} 
        onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} 
        onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
