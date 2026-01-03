import React from "react";
import "../styles/Features.css";

function Features() {
  return (
    <div className="features-container">
      <h1 className="features-title">Our Features</h1>

      <div className="features-grid">

        <div className="feature-card">
          <h2>📚 Huge Book Collection</h2>
          <p>Thousands of books from all genres with detailed descriptions and ratings.</p>
        </div>

        <div className="feature-card">
          <h2>⚡ Fast Search Engine</h2>
          <p>Find any book instantly with our optimized and powerful search system.</p>
        </div>

        <div className="feature-card">
          <h2>🛒 Easy Shopping</h2>
          <p>Add books to your cart easily with a smooth and secure checkout process.</p>
        </div>

        <div className="feature-card">
          <h2>🌎 Accessible Anywhere</h2>
          <p>Enjoy our bookstore on all devices with a fully responsive design.</p>
        </div>

      </div>
    </div>
  );
}

export default Features;
