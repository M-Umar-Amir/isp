import React, { useState } from 'react';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Dashboard from './components/dashboard';
import Packages from './components/packages';
import Complaints from './components/complaints';
import Payments from './components/payments';
import { isLoggedIn, removeToken } from './utils/auth';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [view, setView] = useState('dashboard'); // dashboard, packages, complaints, payments, login, register

  const logout = () => {
    removeToken();
    setLoggedIn(false);
    setView('login');
  };

  if (!loggedIn) {
    return view === 'register' ? (
      <>
        <Register onRegister={() => setLoggedIn(true)} />
        <p>
          Already have an account? <button onClick={() => setView('login')}>Login</button>
        </p>
      </>
    ) : (
      <>
        <Login onLogin={() => setLoggedIn(true)} />
        <p>
          Don't have an account? <button onClick={() => setView('register')}>Register</button>
        </p>
      </>
    );
  }

  return (
    <div>
      <nav>
        <button onClick={() => setView('dashboard')}>Dashboard</button>
        <button onClick={() => setView('packages')}>Packages</button>
        <button onClick={() => setView('complaints')}>Complaints</button>
        <button onClick={() => setView('payments')}>Payments</button>
        <button onClick={logout}>Logout</button>
      </nav>

      {view === 'dashboard' && <Dashboard />}
      {view === 'packages' && <Packages />}
      {view === 'complaints' && <Complaints />}
      {view === 'payments' && <Payments />}
    </div>
  );
};

export default App;
