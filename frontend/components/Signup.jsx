import React, { useState } from 'react';
import Router from 'next/router';
import styles from '../styles/signup.module.css';

const SignupComponent = () => {
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
        <div className={styles.container}>
          <h1 className={styles.title}>miamia</h1>
          <div className={styles.formContainer}>
            <h2 className={styles.secondtitle}> Welcome to your culinary journey</h2>
            <h3 className={styles.thirdtitle}>Sign up</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div>
                <label className={styles.label} htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className= {styles.inputfield}
                  required
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className= {styles.inputfield}
                  required
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className= {styles.inputfield}
                  required
                />
              </div>
              <button className={styles.submitButton} type="submit">Create Profile</button>
            </form>
          </div>
        </div>
      );
};

export default SignupComponent;
