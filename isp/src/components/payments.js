import React, { useState } from 'react';
import api from '../utils/api';

const Payments = () => {
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [error, setError] = useState('');

  const makePayment = async (e) => {
    e.preventDefault();
    try {
      // Adjust API endpoint and payload as per your backend
      const res = await api.post('/payments', { amount: Number(amount) });
      setPaymentStatus('Payment successful!');
      setError('');
      setAmount('');
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
      setPaymentStatus('');
    }
  };

  return (
    <div>
      <h2>Make Payment</h2>
      <form onSubmit={makePayment}>
        {error && <p style={{color: 'red'}}>{error}</p>}
        {paymentStatus && <p style={{color: 'green'}}>{paymentStatus}</p>}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default Payments;
