import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import Sideb from '../components/Sideb';

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

const apiUrl = 'http://localhost:5000/api/tasks'; // Change this API URL to the appropriate endpoint for Help Receiver tasks

const HelpReceiverDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks data from API
    const fetchTasks = async () => {
      try {
        const response = await axios.get(apiUrl);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sideb />
      <div className={classes.content}>
        <header className={classes.header}>
          <h1>volunteer Dashboard</h1>
        </header>

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
      </div>
    </div>
  );
};

export default HelpReceiverDashboard;
