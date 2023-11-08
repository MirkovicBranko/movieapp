import axios from "axios";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { Container } from "./NavBar";
import { AiOutlineClose, AiFillPlayCircle } from "react-icons/ai";
import NoImg from "../components/NoImage.jpg";
import "../Styles/Videos.css";
import TrailerTrending from "../Trailers/TrailerTrending";

function Trends() {
  // Access the 'toggle' state from the context provided by the NavBar component
  const { toggle } = useContext(Container);
  const Api = `https://api.themoviedb.org/3/`;
  const TrendsShown = `/trending/all/week`;
  const [trendArray, setTrendArray] = useState([]); // Store trending movies and TV shows
  const [trendTitle, setTrendTitle] = useState(""); // Store the title of the selected trend
  const [trailer, setTrailer] = useState(true); // Control whether to show the trailer
  const Images = `https://image.tmdb.org/t/p/w500`;

  // Function to fetch trending movies and TV shows from the API
  const Trends = async () => {
    const data = await axios.get(`${Api}${TrendsShown}`, {
      params: {
        api_key: `ff6727e4261b1e9a9fe2775707fc759f`,
      },
    });
    const results = data.data.results;
    setTrendArray(results);
  };

  useEffect(() => {
    // Fetch trending content when the component mounts
    setTimeout(() => {
      Trends();
    }, 100);
  }, []);

  // Function to handle the selection of a trend for viewing the trailer
  const TrendTitle = (trend) => {
    setTrendTitle(trend.title);
    setTrailer(!trailer);
  };

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {trendArray.map((trend) => (
            <Fragment key={trend.id}>
              <div id={trailer ? "container" : "NoContainer"}>
                <AiFillPlayCircle
                  color="#fff"
                  fontSize={40}
                  id={trailer ? "playIcon" : "hide"}
                  onClick={() => TrendTitle(trend)}
                />
                <img
                  src={
                    trend.poster_path ? `${Images}${trend.poster_path}` : NoImg
                  }
                  alt=""
                  onClick={() => TrendTitle(trend)}
                />
                <h3
                  id="smaller-Text"
                  className={toggle ? "mainColor" : "secondaryColor"}
                >
                  {trend.title}
                </h3>
              </div>
            </Fragment>
          ))}
          {trailer ? (
            console.log()
          ) : (
            <TrailerTrending TrendTitle={trendTitle} toggle={toggle} />
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

export default Trends;
