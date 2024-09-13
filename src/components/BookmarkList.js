import React, { useState, useEffect } from 'react';

const BookmarkList = () => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        // Fetch bookmarks from localStorage when the component mounts
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarks(savedBookmarks);
    }, []);

    return (
        <div className='my-4'>
            <h2>Saved Bookmarks</h2>
            {bookmarks.length > 0 ? (
                <ul>
                    {bookmarks.map((bookmark, index) => (
                        <li key={index}>
                            <a href={bookmark.pdfUrl} target="_blank" rel="noopener noreferrer">
                                {`PDF at Page ${bookmark.pageNumber}`}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookmarks saved.</p>
            )}
        </div>
    );
};

export default BookmarkList;
