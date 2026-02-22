import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomerBooking as createBooking } from "../../api/authApi";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import "../../style/Booking.css";


function CustomerBooking() {
  const services = [
    { name: "Electrician", price: 1200 },
    { name: "Plumbing", price: 1000 },
    { name: "AC Repair", price: 2500 },
    { name: "Cleaning", price: 800 }
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const selectedService = location.state?.service;

  const [form, setForm] = useState({
    address: "",
    date: "",
    service: "Electrician",
    price: 1200,
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    if (selectedService) {
      const serviceData = services.find(s => s.name === selectedService);
      if (serviceData) {
        setForm(prev => ({ ...prev, service: serviceData.name, price: serviceData.price }));
      }
    }
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    if (!form.address || !form.description) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const bookingData = {
        serviceType: form.service,
        description: form.description,
        address: form.address
      };

      const response = await createBooking(bookingData);
      setBookingId(response.service?._id || response.service?.id);
      alert(`Booking created! Now proceeding to payment...`);
      // After booking is created, proceed to payment
      handlePayment(response.service?._id || response.service?.id);
    } catch (err) {
      setError(err?.message || "Failed to create booking");
      setLoading(false);
    }
  };

  const handlePayment = async (bookId) => {
    try {
      // Create order from backend
      const { data } = await axios.post(
        "/payment/create-order",
        { amount: form.price }
      );

      // Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const options = {
          key: "rzp_test_SHzunldisjFST8", // Your Razorpay public key
          amount: data.amount,
          currency: "INR",
          name: "Service Booking",
          description: `${form.service} - ${form.address}`,
          order_id: data.id,
          prefill: {
            contact: "",
            email: ""
          },
          handler: async function (response) {
            console.log("Razorpay response:", response);
            try {
              if (!user || !user.id) {
                alert("User not logged in. Please login again.");
                return;
              }

              // Verify payment on backend
              await axios.post("/payment/verify-payment", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                serviceId: bookId,
                userId: user.id,
                amount: form.price
              });

              alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
              // Reset form
              setForm({ address: "", date: "", service: "Electrician", price: 1200, description: "" });
              setBookingId(null);
              // Redirect to home or bookings page
              navigate("/home");
            } catch (verifyError) {
              alert("Payment verification failed. Please contact support.");
              console.error("Verification error:", verifyError);
            }
          },
          modal: {
            ondismiss: function() {
              setError("Payment cancelled");
              setLoading(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.head.appendChild(script);
    } catch (err) {
      setError(err?.message || "Failed to create payment order");
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2>Booking Service</h2>

        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter Address"
          value={form.address}
          onChange={handleChange}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <label>Service Description / Notes</label>
        <textarea
          name="description"
          placeholder="Describe the service needed"
          rows={4}
          value={form.description}
          onChange={handleChange}
        />

        {error && <p className="error-message">{error}</p>}

        <div className="service-box">
          <p>Service: {form.service}</p>
          <p>Total: ₹{form.price}</p>
        </div>

        <button className="primary-btn" onClick={handleBooking} disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>

        <hr />
        
      </div>
    </div>
  );
}

export default CustomerBooking;
