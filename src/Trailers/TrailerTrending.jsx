import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../Styles/TrailerMovie.css";

// Functional component for displaying the trailer of trending movies and TV shows
function TrailerTrending({ TrendTitle, toggle }) {
  // State to store the URL of the found video
  const [videoURL, setVideoURL] = useState("");

  // Function to search for the trailer of the trending movie or TV show
  function handleSearch() {
    // Searching for the trailer based on the provided TrendTitle
    if (TrendTitle) {
      movieTrailer(TrendTitle)
        .then((res) => {
          // If a trailer URL is found, set the videoURL state
          if (res) {
            setVideoURL(res);
          } else {
            // Log a message if the trailer is not found
            console.log("Trailer not found.");
          }
        })
        .catch((error) => {
          // Log an error message if there's an issue during the search
          console.error("Error during search:", error);
        });
    }
  }

  // useEffect hook to trigger the search when the component mounts or when TrendTitle or videoURL changes
  useEffect(() => {
    handleSearch();
  }, [TrendTitle, videoURL]);

  return (
    <Fragment>
      <div className="container" />
      <div className="player">
        {/* Displaying the title with dark or light style based on the 'toggle' prop */}
        <h1 id={toggle ? "TrailerMovie-name-dark" : "TrailerMovie-name-light"}>
          {TrendTitle}
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
          <p className="nA">Trailer unavailable.</p>
        )}
      </div>
    </Fragment>
  );
}

export default TrailerTrending;
