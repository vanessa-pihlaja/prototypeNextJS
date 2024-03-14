import React from 'react';

const LogoutButton = () => {
  const logout = async () => {
    await fetch('/api/logout'); // Call your API route for logging out
    // Optionally, redirect the user to the login page or home page
    window.location.href = '/login';
  };

  return (
    <button onClick={logout}>Logout</button>
  );
};

export default LogoutButton;
