import React from "react";

function BookItem({ book }) {
    const coverImage = book.cover_i 
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
        : "https://via.placeholder.com/128x193.png?text=No+Cover";

    return (
        <div className="book-item">
            <img src={coverImage} alt={`${book.title} cover`} />
            <div className="book-info">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author_name ? book.author_name.join(", ") : "N/A"}</p>
                <p><strong>Year:</strong> {book.first_publish_year || "N/A"}</p>
            </div>
        </div>
    );
}

export default BookItem;
