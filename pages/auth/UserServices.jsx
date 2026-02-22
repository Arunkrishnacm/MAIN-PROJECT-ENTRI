import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import Navbar from '../../components/Navbar'

function UserServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            const token = localStorage.getItem("token");
            console.log("Token:", token);
            
            if (!token) {
                setError("Please log in to view your services.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('/user/my-services', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("API Response:", response.data);
                console.log("Services array:", response.data.services);
                setServices(response.data.services || []);
                console.log("Services state set to:", response.data.services || []);
                setLoading(false);
                console.log("Loading set to false, should now render services");
            } catch (err) {
                console.error("Error fetching services:", err);
                console.error("Error response:", err.response);
                setError(err.response?.data?.message || "Failed to load services. Please try again.");
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h2>Loading your services...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                    <h2>{error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#222' }}>My Services</h2>
                
                {services.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                        {console.log("No services found, services array:", services)}
                        <h3>No services found</h3>
                        <p>You haven't booked any services yet.</p>
                    </div>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                        gap: '20px',
                        marginTop: '20px'
                    }}>
                        {services.map(service => {
                            console.log("Rendering service:", service);
                            return (
                                <div key={service._id} style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    transition: 'box-shadow 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
                                onMouseLeave={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
                                >
                                    <h3 style={{ margin: '0 0 10px 0', color: '#222' }}>{service.serviceType}</h3>
                                    <p style={{ margin: '5px 0', color: '#555' }}>
                                        <strong>Description:</strong> {service.description}
                                    </p>
                                    <p style={{ margin: '5px 0', color: '#555' }}>
                                        <strong>Address:</strong> {service.address}
                                    </p>
                                    <p style={{ margin: '5px 0', color: '#555' }}>
                                        <strong>Date:</strong> {new Date(service.createdAt).toLocaleString()}
                                    </p>
                                    <p style={{ 
                                        margin: '5px 0', 
                                        color: service.status === 'completed' ? '#28a745' : 
                                               service.status === 'pending' ? '#ffc107' : '#dc3545',
                                        fontWeight: 'bold'
                                    }}>
                                        <strong>Status:</strong> {service.status}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserServices;
