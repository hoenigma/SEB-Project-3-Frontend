import { Link, useLinkClickHandler } from "react-router-dom";
import { IAnimal } from "../interfaces/animal";
import React from "react";

function Animal({
  _id,
  name,
  image,
  species,
  type,
  topTip,
  dietary,
  continent,
  funFact,
  conservation,
  user,
}: IAnimal) {
  const [like, setLikes] = React.useState(0);

  function likeButton() {
      setLikes(like + 1);
  }

  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`/Animal/${_id}`}>
        <div className="card">
          <div className="card-header is-justify-content-space-between p-4">
            <div className="subtitle is-6">{name}</div>
            <div className="title is-7 is-align-content-center is-uppercase">
              {type}
            </div>
          </div>
          <figure className="image is-1by1">
            <img src={image} alt={name} />
          </figure>
          <div className="card-content p-4">
            <div className="is-flex is-flex-direction-column">
              <p className="has-text-weight-bold is-size-6 is-uppercase">
                Did you know?
              </p>
              <div className="is-max-height custom-height is-clipped">
                {funFact}
              </div>
            </div>
            <span className="icon-text is-pulled-right pt-6 underline-hover">
              <span>Find out more </span>
              <span className="icon">
                <i className="fa fa-arrow-right"></i>
              </span>
            </span>
          </div>
        </div>
      </Link>
       <div className="level">
        <div className="level-left">
          <button className="button is-ghost" onClick={likeButton}>❤️</button>
          <span className="has-text-weight-bold has-text-danger">{like}</span>  
        </div>
      </div>
    </div>
  );

  

}



export default Animal;
