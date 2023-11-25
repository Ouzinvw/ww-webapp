import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:5000/api/dashboard', { headers: { Authorization: token } })
        .then(response => setDashboardData(response.data.data))
        .catch(error => console.error('Error fetching dashboard data:', error.response.data.error));
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className='offset-md-3 col-md-6 col-sm-12'>
        <h2 class="text-center">Welcome back, <span className='text-primary fw-bold'>{dashboardData ? `${dashboardData.username}.` : 'Loading...'}</span></h2>
        <p class="text-center">API stored data goes here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
