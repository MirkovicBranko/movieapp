import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { Container } from "./NavBar";
import "../Styles/Videos.css";
import NoImg from "./NoImage.jpg";
import axios from "axios";

function Movie() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [movieList, setMovieList] = useState([]);
  const Images = `https://image.tmdb.org/t/p/w500`;
  const [trailer, setTrailer] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");
  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
  const getMovie = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: `ff6727e4261b1e9a9fe2775707fc759f`,
        query: input,
      },
    });
    const results = data.data.results;
    setMovieList(results);
  };
  useEffect(() => {
    setTimeout(() => {
      getMovie();
    }, 100);
  }, [input]);
  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title);
    setTrailer(!trailer);
  };
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {movieList.map((movie, index) => {
            return (
              <Fragment key={movie.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color="white"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => MoviesTitle(movie)}
                  />
                  <img
                    src={
                      movie.poster_path
                        ? `${Images}${movie.poster_path}`
                        : NoImg
                    }
                    alt={movie.title}
                    onClick={() => MoviesTitle(movie)}
                  />
                  <h3 id={movie.title.length > 28 ? "smaller-Text" : ""}>
                    {movie.title}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          <AiOutlineClose //dodaje se dugme za exit
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DatkTheme" : "LightTheme"}
            fontSize={55}
            color="#fff"
            cursor={"pointer"}
            onClick={() => setTrailer(true)}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Movie;
