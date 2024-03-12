import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh', // Set the height to fill the viewport
  },
  content: {
    flex: 1, // Allow the content to fill the available space
    overflowX: 'auto', // Enable horizontal scrolling if needed
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
  button: {
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
}));

const apiUrl = 'http://localhost:5000/api/tasks';

const HelpReceiverDashboard = () => {

  let { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchUserDetails();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(apiUrl);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/getProfile/${id}`);
      console.log("DETAILS", response);
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
          <div className='sidebar-brand-text mx-3'>Welcome </div>
        </div>

        <li className='nav-item active'>
          <div className='nav-link'>
            <i className='fas fa-fw fa-tachometer-alt'></i>
            <span>Dashboard</span>
          </div>
        </li>

        <li className='nav-item'>
          <div className='nav-link collapsed'>
            <i className='fas fa-fw fa-user'></i>
            <span>profile details</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed'>
            <i className='fas fa-fw fa-question-circle'></i>
            <span>request for help</span>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-link collapsed'>
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
          <h1>Help Receiver Dashboard</h1>
        </header>
       <>
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.tableHeaderCell}>Task Name</th>
              <th className={classes.tableHeaderCell}>Description</th>
              <th className={classes.tableHeaderCell}>Volunteer Assigned</th>
              <th className={classes.tableHeaderCell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td className={classes.tableCell}>{task.name}</td>
                <td className={classes.tableCell}>{task.description}</td>
                <td className={classes.tableCell}>{task.volunteer}</td>
                <td className={classes.tableCell}>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
       </>

      <>
      Name : {users.firstName} {users.lastName}  <br/>
      Email : {users.email} <br/>
      Phone Number : {users.phoneNumber} <br/>
      Aadhar Number : {users.aadharNumber} <br/>
      </>
      </div>
    </div>
  );
};

export default HelpReceiverDashboard;
