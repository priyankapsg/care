import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";
import SimpleNavbar from "../components/SimpleNavbar";

// import { useUserContext } from "../context/UserContext";

const users = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Loginscreen = () => {
  const navigate = useNavigate();
//   const { setUserData } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <SimpleNavbar />
    <div class="box-form">
    <div class="left">
      <div class="overlay">
      <h1>LOGIN</h1>
      <p>Unlock the door to endless possibilities. Sign in and embark on your journey.</p>
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
          email: "",
          password: "",
        }}
        validationSchema={users}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            const response = await axios.post(`http://localhost:5000/api/user/login`, values);
            console.log("RESP", response);
            if (response.data.isAdmin === true) {
              toast.success("Login successfully");
              navigate("/admin");
            } else if (response.data.isAdmin === false && response.data.status === true){
              toast.success("Login successfully");
              navigate("/help_reciever");
            } else {
              toast.success(response.data.message);
              navigate("/home");
            }

            // toast.success(response.data.message, {
            //   position: toast.POSITION.BOTTOM_RIGHT,
            // });

            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem(
              "userData",
              JSON.stringify(response.data.userData)
            );
            setUserData(response.data.userData);
            resetForm && resetForm();
          } catch (error) {
            const errorMessage =
              error.response?.data.message || "An error occurred";

            setErrors({ general: errorMessage });
            toast.error("Signin failed", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
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
