import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../Styles/TrailerMovie.css";

// Functional component for displaying the trailer of movies
function TrailerMovies({ moviesTitle, toggle }) {
  // State to store the video to search for
  const [video, setVideo] = useState("");
  // State to store the URL of the found video
  const [videoURL, setVideoURL] = useState("");

  // Function to search for the trailer of the specified movie
  function handleSearch() {
    // Searching for the trailer based on the provided moviesTitle
    movieTrailer(video).then((res) => {
      // Set the video and videoURL states based on the search result
      setVideo(moviesTitle);
      setVideoURL(res);
    });
  }

  // useEffect hook to trigger the search when the component mounts or when videoURL changes
  useEffect(() => {
    handleSearch();
  }, [videoURL]);

  return (
    <Fragment>
      <div className="container" />
      <div className="player">
        {/* Displaying the title with dark or light style based on the 'toggle' prop */}
        <h1 id={toggle ? "TrailerMovie-name-dark" : "TrailerMovie-name-light"}>
          {moviesTitle}
        </h1>
        {/* Rendering the ReactPlayer component with the found video URL */}
        <ReactPlayer
          url={videoURL}
          controls={true}
          width={"1000px"}
          height={"700px"}
          muted={false}
        />
      </div>
    </Fragment>
  );
}

export default TrailerMovies;
