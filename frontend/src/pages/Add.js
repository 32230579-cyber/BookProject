import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Style.css";

const Add = () => {
  const [customer, setCustomer] = useState({
    "first-name": "",
    "last-name": "",
    email: "",
    address: "",
    book_title: "",
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Handle file selection
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();

    if (
      !customer["first-name"] ||
      !customer["last-name"] ||
      !customer.email ||
      !customer.address ||
      !customer.book_title ||
      !file
    ) {
      setError("Please fill all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", customer["first-name"]);
    formData.append("last_name", customer["last-name"]);
    formData.append("email", customer.email);
    formData.append("address", customer.address);
    formData.append("book_title", customer.book_title);
    formData.append("book-image", file);

    try {
      await axios.post("http://localhost:5000/customers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/customers");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while adding the customer.");
    }
  };

  return (
    <div className="app">
      <div className="form">
        <h1>Add New Customer</h1>

        <input
          name="first-name"
          placeholder="First Name"
          value={customer["first-name"]}
          onChange={handleChange}
        />

        <input
          name="last-name"
          placeholder="Last Name"
          value={customer["last-name"]}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
        />

        <input
          name="book_title"
          placeholder="Book Title"
          value={customer.book_title}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleFile} />

        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            style={{ width: "100px", marginTop: "10px" }}
          />
        )}

        <button onClick={handleClick}>Add Customer</button>

        {error && <p className="error">{error}</p>}

        <Link to="/customers" style={{ display: "block", marginTop: "10px" }}>
          See all Customers
        </Link>
      </div>
    </div>
  );
};

export default Add;
