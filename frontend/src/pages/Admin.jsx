import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh', // Set the height to fill the viewport
  },
  content: {
    flex: 1, // Allow the content to fill the available space
    overflowX: 'auto', // Enable horizontal scrolling if needed
  },
  // sidebar: {
  //   width: '20%',
  //   backgroundColor: '#f4f4f4',
  //   padding: '10px',
  // },
  // mainContent: {
  //   width: '80%', // Adjusted to 80% to accommodate sidebar
  //   padding: '10px',
  // },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
  },
  // footer: {
  //   backgroundColor: '#333',
  //   color: '#fff',
  //   padding: '10px',
  //   clear: 'both',
  //   textAlign: 'center',
  // },
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

const apiUrl = 'http://localhost:5000/api/user/getallusers';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);


  const handleApprove = async (email) => {
    try {
      const response = await axios.put('http://localhost:5000/api/user/update', { email, status: true });
      window.location.reload();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const classes = useStyles();
  return (
    // <div className='admin'>
    //   <div className='row'>
      
    <div className={classes.root}> 
    <Sidebar />
      {/* <div className={classes.sidebar}> */}
      {/* <div className='col content'> */}
        {/* <h2>Admin Panel</h2>
        <p>Username: Admin</p> */}
        {/* Add profile details here */}
        {/* <ul>
          <li>Manage Users</li>
          <li>Manage Issues</li>
          <li>Logout</li>
        </ul> */}
      {/* </div> */}
      <div className={classes.content}>
        <header className={classes.header}>
          <h1>Admin Dashboard</h1>
        </header>

        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.tableHeaderCell}>Name</th>
              <th className={classes.tableHeaderCell}>Email</th>
              <th className={classes.tableHeaderCell}>Phone Number</th>
              <th className={classes.tableHeaderCell}>Aadhar Number</th>
              <th className={classes.tableHeaderCell}>role</th>
              <th className={classes.tableHeaderCell}>Document</th>
              <th className={classes.tableHeaderCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className={classes.tableCell}>{user.firstName}</td>
                <td className={classes.tableCell}>{user.email}</td>
                <td className={classes.tableCell}>{user.phoneNumber}</td>
                <td className={classes.tableCell}>{user.aadharNumber}</td>
                <td className={classes.tableCell}>{user.role}</td>
                <td>
                <img src={user.file} alt='' style={{ width: '200px', height: '200px' }} />
                </td>
              {user.status === false ? 
                <td className={classes.tableCell}>
                  <button className={classes.button} onClick={() => handleApprove(user.email)}>Approve</button>
                </td>
              : 'Approved'}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>

  );
};

export default Admin;
