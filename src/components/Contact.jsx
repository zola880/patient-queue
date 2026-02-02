import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [msg, setMsg] = useState({ name: '', text: '' });

  const sendMessage = (e) => {
    e.preventDefault();
    const existingMsgs = JSON.parse(localStorage.getItem('messages') || '[]');
    const newMsg = { ...msg, id: Date.now(), time: new Date().toLocaleTimeString() };
    localStorage.setItem('messages', JSON.stringify([...existingMsgs, newMsg]));
    alert("Message sent to staff!");
    setMsg({ name: '', text: '' });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Contact Staff</h2>
        <form onSubmit={sendMessage}>
          <input type="text" placeholder="Your Name" value={msg.name} required
            onChange={(e) => setMsg({...msg, name: e.target.value})} />
          <textarea placeholder="Write your message here..." style={{width: '100%', height: '100px', padding: '10px', marginBottom: '10px'}}
            value={msg.text} required
            onChange={(e) => setMsg({...msg, text: e.target.value})} />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;