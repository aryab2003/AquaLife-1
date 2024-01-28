"use client";
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
// (Replace this with your actual Firebase configuration)
const firebaseConfig = {
  apiKey: "AIzaSyCIAooi_qMC6KC1wTzEChPhdjj9_DO6QC0",
  authDomain: "aqua-life-2a5d8.firebaseapp.com",
  projectId: "aqua-life-2a5d8",
  storageBucket: "aqua-life-2a5d8.appspot.com",
  messagingSenderId: "527010163127",
  appId: "1:527010163127:web:4f846b51461d72eab66032",
  measurementId: "G-FHY7K9WWWJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Home component
const Home = () => {
  // State to store user information
  const [user, setUser] = useState(null);

  // Styles
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const headingStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: "#FFFFFF",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    textAlign: "center", // Center the text
  };

  const paragraphStyle = {
    fontSize: "1.5rem",
    textAlign: "center", // Center the text
    color: "#FFFFFF",
    maxWidth: "600px",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
  };

  const buttonStyle = {
    marginTop: "2rem",
    backgroundColor: "#1E40AF",
    color: "#FFFFFF",
    fontWeight: "bold",
    padding: "1rem 2rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    transition: "background-color 0.3s ease-in-out",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  };

  const signOutButtonStyle = {
    marginTop: "1rem",
    marginRight: "5rem",
    backgroundColor: "#FF0000",
    color: "#FFFFFF",
    fontWeight: "bold",
    padding: "0.8rem 1.5rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    transition: "background-color 0.3s ease-in-out",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  };

  const detectionLinkStyle = {
    color: "#FFFFFF",
    marginTop: "1rem",
    fontSize: "1.2rem",
    backgroundColor: "#4CAF50",
    padding: "1rem 2rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    transition: "background-color 0.3s ease-in-out",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const githubButtonStyle = {
    marginTop: "1rem",
    backgroundColor: "#333",
    color: "#FFFFFF",
    fontWeight: "bold",
    padding: "0.8rem 1.5rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    transition: "background-color 0.3s ease-in-out",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  };

  const emailButtonStyle = {
    marginTop: "1rem",
    backgroundColor: "#FFA500", // Choose a color for the email button
    color: "#FFFFFF",
    fontWeight: "bold",
    padding: "0.8rem 1.5rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    transition: "background-color 0.3s ease-in-out",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  };

  // Function to handle Google Sign-In
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Success", result.user);

      // Update the user state with user information
      setUser(result.user);
    } catch (error) {
      console.error("Google Sign-In Error", error);
    }
  };

  // Function to handle GitHub Sign-In
  /* const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("GitHub Sign-In Success", result.user);

      // Update the user state with user information
      setUser(result.user);
    } catch (error) {
      console.error("GitHub Sign-In Error", error);
    }
  };

  // Function to handle email sign-in
  const signInWithEmail = async () => {
    const email = prompt("Enter your email:");
    const password = "225678";

    try {
      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters long");
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Email Sign-In Success", result.user);

      // Update the user state with user information
      setUser(result.user);
    } catch (error) {
      console.error("Email Sign-In Error", error.message);
    }
  };
  */
  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("Sign Out Success");
    } catch (error) {
      console.error("Sign Out Error", error);
    }
  };

  // Render
  return (
    <div>
      <main style={containerStyle}>
        <h1 style={headingStyle}>
          Welcome to the Fish Disease Detection Web App
        </h1>
        <p style={paragraphStyle}>
          This web app helps you detect diseases in fish and provides
          information on how to address them.
        </p>
        {/* Check if the user is signed in */}
        {user ? (
          <div>
            <p
              style={{
                fontSize: "1.5rem",
                color: "#FFFFFF",
                marginBottom: "1rem",
                marginTop: "2rem",
                textAlign: "center",
              }}
            >
              Welcome, {user.displayName}!
            </p>

            <button onClick={handleSignOut} style={signOutButtonStyle}>
              Sign Out
            </button>

            <Link legacyBehavior href="/detection">
              <a style={detectionLinkStyle}>Go to Fish Disease Detection</a>
            </Link>
          </div>
        ) : (
          <>
            <button onClick={signInWithGoogle} style={buttonStyle}>
              Sign In with Google
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
