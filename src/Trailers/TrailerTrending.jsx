import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../Styles/TrailerMovie.css";


function TrailerTrending({ TrendTitle, toggle }) {
  const [videoURL, setVideoURL] = useState("");

  function handleSearch() { //searching movies and tvshows trending now
    if (TrendTitle) { 
      movieTrailer(TrendTitle)
        .then((res) => {
          if (res) {
            setVideoURL(res);
          } else {
            console.log("Trailer not found.");
          }
        })
        .catch((error) => {
          console.error("Error during search:", error);
        });
    }
  }

  useEffect(() => {
    handleSearch();
  }, [TrendTitle, videoURL]);

  return (
    <Fragment>
      <div className="Container"></div>
      <div className="player">
        <h1 id={toggle ? 'TrailerMovie-name-dark' : 'TrailerMovie-name-light'}>{TrendTitle}</h1>
        {videoURL ? (
          <ReactPlayer url={videoURL} controls={true} width={"1000px"} height={"700px"} muted={false} />
        ) : (
          <p className="nA">Trailer unavailable.</p>
        )}
      </div>
    </Fragment>
  );
}
export default TrailerTrending;
