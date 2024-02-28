/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SiConsul } from "react-icons/si";
import { CgMenuGridO } from "react-icons/cg";


const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("navBarMenu");
  const [noBg, addBg] = useState("navBarTwo");


  const showNavbar = () => {
    setActive("navBarMenu showNavBar");
  };

  const removeNavbar = () => {
    setActive("navBarMenu");
  };

  

  const toggleNavbar = () => {
    if (active === "navBarMenu") {
      showNavbar();
    } else {
      removeNavbar();
    }
  };

  

  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg("navBarTwo navBar_With_Bg");
    } else {
      addBg("navBarTwo");
    }
  };

  

  useEffect(() => {
    const handleScroll = () => {
      addBgColor();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    navigate(`/${sectionId.toLowerCase()}`);
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop - 50,
        behavior: "smooth",
      });

      setTimeout(() => {
        removeNavbar();
      }, 500);
    }
  };

  return (
    <div className='navBar flex'>
      <div className='navBarOne flex'>
        <div>
          <SiConsul />
        </div>
        {/* <div className='atb flex'>
{/*          
            <>
              <span onClick={() => navigate("/login")}>LOGIN</span>
            </>
          
        // </div> */}
        <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>

      </div>
      <div className={noBg}>
        <div className='logoDiv'>
          <h1>CARELINKHUB</h1>
        </div>
        <div className={active}>
          <ul className='menu flex'>
            <li onClick={() => scrollToSection("Header")} className='listItem'>
              Home
            </li>
            <li onClick={() => scrollToSection("about")} className='listItem'>
              About us
            </li>
            <li
              onClick={() => scrollToSection("Travelers")}
              className='listItem'
            >
              services
            </li>
            <li onClick={() => scrollToSection("Footer")} className='listItem'>
              Footer
            </li>
          </ul>
          {/* <button className='btn flex btnOne' onClick={getFlights}>Book</button>
          <button className='btn flex btnOne' onClick={getBookings}>Bookings</button> */}
        </div> 
        {/* <button className='btn flex btnTwo' onClick={getFlights}>Book</button>
        <button className='btn flex btnTwo' onClick={getBookings}>Bookings</button> */}
        <div onClick={toggleNavbar} className='toggleIcon'>
          <CgMenuGridO className='icon' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;