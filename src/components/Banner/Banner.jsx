import React, { useEffect, useState } from "react";
import axios from "../../utilis/axios";
import requests from "../../utilis/requests";

import "./banner.css";

const Banner = () => {
  const [movie, setmovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const result = request.data.results;
        console.log(result);
        setmovie(result[Math.floor(Math.random() * result.length)]);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
    
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  console.log(movie);
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_buttons play">Play</button>
          <button className="banner_buttons list"> My List</button>
        </div>
        <h1 className="banner_descripition">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
