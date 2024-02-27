import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosService from "../utils/ApiService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string().max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Make it More Strong"
    ),
  aadharNumber: Yup.string().required("Aadhar number is required"),
});

const Registerscreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='SignUp'>
      <h2>REGISTER</h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          aadharNumber: "",
          role: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("password", values.password);
            formData.append("aadharNumber", values.aadharNumber);
            formData.append("role", values.role);
            // Append document file if needed: formData.append("document", values.document);

            const response = await AxiosService.post("/user/signup", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            if (!response.data || !response.data.message) {
              throw new Error("An error occurred");
            }
            navigate("/login");
            resetForm();

            toast.success("Sign Up successful");
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
                  <Field type='radio' name='role' value='volunteer' />
                  Volunteer
                </label>
                <label>
                  <Field type='radio' name='role' value='helpReceiver' />
                  Help Receiver
                </label>
              </div>
              {errors.role && touched.role && (
                <p style={{ color: "red" }}>{errors.role}</p>
              )}
            </div>

            {/* Add file upload input if needed */}
            {/* <div>
              <label>Document:</label>
              <Field type='file' name='document' />
              {errors.document && touched.document && (
                <p style={{ color: "red" }}>{errors.document}</p>
              )}
            </div> */}

            

            <button type='submit'>register</button>

            <p>
              Already have an account? <Link to='/login'>login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registerscreen;
