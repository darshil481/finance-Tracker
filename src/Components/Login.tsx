import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../Schema";
import { UserContext } from "../App";


interface FormData {
  email: string;
  pass: string;
}
const initialValues: FormData = {
  email: "",
  pass: "",
};

const Login = () => {
 const {details, setDetails} = useContext(UserContext);
 const { e, p } = details;
  const navigate = useNavigate();
  const [x, setX] = useState(false);
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      let a = JSON.parse(localStorage.getItem(values.email) || "{}");
      if (a.pass == values.pass) {
        console.log(values)
        setDetails({e:values.email,p:values.pass});
        navigate("/dashboard");
      } else {
        setX(true);
      }
    },
  });

  return (
    <>
      <form
        className="d-flex flex-column justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="mt-5 ">
          <h1>Login</h1>
        </div>
        {x ? (
          <p className="text-danger">Invalid userName or Password !!</p>
        ) : null}
        <div className="form-outline d-flex flex-column justify-content-center align-items-center mt-3 w-100">
          <input
            type="text"
            id="form2Example1"
            className="form-control w-25"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email ? (
            <p className="text-danger">{errors.email}</p>
          ) : null}
        </div>
        {/* Password input */}
        <div className="form-outline mb-4 mt-3 w-100  d-flex flex-column justify-content-center align-items-center">
          <input
            type="password"
            id="form2Example2"
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
        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
        <Link to="/register">Register</Link>
      </form>
    </>
  );
};

export default Login;
