import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Example: fetch user info and packages
    const fetchUserAndPackages = async () => {
      try {
        // Ideally, you have an endpoint to get user info
        // For now, just fetch packages
        const res = await api.get('/packages');
        setPackages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserAndPackages();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Show user info here if available */}
      <h3>Available Packages</h3>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg._id}>
            {pkg.name} - {pkg.speedMbps} Mbps - ${pkg.price}
            <p>{pkg.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
