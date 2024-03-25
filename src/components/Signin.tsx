import React from "react";
import { SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const resp = await axios.post("/api/signup", formData);
      console.log(resp.data);
      navigate("/login");
    } catch (e: any) {
      setErrorData(e.response.data.errors);
    }
  }

  return (
    <div className="section">
      <div className="container">
        {/* function for clicking submit */}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"username"}
                //function to handle typing changes
                onChange={handleChange}
                value={formData.username}
              />
              {/* error handeling, show text from error messaging */}
              {errorData.username && (
                <small className="has-text-danger">{errorData.username}</small>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"email"}
                onChange={handleChange}
                value={formData.email}
              />
              {errorData.email && (
                <small className="has-text-danger">{errorData.email}</small>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name={"password"}
                onChange={handleChange}
                value={formData.password}
              />
              {errorData.password && (
                <small className="has-text-danger">{errorData.password}</small>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name={"passwordConfirmation"}
                onChange={handleChange}
                value={formData.passwordConfirmation}
              />
              {errorData.passwordConfirmation && (
                <small className="has-text-danger">
                  {errorData.passwordConfirmation}
                </small>
              )}
            </div>
          </div>
          <button className="button">Submit</button>
        </form>
      </div>
    </div>
  );
}
