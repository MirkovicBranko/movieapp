import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import NoImg from "./NoImage.jpg";
import { Container } from "./NavBar";
import "../Styles/Videos.css";

function TvShows() {
  const { toggle, inputValue } = useContext(Container);
  const [showData, setShowData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState("");
  const Api = `https://api.themoviedb.org/3/discover/tv`;
  const Images = `https://image.tmdb.org/t/p/w500`;

  const TvShows = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: `ff6727e4261b1e9a9fe2775707fc759f`,
      },
    });
    const results = data.data.results;
    setShowData(results);
  };
  useEffect(() => {
    TvShows();
  }, []);

  const TvShowTitle = (shows) => {
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
          <AiOutlineClose //dodaje se dugme za exit
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
