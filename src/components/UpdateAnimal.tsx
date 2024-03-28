import React, { SyntheticEvent, useState } from "react";
import axios, { formToJSON } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../config";

export default function UpdateAnimal() {
  const navigate = useNavigate();
  const { animalId } = useParams();

   React.useEffect(() => {
    async function fetchAnimal() {
      const resp = await fetch(`${baseUrl}/animals/${animalId}`);

      const animalData = await resp.json();
      setFormData(animalData);
      // console.log("this is the", animalData);
    }
    fetchAnimal();
  }, [animalId]);


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

  console.log(formData)

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    // console.log(newFormData)
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    const resp = await axios.put(`${baseUrl}/animals/${animalId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("resp", resp.data);
    navigate("/animals");
  }

  return (
    <div className="section">
      <div className="container add is-max-desktop custom-border-radius p-6">
        <form onSubmit={handleSubmit}>
          <div className="title is-size-2 pl-1 mb-5">Update</div>
          <div className="columns is-multiline p-1 mb-0">
            <div className="field column">
              <div className="control has-icons-right">
                <input
                  className="input"
                  placeholder="Name"
                  type="text"
                  name={"name"}
                  onChange={handleChange}
                  value={formData.name}
                />
                <span className="icon is-small is-right">
                  <i className="fas fa-paw"></i>
                </span>
              </div>
            </div>
            <div className="field column">
              <div className="control has-icons-right">
                <input
                  className="input"
                  placeholder="Species"
                  type="text"
                  name={"species"}
                  onChange={handleChange}
                  value={formData.species}
                />
                <span className="icon is-small is-right">
                  <i className="fas fa-hippo"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="field is-flex is-justify-content-space-between p-1">
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
          <div className="field is-flex is-justify-content-space-between p-1">
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
          <div className="field is-flex is-justify-content-space-between p-1 mb-3">
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

          <div className="field p-1">
            <div className="control has-icons-right">
              <input
                className="input"
                placeholder="Image url"
                type="text"
                name={"image"}
                onChange={handleChange}
                value={formData.image}
              />
              <span className="icon is-small is-right">
                <i className="fas fa-photo-film"></i>
              </span>
            </div>
          </div>

          <div className="field p-1 mt-1">
            <div className="control has-icons-right">
              <input
                className="input"
                placeholder="Top Tip"
                type="text"
                name={"topTip"}
                onChange={handleChange}
                value={formData.topTip}
              />
              <span className="icon is-small is-right">
                <i className="fas fa-lightbulb"></i>
              </span>
            </div>
          </div>

          <div className="field p-1 mt-1">
            <div className="control has-icons-right">
              <input
                className="input"
                placeholder="Fun Fact"
                type="text"
                name={"funFact"}
                onChange={handleChange}
                value={formData.funFact}
              />
              <span className="icon is-small is-right">
                <i className="fas fa-face-smile"></i>
              </span>
            </div>
          </div>
          <div className="field is-flex is-justify-content-space-between p-1 mt-1">
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
          <button className="button mt-6">Update</button>
        </form>
      </div>
    </div>
  );
}
