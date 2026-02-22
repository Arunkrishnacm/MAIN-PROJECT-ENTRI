import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { loginApi } from "../../api/authApi.js";
import "../../style/App.css";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await loginApi(data);
      loginUser(res);
      alert("Login successful");
      
      // Navigate based on user role
      if (res.user.role === "admin") {
        navigate("/admin");
      } else if (res.user.role === "technician") {
        navigate("/technician");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed: " + (err.message || "Please try again"));
    }
  };

  return (
    <div className="container">
      <form className="login-box" autoComplete="off" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <input type="email" name="email" required />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input type="password" name="password" required />
          <label>Password</label>
        </div>

        <button type="submit">Login</button>

        <p className="switch-auth">
          Create an account?
          <span onClick={() => navigate("/register")}> Register</span>
        </p>
      </form>
    </div>
  );
}

export default Login;

