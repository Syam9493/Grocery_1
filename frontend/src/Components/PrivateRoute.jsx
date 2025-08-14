import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);       // add loading flag
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = useSelector((state) => state.userInfo);

  useEffect(() => {
    

    if (auth) {
      try {
        const user = JSON.parse(auth);
        if (user && user.id) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Invalid user data in localStorage", err.message);
      }
    }

    setLoading(false); // stop loading after check
  }, [auth]);

  if (loading) return <div>Loading...</div>; // or show loader

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
