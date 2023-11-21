import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { Container } from "./NavBar";
import "../Styles/Videos.css";
import NoImg from "./NoImage.jpg";
import axios from "axios";
import TrailerMovies from "../Trailers/TrailerMovies";

function Movie() {
  // Using the useContext hook to access the 'toggle' and 'inputValue' from the 'Container' component
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;

  // State variables to manage the movie list, trailer visibility, selected movie title, and API URLs
  const [movieList, setMovieList] = useState([]);
  const Images = `https://image.tmdb.org/t/p/w500`;
  const [trailer, setTrailer] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");
  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`;

  // Function to fetch movies based on the input value
  const getMovie = async () => {
    try {
      const data = await axios.get(Api, {
        params: {
          api_key: `ff6727e4261b1e9a9fe2775707fc759f`,
          query: input,
        },
      });
      const results = data.data.results;
      setMovieList(results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  // Effect hook to fetch movies when the input value changes
  useEffect(() => {
    getMovie();
  }, [input]);

  // Function to handle the click on a movie, showing its trailer
  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title);
    setTrailer(!trailer);
  };

  return (
    <Fragment>
      {/* Main movie section */}
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {movieList.map((movie, index) => {
            return (
              <Fragment key={movie.id}>
                {/* Individual movie container */}
                <div id={trailer ? "container" : "NoContainer"}>
                  {/* Play icon for showing the trailer */}
                  <AiFillPlayCircle
                    color="white"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => MoviesTitle(movie)}
                  />
                  {/* Movie poster image */}
                  <img
                    src={
                      movie.poster_path
                        ? `${Images}${movie.poster_path}`
                        : NoImg
                    }
                    alt={movie.title}
                    onClick={() => MoviesTitle(movie)}
                  />
                  {/* Movie title */}
                  <h3 id={movie.title.length > 28 ? "smaller-Text" : ""}>
                    {movie.title}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {/* Conditional rendering of the trailer component */}
          {trailer ? (
            console.log() // You may want to replace this with actual content
          ) : (
            <TrailerMovies moviesTitle={movieTitle} toggle={toggle} />
          )}
          {/* Close button for the trailer */}
          <AiOutlineClose
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DarkTheme" : "LightTheme"}
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
