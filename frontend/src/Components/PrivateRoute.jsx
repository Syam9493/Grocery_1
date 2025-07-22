import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);       // add loading flag
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("userInfo");

    if (auth) {
      try {
        const user = JSON.parse(auth);
        if (user && user._id) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Invalid user data in localStorage", err.message);
      }
    }

    setLoading(false); // stop loading after check
  }, []);

  if (loading) return null; // or show loader

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
