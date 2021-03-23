import React, { useState, useEffect } from "react";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { isAuthenticated } from "../helpers/auth";
import { Link, useHistory } from "react-router-dom";
import { ownersignup } from "../api/auth";

/**
 * @author
 * @function OwnerSignup
 **/

const OwnerSignup = () => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 2) {
      history.push("/owner/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 3) {
      history.push("/guest/dashboard");
    }
  }, [history]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  const {
    firstname,
    lastname,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  const handleChange = (evt) => {
    // console.log(evt);
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  /************************************
   *EVENT HANDLERS
   ************************************/

  const handleSubmit = (evt) => {
    evt.preventDefault();

    /************************************
     *CLIENT-SIDE VALIDATION*
     ************************************/

    if (
      isEmpty(firstname) ||
      isEmpty(lastname) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const { firstname, lastname, email, password } = formData;
      const data = { firstname, lastname, email, password };

      setFormData({ ...formData, loading: true });

      ownersignup(data)
        .then((response) => {
          console.log("Axios signup success: ", response);
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  /****************************
   * VIEWS
   ***************************/

  const showSignupForm = () => {
    return (
      <form className="ownerSignup-form" onSubmit={handleSubmit} noValidate>
        <p align="center"> Signup as an Owner to add your property </p>
        {/* firstname */}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user"></i>
            </span>
          </div>
          <input
            name="firstname"
            value={firstname}
            className="form-control"
            placeholder="First Name"
            type="text"
            onChange={handleChange}
          />
        </div>
        {/* lastname */}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user"></i>
            </span>
          </div>
          <input
            name="lastname"
            value={lastname}
            className="form-control"
            placeholder="Last Name"
            type="text"
            onChange={handleChange}
          />
        </div>
        {/* email */}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-envelope"></i>
            </span>
          </div>
          <input
            name="email"
            value={email}
            className="form-control"
            placeholder="Email address"
            type="email"
            onChange={handleChange}
          />
        </div>
        {/* password */}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
          </div>
          <input
            name="password"
            value={password}
            className="form-control"
            placeholder="Create password"
            type="password"
            onChange={handleChange}
          />
        </div>
        {/* password2 */}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
          </div>
          <input
            name="password2"
            value={password2}
            className="form-control"
            placeholder="Confirm password"
            type="password"
            onChange={handleChange}
          />
        </div>
        {/* signup button */}
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Signup
          </button>
        </div>
        {/* already have account */}
        <p className="text-center text-white">
          Already an Owner? <Link to="/ownerlogin">Login</Link>
        </p>
      </form>
    );
  };

  /****************************
   * RENDERER
   ***************************/

  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          {showSignupForm()}

          {/* {JSON.stringify(formData)} */}
        </div>
      </div>
    </div>
  );
};
export default OwnerSignup;
