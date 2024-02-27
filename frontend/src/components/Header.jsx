import React from "react";
import video from "../assets/video.mp4";


const Header = () => {
  return (
    <section id='Header' className='header flex container'>
      <div className='mainText'>
      <h1>Building Bridges of Hope and Help</h1>
      
      </div>
      <div className='headerImages flex'>
        <div className='videoDiv'>
          <video src={video} className='video' autoPlay loop muted />
        </div>

       
      </div>
    </section>
  );
};

export default Header;
