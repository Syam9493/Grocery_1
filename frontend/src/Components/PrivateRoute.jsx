import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuthUser from '../Hooks/useAuthUser';

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);       // add loading flag
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { userID } = useAuthUser(); // get userID from custom hook 

  useEffect(() => {
    // Check if userID exists in localStorage
    console.log(userID);
    if (userID) {
      try {
        if (userID) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Invalid user data in localStorage", err.message);
      }
    }

    setLoading(false); // stop loading after check
  }, [userID]);

  if (loading) return <div>Loading...</div>; // or show loader

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
