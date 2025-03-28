import React, { useEffect, useState } from "react";
import homeImage from "../../assets/images/home-image.jpg";

import "./Home.css";
import axios from "axios";

const Home = () => {
  const [loadedCategories, setLoadedCategories] = useState();

  const fetchCategories = async () => {
    try {
      const responseData = await axios.get(`/api/category`);
      setLoadedCategories(responseData.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
            {loadedCategories &&
              loadedCategories.map((cat) => (
                <li
                  key={cat.category}
                  style={{ "--hover-shadow-color": cat.color }}
                >
                  {cat.category}
                </li>
              ))}
          </ul>
        </section>
      </section>
    </main>
  );
};

export default Home;
