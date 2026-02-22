import  { useState } from 'react'
import '../../style/App.css'
import { useNavigate } from 'react-router-dom';
import { register as registerApi } from '../../api/authApi.js';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await registerApi(formData);
            console.log('Registration successful:', response);
            alert('Registration successful! Redirecting to login...');
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const GoToLogin = () => {
        navigate("/login");
    }

    

    return (
        <div className="container">
            <form className="login-box" autoComplete='off' onSubmit={handleRegister}>
                <h2>Register</h2>

                {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

                <div className="input-group">
                    <input 
                        type="text" 
                        name='username' 
                        autoComplete="off" 
                        value={formData.username}
                        onChange={handleChange}
                        required 
                    />
                    <label>Username</label>
                </div>

                <div className="input-group">
                    <input 
                        type="email" 
                        name='email' 
                        autoComplete="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    <label>Email</label>
                </div>

                <div className="input-group">
                    <input 
                        type="password" 
                        name='password' 
                        autoComplete="new-password" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                    <label>Password</label>
                </div>

                <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button><br />

                <p className="switch-auth">
                    Already have an account?
                    <span onClick={GoToLogin}> Login</span>
                </p>
            </form>
        </div>
    );
}


export default Register;
