import { useState } from 'react';
import Router from 'next/router';

export default function CreateProfile() {
  const [user, setUser] = useState({
    username: '',
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation example
    if (!user.username || !user.name || !user.password) {
      alert('Please fill in all fields.');
      return;
    }
    if (user.password.length < 5) {
      alert('Password must be at least 5 characters.');
      return;
    }

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Failed to register. Please try again.');
      }
      const data = await response.json();
      console.log(data);
      // Handle success
      Router.push('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration Error:', error);
      alert(error.message); // Show error message to the user
    }
  };

  return (
    <div>
      <h1>Create Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}
