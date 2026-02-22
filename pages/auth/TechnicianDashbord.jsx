import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../../style/Technician.css";

function TechnicianDashboard() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/technician/assigned-services", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(response.data.services || []);
      } catch (err) {
        console.error("Error fetching technician jobs:", err);
        setServices([]);
      }
    };

    fetchServices();
  }, []);

  const updateStatus = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");
      // Update status to 'completed' (adjust as needed)
      await axios.put(`/technician/update-service-status/${serviceId}`, { status: 'completed' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the services list after updating status
      const response = await axios.get("/technician/assigned-services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(response.data.services || []);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  

  return (
    <div className="tech-container">
      <h2 className="tech-title">My Jobs</h2>

      <table className="tech-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Address</th>
            <th>Date</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan="5">No jobs assigned</td>
            </tr>
          ) : (
            services.map((service) => (
              <tr key={service._id}>
                <td>{service.serviceType}</td>
                <td>{service.address}</td>
                <td>{service.createdAt ? new Date(service.createdAt).toLocaleString() : "Not set"}</td>
                <td className={service.status}>
                  {service.status}
                </td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => updateStatus(service._id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TechnicianDashboard;