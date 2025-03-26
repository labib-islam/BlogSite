import React from "react";
import homeImage from "../../assets/images/home-image.jpg";

import "./Home.css";

const Home = () => {
  return (
    <main className="page-home">
      <section className="landing-page">
        <section className="landing-page__content">
          <div className="home-text__container">
            <h1>
              A demo blog project showcasing web development using the MERN
              stack
            </h1>
            <button>Explore Blogs</button>
          </div>
          <div className="home-image__container">
            <img src={homeImage} alt="homepage-image" />
          </div>
        </section>
      </section>
      <section className="category-page">
        <section className="category-page__content">
          <header>Categories</header>
          <ul>
            <li>Tech</li>
            <li>Science</li>
            <li>Sport</li>
            <li>Business</li>
            <li>Travel</li>
            <li>Food</li>
          </ul>
        </section>
      </section>
    </main>
  );
};

export default Home;
