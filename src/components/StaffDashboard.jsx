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

  useEffect(() => {
    const patientData = JSON.parse(localStorage.getItem('patients') || '[]');
    const messageData = JSON.parse(localStorage.getItem('messages') || '[]');
    setPatients(patientData);
    setMessages(messageData);
  }, []);

  const handleAction = (token, action) => {
    let list = JSON.parse(localStorage.getItem('patients') || '[]');
    
    if (action === 'call') {
      const updatedList = list.map(p => {
        if (p.token === token) {
          return { ...p, status: 'Called', assignedOffice: officeMap[p.dept] };
        }
        return p;
      });
      setPatients(updatedList);
      localStorage.setItem('patients', JSON.stringify(updatedList));
      alert("Patient has been notified on their portal!");
    } else if (action === 'remove') {
      const updatedList = list.filter(p => p.token !== token);
      setPatients(updatedList);
      localStorage.setItem('patients', JSON.stringify(updatedList));
    }
  };

  if (!authenticated) {
    return (
      <div className="container">
        <div className="card">
          <h2>Staff Login</h2>
          <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={() => password === '1234' ? setAuthenticated(true) : alert('Wrong!')}>Login</button>
        </div>
      </div>
    );
  }

  // Only show patients who are still "Waiting" in the main list
  const activeQueue = patients.filter(p => p.status === 'Waiting');
  const filteredPatients = filterDept === 'all' ? activeQueue : activeQueue.filter(p => p.dept === filterDept);

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px' }}>
      <div className="card">
        <h2>Queue Management</h2>
        <select onChange={(e) => setFilterDept(e.target.value)} style={{ padding: '10px', marginBottom: '20px', width: '100%' }}>
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
            {filteredPatients.map(p => (
              <tr key={p.token} style={{ backgroundColor: p.isEmergency ? '#fff3f3' : 'transparent' }}>
                <td><strong>{p.token}</strong></td>
                <td>{p.name}</td>
                <td>
                  <button onClick={() => handleAction(p.token, 'call')} style={{ backgroundColor: '#28a745', color: 'white', padding: '8px', border: 'none', borderRadius: '4px' }}>CALL NOW</button>
                  <button onClick={() => handleAction(p.token, 'remove')} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px', border: 'none', borderRadius: '4px', marginLeft: '5px' }}>FINISH</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;