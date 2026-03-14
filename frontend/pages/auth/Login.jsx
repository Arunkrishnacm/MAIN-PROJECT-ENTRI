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
  const message =
    err.response?.data?.message ||
    err.message ||
    "Please try again";

  alert("Login failed: " + message);
}
  };

  return (
    <div className="container">
      <form className="login-box"  onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <input id="email" type="email" name="email" autoComplete="email" required />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-group">
          <input id="password" type="password" name="password" autoComplete="current-password" required />
          <label htmlFor="password">Password</label>
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

