import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../interfaces/user";

function Home({ user }: { user: null | IUser }) {
  React.useEffect(() => {
    console.log("The Home Page has mounted");
  }, []);
  return (
    <section className="section home m-0">
      <section className="hero is-fullheight is-justify-content-center">
        <div className="hero-body hometext has-text-centered is-flex-grow-0 custom-border-radius is-flex-direction-column is-align-self-center">
          <p className="title is-size-1 has-text-dark ">
            Join today and be part of a community like no other!
          </p>
          <p className="subtitle is-size-4 has-text-dark m-4">
            Embark on an adventure into a whimsical realm filled with your
            beloved animals! Chat with fellow animal enthusiasts, discover
            fascinating tidbits you never knew you craved, and even introduce
            new animals to the mix!
          </p>
          {!user && (
            <Link to="/signup">
              <button className="button community">Sign Up</button>
            </Link>
          )}
        </div>
      </section>
    </section>
  );
}
export default Home;
