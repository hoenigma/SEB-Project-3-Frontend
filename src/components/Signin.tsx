import React from "react";
import { SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

export default function Signup() {
  //get useNavigate working
  const navigate = useNavigate();

  //useState for the typing
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  //useState for the error
  const [errorData, setErrorData] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  //function for handle change-gets the value of what is typed
  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  //function for handle submit-when click, check for errors on from and add to database
  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      const resp = await axios.post(`${baseUrl}/signup`, formData);
      console.log(resp.data);
      navigate("/login");
    } catch (e: any) {
      setErrorData(e.response.data.errors);
    }
  }

  return (
    <div className="hero is-flex is-fullheight is-justify-content-space-around">
      <div className="container login is-flex-grow-0 add is-max-desktop custom-border-radius p-6">
        <div className="title is-size-3 has-text-centered pl-1 mb-5">
          Sign up
        </div>
        {/* function for clicking submit */}
        <form onSubmit={handleSubmit}>
          <div className="field m-4">
            <div className="control has-icons-right">
              <input
                className="input"
                placeholder="Username"
                type="text"
                name={"username"}
                //function to handle typing changes
                onChange={handleChange}
                value={formData.username}
              />{" "}
              <span className="icon is-small is-right">
                <i className="fas fa-user"></i>
              </span>
              <div className="is-size-7 m-1 has-text-weight-semibold">
                Please make it unique
              </div>
              {/* error handeling, show text from error messaging */}
              {errorData.username && (
                <small className="has-text-danger">{errorData.username}</small>
              )}
            </div>
          </div>
          <div className="field m-4">
            <div className="control has-icons-right">
              <input
                className="input"
                placeholder="Email"
                type="text"
                name={"email"}
                onChange={handleChange}
                value={formData.email}
              />
              <span className="icon is-small is-right">
                <i className="fas fa-envelope"></i>
              </span>
              <div className="is-size-7 m-1 has-text-weight-semibold">
                Please use be a valid email
              </div>
              {errorData.email && (
                <small className="has-text-danger">{errorData.email}</small>
              )}
            </div>
          </div>
          <div className="field m-4">
            <div className="control has-icons-right">
              <input
                className="input"
                placeholder="Password"
                type="password"
                name={"password"}
                onChange={handleChange}
                value={formData.password}
              />
              <span className="icon is-small is-right">
                <i className="fas fa-lock"></i>
              </span>
              <div className="is-size-7 m-1 has-text-weight-semibold">
                Please include 1 uppercase, 1 lowercase, 1 number and 1 symbol
              </div>
              {errorData.password && (
                <small className="has-text-danger">{errorData.password}</small>
              )}
            </div>
          </div>
          <div className="fiel m-4">
            <div className="control has-icons-right">
              <input
                className="input"
                placeholder="Confirm Password"
                type="password"
                name={"passwordConfirmation"}
                onChange={handleChange}
                value={formData.passwordConfirmation}
              />
              <span className="icon is-small is-right">
                <i className="fas fa-lock"></i>
              </span>
              <div className="is-size-7 m-1 has-text-weight-semibold">
                Make sure it matches your password above
              </div>
              {errorData.passwordConfirmation && (
                <small className="has-text-danger">
                  {errorData.passwordConfirmation}
                </small>
              )}
            </div>
          </div>
          <div className="is-flex is-justify-content-center">
            <button className="button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
