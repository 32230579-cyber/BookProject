
import './App.css';
import NavBar from './components/NavBar';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import About from './pages/About';
import Home from './pages/Home';
import Footer from './components/Footer';

import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'; 
function App() {
  
  return (
      <div className="App">
      <Router>
        <NavBar /> 
        <Routes>
          <Route path ="/" excat Component={Home}/>
          <Route path ="/menu" excat Component={Menu}/>
          <Route path ="/about" excat Component={About}/>
          <Route path ="/contact" excat Component={Contact}/>
        </Routes>
        <p> Hi </p>
        <Footer />
        </Router>     
    </div>
  );
}

export default App;
