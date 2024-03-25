import React from "react";
import Animal from "./AnimalCard";
import { IAnimal } from "../interfaces/animal";
import { Link } from "react-router-dom";

type Animals = null | Array<IAnimal>;

function AllAnimals() {
  const [animals, setAnimals] = React.useState<Animals>(null);
  React.useEffect(() => {
    async function fetchAnimals() {
      const resp = await fetch("/api/animals");
      const data = await resp.json();
      console.log(data);
      setAnimals(data);
    }
    fetchAnimals();
  }, []);

  console.log(animals);

  return (
    <>
      <section className="section is-flex is-flex-direction-column">
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
            {animals?.map((animal) => {
              return <Animal key={animal._id} {...animal} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default AllAnimals;
