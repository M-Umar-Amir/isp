import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get('/complaints');
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComplaints();
  }, []);

  const submitComplaint = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/complaints', { message });
      setComplaints([...complaints, res.data]);
      setMessage('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting complaint');
    }
  };

  return (
    <div>
      <h2>Complaints</h2>

      <form onSubmit={submitComplaint}>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <textarea
          placeholder="Write your complaint"
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        />
        <button type="submit">Submit Complaint</button>
      </form>

      <h3>Your Complaints</h3>
      <ul>
        {complaints.map(c => (
          <li key={c._id}>
            {c.message} - <em>{new Date(c.createdAt).toLocaleString()}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Complaints;
