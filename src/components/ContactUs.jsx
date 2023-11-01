import React, { useState } from "react";
import "../Styles/ContactUs.scss"

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for sending message
    console.log("Data sent:", { name, email, message });
    // Reset form field after sending
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-form">
      <h3>Contact us</h3>
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
    </div>
  );
}

export default ContactUs;
