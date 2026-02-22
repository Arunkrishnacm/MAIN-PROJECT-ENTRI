import React, { useState, useEffect } from 'react'
import "../../style/AdminDashbord.css";
import axios from '../../api/axios'
import Navbar from '../../components/Navbar';

function AdminDashbord() {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const servicesResponse = await axios.get('/admin/services', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const usersResponse = await axios.get('/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setServices(servicesResponse.data.services || []);
        setUsers(usersResponse.data.users || []);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setServices([]);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const assignTechnician = async (serviceId) => {
    const techId = selectedTech[serviceId];
    if (!techId) return alert('Please select a technician');
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/admin/assign-service/${serviceId}`, { technicianId: techId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state
      setServices(prev => prev.map(s => s._id === serviceId ? { ...s, status: 'assigned', assignTechnician: users.find(u => u._id === techId) || techId } : s));
    } catch (err) {
      console.error('Assign technician error', err);
      alert(err.response?.data?.message || 'Failed to assign technician');
    }
  }

  if (loading) {
    return (
      <div className="admin-container">
        <div className="dashboard-box">
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="admin-container">
        <div className="dashboard-box">

          <h2 className="dashboard-title">Admin Dashboard</h2>

          <div className="stats">
            <div className="stat-card">
              <h4>Total Bookings</h4>
              <p>{services.length}</p>
            </div>

            <div className="stat-card">
              <h4>Pending Jobs</h4>
              <p>{services.filter(s => s.status === 'pending').length}</p>
            </div>

            <div className="stat-card">
              <h4>Completed Jobs</h4>
              <p>{services.filter(s => s.status === 'completed').length}</p>
            </div>

            <div className="stat-card">
              <h4>Total Users</h4>
              <p>{users.length}</p>
            </div>
          </div>

          <h3 className="requests-title">All Service Requests</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {services.length > 0 ? services.map(service => (
                <tr key={service._id}>
                  <td>{service.user?.username || 'Unknown'}</td>
                  <td>{service.serviceType}</td>
                  <td><span className={`status ${service.status}`}>{service.status}</span></td>
                  <td>{service.createdAt ? new Date(service.createdAt).toLocaleDateString() : '—'}</td>
                  <td>
                    {service.status === 'completed' ? (
                      <span style={{ color: '#28a745', fontWeight: 'bold' }}>Completed</span>
                    ) : service.status === 'assigned' ? (
                      <span>{service.assignTechnician?.username || service.assignTechnician || 'Assigned'}</span>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <select
                          value={selectedTech[service._id] || ''}
                          onChange={(e) => setSelectedTech(prev => ({ ...prev, [service._id]: e.target.value }))}
                        >
                          <option value="">Select technician</option>
                          {users.filter(u => u.role === 'technician').map(tech => (
                            <option key={tech._id} value={tech._id}>{tech.username}</option>
                          ))}
                        </select>
                        <button
                          className="view-btn"
                          onClick={() => assignTechnician(service._id)}
                        >Assign</button>
                      </div>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5">No services available</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>

    </div>
  )
}

export default AdminDashbord
