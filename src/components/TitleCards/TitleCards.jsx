import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application / json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDBmYjM2MDUxYzEzMmFmMzY4N2M2MjRkMTI4YzkwMSIsIm5iZiI6MTczMDk3ODY4NC45MDA3Nzk1LCJzdWIiOiI2NzJjNTQ2YTQyYmVjNDk4Nzc4MDk5NGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dSP3tMf8eIaJr_T3PyzD4--4WbmcfQ3hSEVQB-Zz3J4",
    },
  };
  const url = `https://api.themoviedb.org/3/movie/${category?category:'now_playing'}`;

  const handleWheel = (event) => {
    event.preventDefault();
    // Adjust the scroll speed based on the deltaMode
    const scrollAmount =
      event.deltaMode === 1
        ? (event.deltaY + event.deltaX) * 20
        : event.deltaY + event.deltaX;

    cardsRef.current.scrollLeft += scrollAmount;
  };

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.log(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt={card.original_title}
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
