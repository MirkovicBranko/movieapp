// Importujte useEffect i useState ako već niste
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../Styles/ContactUs.scss"


function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, message };

    try {
        const response = await fetch("http://localhost:5000/api/send-message", {
            method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setMessageSent(true);
        toast("Message sent successfully")
      } else {
        toast("error")
      }
    } catch (error) {
      console.error("Error with sending message:", error);
      
    }
  };

  return (
    <div className="contact-form">
      <h3>Contact us</h3>
      {messageSent ? (
        <p>Poruka je uspešno poslata</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ime"
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
