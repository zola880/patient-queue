import React, { useState } from 'react';
import './waiting.css';

const WaitingStatus = () => {
  const [search, setSearch] = useState({ name: '', token: '' });
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const found = patients.find(p => p.name.toLowerCase() === search.name.toLowerCase() && p.token === parseInt(search.token));

    if (found) {
      // Calculate position only among those still "Waiting"
      const waitingList = patients.filter(p => p.status === 'Waiting');
      const index = waitingList.findIndex(p => p.token === found.token);
      setPatient({ ...found, before: index });
      setError(false);
    } else {
      setError(true);
      setPatient(null);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <main className="main-content">
        {!patient ? (
          <div className="search-section">
            <form className="status-form" onSubmit={handleCheck}>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" required onChange={(e) => setSearch({...search, name: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Token Number</label>
                <input type="number" required onChange={(e) => setSearch({...search, token: e.target.value})} />
              </div>
              <button className="btn-primary" type="submit">Track My Position</button>
              {error && <div className="error-msg">Record not found.</div>}
            </form>
          </div>
        ) : (
          <div className="status-display">
            {patient.status === 'Called' ? (
              <div className="called-box" style={{ backgroundColor: '#d4edda', border: '2px solid #28a745', padding: '30px', borderRadius: '15px', textAlign: 'center' }}>
                <h1 style={{ color: '#155724' }}>🔔 IT IS YOUR TURN!</h1>
                <p style={{ fontSize: '20px' }}>Please proceed to:</p>
                <h2 style={{ color: '#155724', textDecoration: 'underline' }}>{patient.assignedOffice}</h2>
                <p style={{ marginTop: '20px' }}>Our staff is waiting for you.</p>
                <button className="btn-outline" onClick={() => setPatient(null)}>Close</button>
              </div>
            ) : (
              <>
                <h2>Hello, {patient.name}</h2>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Position in Queue</span>
                    <span className="stat-value">#{patient.before + 1}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Est. Wait Time</span>
                    <span className="stat-value highlight">{patient.before * 15} mins</span>
                  </div>
                </div>
                <button className="btn-outline" onClick={() => setPatient(null)}>New Search</button>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default WaitingStatus;