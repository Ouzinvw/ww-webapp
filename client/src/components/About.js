import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mt-5 text-center">
        <div className='offset-md-3 col-md-6 col-sm-12'>
        <h1 class="lead">
        <span class="text-primary fw-bold">WeatherWear</span>, your handy weather API.
        </h1>
        <p>
          Welcome to our website! This is the About page where you can learn more about our company or project.
        </p>
        <div className='my-1'>
            <img src="../ll_placeholder.png" class="my-1 img-fluid center rounded" alt="placeholder" height="90%" width="90%"></img>
        </div>
        <div className='my-3'>
        <Link to="/" className="btn btn-primary">
          Sign up & start using our API
        </Link>
        </div>
        </div>
    </div>
  );
};

export default About;
