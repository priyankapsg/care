import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";
import SimpleNavbar from "../components/SimpleNavbar";

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
  aadharNumber: Yup.string().required("Aadhar number is required"),
  role: Yup.string().required("please choose one"),
});

const Registerscreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFile(reader.result);
    }
    reader.error = error => {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <SimpleNavbar />
      <div class="box-form">
	<div class="left">
		<div class="overlay">
		<h2>REGISTER</h2>
		<p>Create your account and unlock a world of opportunities. Join us today and make your mark.</p>
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
            formData.append("file", file);

          const register = await axios.post(`http://localhost:5000/api/user/register`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
          
          if(register.status === 200){
            toast.success(register.data.msg);
            navigate("/login/otp");
            resetForm();
          } else {
            toast.error(register.data.msg);
          }
          } catch (error) {
            toast.error(error.response.data.msg);
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
                  <Field type='radio' name='role' value='help_reciever' />
                </label>
              </div>
              {errors.role && touched.role && (
                <p style={{ color: "red" }}>{errors.role}</p>
              )}
            </div>
            <div>
              <label>Document:</label>
              <Field type='file' accept="image/*" name="file" onChange={handleFileChange} />
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
