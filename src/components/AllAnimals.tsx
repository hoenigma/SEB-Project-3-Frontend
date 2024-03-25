import React from "react";
import Animal from "./AnimalCard";
import { IAnimal } from "../interfaces/animal";
import { Link } from "react-router-dom";

type Animals = null | Array<IAnimal>;

function AllAnimals() {
  const [animals, setAnimals] = React.useState<Animals>(null);
  const [search, setSearch] = React.useState("")


  React.useEffect(() => {
    async function fetchAnimals() {
      const resp = await fetch("/api/animals");
      const data = await resp.json();
      console.log(data);
      setAnimals(data);
    }
    fetchAnimals();
  }, []);

  function handleChange(e: any) {
  setSearch(e.currentTarget.value)
}

function filterAnimals() {
  return animals?.filter(animal => {
    return animal.name.toLowerCase().includes(search.toLowerCase())
  })
}

  console.log(animals);

  return (
    <>
      <section className="section is-flex is-flex-direction-column">
      <div className="container">
      <div className="searchbar">
      <input id="searchBar"
      className="input is-normal"
      placeholder="Search for an Animal"
      onChange={handleChange}
      value={search}
      />
      </div>
    </div>
        <span className="is-flex my-5">
          <Link to="/addanimal">
            <button className="button">
              Add Animal
              <span className="icon ml-1">
                <i className="fa fa-plus"></i>
              </span>
            </button>
          </Link>
        </span>
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
