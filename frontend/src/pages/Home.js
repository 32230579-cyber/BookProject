import React, { useState, useEffect } from 'react';



import slide1 from '../assets/slider1.jpg';
import slide2 from '../assets/slider2.jpg';
import slide3 from '../assets/slider3.jpg';


import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';



function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Discover Amazing Books",
      description: "Explore our vast collection of books from all genres",
      image: slide1
    },
    {
      title: "Best Sellers Collection",
      description: "Find the most popular books loved by readers worldwide",
      image: slide2
    },
    {
      title: "New Arrivals",
      description: "Check out our latest additions to the collection",
      image: slide3
    }
];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const products = [
    { id: 1, title: "The Product Book", author: "Josh Anon and Carlos Gonzalez De Villaumbrosia", price: "$19.99", image: book1 },
    { id: 2, title: "Cracking the PM Interview", author: " Gayle Laakmann McDowell ", price: "$14.77", image: book2 },
    { id: 3, title: "1984", author: "George Orwell", price: "$13.99", image: book3 },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: "$11.99", image: book4 },
    
  ];

  return (
    <div className="home">
      {/* Slider Section */}
      <section className="slider-section">
        <div className="slider-container">
          <div className="slider-wrapper">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <button className="slide-button">Shop Now</button>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-btn prev" onClick={prevSlide}>‹</button>
          <button className="slider-btn next" onClick={nextSlide}>›</button>
          <div className="slider-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Welcome to Online BookStore, your one-stop destination for all your reading needs. 
                We are passionate about books and committed to providing you with the best selection 
                of books from around the world.
              </p>
              <p>
                Our mission is to make reading accessible to everyone. We offer a wide range of genres 
                including fiction, non-fiction, science fiction, mystery, romance, and many more. 
                Whether you're looking for the latest bestsellers or timeless classics, we have something 
                for every reader.
              </p>
              <p>
                With over 10,000 books in our collection and new titles added weekly, we ensure that 
                you always have access to the latest and greatest in literature. Our team of book 
                enthusiasts carefully curates our selection to bring you only the best.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <h3>10,000+</h3>
                <p>Books Available</p>
              </div>
              <div className="stat-item">
                <h3>50,000+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat-item">
                <h3>100+</h3>
                <p>Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                  <div className="product-overlay">
                    <button className="quick-view-btn">Quick View</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-author">{product.author}</p>
                  <p className="product-price">{product.price}</p>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;