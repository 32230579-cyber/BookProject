import React from "react";
import "./BooksSection.css";
import { CampusesList } from "../data/CampusesList";

function BooksSection() {
  return (
    <div className="books-section">
      <h2 className="books-title">BOOKS</h2>

      <div className="books-row">
        {CampusesList.map((item) => (
          <div className="book-card" key={item.id}>
            <img src={item.image} alt={item.title} className="book-image" />
            <h3 className="book-name">{item.title}</h3>
            <p className="book-price">{item.Price}</p>
          </div>
       )
       )}

        {/* SHOP ALL CARD */}
        <div className="shop-all-card">
          <a href="/products" className="shop-link">
            SHOP ALL BOOKS ➜
          </a>
        </div>
      </div>
    </div>
  );
}

export default BooksSection;
