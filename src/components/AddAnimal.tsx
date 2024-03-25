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
    console.log(token);
    console.log(formData);
    const resp = await axios.post("/api/animals", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("resp", resp.data);
    navigate("/animals");
  }

  // console.log("this is form", formData);

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
            <div className="dropdown is-active">
              <div className="dropdown-trigger">
                <div className="dropdown is-active">
                  <div className="dropdown-trigger">
                    <div className="select">
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value={""}>Select an option</option>
                        <option value="Land">Land</option>
                        <option value="Water">Water</option>
                        <option value="Domestic">Domestic</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
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
            <div className="dropdown is-active">
              <div className="dropdown-trigger">
                <div className="dropdown is-active">
                  <div className="dropdown-trigger">
                    <div className="select">
                      <select
                        name="dietary"
                        value={formData.dietary}
                        onChange={handleChange}
                      >
                        <option value={""}>Select an option</option>
                        <option value="Carnivore">Carnivore</option>
                        <option value="Herbivore">Herbivore</option>
                        <option value="Omnivore">Omnivore</option>
                        <option value="Insectivore">Insectivore</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Continent</label>
            <div className="dropdown is-active">
              <div className="dropdown-trigger">
                <div className="dropdown is-active">
                  <div className="dropdown-trigger">
                    <div className="select">
                      <select
                        name="continent"
                        value={formData.continent}
                        onChange={handleChange}
                      >
                        <option value={""}>Select an option</option>
                        <option value="Africa">Africa</option>
                        <option value="Australia">Australia</option>
                        <option value="Asia">Asia</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Europe">Europe</option>
                        <option value="Antarctica">Antarctica</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
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
            <div className="dropdown is-active">
              <div className="dropdown-trigger">
                <div className="dropdown is-active">
                  <div className="dropdown-trigger">
                    <div className="select">
                      <select
                        name="conservation"
                        value={formData.conservation}
                        onChange={handleChange}
                      >
                        <option value={""}>Select an option</option>
                        <option value="Least Concerned (LC)">
                          Least Concerned (LC)
                        </option>
                        <option value="Near Threatened (NT)">
                          Near Threatened (NT)
                        </option>
                        <option value="Vulnerable (VU)">Vulnerable (VU)</option>
                        <option value="Endangered (EN)">Endangered (EN)</option>
                        <option value="Critically Endangered (CE)">
                          Critically Endangered (CE)
                        </option>
                        <option value="Extinct in the Wild (EW)">
                          Extinct in the Wild (EW)
                        </option>
                        <option value="Extinct (EX)">Extinct (EX)</option>
                        <option value="N/A">N/A</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="button">Submit</button>
        </form>
      </div>
    </div>
  );
}
