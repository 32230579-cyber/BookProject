import React, { useState } from 'react';
import "./Search.css";

function Search(){
     const [books, setBooks] = useState([
   { id: "B1", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: "B2", title: "1984", author: "George Orwell" },
  { id: "B3", title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: "B4", title: "Pride and Prejudice", author: "Jane Austen" },
  { id: "B5", title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: "B6", title: "Moby Dick", author: "Herman Melville" },
  { id: "B7", title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: "B8", title: "Fahrenheit 451", author: "Ray Bradbury" },
  { id: "B9", title: "Jane Eyre", author: "Charlotte Brontë" },
  { id: "B10", title: "Crime and Punishment", author: "Fyodor Dostoevsky" },
  { id: "B11", title: "Brave New World", author: "Aldous Huxley" },
  { id: "B12", title: "The Alchemist", author: "Paulo Coelho" },
  { id: "B13", title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { id: "B14", title: "The Chronicles of Narnia", author: "C.S. Lewis" },
  { id: "B15", title: "War and Peace", author: "Leo Tolstoy" }
]);


    const [idValue, setIdValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const addBook = () => {
    if (idValue.trim() && titleValue.trim() && authorValue.trim()) {
      const updatedList = [...books, { id: idValue, title: titleValue, author: authorValue}];
      setBooks(updatedList);
      setIdValue("");
      setTitleValue("");
      setAuthorValue("");
    }
  };

  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

   const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchValue.toLowerCase())
   
  );


  return (
    
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search by title..."
      />

      <br></br>

      <input
        type="text"
        value={idValue}
        onChange={(e) => setIdValue(e.target.value)}
        placeholder="Book ID"
      />
      <input
        type="text"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
        placeholder="Book Title"
      />

      <input
        type="text"
        value={authorValue}
        onChange={(e) => setAuthorValue(e.target.value)}
        placeholder="Author"
      />
      <button onClick={addBook}>Add Book</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => removeBook(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Search;