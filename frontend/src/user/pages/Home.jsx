import React, { useEffect, useState } from "react";
import homeImage from "../../assets/images/home-image.jpg";

import "./Home.css";
import axios from "axios";
import { Link } from "react-router";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorCard from "../../shared/components/ErrorCard";

const Home = () => {
  const [loadedCategories, setLoadedCategories] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const responseData = await axios.get(`/api/category`);
      setLoadedCategories(responseData.data.categories);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      setError(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorCard error={error} />}
      {loadedCategories && (
        <main className="page-home">
          <section className="landing-page">
            <section className="landing-page__content">
              <div className="home-text__container">
                <h1>
                  A demo blog project showcasing web development using the MERN
                  stack
                </h1>
                <Link to="/blogs">Explore Blogs</Link>
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
                      <Link to="/blogs" state={{ category: cat.category }}>
                        {cat.category}
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          </section>
        </main>
      )}
    </>
  );
};

export default Home;
