import React from "react";

function Home() {
  React.useEffect(() => {
    console.log("The Home Page has mounted");
  }, []);
  return (
    <section className="hero is-large">
      <div className="hero-body animal">
        <p className="title is-size-1 has-text-white m-4">
          Welcome to your library of Animals
        </p>
        <p className="subtitle is-size-4 has-text-white m-4">
          Dive into a world of your favourite animals and find out something you
          never knew you wanted to know
        </p>
      </div>
    </section>
  );
}
export default Home;
