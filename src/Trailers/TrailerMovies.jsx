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

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getWidth = () => {
    if (width >= 768) {
      return toggle ? "1000px" : "1000px";
    } else if (width >= 480) {
      return toggle ? "500px" : "500px";
    } else {
      return toggle ? "180px" : "180px";
    }
  };

  const getHeight = () => {
    if (width >= 768) {
      return toggle ? "400px" : "400px";
    } else if (width >= 480) {
      return toggle ? "300px" : "300px";
    } else {
      return toggle ? "700px" : "700px";
    }
  };

  return (
    <Fragment>
      <div className="container" />
      <div className="player">
        <h1 id={toggle ? "TrailerMovie-name-dark" : "TrailerMovie-name-light"}>
          {moviesTitle}
        </h1>
        <ReactPlayer
          url={videoURL}
          controls={true}
          className="react-player"
          width={getWidth()}
          height={getHeight()}
          muted={false}
        />
      </div>
    </Fragment>
  );
}

export default TrailerMovies;
