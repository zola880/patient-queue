import React, { useState, useEffect } from 'react';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', gender: '', age: '', dept: '', isEmergency: false });
  const [timeLeft, setTimeLeft] = useState('');

  const OPEN_HOUR = 2;
  const CLOSE_HOUR = 24; // 6 PM (Changed from 28 to 18 for standard 24h clock)

  const currentHour = new Date().getHours();
  const isOpen = currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const closingTime = new Date();
      closingTime.setHours(CLOSE_HOUR, 0, 0, 0);
      const diff = closingTime - now;

      if (diff > 0 && isOpen) {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Closed");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      ...formData,
      token: Math.floor(1000 + Math.random() * 9000),
      time: new Date().toLocaleTimeString(),
      status: 'Waiting'
    };

    let list = JSON.parse(localStorage.getItem('patients') || '[]');
    if (formData.isEmergency) {
      const lastEmergencyIndex = list.findLastIndex(p => p.isEmergency);
      list.splice(lastEmergencyIndex + 1, 0, newPatient);
    } else {
      list.push(newPatient);
    }

    localStorage.setItem('patients', JSON.stringify(list));
    alert(`Success! Token: ${newPatient.token}`);
    setFormData({ name: '', gender: '', age: '', dept: '', isEmergency: false });
  };

  return (
    <div className="container">
      <section className="card">
        {isOpen ? (
          <>
            <div className="countdown-container">
              <span className="countdown-label">Registration Closes In</span>
              <span className="countdown-time">{timeLeft}</span>
            </div>

            <h2>Patient Registration</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" required placeholder='e.g. Abebe Bikila' value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="input-group">
                <label>Gender</label>
                <select required value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="input-group">
                <label>Age</label>
                <input type="number" required placeholder="Years" value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})} />
              </div>

              <div className="input-group">
                <label>Department</label>
                <select required value={formData.dept} onChange={(e) => setFormData({...formData, dept: e.target.value})}>
                  <option value="">-- Select Specialty --</option>
                  <option value="general">General Checkup</option>
                  <option value="pediatric">Pediatric</option>
                  <option value="maternal">Maternal (ANC)</option>
                  <option value="emergency">Emergency Case</option>
                </select>
              </div>

              <label className="checkbox-label" style={{color: formData.isEmergency ? '#d63031' : '#636e72'}}>
                <input type="checkbox" checked={formData.isEmergency}
                  onChange={(e) => setFormData({...formData, isEmergency: e.target.checked})} /> 
                Priority Emergency Access
              </label>

              <button type="submit" style={{backgroundColor: formData.isEmergency ? '#d63031' : '#007bff', color: 'white'}}>
                {formData.isEmergency ? '🚨 Submit Emergency' : 'Register Now'}
              </button>
            </form>
          </>
        ) : (
          <div className="closed-message">
            <h2>Registration Closed</h2>
            <p>We are open daily from 2:00 AM to 6:00 PM.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Register;