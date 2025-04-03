import React, { useEffect, useRef, useCallback } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client

const INACTIVITY_TIMEOUT = 60 * 1000; // 1 minute in milliseconds

function Home({ user }) {
  const timerIdRef = useRef(null);

  // Function to handle logout
  const handleLogout = useCallback(async () => {
    clearTimeout(timerIdRef.current); // Clear timer on manual logout
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // App.js will handle redirection based on session state change
    } catch (error) {
      console.error('Error logging out:', error.message);
      alert('Error logging out: ' + error.message); // Inform user
    }
  }, []);

  // Function to reset the inactivity timer
  const resetTimer = useCallback(() => {
    clearTimeout(timerIdRef.current);
    timerIdRef.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
  }, [handleLogout]);

  useEffect(() => {
    // Events that indicate user activity
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    // Add event listeners to reset the timer on activity
    activityEvents.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Start the initial timer
    resetTimer();

    // Cleanup function: remove event listeners and clear timer on component unmount
    return () => {
      clearTimeout(timerIdRef.current);
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer]); // Add resetTimer to dependency array

  return (
    <div>
      <h2>Home Page</h2>
      {user ? (
        <>
          <p>Xin chào, {user.email}</p>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        // This part should ideally not be reached if App.js routing works correctly
        <p>Please log in.</p>
      )}
      <p>You will be automatically logged out after 1 minute of inactivity.</p>
    </div>
  );
}

export default Home;
