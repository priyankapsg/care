import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import "./style.css";

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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderCell: {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    padding: '8px',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
  button1: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '2px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  button2: {
    backgroundColor: 'Red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    margin: '2px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
}));

const Volunteerdashboard = () => {
  const { id } = useParams();
  const [users, setUsers] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [helpRequests, setHelpRequests] = useState([]);

  useEffect(() => {
    fetchHelpRequests();
    fetchUserDetails();
  }, []);

  const fetchHelpRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/getallhelp/${id}`);      
      setHelpRequests(response.data);
    } catch (error) {
      console.error('Error fetching help requests:', error);
    }
  };

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
    <>
      <ul
        className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
        id='accordionSidebar'
      >
        <div
          className='sidebar-brand d-flex align-items-center justify-content-center'
          >
          <div className='sidebar-brand-icon rotate-n-15'>
            <i className='fas fa-laugh-wink' color="black"></i>
          </div>
          <div className='sidebar-brand-text mx-3'>Welcome</div>
        </div>
        <li className='nav-item active'>
          <div className='nav-link collapsed' onClick={() => { 
            setShowProfile(true);
            setHelpRequests(false); }} >
            <i className='fas fa-fw fa-user'></i>
            <span>profile details</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed' onClick={() => {
            setShowProfile(false); 
            setHelpRequests(true); 
            fetchHelpRequests();
            }}>
            <i className='fas fa-fw fa-question-circle'></i>
            <span>view requests</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed' to='/edit-flights'>
            <i className='fas fa-fw fa-check-circle'></i>
            <span>completed tasks</span>
          </div>
        </li>
        <li className='nav-item'>
          <Link className='nav-link collapsed' to='/login'>
            <i className='fas fa-fw fa-edit'></i>
            <span>logout</span>
          </Link>
        </li>
      </ul>
    </>
      <div className={classes.content}>
        <header className={classes.header}>
          <h1>Volunteer Dashboard</h1>
        </header>
        {showProfile && <ProfileDetails users={users} />}
        {helpRequests &&       
        <div className={classes.content}>
        <header className={classes.header}>
        </header>

        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.tableHeaderCell}>Name</th>
              <th className={classes.tableHeaderCell}>Phone Number</th>
              <th className={classes.tableHeaderCell}>Service</th>
              <th className={classes.tableHeaderCell}>Time Slot</th>
              <th className={classes.tableHeaderCell}>Address</th>
              <th className={classes.tableHeaderCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {helpRequests.length > 0 && helpRequests.map(user => (
              <tr key={user._id}>
                <td className={classes.tableCell}>{user.userData.firstName}</td>
                <td className={classes.tableCell}>{user.userData.phoneNumber}</td>
                <td className={classes.tableCell}>{user.service}</td>
                <td className={classes.tableCell}>{user.timeSlot}</td>
                <td className={classes.tableCell}>{user.userData.address}</td>
              {user.status === "Requested" ? 
                <td className={classes.tableCell}>
                  <button className={classes.button1} onClick={() => handleApprove(user.email)}>Accept</button>
                </td>
              :
              <td className={classes.tableCell}>
              <button className={classes.button2} onClick={() => handleApprove(user.email)}>Stop</button>
              </td>
              }
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      }
          
      </div>
    </div>
  );
};

export default Volunteerdashboard;
