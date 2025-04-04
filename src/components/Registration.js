import React, { useState, useEffect } from 'react';
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
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Add state for confirm password visibility toggle
  const [formSubmitted, setFormSubmitted] = useState(false); // Track if form has been submitted
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  }); // Track which fields have been touched
  
  // Field validation states
  const [validations, setValidations] = useState({
    email: { isValid: false, message: '' },
    password: { isValid: false, message: '' },
    confirmPassword: { isValid: false, message: '' }
  });
  
  // Handle field blur to mark fields as touched
  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  // Validation rules
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return { isValid: false, message: 'Email is required' };
    } else if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address (e.g., name@example.com)' };
    }
    return { isValid: true, message: '' };
  };

  const validatePassword = (password) => {
    if (!password) {
      return { isValid: false, message: 'Password is required' };
    } else if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    return { isValid: true, message: '' };
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      return { isValid: false, message: 'Please confirm your password' };
    } else if (confirmPassword !== password) {
      return { isValid: false, message: 'Passwords do not match. Please try again.' };
    }
    return { isValid: true, message: '' };
  };

  // Update validations when inputs change
  useEffect(() => {
    setValidations(prev => ({
      ...prev,
      email: validateEmail(email)
    }));
  }, [email]);

  useEffect(() => {
    setValidations(prev => ({
      ...prev,
      password: validatePassword(password)
    }));
  }, [password]);

  useEffect(() => {
    setValidations(prev => ({
      ...prev,
      confirmPassword: validateConfirmPassword(confirmPassword, password)
    }));
  }, [confirmPassword, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Mark form as submitted
    
    // Validate all fields before submission
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(confirmPassword, password);
    
    setValidations({
      email: emailValidation,
      password: passwordValidation,
      confirmPassword: confirmPasswordValidation
    });
    
    // Check if all validations pass
    if (!emailValidation.isValid || !passwordValidation.isValid || !confirmPasswordValidation.isValid) {
      setError("Please correct the errors before submitting.");
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
            <div className="input-with-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="input-icon">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                className={email && (validations.email.isValid ? 'valid' : 'invalid')}
                placeholder=" "
                required
              />
              <label htmlFor="email">Email</label>
              {email && touched.email && (
                validations.email.isValid ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="validation-icon valid">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="validation-icon invalid">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                  </svg>
                )
              )}
            </div>
            {(touched.email || formSubmitted) && validations.email.message && (
              <span className="field-error">{validations.email.message}</span>
            )}
          </div>
        <div className="form-group">
          <div className="input-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="input-icon">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              className={password && (validations.password.isValid ? 'valid' : 'invalid')}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
            {password && touched.password && (
              validations.password.isValid ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="validation-icon valid">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="validation-icon invalid">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              )
            )}
            <div 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)} 
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
              )}
            </div>
          </div>
          {(touched.password || formSubmitted) && validations.password.message && (
            <span className="field-error">{validations.password.message}</span>
          )}
        </div>
        <div className="form-group">
          <div className="input-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="input-icon">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              className={confirmPassword && (validations.confirmPassword.isValid ? 'valid' : 'invalid')}
              placeholder=" "
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            {confirmPassword && touched.confirmPassword && (
              validations.confirmPassword.isValid ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="validation-icon valid">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="validation-icon invalid">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              )
            )}
            <div 
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
              )}
            </div>
          </div>
          {(touched.confirmPassword || formSubmitted) && validations.confirmPassword.message && (
            <span className="field-error">{validations.confirmPassword.message}</span>
          )}
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
