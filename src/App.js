import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home'; // Import Home component
import { supabase } from './supabaseClient'; // Import Supabase client
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); // Set loading to false after checking session
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_IN' || _event === 'SIGNED_OUT') {
        setLoading(false); // Ensure loading is false on auth events
      }
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Show loading indicator while checking session
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={!session ? <Login /> : <Navigate replace to="/home" />} />
          <Route path="/register" element={!session ? <Registration /> : <Navigate replace to="/home" />} />

          {/* Protected route */}
          <Route
            path="/home"
            element={session ? <Home user={session.user} /> : <Navigate replace to="/login" />}
          />

          {/* Redirect root path based on session */}
          <Route
            path="/"
            element={<Navigate replace to={session ? "/home" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
