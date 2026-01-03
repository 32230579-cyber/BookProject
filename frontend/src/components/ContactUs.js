import React from "react";
import "./ContactUs.css";

function Contact(){
    return(
        <div className= "contact-container">
            <h1>Contact Us</h1>

            <p className="contact-intro">
                   Have questions? Our team is here to help you with orders, book recommendations, and support.
                    </p>

                    <div className="contact-box">
                        <h2>Send us a Meassage</h2>

                        <form className="contact-form">
                            <input type="text" placeholder="Your Name" required />
                            <input type="email" placeholder="Your Email" required />
                            <textarea placeholder="Your Message" rows="5" required></textarea>
                          <button type="submit">Send Message</button>
                        </form>
                    </div>

                  <div className="contact-info"> 
                    <h3>📍 Phone:81274332</h3>
                    <h3>📧 Email: support@bookstore.com</h3>
                     <h3>📍 Location: Beirut, Lebanon</h3>
                  </div>
        </div>
    )
}
export default Contact;
