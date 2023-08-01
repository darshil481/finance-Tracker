import React from 'react'
import { useFormik } from "formik";
import { RegisterSchema } from '../Schema';
import { Link, useNavigate } from "react-router-dom";
interface FormData {
  name:string;
  email: string;
  pass: string;
  cpass:string;

}
const initialValues: FormData = {
  name: "",
  email: "",
  pass: "",
  cpass: "",
};
const Register = () => {
    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
      initialValues: initialValues,
      validationSchema:RegisterSchema,
      onSubmit: (values) => {
        console.log(values);
        localStorage.setItem(
          values.email,
          JSON.stringify({ name: values.name, email: values.email,pass:values.pass})
        );
      },
    });
  return (
    <div>
      <form
        className="d-flex flex-column justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="mt-5 ">
          <h1>Register</h1>
        </div>
        <div className="form-outline d-flex flex-column justify-content-center align-items-center mt-3 w-100">
          <input
            type="text"
            className="form-control w-25"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          ></input>
          {errors.name && touched.name ? (
            <p className="text-danger">{errors.name}</p>
          ) : null}
        </div>
        {/* Email input */}
        <div className="form-outline d-flex flex-column justify-content-center align-items-center mt-3 w-100">
          <input
            type="text"
            className="form-control w-25"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          ></input>
          {errors.email && touched.email ? (
            <p className="text-danger">{errors.email}</p>
          ) : null}
        </div>
        {/* Password input */}
        <div className="form-outline  mt-3 w-100  d-flex flex-column justify-content-center align-items-center">
          <input
            type="password"
            className="form-control w-25"
            name="pass"
            placeholder="Password"
            value={values.pass}
            onChange={handleChange}
          />
          {errors.pass && touched.pass ? (
            <p className="text-danger">{errors.pass}</p>
          ) : null}
        </div>
        <div className="form-outline mb-4 mt-3 w-100  d-flex flex-column justify-content-center align-items-center">
          <input
            type="password"
            className="form-control w-25"
            name="cpass"
            placeholder="Conform Password"
            value={values.cpass}
            onChange={handleChange}
          />
          {errors.cpass && touched.cpass ? (
            <p className="text-danger">{errors.cpass}</p>
          ) : null}
        </div>
        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Register
        </button>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
}

export default Register