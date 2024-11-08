import React, { useState } from "react";
import BookList from "./components/BookList";
import "./App.css";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false); // New state for toggling search/results view

    // Fetch books based on search term
    const handleSearch = async () => {
        if (searchTerm.trim() === "") return;

        setLoading(true);
        setIsSearching(true); // Switch to results view
        try {
            const response = await fetch(`https://openlibrary.org/search.json?title=${searchTerm}`);
            const data = await response.json();
            setBooks(data.docs);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle "Back" button click to reset view
    const handleBack = () => {
        setIsSearching(false); // Switch back to search view
        setBooks([]); // Clear the search results
        setSearchTerm(""); // Clear the search term input
    };

    return (
        <div className="app">
            <div className="overlay">
                <h1>Book Finder</h1>

                {/* Back button - only visible when in results view */}
                {isSearching && (
                    <button className="back-button" onClick={handleBack}>
                        &larr; Back
                    </button>
                )}

                {/* Search input and button, hidden when in results view */}
                {!isSearching && (
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Enter book title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                )}

                {/* Show loading message or book results */}
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : (
                    isSearching && <BookList books={books} />
                )}
            </div>
        </div>
    );
}

export default App;
