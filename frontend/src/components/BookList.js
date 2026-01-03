
import React, { useState } from 'react';
import './BookList.css'; // Import the CSS file
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';
import Search from './Search';


const BookList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const books = [
    { 
      id: 1, 
      title: 'The Great Gatsby', 
      price: 10.99, 
      image: book1, 
      author: 'F. Scott Fitzgerald', 
      rating: 4.5, 
      genre: 'Classic Fiction', 
      year: 1925, 
      description: 'A tale of the American Dream, wealth, and love in the Jazz Age.' 
    },
    { 
      id: 2, 
      title: 'To Kill a Mockingbird', 
      price: 12.50, 
      image:book2, 
      author: 'Harper Lee', 
      rating: 4.8, 
      genre: 'Literary Fiction', 
      year: 1960, 
      description: 'A powerful story of racial injustice and moral growth in the American South.' 
    },
    { 
      id: 3, 
      title: '1984', 
      price: 9.99, 
      image: book3, 
      author: 'George Orwell', 
      rating: 4.6, 
      genre: 'Dystopian', 
      year: 1949, 
      description: 'A chilling vision of a totalitarian future where surveillance is omnipresent.' 
    },
    { 
      id: 4, 
      title: 'Pride and Prejudice', 
      price: 11.25, 
      image: book4, 
      author: 'Jane Austen', 
      rating: 4.7, 
      genre: 'Romance', 
      year: 1813, 
      description: 'A witty exploration of love, marriage, and social class in Regency England.' 
    },
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (book) => {
    setCart([...cart, book]);
    alert(`${book.title} added to cart!`);
  };

  const totalItems = cart.length;

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">BookHaven</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search books, authors, or genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="cart-icon">
          🛒 <span className="cart-count">{totalItems}</span>
        </div>
      </header>

      <main className="book-list-container">
        <h2 className="section-title">Featured Books</h2>
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} className="book-image" />
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-genre-year">{book.genre} • {book.year}</p>
                <div className="book-rating">
                  {'★'.repeat(Math.floor(book.rating))} ({book.rating})
                </div>
                <p className="book-description">{book.description}</p>
                <p className="book-price">${book.price.toFixed(2)}</p>
                <button className="buy-button" onClick={() => addToCart(book)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2023 BookHaven. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookList;