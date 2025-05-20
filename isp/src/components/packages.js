import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [name, setName] = useState('');
  const [speedMbps, setSpeedMbps] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get('/packages');
        setPackages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/packages', {
        name,
        speedMbps: Number(speedMbps),
        price: Number(price),
        description,
      });
      setPackages([...packages, res.data]);
      setName('');
      setSpeedMbps('');
      setPrice('');
      setDescription('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating package');
    }
  };

  return (
    <div>
      <h2>Manage Packages</h2>

      <form onSubmit={handleSubmit}>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <input
          type="text"
          placeholder="Package Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Speed (Mbps)"
          value={speedMbps}
          onChange={e => setSpeedMbps(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Add Package</button>
      </form>

      <h3>Existing Packages</h3>
      <ul>
        {packages.map(pkg => (
          <li key={pkg._id}>
            {pkg.name} - {pkg.speedMbps} Mbps - ${pkg.price}
            <p>{pkg.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Packages;
