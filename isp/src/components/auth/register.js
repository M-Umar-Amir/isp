import React, { useState } from 'react';
import api from '../../utils/api';
import { setToken } from '../../utils/auth';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      setToken(res.data.token);
      onRegister();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input type="text" placeholder="Name" value={name} 
        onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} 
        onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} 
        onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
