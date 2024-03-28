import React from "react";
import { SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

export default function Login({ fetchUser }: { fetchUser: Function }) {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");
  //for login just make the error a string, we dont want bad people knowing is a user exists

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
    setErrorMessage("");
  }

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      const resp = await axios.post(`${baseUrl}/login`, formData);
      localStorage.setItem("token", resp.data.token);
      console.log(resp.data);
      //we need to fetch the User
      fetchUser();
      //then navigate to the home page
      navigate("/");
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
    }
  }

  console.log(formData);

  return (
    <div className="hero is-flex is-fullheight is-justify-content-space-around">
      <div className="container login is-flex-grow-0 add is-max-desktop custom-border-radius p-6">
        <div className="title is-size-3 has-text-centered pl-1 mb-5">Login</div>
        <form onSubmit={handleSubmit}>
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
            </div>
          </div>
          <div className="field m-4 mx-4">
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
            </div>
            <div className="is-size-7 m-1 has-text-weight-semibold">
              Don't forget your 1 uppercase, 1 lowercase, 1 number and 1 symbol
            </div>
            {errorMessage && (
              <small className="has-text-danger">{errorMessage}</small>
            )}
          </div>
          <div className="is-flex is-justify-content-center">
            <button className="button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
