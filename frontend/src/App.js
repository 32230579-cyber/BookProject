import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './components/Search';
import './index.css';
import Features from './pages/Features';
import ContactUs from './components/ContactUs';
import BookList from './components/BookList';
import Customers from './pages/Customers';
import Add from './pages/Add';
import Update from './pages/Update';
function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/booklist" element={<BookList />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/add" element ={<Add />}/>
        <Route path="/update/:id" element ={<Update />}/>          
      
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

