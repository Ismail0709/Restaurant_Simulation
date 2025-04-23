'use client';
import React from 'react';
import './CSS/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>QueueBites: Simulate, Optimize, Satisfy!</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 QueueBites. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
