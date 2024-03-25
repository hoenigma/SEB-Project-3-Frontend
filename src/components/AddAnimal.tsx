import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddAnimal() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    image: "",
    type: "",
    topTip: "",
    dietary: "",
    continent: "",
    funFact: "",
    conservation: "",
  });

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const resp = await axios.post("/api/animals", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(resp.data);
    navigate("/animals");
  }

  console.log(formData);

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Animal Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"name"}
                onChange={handleChange}
                value={formData.name}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Species</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"species"}
                onChange={handleChange}
                value={formData.species}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"image"}
                onChange={handleChange}
                value={formData.image}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Type</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"image"}
                onChange={handleChange}
                value={formData.image}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Top Tip</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"topTip"}
                onChange={handleChange}
                value={formData.topTip}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Dietary</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"dietary"}
                onChange={handleChange}
                value={formData.dietary}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Continent</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"continent"}
                onChange={handleChange}
                value={formData.continent}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Fun Fact</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"funFact"}
                onChange={handleChange}
                value={formData.funFact}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Conservation</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"conservation"}
                onChange={handleChange}
                value={formData.conservation}
              />
            </div>
          </div>
          <button className="button">Submit</button>
        </form>
      </div>
    </div>
  );
}
