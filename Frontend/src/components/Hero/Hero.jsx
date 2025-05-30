import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import heroImage from '../../assets/hero-content-image.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover Your Next Favorite Book</h1>
        <p>Browse through our extensive collection of books across all genres. Find your next great read today.</p>
        <div className="hero-buttons">
          <Link to="/all-books" className="hero-btn">Browse Books</Link>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} />
      </div>
    </section>
  );
};

export default Hero;
