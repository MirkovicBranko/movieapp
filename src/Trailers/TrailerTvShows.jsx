import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../Styles/TrailerMovie.css";

// Functional component for displaying the trailer of TV shows
function TrailerTvShows({ TvShowsTitle, toggle }) {
  // State to store the searched video name
  const [video, setVideo] = useState("");
  // State to store the URL of the found video
  const [videoURL, setVideoURL] = useState("");

  // Function to search for the trailer of the TV show using the movie-trailer library
  function handleSearch() {
    // Searching for the TV show trailer based on its title
    movieTrailer(video).then((res) => {
      setVideo(TvShowsTitle);
      setVideoURL(res);
    });
  }

  // useEffect hook to trigger the search when the component mounts or when videoURL changes
  useEffect(() => {
    handleSearch();
  }, [videoURL]);

  return (
    <Fragment>
      <div className="container"></div>
      <div className="player">
        {/* Displaying the TV show title with dark or light style based on the 'toggle' prop */}
        <h1 id={toggle ? "TrailerMovie-name-dark" : "TrailerMovie-name-light"}>
          {TvShowsTitle}
        </h1>
        {/* Conditionally rendering the ReactPlayer component if the videoURL is available */}
        {videoURL ? (
          <ReactPlayer
            url={videoURL}
            controls={true}
            width={"1000px"}
            height={"700px"}
            muted={false}
          />
        ) : (
          // Displaying a message if the trailer is unavailable
          <div>
            <p className="nA">Trailer unavailable.</p>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default TrailerTvShows;
