import React from 'react'; 
const useAuth = React.lazy(() => import('prefab_auth_service_module/PrefabAuthService')); 

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