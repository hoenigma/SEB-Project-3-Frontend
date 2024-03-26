import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Community() {
  const navigate = useNavigate();
  const { animalId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    post: "",
    date: "",
    time: "",
  });

  const [errorData, setErrorData] = useState({
    title: "",
    post: "",
    date: "",
    time: "",
  });

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
    setErrorData({
    title: "",
    post: "",
    date: "",
    time: "",
  })
  }

  async function handleSubmit(e: SyntheticEvent) {
    try {
     e.preventDefault()
      const token = localStorage.getItem("token");
      console.log(token);
      console.log(formData);
      const resp = await axios.post(`/api/${animalId}/posts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("resp", resp.data);
      navigate(`/${animalId}/posts`);
      setFormData({
    title: "",
    post: "",
    date: "",
    time: "",
  });
    } catch (e: any) {
      setErrorData(e.response.data.errors);
    }
  }

  return (
    <>
      <button className="button"> Delete Post </button>
      <button className="button"> Update Post </button>
      <div className="section">
        <div className="container add is-max-desktop custom-border-radius p-6">
          <form onSubmit={handleSubmit}>
            <div className="title is-size-2 pl-1 mb-5">Add Post</div>

            <div className="field">
              <label className="label">Title of Post</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name={"title"}
                  //function to handle typing changes
                  onChange={handleChange}
                  value={formData.title}
                />
                {errorData.title && (
                  <small className="has-text-danger">{errorData.title}</small>
                )}
              </div>
            </div>

            <div className="field">
              <label className="label">What do you want to say?</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name={"post"}
                  //function to handle typing changes
                  onChange={handleChange}
                  value={formData.post}
                />
                {errorData.post && (
                  <small className="has-text-danger">{errorData.post}</small>
                )}
              </div>
            </div>

            <div className="columns is-multiline p-1 mb-0">
              <div className="field column">
                <label className="label">Date</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name={"date"}
                    onChange={handleChange}
                    value={formData.date}
                  />
                  {errorData.date && (
                    <small className="has-text-danger">{errorData.date}</small>
                  )}
                </div>
              </div>
              <div className="field column">
                <label className="label">Time</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name={"time"}
                    onChange={handleChange}
                    value={formData.time}
                  />
                  {errorData.time && (
                    <small className="has-text-danger">{errorData.time}</small>
                  )}
                </div>
              </div>
            </div>
            <button className="button"> Add Post </button>
          </form>
        </div>
      </div>
    </>
  );
}
