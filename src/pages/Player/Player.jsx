import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    type: "",
    published_at: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDBmYjM2MDUxYzEzMmFmMzY4N2M2MjRkMTI4YzkwMSIsIm5iZiI6MTczMDk3ODY4NC45MDA3Nzk1LCJzdWIiOiI2NzJjNTQ2YTQyYmVjNDk4Nzc4MDk5NGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dSP3tMf8eIaJr_T3PyzD4--4WbmcfQ3hSEVQB-Zz3J4",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-2)}} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="Trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
