import React, { useState, useEffect } from 'react';
import './staff.css';

const StaffDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [selectedMsgIndex, setSelectedMsgIndex] = useState(null);

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
      setPatients(JSON.parse(localStorage.getItem('patients') || '[]'));
      setMessages(JSON.parse(localStorage.getItem('messages') || '[]'));
    };
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (token, action) => {
    let list = JSON.parse(localStorage.getItem('patients') || '[]');

    if (action === 'call') {
      list = list.map(p =>
        p.token === token
          ? { ...p, status: 'Called', assignedOffice: officeMap[p.dept] }
          : p
      );
      alert("Patient has been notified on their portal!");
    }

    if (action === 'remove') {
      list = list.filter(p => p.token !== token);
    }

    setPatients(list);
    localStorage.setItem('patients', JSON.stringify(list));
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
          <button onClick={() => password === '1234'
            ? setAuthenticated(true)
            : alert('Wrong password')}>
            Login
          </button>
        </div>
      </div>
    );
  }

  // Filter logic (includes emergency)
  const filteredPatients = patients.filter(p => {
    if (p.status !== 'Waiting') return false;
    if (filterDept === 'all') return true;
    if (filterDept === 'emergency') return p.isEmergency === true;
    return p.dept === filterDept;
  });

  return (
    <div className="container" style={{ maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* QUEUE MANAGEMENT */}
      <div className="card">
        <h2>Queue Management</h2>

        <select
          onChange={(e) => setFilterDept(e.target.value)}
          style={{ padding: '10px', marginBottom: '20px', width: '100%', fontWeight: 'bold' }}
        >
          <option value="all">All Patients</option>
          <option value="emergency">🚨 Emergency Only</option>
          <option value="general">General</option>
          <option value="pediatric">Pediatric</option>
          <option value="maternal">Maternal</option>
        </select>

        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#777' }}>
                  No patients found.
                </td>
              </tr>
            ) : (
              filteredPatients.map(p => (
                <tr key={p.token} style={{ backgroundColor: p.isEmergency ? '#fff1f1' : 'transparent' }}>
                  <td><strong>{p.token}</strong></td>
                  <td>
                    {p.name}
                    {p.isEmergency && <span style={{ color: 'red', fontSize: '0.8em' }}> [EMERGENCY]</span>}
                  </td>
                  <td>{p.age || '-'}</td>
                  <td>
                    <button onClick={() => handleAction(p.token, 'call')}>Call</button>
                    <button onClick={() => handleAction(p.token, 'remove')} style={{ marginLeft: '6px' }}>
                      Skip
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
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <React.Fragment key={index}>
                  <tr
                    onClick={() => setSelectedMsgIndex(selectedMsgIndex === index ? null : index)}
                    style={{ cursor: 'pointer', background: selectedMsgIndex === index ? '#f2f2f2' : '' }}
                  >
                    <td><strong>{msg.token}</strong></td>
                    <td>{msg.name}</td>
                    <td>{msg.time || '-'}</td>
                  </tr>

                  {selectedMsgIndex === index && (
                    <tr>
                      <td colSpan="3" style={{ padding: '15px', background: '#fafafa' }}>
                        <p><strong>Department:</strong> {msg.dept}</p>
                        <p><strong>Message:</strong></p>
                        <em>"{msg.message}"</em>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default StaffDashboard;
