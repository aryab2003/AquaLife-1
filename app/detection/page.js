"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Load image from local storage on component mount
    const storedImageSrc = localStorage.getItem("uploadedImageSrc");
    if (storedImageSrc) {
      setImageSrc(storedImageSrc);
    }
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1568145675395-66a2eda0c6d7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  const fileInputContainerStyle = {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    border: "2px dashed red ",
    borderRadius: "0.25rem",
    cursor: "pointer",
    marginTop: "2rem",
  };

  const fileInputStyle = {
    display: "none",
  };

  const buttonStyle = {
    backgroundColor: "#4caf50",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    marginBottom: "5rem",
    marginTop: "3rem",
  };

  const successContainerStyle = {
    marginTop: "1rem",
    textAlign: "center",
    backgroundColor: "#4caf50",
    padding: "1rem",
    borderRadius: "0.25rem",
  };

  const errorStyle = {
    color: "red",
    marginTop: "1rem",
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

  const PredictionCategory = ({ category, data }) => {
    const isHealthy = category === "Healthy Fish" && data.raw_score > 0.45;
    const isUnhealthy =
      category === "Unhealthy Fish" && data.raw_score < 0.0025;

    const rowStyle = {
      backgroundColor: isHealthy
        ? "green"
        : isUnhealthy
        ? "orange"
        : "transparent",
      color: isHealthy || isUnhealthy ? "white" : "black",
      fontWeight: "bold",
      border: isHealthy
        ? "2px solid green"
        : isUnhealthy
        ? "2px solid orange"
        : "none", // Add border for the highlight line
    };

    return (
      <tr key={category} style={rowStyle}>
        <td>{category}</td>
        <td>{(data.probability * 100).toFixed(3)}%</td>
        <td>{(data.raw_score * 100).toFixed(3)}%</td>
        {isHealthy && (
          <td style={{ color: "white", fontWeight: "bold" }}>Healthy!</td>
        )}
        {isUnhealthy && (
          <td style={{ color: "white", fontWeight: "bold" }}>Unhealthy!</td>
        )}
      </tr>
    );
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Convert file to data URL
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataUrl = event.target.result;

        // Set the file and image src in state
        setFile(selectedFile);
        setImageSrc(dataUrl);

        // Save image src to local storage
        localStorage.setItem("uploadedImageSrc", dataUrl);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    setError(null);

    if (!file) {
      setLoading(false);
      setError(
        "Please select an image before uploading so that we can detect diseases."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://fish-disease-prediction.onrender.com/api/disease_prediction",
        formData
      );

      console.log("Response:", response.data);

      setResponse(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("An error occurred during upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div
        style={fileInputContainerStyle}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <p style={{ marginBottom: "0.5rem", color: "red" }}>
          Click or drag and drop to add an image
        </p>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={fileInputStyle}
        />
        {imageSrc && <img src={imageSrc} alt="Uploaded" />}
      </div>
      <button onClick={handleUpload} style={buttonStyle}>
        Upload
      </button>

      {loading && <p>Loading...</p>}

      {error && <p style={errorStyle}>{error}</p>}

      {response && (
        <div style={successContainerStyle}>
          <p>Upload successful!</p>
          <table
            style={{ width: "100%", marginTop: "1rem", borderSpacing: "10px" }}
          >
            <thead>
              <tr>
                <th>Disease</th>
                <th style={{ width: "25%" }}>Probability</th>
                <th style={{ width: "25%" }}>Confidence</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(response.predictions || {}).map(
                ([category, data]) => (
                  <PredictionCategory
                    key={category}
                    category={category}
                    data={data}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
