import "../../style/Home.css";
import { FaBolt, FaWrench, FaSnowflake, FaBroom } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleBooking = (serviceType) => {
        alert(`Booking ${serviceType} service`);
        // later connect backend API
        // POST /api/services/create
        navigate("/booking", { state: { service: serviceType } });
    };

  return (
    <div className="home-container">
      <Navbar />

      <h2 className="welcome">Welcome, {user?.username || 'User'}</h2>
      <p className="service-title">Select a Service</p>

      <div className="services">

        <div className="card">
          <FaBolt className="icon" />
          <h4>Electrician</h4>
          <button onClick={() => handleBooking("Electrician")}>Book Now</button>
        </div>

        <div className="card">
          <FaWrench className="icon" />
          <h4>Plumbing</h4>
          <button onClick={() => handleBooking("Plumbing")}>Book Now</button>
        </div>

        <div className="card">
          <FaSnowflake className="icon" />
          <h4>AC Repair</h4>
          <button onClick={() => handleBooking("AC Repair")}>Book Now</button>
        </div>

        <div className="card">
          <FaBroom className="icon" />
          <h4>Cleaning</h4>
          <button onClick={() => handleBooking("Cleaning")}>Book Now</button>
        </div>

      </div>

    </div>
  );
}
