import React from 'react'
import { Link } from 'react-router-dom';
import AboutShortImg from '../../assets/About-Short.webp';
import './ShortAbout.css'

const ShortAbout = () => {
  return (
    <div className='main-container'>
        <div className='content-container'>
            <img src = {AboutShortImg} />
            <div className='about-short-container'>
                <h2>About Us</h2>
                <p>Welcome to our online bookstore — your one-stop destination for discovering and purchasing books across every genre. We are passionate about reading and committed to making books accessible to everyone. Whether you're looking for bestsellers, academic texts, or hidden literary gems, our curated collection and seamless shopping experience are designed to serve readers of all kinds.</p>
                <Link to = '/about' className='btn'>Read More</Link>
            </div>
        </div>
    </div>
  )
}

export default ShortAbout