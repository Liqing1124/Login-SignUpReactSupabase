import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Import Supabase client
import './AuthForm.css';

function Registration() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        // You can add options here, like redirect URLs or metadata
        // options: {
        //   data: {
        //     // Add custom user data if needed, requires table setup
        //   }
        // }
      });

      if (signUpError) throw signUpError;

      // Check if user object exists and needs confirmation
      if (data.user) {
         // Show success notification - user might need to confirm email
        setShowSuccessNotification(true);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        // Handle cases where user object might be null unexpectedly
         setError('Registration failed. Please try again.');
      }

    } catch (error) {
      setError(error.message || 'Failed to register');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    setShowSuccessNotification(false); // Hide notification
    navigate('/login'); // Navigate to login page
  };

  const handleCloseNotification = () => {
    setShowSuccessNotification(false); // Hide notification
  };

  return (
    <div className="auth-container">
      {showSuccessNotification ? (
        <div className="auth-form notification"> {/* Reuse auth-form style or create specific notification style */}
          <h2>Registration Successful!</h2>
          <p>Your account has been created.</p>
          <div className="notification-actions">
            <button type="button" onClick={handleGoToLogin}>Go to Login</button>
            <button type="button" onClick={handleCloseNotification} className="close-btn">Close</button>
          </div>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          {/* Removed Username field */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
        </form>
      )}
    </div>
  );
}

export default Registration;
