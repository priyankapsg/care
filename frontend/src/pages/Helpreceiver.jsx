import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

const users = Yup.object().shape({
  age: Yup.string().required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  timeduration: Yup.string().required("Time Duration is required")
});

const HelpRequestForm = () => {
  let { id } = useParams();
  return (
    <div>
  <div class="box-form">
    <div className='right'>
    <Formik
      initialValues={{
        user_id : id,
        age: "",
        gender: "",
        address: "",
        city: "",
        timeduration: ""
      }}
      validationSchema={users}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await axios.post(`http://localhost:5000/api/user/help`, values);
          if(response.status === 200){
            toast.success(response.data.msg);
            setTimeout(() => {
            window.location.reload();  
            }, 2000);
          } else {
            toast.error(response.data.msg);
          }
        } catch (error) {
          toast.error(error.response.data.msg);
        } finally {
          setSubmitting && setSubmitting(false);
        }
      }}
    >
      <Form>
      <div class="inputs">
        <div>
          <label>Age:</label>
          <Field type='text' name='age' />
          <ErrorMessage
            name='age'
            component='div'
            style={{ color: "red" }}
          />
        </div>
        <div>
          <label>Gender:</label>
          <Field type='text' name='gender' />
          <ErrorMessage
            name='gender'
            component='div'
            style={{ color: "red" }}
          />
        </div>
        <div>
          <label>Address:</label>
          <Field type='text' name='address' />
          <ErrorMessage
            name='address'
            component='div'
            style={{ color: "red" }}
          />
        </div>
        <div>
          <label>City:</label>
          <Field type='text' name='city' />
          <ErrorMessage
            name='city'
            component='div'
            style={{ color: "red" }}
          />
        </div>
        <div>
          <label>Time Duration:</label>
          <Field type='text' name='timeduration' />
          <ErrorMessage
            name='timeduration'
            component='div'
            style={{ color: "red" }}
          />
        </div>
        <>
        <button type='submit'>Submit</button>
        </>
        </div>
      </Form>
    </Formik>
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
          <div className='sidebar-brand-text mx-3'>Welcome Help Receiver Dashboard</div>
        </div>
        <li className='nav-item active'>
          <div className='nav-link'>
            <i className='fas fa-fw fa-tachometer-alt'></i>
            <span>Dashboard</span>
          </div>
        </li>
        <li className='nav-item'>
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
        <div className='sectionContainer'>
        <div className='travelersContainer grid'>
          {travelers.map(({ id, destinationImage, serviceName }) => (
            <div key={id} className='singleService' onClick={() => { 
              setShowProfile(false); 
              setShowServices(false); 
              setShowTask(false);
              setShowForm(true);
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
