import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";
import Navbar from "../components/Navbar";

const users = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string().max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Make it More Strong"
    // ) 
  aadharNumber: Yup.string().required("Aadhar number is required"),
  role: Yup.string().required("please choose one"),
});

const Registerscreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Navbar/>
      <div class="box-form">
	<div class="left">
		<div class="overlay">
		<h1>REGISTER</h1>
		<p>Create your account and unlock a world of opportunities. Join us today and make your mark.</p>
		<span>
			{/* <p>login with social media</p>
			<a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
			<a href="#"><i class="fa fa-twitter" aria-hidden="true"></i> Login with Twitter</a> */}
		</span>
		</div>
	</div>
    <div className='right'>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          aadharNumber: "",
          role: "",
        }}
        validationSchema={users}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("aadharNumber", values.aadharNumber);
            formData.append("role", values.role);
            formData.append("document", values.document);

            await axios.post(`http://localhost:5000/api/user/register`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then( (response) =>{
              toast.success("Sign Up successfully");
              navigate("/login");
              resetForm();
            }).catch ( (err) => {
              toast.error("Sign Up failed");
            })

          } catch (error) {
            setErrors({ general: error.message });
            toast.error("Sign Up failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div class="inputs">
            <div>
              <label>First Name:</label>
              <Field type='text' name='firstName' />
              {errors.firstName && touched.firstName && (
                <p style={{ color: "red" }}>{errors.firstName}</p>
              )}
            </div>

            <div>
              <label>Last Name:</label>
              <Field type='text' name='lastName' />
              {errors.lastName && touched.lastName && (
                <p style={{ color: "red" }}>{errors.lastName}</p>
              )}
            </div>

            <div>
              <label>Email:</label>
              <Field type='email' name='email' />
              {errors.email && touched.email && (
                <p style={{ color: "red" }}>{errors.email}</p>
              )}
            </div>
            <div>
              <label>Password:</label>
              <Field
                type={showPassword ? "text" : "password"}
                name='password'
              />
              {errors.password && touched.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </div>
            <div className='checkbox'>
              <input
                type='checkbox'
                id='showPassword'
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <p htmlFor='showPassword'>{showPassword ? "Hide Password" : "Show Password"}</p>
            </div>
            <div>
              <label>Phone Number:</label>
              <Field type='tel' name='phoneNumber' />
              {errors.phoneNumber && touched.phoneNumber && (
                <p style={{ color: "red" }}>{errors.phoneNumber}</p>
              )}
            </div>

           

            <div>
              <label>Aadhar Number:</label>
              <Field type='text' name='aadharNumber' />
              {errors.aadharNumber && touched.aadharNumber && (
                <p style={{ color: "red" }}>{errors.aadharNumber}</p>
              )}
            </div>

            <div>
              <label>Role:</label>
              <div>
                <label>
                  volunteer
                  <Field type='radio' name='role' value='volunteer' />
                </label>
                <label>
                  help receiver
                  <Field type='radio' name='role' value='helpReceiver' />
                </label>
                
              </div>
              {errors.role && touched.role && (
                <p style={{ color: "red" }}>{errors.role}</p>
              )}
            </div>

            {/* Add file upload input if needed */}
            <div>
              <label>Document:</label>
              <Field type='file' name='document' />
              {errors.document && touched.document && (
                <p style={{ color: "red" }}>{errors.document}</p>
              )}
            </div>

            

            <button class="button-88" type='submit'>register</button>

            <p>
              Already have an account? <Link to='/login'>login</Link>
            </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>
    </div>
  );
};

export default Registerscreen;
