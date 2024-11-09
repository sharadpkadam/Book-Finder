import React, { useState } from "react";
import BookList from "./components/BookList";
import "./App.css";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false); 

    const handleSearch = async () => {
        if (searchTerm.trim() === "") return;

        setLoading(true);
        setIsSearching(true); 
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

    const handleBack = () => {
        setIsSearching(false); 
        setBooks([]);
        setSearchTerm(""); 
    };

    return (
        <div className="app">
            <div className="overlay">
                <h1>Book Finder</h1>

                {isSearching && (
                    <button className="back-button" onClick={handleBack}>
                        &larr; Back
                    </button>
                )}

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
