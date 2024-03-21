import React from 'react';
import styles from '../styles/logout.module.css';
import { useUser } from '../contexts/UserContext'

const LogoutButton = () => {
  const { clearUser } = useUser();
  const logout = async () => {

    await fetch('/api/logout')
    clearUser()

    window.location.href = '/login';
  }

  return (
    <div>
    <button className={styles.logoutbutton} onClick={logout}>Kirjaudu ulos</button>
    </div>
  )
}

export default LogoutButton;
