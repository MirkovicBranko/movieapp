import axios from "axios";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { Container } from "./NavBar";
import { AiOutlineClose, AiFillPlayCircle } from "react-icons/ai";
import NoImg from "../components/NoImage.jpg";
import "../Styles/Videos.css";
import TrailerTrending from "../Trailers/TrailerTrending";

function Trends() {
  const { toggle } = useContext(Container);
  const Api = `https://api.themoviedb.org/3/`;
  const TrendsShown = `/trending/all/week`;
  const [trendArray, setTrendArray] = useState([]);
  const [trendTitle, setTrendTitle] = useState("");
  const [trailer, setTrailer] = useState(true);
  const Images = `https://image.tmdb.org/t/p/w500`;

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
    setTimeout(() => {
      Trends();
    }, 100);
  }, []);

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
          {trailer ? console.log():<TrailerTrending TrendTitle={trendTitle} toggle={toggle}/>};
          <AiOutlineClose id={trailer ? "Nothing" : "Exit1"}className={toggle ? "DarkTheme" : "LightThemeClose"}fontSize={55}color="#fff"cursor={"pointer"}onClick={() => setTrailer(true)}/>
        </div>
      </div>
    </Fragment>
  );
}

export default Trends;
