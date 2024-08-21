import React from 'react';
import './footer.css'; // Make sure to create a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Affiliate Program</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Get Help</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Summer Courses</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Payment Options</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            {/* <li><a href="#">Dress</a></li> */}
          </ul>
        </div>
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><img src="/pic/chess50.png" alt="Facebook" /></a>
            <a href="#"><img src="/pic/chess49.png" alt="Twitter" /></a>
            <a href="#"><img src="/pic/chess51.png" alt="Instagram" /></a>
            <a href="#"><img src="pic/chess52.png" alt="LinkedIn" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
