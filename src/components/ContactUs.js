// Import necessary dependencies from React and other libraries
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../Styles/ContactUs.scss";

function ContactUs() {
  // Define state variables to store user input and status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object containing user input
    const data = { name, email, message };

    try {
      // Send a POST request to the server with user data
      const response = await fetch("http://localhost:5000/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        // If the request is successful, set messageSent to true and show a success message
        setMessageSent(true);
        toast("Message sent successfully");
      } else {
        // If the request is not successful, show an error message
        toast("error");
      }
    } catch (error) {
      // Handle errors that may occur during the request
      console.error("Error with sending message:", error);
    }
  };

  return (
    <div className="contact-form">
      <h3>Contact us</h3>
      {messageSent ? (
        // Display a confirmation message when the message is sent
        <p>Message sent! Thank you for your time.</p>
      ) : (
        // Display a form for users to enter their name, email, and message
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your First and Last name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Send message</button>
        </form>
      )}
    </div>
  );
}

export default ContactUs;
