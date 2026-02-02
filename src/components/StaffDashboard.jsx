import React, { useState, useEffect } from 'react';
import './staff.css';

const StaffDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [filterDept, setFilterDept] = useState('all');

  const officeMap = {
    general: "Office 101 (Main Floor)",
    pediatric: "Office 105 (Blue Wing)",
    maternal: "Office 202 (2nd Floor)",
    family_planning: "Office 108 (Health Wing)",
    emergency: "ER Triage Room A (Ground Floor)"
  };

  // Load data
  useEffect(() => {
    const loadData = () => {
      const patientData = JSON.parse(localStorage.getItem('patients') || '[]');
      const messageData = JSON.parse(localStorage.getItem('messages') || '[]');
      setPatients(patientData);
      setMessages(messageData);
    };

    loadData();
    const interval = setInterval(loadData, 3000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  const handleAction = (token, action) => {
    let list = JSON.parse(localStorage.getItem('patients') || '[]');

    if (action === 'call') {
      const updatedList = list.map(p =>
        p.token === token
          ? { ...p, status: 'Called', assignedOffice: officeMap[p.dept] }
          : p
      );
      setPatients(updatedList);
      localStorage.setItem('patients', JSON.stringify(updatedList));
      alert("Patient has been notified on their portal!");
    }

    if (action === 'remove') {
      const updatedList = list.filter(p => p.token !== token);
      setPatients(updatedList);
      localStorage.setItem('patients', JSON.stringify(updatedList));
    }
  };

  // Login
  if (!authenticated) {
    return (
      <div className="container">
        <div className="card">
          <h2>Staff Login</h2>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() =>
              password === '1234'
                ? setAuthenticated(true)
                : alert('Wrong password')
            }
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // Filters
  const activeQueue = patients.filter(p => p.status === 'Waiting');
  const filteredPatients =
    filterDept === 'all'
      ? activeQueue
      : activeQueue.filter(p => p.dept === filterDept);

  return (
    <div className="container" style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* QUEUE MANAGEMENT */}
      <div className="card">
        <h2>Queue Management</h2>

        <select
          onChange={(e) => setFilterDept(e.target.value)}
          style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
        >
          <option value="all">View All Departments</option>
          <option value="general">General Checkup</option>
          <option value="pediatric">Pediatric</option>
          <option value="maternal">Maternal (ANC)</option>
        </select>

        <table style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: '#777' }}>
                  No patients waiting
                </td>
              </tr>
            ) : (
              filteredPatients.map(p => (
                <tr key={p.token} style={{ backgroundColor: p.isEmergency ? '#fff3f3' : 'transparent' }}>
                  <td><strong>{p.token}</strong></td>
                  <td>{p.name}</td>
                  <td>
                    <button
                      onClick={() => handleAction(p.token, 'call')}
                      style={{ backgroundColor: '#28a745', color: '#fff', padding: '8px', border: 'none', borderRadius: '4px' }}
                    >
                      CALL NOW
                    </button>
                    <button
                      onClick={() => handleAction(p.token, 'remove')}
                      style={{ backgroundColor: '#dc3545', color: '#fff', padding: '8px', border: 'none', borderRadius: '4px', marginLeft: '5px' }}
                    >
                      FINISH
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PATIENT MESSAGES */}
      <div className="card">
        <h2>Patient Messages</h2>

        {messages.length === 0 ? (
          <p style={{ color: '#777' }}>No messages received.</p>
        ) : (
          <table style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Department</th>
                <th>Message</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={index}>
                  <td><strong>{msg.token}</strong></td>
                  <td>{msg.name}</td>
                  <td>{msg.dept}</td>
                  <td>{msg.message}</td>
                  <td>{msg.time || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default StaffDashboard;
