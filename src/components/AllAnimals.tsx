import React from "react";
import Animal from "./AnimalCard";
import { IAnimal } from "../interfaces/animal";
import { Link } from "react-router-dom";

type Animals = null | Array<IAnimal>;

function AllAnimals() {
  const [animals, setAnimals] = React.useState<Animals>(null);
  const [search, setSearch] = React.useState("");
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    async function fetchAnimals() {
      const resp = await fetch("/api/animals");
      const data = await resp.json();
      // console.log(data);
      setAnimals(data);
    }
    fetchAnimals();
  }, []);

  React.useEffect(() => {
    async function fetchAnimal() {
      const resp = await fetch(`/api/animals?type=${value}`);
      const animalData = await resp.json();
      setAnimals(animalData);
    }
    fetchAnimal();
  }, [value]);

  function handleChange(e: any) {
    setSearch(e.currentTarget.value);
  }

  function handleAnimalChange(e: any) {
    setValue(e.currentTarget.value);
  }

  function filterAnimals() {
    return animals?.filter((animal) => {
      return (
        (search === "" ||
          animal.name.toLowerCase().includes(search.toLowerCase())) &&
        (value === "" || animal.type.includes(value))
      );
    });
  }

  console.log(animals);

  return (
    <>
      <section className="section is-flex is-flex-direction-column">
        <div className="columns is-multicolumn">
          <div className="container is-widescreen">
            <div className="searchbar column is-half is-pulled-left">
              <input
                id="searchBar"
                className="input is-normal"
                placeholder="Search for an Animal"
                onChange={handleChange}
                value={search}
              />
            </div>
            <div className="field column is one-quarter">
              <div className="dropdown is-active">
                <div className="dropdown-trigger">
                  <div className="dropdown is-active">
                    <div className="dropdown-trigger">
                      <div className="select is-hovered">
                        <select
                          name="type"
                          value={value}
                          onChange={handleAnimalChange}
                        >
                          <option value={""}>Select type</option>
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
          </div>
          <span className="is-flex mt-3">
            <Link to="/addanimal">
              <button className="button is-light is-outlined mr-4">
                Add Animal
                <span className="icon ml-1">
                  <i className="fa fa-plus"></i>
                </span>
              </button>
            </Link>
          </span>
        </div>

        <div className="container">
          <div className="columns is-multiline">
            {filterAnimals()?.map((animal) => {
              return <Animal key={animal._id} {...animal} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default AllAnimals;
