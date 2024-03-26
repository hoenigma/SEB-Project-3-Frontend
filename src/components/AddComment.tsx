import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IComment } from "../interfaces/comment";
import { IUser } from "../interfaces/user";

type Comments = null | Array<IComment>;

export default function Community({user}: {user: null|IUser}) {
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

  const [comments, setComments] = React.useState<IComment | null>(null);

  //handle change function, sees whats written in the fields
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
    });
  }

  //Handle submit fuinction, add comment to database
  async function handleSubmit(e: SyntheticEvent) {
    try {
    //   e.preventDefault();
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

  React.useEffect(() => {
    async function fetchComments() {
      const resp = await fetch(`/api/${animalId}/posts`);
      console.log(resp);
      const data = await resp.json();
      console.log(data);
      setComments(data);
    }
    fetchComments();
  }, []);

    async function deleteComment(e: any){
    try{
      const token = localStorage.getItem("token")
      console.log(token)

      const commentId = e.currentTarget.value

      console.log(commentId)
      await axios.delete("/api/posts/" + commentId, {
        headers: {Authorization: `Bearer ${token}`}
      })
      location.reload() 
    //   navigate('/animals')
    }catch (e:any){
      console.log(e.response.data)
    }
  }

  return (
    <>
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
                <textarea className="textArea">
                <input
                  className="input"
                  type="text"
                  name={"post"}
                  //function to handle typing changes
                  onChange={handleChange}
                  value={formData.post}
                />
                </textarea>
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

      <div className="section">
        <div className="container">
          <div className="columns is-multiline">
            {comments?.map((comment:any) => {
              return <div key ={comment._id}>
                <h3> {comment.title}</h3>
                <h4>{comment.post}</h4>
                <p>
                  {comment.date} {comment.time}
                </p>
                {comment && user && (user._id === comment.user) && <button onClick={deleteComment} value ={comment._id} className="button is-danger">Delete Post</button>}
              </div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
