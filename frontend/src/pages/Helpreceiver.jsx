import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { toast } from "react-toastify";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import service4 from "../assets/service4.jpg";
import service5 from "../assets/service5.jpg";
import service6 from "../assets/service6.jpg";
import service7 from "../assets/service7.jpg";
import service8 from "../assets/service8.jpg";
import "./style.css";

const travelers = [
  {
    id: 1,
    destinationImage: service1,
    serviceName: "BUYING MEDICINES",
  },
  {
    id: 2,
    destinationImage: service2,
    serviceName: "MENTAL SUPPORT",
  },
  {
    id: 3,
    destinationImage: service3,
    serviceName: "GROCERY SHOPPING",
  },
  {
    id: 4,
    destinationImage: service4,
    serviceName: "MEAL PREPARATION",
  },
  {
    id: 5,
    destinationImage: service5,
    serviceName: "COMPANION FOR WALKING",
  },
  {
    id: 6,
    destinationImage: service6,
    serviceName: "MEDICAL TRANSPORTATION",
  },
  {
    id: 7,
    destinationImage: service7,
    serviceName: "HOUSEHOLD WORKS",
  },
  {
    id: 8,
    destinationImage: service8,
    serviceName: "BUYING FOOD",
  },
];

const list = ["BUYING MEDICINES","COMPANION FOR WALKING","BUYING FOOD"];

const timeSlot1 = [
  { id: 1, range: '10:00 AM - 12:00 PM' },
  { id: 2, range: '12:00 PM - 02:00 PM' },
  { id: 3, range: '02:00 PM - 04:00 PM' },
  { id: 4, range: '04:00 PM - 06:00 PM' },
  { id: 5, range: '06:00 PM - 08:00 PM' },
  { id: 6, range: '08:00 PM - 10:00 PM' }
];

const timeSlot2 = [
  { id: 1, range: '10:00 AM - 11:00 AM' },
  { id: 2, range: '11:00 AM - 12:00 PM' },
  { id: 3, range: '12:00 PM - 01:00 PM' },
  { id: 4, range: '01:00 PM - 02:00 PM' },
  { id: 5, range: '02:00 PM - 03:00 PM' },
  { id: 6, range: '03:00 PM - 04:00 PM' },
  { id: 7, range: '04:00 PM - 05:00 PM' },
  { id: 8, range: '05:00 PM - 06:00 PM' },
  { id: 9, range: '06:00 PM - 07:00 PM' },
  { id: 10, range: '07:00 PM - 08:00 PM' },
  { id: 11, range: '08:00 PM - 09:00 PM' },
  { id: 12, range: '09:00 PM - 10:00 PM' }
];

let serviceValue;
let timeSlots;
const chooseSlot = () => {
  timeSlots = list.includes(serviceValue) ? timeSlot2 : timeSlot1;
}

const HelpRequestForm = () => {
  const { id } = useParams();
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [comments, setComments] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlotId) {
      setErrorMessage('Please select a time slot');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/user/help`, {
        user_id: id,
        timeSlot: selectedSlotId,
        service: serviceValue,
        comments: comments
      });
      if (response.status === 200) {
        toast.success(response.data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleSlotSelect = (event) => {
    setSelectedSlotId(event.target.value);
    setErrorMessage('');
  };

  return (
    <div>
      <h2>Choose a Time Slot</h2>
      <div className="box-form">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="time-slot-grid">
                <select
                  name="timeSlot"
                  onChange={handleSlotSelect}
                  value={selectedSlotId}
                >
                  <option value="" disabled hidden>Please select a time slot</option>
                  {timeSlots.map(slot => (
                    <option key={slot.id} value={slot.range}>{slot.range}</option>
                  ))}
                </select>
              </div>
              {errorMessage && <div className="error">{errorMessage}</div>}
              <div>
                <label>Comments:</label>
                <textarea
                  name="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ProfileDetails = ({ users }) => {
  return (
    <div>
      <h2>Profile Details</h2>
      <p>Name: {users.firstName} {users.lastName}</p>
      <p>Age: {users.age}</p>
      <p>Gender: {users.gender}</p>
      <p>Role: {users.role}</p>
      <p>Address: {users.address}</p>
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

const HelpReceiverDashboard = () => {
  let { id } = useParams();
  const [users, setUsers] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [selectedService, setSelectedService] = useState(false);

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
          <div className='sidebar-brand-text mx-3'>Welcome</div>
        </div>
        <li className='nav-item active'>
          <div className='nav-link collapsed' onClick={() => { 
            setShowProfile(true); 
            setShowServices(false); 
            setShowTask(false);
            setShowForm(false);
            }}>
            <i className='fas fa-fw fa-user'></i>
            <span>Profile Details</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed' onClick={() => {
            setShowProfile(false); 
            setShowServices(true); 
            setShowTask(false);
            setShowForm(false);
            }}>
            <i className='fas fa-fw fa-question-circle'></i>
            <span>Request for Help</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed' onClick={() => {
            setShowProfile(true); 
            setShowServices(false);
            setShowTask(false);
            setShowForm(false);
            }}>
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
      </ul>
      <div className={classes.content}>
        <header className={classes.header}>
          <h1>Help Receiver Dashboard</h1>
        </header>
        
        {showProfile && <ProfileDetails users={users} />}
        {showServices &&             
        <div id="Travelers" className='travelers container section'>
          <h1>AVAILABLE SERVICES</h1>
        <div className='sectionContainer'>
        <div className='travelersContainer grid'>
          {travelers.map(({ id, destinationImage, serviceName }) => (
            <div key={id} className='singleService' onClick={() => { 
              serviceValue = serviceName
              setShowProfile(false); 
              setShowServices(false); 
              setShowTask(false);
              setShowForm(true);
              chooseSlot();
              }}
            >
              <img
                src={destinationImage}
                alt='Service'
                className='destinationImage'
              />
              <div className='serviceName'>
                <span>{serviceName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>}
        {showTask && <Services setService={setSelectedService} />}
        {showForm && <HelpRequestForm />}
        {selectedService && <HelpRequestForm serviceName={selectedService} />}
      </div>
    </div>
  );
};

export default HelpReceiverDashboard;