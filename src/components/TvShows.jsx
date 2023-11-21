import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import NoImg from "./NoImage.jpg";
import { Container } from "./NavBar";
import "../Styles/Videos.css";
import TrailerTvShows from "../Trailers/TrailerTvShows";

function TvShows() {
  const { toggle, inputValue } = useContext(Container); // Access the 'toggle' state and search bar input value from the NavBar context
  const [showData, setShowData] = useState([]); // Store TV shows data from the API
  const input = inputValue; // Get the search input value
  const [trailer, setTrailer] = useState(true); // Control whether to show the trailer
  const [title, setTitle] = useState(""); // Store the title of the selected TV show
  const Shown = input ? "search" : "discover"; // Determine whether to show search results or discover TV shows
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`;
  const Images = `https://image.tmdb.org/t/p/w500`;

  const TvShows = async () => {
    // Fetch TV shows from the API
    const data = await axios.get(Api, {
      params: {
        api_key: `ff6727e4261b1e9a9fe2775707fc759f`,
        query: input,
      },
    });
    const results = data.data.results;
    setShowData(results);
  };

  useEffect(() => {
    // Fetch TV shows when the component mounts or when the search input changes
    TvShows();
  }, [input]);

  const TvShowTitle = async (shows) => {
    setTitle(shows.name);
    setTrailer(!trailer);
  };

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {showData.map((shows) => {
            return (
              <Fragment key={shows.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color="#fff"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => TvShowTitle(shows)}
                  />
                  <img
                    src={
                      shows.poster_path
                        ? `${Images}${shows.poster_path}`
                        : NoImg
                    }
                    alt=""
                    onClick={() => TvShowTitle(shows)}
                  />
                  <h3
                    id={shows.name.length > 28 ? "smaller-Text" : ""}
                    className={toggle ? "mainColor" : "secondaryColor"}
                  >
                    {shows.name}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? (
            console.log()
          ) : (
            <TrailerTvShows TvShowsTitle={title} toggle={toggle} />
          )}
          <AiOutlineClose
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DarkTheme" : "LightThemeClose"}
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

export default TvShows;
