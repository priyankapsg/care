import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import service1Image from '../assets/service1.jpg';
import service2Image from '../assets/service2.jpg';
import service3Image from '../assets/service3.jpg';

// Define Services Component
const Services = ({ setService }) => {
  // Define your services and display them as needed
  const services = [
    { name: 'Service 1', image: service1Image },
    { name: 'Service 2', image: service2Image },
    { name: 'Service 3', image: service3Image }
  ];

  const handleServiceClick = (serviceName) => {
    setService(serviceName);
  };

  return (
    <div>
      <h2>Services</h2>
      {/* Display images of services */}
      {/* Example: */}
      {services.map(service => (
        <img 
        key={service.name} 
        src={service.image} 
        alt={service.name} 
        onClick={() => handleServiceClick(service.name)} 
        style={{ width: '200px', height: 'auto' }}
        />
      ))}
    </div>
  );
};

// Define Help Request Form Component
const HelpRequestForm = ({ serviceName }) => {
  // Implement your help request form here
  return (
    <div>
      <h2>Help Request Form for {serviceName}</h2>
      {/* Your form elements go here */}
    </div>
  );
};
const ProfileDetails = ({ users }) => {
  return (
    <div>
      <h2>Profile Details</h2>
      <p>Name: {users.firstName} {users.lastName}</p>
      <p>Email: {users.email}</p>
      <p>Phone Number: {users.phoneNumber}</p>
      <p>Aadhar Number: {users.aadharNumber}</p>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  content: {
    flex: 1,
    overflowX: 'auto',
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
  },
}));

const apiUrl = 'http://localhost:5000/api/tasks';

const HelpReceiverDashboard = () => {
  let { id } = useParams();
  const [users, setUsers] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/getProfile/${id}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ul className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' id='accordionSidebar'>
      <div className='sidebar-brand d-flex align-items-center justify-content-center'>
          <div className='sidebar-brand-icon rotate-n-15'>
            <i className='fas fa-laugh-wink'></i>
          </div>
          <div className='sidebar-brand-text mx-3'>Welcome Help Receiver Dashboard</div>
        </div>
        <li className='nav-item active'>
          <div className='nav-link'>
            <i className='fas fa-fw fa-tachometer-alt'></i>
            <span>Dashboard</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed' onClick={() => { setShowProfile(true); setShowServices(false); setSelectedService(false)}}>
            <i className='fas fa-fw fa-user'></i>
            <span>Profile Details</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed' onClick={() => {setShowProfile(false); setShowServices(true)}}>
            <i className='fas fa-fw fa-question-circle'></i>
            <span>Request for Help</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed'>
            <i className='fas fa-fw fa-check-circle'></i>
            <span>Completed Tasks</span>
          </div>
        </li>
        <li className='nav-item'>
          <Link className='nav-link collapsed' to='/login'>
            <i className='fas fa-fw fa-edit'></i>
            <span>Logout</span>
          </Link>
        </li>

        {/* Sidebar code */}
      </ul>
      <div className={classes.content}>
        <header className={classes.header}>
          <h1>Help Receiver Dashboard</h1>
        </header>
        
        {showProfile && users && <ProfileDetails users={users} />}
        {showServices && <Services setService={setSelectedService} />}
        {selectedService && <HelpRequestForm serviceName={selectedService} />}
      </div>
    </div>
  );
};

export default HelpReceiverDashboard;
