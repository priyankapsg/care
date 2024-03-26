import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";
import SimpleNavbar from "../components/SimpleNavbar";

const otpVerify = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  otp: Yup.string().required("OTP is required")
});

const Otp = () => {
const navigate = useNavigate();

  return (
    <div>
      <SimpleNavbar />
    <div className="box-form">
    <div className="left">
    <div className="overlay">
    <h2>OTP VERIFY</h2>
    <p>Unlock the door to endless possibilities. Sign in and embark on your journey.</p>
    </div>
    </div>
      <div className='right'>
      <Formik
      initialValues={{
        email: "",
        otp: "",
      }}
      validationSchema={otpVerify}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await axios.post(`http://localhost:5000/api/user/otp`, values);
          if (response.data.status === 'admin') {
            toast.success(response.data.msg);
            navigate("/login");
          } else {
            toast.success(response.data.msg);
            navigate("/home");
          }
        } catch (error) {
          toast.error(error.response.data.msg);
        } finally {
          setSubmitting && setSubmitting(false);
        }
      }}
    >
      <Form>
      <div className="inputs">
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
          <label>OTP:</label>
          <Field
            type={ 'text' }
            name='otp'
          />
          <ErrorMessage
            name='otp'
            component='div'
            style={{ color: "red", marginTop: "5px" }}
          />
        </div>
        <button type='submit'>Verify</button>
        </div>
      </Form>
    </Formik>
    </div>
    </div>
    </div>
  );
};

export default Otp;
