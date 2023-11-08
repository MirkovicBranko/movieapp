import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../Styles/TrailerMovie.css";

function TrailerTvShows({TvShowsTitle, toggle}) {
  const [video, setVideo] = useState("");
  const [videoURL, setVideoURL] = useState("");

  function handleSearch() { //searching for tvshows
    
    movieTrailer(video).then((res) => {
      setVideo(TvShowsTitle);
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
      <h1 id={toggle ? 'TrailerMovie-name-dark' : 'TrailerMovie-name-light'}>{TvShowsTitle}</h1>
      {videoURL ? (
        <ReactPlayer url={videoURL} controls={true} width={"1000px"} height={"700px"} muted={false} />
      ) : (
        <div>
        <p className="nA">Trailer unavailable.</p>
        </div>
      )}
    </div>
  </Fragment>
  );
}

export default TrailerTvShows;