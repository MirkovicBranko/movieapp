import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../Styles/TrailerMovie.css";

function TrailerMovies({ moviesTitle,toggle }) {
  const [video, setVideo] = useState("");
  const [videoURL, setVideoURL] = useState("");

  function handleSearch() {
    movieTrailer(video).then((res) => {
      setVideo(moviesTitle);
      setVideoURL(res);
    });
  }
  useEffect(() => {
    handleSearch();
  }, [videoURL]);
  return (
    <Fragment>
      <div className="Container"></div>
      <div className="player">
        <h1 id={toggle ? 'TrailerMovie-name-dark' :'TrailerMovie-name-light' }>{moviesTitle}</h1>
        <ReactPlayer url={videoURL}controls={true}width={"1000px"}height={"700px"}muted={false}
        />
      </div>
    </Fragment>
  );
}

export default TrailerMovies;
