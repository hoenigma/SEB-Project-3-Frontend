import { Link } from "react-router-dom"

function Animal({ _id, name, image }) {
  return <div className="column is-one-quarter-desktop is-one-third-tablet">
    <Link to={`/Animal/${_id}`}>
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">{name}</div>
        </div>
        <div className="card-image">
          <figure className="image image-is-1by1">
            <img src={image} alt={name} />
          </figure>
        </div>
        <div className="card-content">
        </div>
      </div>
    </Link>
  </div>
}

export default Animal