import React from "react";
import BookItem from "./BookItem";

function BookList({ books }) {
    if (!books || books.length === 0) return <p>No books found.</p>;

    return (
        <div className="book-list">
            {books.map((book) => (
                <BookItem key={book.key} book={book} />
            ))}
        </div>
    );
}

export default BookList;
