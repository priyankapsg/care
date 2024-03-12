import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";
import SimpleNavbar from "../components/SimpleNavbar";

const users = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Loginscreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <SimpleNavbar />
    <div class="box-form">
    <div class="left">
    <div class="overlay">
    <h2>LOGIN</h2>
    <p>Unlock the door to endless possibilities. Sign in and embark on your journey.</p>
    </div>
    </div>
      <div className='right'>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={users}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await axios.post(`http://localhost:5000/api/user/login`, values);
            if (response.data.status === "admin") {
              toast.success(response.data.msg);
              navigate("/admin");
            } else if (response.data.status === "nonUser"){
              toast.success(response.data.msg);
              navigate("/home");
            } else if(response.data.status === "Volunteer"){
              toast.success(response.data.message);
              navigate(`/volunteer/${response.data.data}`);
            } else if(response.data.status === "Help Reciever"){
              toast.success(response.data.message);
              navigate(`/help_receiver/${response.data.data}`);
            } 
            resetForm && resetForm();
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
            <label>Email:</label>
            <Field type='email' name='email' />
            <ErrorMessage
              name='email'
              component='div'
              style={{ color: "red" }}
            />
          </div>
          <div>
            <label>Password:</label>
            <Field
              type={showPassword ? 'text' : 'password'}
              name='password'
            />
            <div className="checkbox">
              <input
                type='checkbox'
                id='showPassword'
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor='showPassword'>
                {showPassword ? "Hide Password" : "Show Password"}
              </label>
            </div>
            <ErrorMessage
              name='password'
              component='div'
              style={{ color: "red", marginTop: "5px" }}
            />
          </div>
          <button type='submit'>login</button>
          <p>
            Not registered yet? <Link to='/register'>Register here</Link>.
          </p>
          </div>
        </Form>
      </Formik>
    </div>
    </div>
    </div>
  );
};

export default Loginscreen;
