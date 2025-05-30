import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Our Bookstore</h1>
        <p>Your gateway to a world of knowledge, stories, and imagination.</p>
      </div>

      <section className="about-section">
        <h2>📚 Who We Are</h2>
        <p>
          We are an online bookstore committed to bringing readers closer to the books they love. Whether you're a
          passionate bibliophile, a casual reader, or someone looking for the perfect gift, our platform is designed to
          serve your literary needs. With thousands of titles across genres, we aim to make books accessible and
          affordable.
        </p>
      </section>

      <section className="about-section">
        <h2>🚀 Our Mission</h2>
        <p>
          Our mission is to encourage reading habits by offering a seamless book-buying experience. We believe that
          books can inspire, educate, and transform lives. Through our curated selection and community-driven features,
          we strive to build a strong reading culture.
        </p>
      </section>

      <section className="about-section">
        <h2>🛒 What We Offer</h2>
        <ul>
          <li>A diverse collection of books including fiction, non-fiction, textbooks, and more.</li>
          <li>Smart search and filtering options for easy discovery.</li>
          <li>Favorites, reviews, and ratings to help you decide.</li>
          <li>Easy cart management and fast, secure checkout.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>📈 Our Vision</h2>
        <p>
          To become one of the leading online platforms for book lovers worldwide. We envision a future where every
          individual has access to quality books no matter where they are.
        </p>
      </section>

      <section className="about-section">
        <h2>🤝 Connect With Us</h2>
        <p>
          We are more than just a bookstore—we are a community. Follow us on social media, subscribe to our newsletter,
          and stay connected with the latest releases, reading tips, and special discounts.
        </p>
      </section>
    </div>
  );
};

export default About;
