import React, { useState } from 'react';
import Router from 'next/router';
import styles from '../styles/login.module.css';
import { useUser } from '../contexts/UserContext';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { fetchUser } = useUser()
  
    async function handleSubmit(e) {
      e.preventDefault();
      const loginResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (loginResponse.ok) {
        await fetchUser();
        Router.push('/');
      } else {
        const errorData = await loginResponse.json();
        setError(errorData.error);
      }
    }
  
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>miamia</h1> 
            <div className={styles.formContainer}>
            <h2 className={styles.secondtitle}> Let's bring magic back to the kitchen</h2>
            <h3 className={styles.thirdtitle}>Login</h3>
              <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                  <label htmlFor="username" className={styles.label}>Username</label>
                  <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.inputfield}
                  />
              </div>
              <div>
                  <label htmlFor="password" className={styles.label}>Password</label>
                  <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputfield}
                  />
              </div>
              <button type="submit" className={styles.submitButton}>Log In</button>
              {error && <p className={styles.errorMessage}>{error}</p>}
              </form>
            </div>
        </div>
      );
};

export default LoginComponent;
