import React from 'react';

import { Link } from 'react-router-dom';

import { useAuthentication } from '../hooks/userAuthentication';
import { useAuthValue } from '../context/AuthContext';

import styles from './Navbar.module.css';

function Navbar() {

  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.brand}>
          Mini <span>Blog</span>
        </Link>
        <ul className={styles.links_list}>
          <li>
            <Link to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>Login</Link>
              </li>
              <li>
                <Link to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>Register</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>Dashboard</Link>
              </li>
              <li>
                <Link to="/posts/create" className={({ isActive }) => (isActive ? styles.active : "")}>New Post</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>About</Link>
          </li>
          {user && (
            <li>
              <button onClick={ logout }>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
};

export default Navbar;
