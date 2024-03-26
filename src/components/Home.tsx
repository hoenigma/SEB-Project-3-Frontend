import React from "react";

function Home() {
  React.useEffect(() => {
    console.log("The Home Page has mounted");
  }, []);
  return (
    <section className="section home m-0">
      <section className="hero is-fullheight is-justify-content-center">
        <div className="hero-body has-text-centered is-flex-direction-column p-6 is-align-self-center">
          <p className="title is-size-1 has-text-dark m-4">
            Welcome to your library of Animals
          </p>
          <p className="subtitle is-size-4 has-text-dark m-4">
            Dive into a world of your favourite animals and find out something
            you never knew you wanted to know
          </p>
        </div>
      </section>
    </section>
  );
}
export default Home;
