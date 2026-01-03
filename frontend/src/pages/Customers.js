import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Style.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/customers");
        setCustomers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${id}`);
      setCustomers(customers.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 align="center">Customers</h1>

      <button className="addHome">
        <Link to="/Add" style={{ color: "inherit", textDecoration: "none" }}>
          Add +
        </Link>
      </button>

      <div className="app">
        <div className="customers">
          <table border="2" width="80%">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Book Title</th>
                <th>Book Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td>{customer.book_title}</td>
                  <td>
                    {customer.book_image && (
                      <img
                        src={`http://localhost:5000/images/${customer.book_image}`}
                        alt="customer"
                        width="60"
                      />
                    )}
                  </td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>

                    <button className="update">
                      <Link
                        to={`/update/${customer.id}`}
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        Update
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}

              {customers.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
