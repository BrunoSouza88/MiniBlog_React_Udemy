import { auth } from '../firebase/config';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  // const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });
      setLoading(false)
      return user;
    } catch (error) {
      console.log(error.message);
      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "Password needs to be at least 6 characters";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail already registered.";
      } else {
        systemErrorMessage = "Something happened. Please try again later.";
      }
      setLoading(false)

      setError(systemErrorMessage);
    }

    // setLoading(false);
  };

  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
    localStorage.clear();
  };

  const login = async (data) => {
    checkIfIsCancelled(); // memory leak

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "User not found. Check your E-mail.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong password.";
      } else {
        systemErrorMessage = "Something happened. Please try again later.";
      }

      console.log(systemErrorMessage);

      setError(systemErrorMessage);
    }

    console.log(error);

    setLoading(false);
  };


  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    logout,
    login,
    loading,
  };
};