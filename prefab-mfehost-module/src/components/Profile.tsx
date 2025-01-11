import React from 'react';
// import { useAuth } from 'auth_service_module/AuthContext';
const useAuth = React.lazy(() => import('auth_service_module/AuthContext')); 

const Profile = () => {
  const { authToken, logout } = useAuth({});

  if (!authToken) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div>
      <h1>Welcome to your profile!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;