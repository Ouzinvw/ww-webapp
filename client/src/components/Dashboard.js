import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Card, Button } from 'react-bootstrap';

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
    <div className='container mt-5'>
      <h2 class='lead text-center display-6'>Welcome back, <span className='text-primary'>{dashboardData ? `${dashboardData.username}` : 'Loading...'}</span></h2>
      <p className='lead text-center'>Below is the currently loaded locations using our <span className='text-primary'>WeatherWear API</span>, click the headers to view the data.</p>
      {/* Replace the below code with <WeatherAPI /> once the component is complete and API enpoint is connected */}
      <Accordion alwaysOpen> 
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Toronto</Accordion.Header>
          <Accordion.Body>
          <p>01-15-12:00 - 5°C - 15 km/h</p>
          <p>03-22-18:00 - 10°C - 20 km/h</p>
          <p>05-10-06:00 - 18°C - 12 km/h</p>
          <p>07-05-15:00 - 25°C - 25 km/h</p>
          <p>09-18-03:00 - 12°C - 18 km/h</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>London</Accordion.Header>
          <Accordion.Body>
          <p>01-15-12:00 - 8°C - 10 km/h</p>
          <p>03-22-18:00 - 12°C - 15 km/h</p>
          <p>05-10-06:00 - 15°C - 8 km/h</p>
          <p>07-05-15:00 - 20°C - 18 km/h</p>
          <p>09-18-03:00 - 10°C - 12 km/h</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>Sarnia</Accordion.Header>
          <Accordion.Body>
          <p>01-15-12:00 - 15°C - 8 km/h</p>
          <p>03-22-18:00 - 20°C - 12 km/h</p>
          <p>05-10-06:00 - 25°C - 15 km/h</p>
          <p>07-05-15:00 - 30°C - 20 km/h</p>
          <p>09-18-03:00 - 22°C - 18 km/h</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='3'>
          <Accordion.Header>Chatham</Accordion.Header>
          <Accordion.Body>
          <p>01-15-12:00 - 28°C - 25 km/h</p>
          <p>03-22-18:00 - 22°C - 20 km/h</p>
          <p>05-10-06:00 - 20°C - 15 km/h</p>
          <p>07-05-15:00 - 25°C - 18 km/h</p>
          <p>09-18-03:00 - 30°C - 22 km/h</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='4'>
          <Accordion.Header>Lindsay</Accordion.Header>
          <Accordion.Body>
          <p>01-15-12:00 - 6°C - 12 km/h</p>
          <p>03-22-18:00 - 15°C - 18 km/h</p>
          <p>05-10-06:00 - 20°C - 10 km/h</p>
          <p>07-05-15:00 - 25°C - 22 km/h</p>
          <p>09-18-03:00 - 18°C - 15 km/h</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='5'>
          <Accordion.Header>Hamilton</Accordion.Header>
          <Accordion.Body>
          <p>01-15-12:00 - -5°C - 5 km/h</p>
          <p>03-22-18:00 - 2°C - 8 km/h</p>
          <p>05-10-06:00 - 10°C - 12 km/h</p>
          <p>07-05-15:00 - 28°C - 25 km/h</p>
          <p>09-18-03:00 - 15°C - 18 km/h</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='6'>
          <Accordion.Header>Collingwood</Accordion.Header>
          <Accordion.Body>
          <p>01-15-12:00 - 32°C - 30 km/h</p>
          <p>03-22-18:00 - 28°C - 25 km/h</p>
          <p>05-10-06:00 - 25°C - 20 km/h</p>
          <p>07-05-15:00 - 30°C - 22 km/h</p>
          <p>09-18-03:00 - 28°C - 18 km/h</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='7'>
          <Accordion.Header>Orangeville</Accordion.Header>
          <Accordion.Body>
          <p>01-15-12:00 - 28°C - 15 km/h</p>
          <p>03-22-18:00 - 32°C - 20 km/h</p>
          <p>05-10-06:00 - 25°C - 18 km/h</p>
          <p>07-05-15:00 - 35°C - 25 km/h</p>
          <p>09-18-03:00 - 30°C - 22 km/h</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Dashboard;
