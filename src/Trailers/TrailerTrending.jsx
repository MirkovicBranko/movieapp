import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../Styles/TrailerMovie.css";


function TrailerTrending({ TrendTitle, toggle }) {
  const [videoURL, setVideoURL] = useState("");

  function handleSearch() {
    if (TrendTitle) { 
      movieTrailer(TrendTitle)
        .then((res) => {
          if (res) {
            setVideoURL(res);
          } else {
            console.log("Traženi trejler nije pronađen.");
          }
        })
        .catch((error) => {
          console.error("Greška prilikom pretrage trejlera filma:", error);
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
          <p className="nA">Trejler nije dostupan.</p>
        )}
      </div>
    </Fragment>
  );
}
export default TrailerTrending;
