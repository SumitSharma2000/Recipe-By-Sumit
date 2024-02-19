import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';
import './FooterStyle.css'
import { ThemeContext } from "../../App";
import { useContext } from 'react';


const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer style={theme ? {backgroundColor: "#12343b"} : {}} className="footer">
      <div className="footer-links">
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li><a href="/recipes">Recipes</a></li>
            <li><a href="/cuisines">Cuisines</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect With Us!</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com"><FaFacebook /></a>
            <a href="https://www.twitter.com"><FaTwitter /></a>
            <a href="https://www.instagram.com"><FaInstagram /></a>
            <a href="https://www.pinterest.com"><FaPinterest /></a>
            <a href="https://www.youtube.com"><FaYoutube /></a>
          </div>
          <div className="subscribe">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p> © Copyrights | 2024 Sumit Recipe App | All rights reserved .</p>
      </div>
    </footer>
  );
}

export default Footer;
