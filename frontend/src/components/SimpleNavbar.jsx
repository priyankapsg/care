import React from "react";
import { Link } from "react-router-dom";
import { SiConsul } from "react-icons/si";

const SimpleNavbar = () => {
  return (
    <div className="navBar">
        
      <div className="navBarOne flex">
      <h1>CARELINKHUB</h1>
        {/* <div>
          <SiConsul />
        </div> */}
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
      </div>
    </div>
  );
};

export default SimpleNavbar;
