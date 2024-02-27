import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id='Footer' className='footer'>
      <div className='sectionContainer container grid'>
        {/* <div className='footerLinks'>
          <span className='linkTitle'>Navigation</span>
          <li>
            <a to='/'>Home</a>
          </li>
          <li>
            <a to='/Travelers'>Services</a>
          </li>
          <li>
            <a to='/about'>About Us</a>
          </li>
        </div> */}
        {/* <div className='footerLinks'>
          <span className='linkTitle'>Quick Links</span>
          <li>
            <a to='/terms'>Terms of Service</a>
          </li>
          <li>
            <a to='/privacy'>Privacy Policy</a>
          </li>
          <li>
            <a to='/faq'>FAQ</a>
          </li>
        </div> */}
        <div className='footerLinks'>
          <span className='linkTitle'>Contact</span>
          <li>Email: CareLinkHub.com</li>
          <li>Phone: +1 9876543210</li>
          <li>Address: coimbatore</li>
        </div>
      </div>
      <div className='copyRightDiv flex'>
        <p>
          &copy; {new Date().getFullYear()} CARELINKHUB. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
