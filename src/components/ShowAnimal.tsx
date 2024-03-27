import React, { SyntheticEvent } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import AnimalCard from "./AnimalCard";
import { IAnimal } from "../interfaces/animal";
import { IUser } from "../interfaces/user";
import axios from "axios";

function ShowAnimal({ user }: { user: null | IUser }) {
  const [animal, updateAnimal] = React.useState<IAnimal | null>(null);
  const { animalId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchAnimal() {
      const resp = await fetch(`/api/animals/${animalId}`);

      const animalData = await resp.json();
      updateAnimal(animalData);
      console.log("this is the", animalData);
    }
    fetchAnimal();
  }, []);

  async function deleteAnimal(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      console.log(animalId);
      await axios.delete("/api/animals/" + animalId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/animals");
    } catch (e: any) {
      console.log(e.response.data);
    }
  }

  if (!animal) {
    return <p>Animal Loading...</p>;
  }
  return (
    <section className="section hero is-flex is-fullheight is-justify-content-space-around mx-6 is-centered">
      <div className="is-flex is-justify-content-space-between">
        <div className="mx-6">
          <h2 className="is-size-1 pl-3 has-text-light has-text-weight-medium">
            {animal.name}
          </h2>
          <p className="is-uppercase is-size-5 pb-3 pl-4 has-text-weight-bold has-text-light">
            {animal.type}
          </p>
        </div>

        {animal && user && (
          <Link to={`/${animal._id}/posts`}>
            {" "}
            <button className="button community mr-6">
              {animal.name} Community Posts
            </button>{" "}
          </Link>
        )}
      </div>
      <div className="columns is-multiline mx-6">
        <div className="column is-two-fifths">
          <figure className="image is-1by1 mt-2 ml-1">
            <img
              className="custom-border-radius"
              src={animal.image}
              alt={animal.name}
            />
          </figure>
        </div>
        <div className="column is-two-third">
          <div className="content">
            <div>
              <div className="container is-flex pb-4 pt-2">
                <p className="is-uppercase has-text-weight-bold has-text-light custom-min-width is-size-6">
                  Species
                </p>
                <p className="has-text-light is-size-6">{animal.species}</p>
              </div>
              <div className="container is-flex pb-4">
                <p className="is-uppercase has-text-weight-bold has-text-light custom-min-width is-size-6">
                  Dietary
                </p>
                <p className="has-text-light is-size-6">{animal.dietary}</p>
              </div>
              <div className="container is-flex pb-4">
                <p className="is-uppercase has-text-weight-bold has-text-light custom-min-width is-size-6">
                  Continent
                </p>
                <p className="has-text-light is-size-6">{animal.continent}</p>
              </div>
              <div className="container is-flex pb-4">
                <p className="is-uppercase has-text-weight-bold has-text-light custom-min-width is-size-6">
                  Fun Fact
                </p>
                <p className="has-text-light is-size-6">{animal.funFact}</p>
              </div>
              <div className="container is-flex pb-4">
                <p className="is-uppercase has-text-weight-bold has-text-light custom-min-width is-size-6">
                  Top Tip
                </p>
                <p className="has-text-light is-size-6">{animal.topTip}</p>
              </div>
            </div>
            <div className="container is-flex mt-6">
              <p className="is-uppercase has-text-weight-bold has-text-light custom-min-width is-size-6">
                Conservation
              </p>
              <p className="has-text-light is-size-3">{animal.conservation}</p>
            </div>
            <div className="is-pulled-right">
              {" "}
              {animal && user && user._id === animal.user && (
                <Link to={`/animals/${animal._id}`}>
                  <button className="button is-light is-outlined mr-4">
                    Update {animal.name}
                  </button>{" "}
                </Link>
              )}
              {animal && user && user._id === animal.user && (
                <button onClick={deleteAnimal} className="button is-danger">
                  Delete {animal.name}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowAnimal;
