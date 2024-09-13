import React, { useState,useEffect  } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import documents from './data'; // Importing the document data
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



const DocumentList = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [filteredDocuments, setFilteredDocuments] = useState(documents);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [bookmarks, setBookmarks] = useState([]); // State to store bookmarks
    const [showBookmarkPopup, setShowBookmarkPopup] = useState(false);
    useEffect(() => {
        // Load bookmarks from local storage on component mount
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarks(savedBookmarks);
    }, []);
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchText(value);
        filterDocuments(value, selectedSubject, selectedUniversity);
    };

    const handleSubjectChange = (event) => {
        const value = event.target.value;
        setSelectedSubject(value);
        filterDocuments(searchText, value, selectedUniversity);
    };

    const handleUniversityChange = (event) => {
        const value = event.target.value;
        setSelectedUniversity(value);
        filterDocuments(searchText, selectedSubject, value);
    };

    const clearFilters = () => {
        setSearchText('');
        setSelectedSubject('');
        setSelectedUniversity('');
        setFilteredDocuments(documents);
    };

    const filterDocuments = (search, subject, university) => {
        const filtered = documents.filter((doc) => {
            return (
                (search === '' || doc.title.toLowerCase().includes(search.toLowerCase())) &&
                (subject === '' || doc.subject.toLowerCase() === subject.toLowerCase()) &&
                (university === '' || doc.universities.toLowerCase() === university.toLowerCase())
            );
        });
        setFilteredDocuments(filtered);
    };

    const handleViewDocumentClick = (url) => {
        if (url) {
            setPdfUrl(url);
        } else {
            console.error('PDF download link is not available.');
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1); // Reset to the first page when a new document is loaded
    };

    const handleNextPage = () => {
        if (pageNumber < numPages) setPageNumber(pageNumber + 1);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    const handleZoomIn = () => {
        setZoomLevel(zoomLevel + 0.2);
    };

    const handleZoomOut = () => {
        if (zoomLevel > 0.5) {
            setZoomLevel(zoomLevel - 0.2);
        }
    };
    const handleBookmarkClick = () => {
        // Save the current page to local storage
        const newBookmark = { pdfUrl, pageNumber };
        const updatedBookmarks = [...bookmarks, newBookmark];
        setBookmarks(updatedBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        setShowBookmarkPopup(true); // Show the bookmark popup
    };

    const handlePdfLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className='my-3'>
            <div className='container text-primary'>
                <h1 className="">Search Study Resources</h1>
                <p style={{color: 'gainsboro'}}>Find solved assignments, academic reports, presentations, dissertations, class notes, and more</p>
            </div>

            <div className="mt-4 p-3" style={{ background: 'gainsboro' }}>
                {/* Search Input with Right Icon Button */}
                <div className="input-group mb-3" style={{ width: '60%' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for assignments, samples, and resources..."
                        value={searchText}
                        onChange={handleSearch}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>

                <div className="row">
                    <div className="col-md-9">
                        <div className="d-flex justify-content-between mb-3 my-2">
                            {/* Subject Dropdown */}
                            <select
                                className="form-select"
                                value={selectedSubject}
                                onChange={handleSubjectChange}
                            >
                                <option value="">Subject</option>
                                <option value="HTML">HTML</option>
                                <option value="REACT">REACT</option>
                                <option value="CSS">CSS</option>
                                <option value="JAVASCRIPT">JAVASCRIPT</option>
                            </select>
                            
                            {/* University Dropdown */}
                            <select
                                className="form-select mx-2"
                                value={selectedUniversity}
                                onChange={handleUniversityChange}
                            >
                                <option value="">Universities</option>
                                <option value="University of Tokyo">University of Tokyo</option>
                                <option value="Stanford University">Stanford University</option>
                                <option value="Harvard University">Harvard University</option>
                                <option value="University of Oxford">University of Oxford</option>
                            </select>

                            {/* Clear All Button */}
                            <button className="btn  col-sm-3" onClick={clearFilters}>
                            <i className="fas fa-refresh"></i>Clear all
                            </button>
                        </div>
                    </div>
                </div>

                {/* Document List */}
                <div className="row">
                    {filteredDocuments.map((doc) => (
                        <div key={doc.id} className="col-md-3 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={doc.image}
                                    className="card-img-top"
                                    alt={doc.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{doc.title}</h5>
                                    <div className="row">
                                        <div className="col">
                                            <p className='rounded text-light p-1' style={{ backgroundColor: 'navy' }}>
                                                <i className="fas fa-file-pdf"></i>|{doc.downloads}
                                            </p>
                                        </div>
                                        <div className="col">
                                            <p className='rounded text-light p-1' style={{ backgroundColor: 'navy' }}>
                                                <i className="fas fa-file-word"></i>|{doc.words}
                                            </p>
                                        </div>
                                        <div className="col">
                                            <p className='rounded text-light p-1' style={{ backgroundColor: 'navy' }}>
                                                <i className="fas fa-eye"></i>|{doc.pages}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <button
                                            className="btn btn-primary btn-block"
                                            onClick={() => handleViewDocumentClick(doc.pdf)}
                                            style={{ backgroundColor: 'navy' }}
                                        >
                                            View document
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for displaying the PDF viewer */}
                 {/* Modal for displaying the PDF viewer */}
            {pdfUrl && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Document Viewer</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setPdfUrl(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
                                    <div style={{ height: '500px', zoom: zoomLevel }}>
                                        <Viewer
                                            fileUrl={pdfUrl}
                                            onDocumentLoadSuccess={onDocumentLoadSuccess}
                                            onPageChange={({ pageNumber }) => setPageNumber(pageNumber)}
                                            initialPage={pageNumber - 1}
                                        />
                                    </div>
                                </Worker>
                            </div>
                            <div className='text-center'>
                                <div className="modal-footer d-flex justify-content-center bg-primary rounded-4 w-75 mb-3 " style={{ marginLeft: "15%" }}>
                                    {/* Previous, Next, Zoom, and Download controls */}
                                    <button className="btn btn-light rounded-5" onClick={handlePreviousPage}>
                                        <i className="fas fa-arrow-left"></i>
                                    </button>
                                    <div className="pagination-controls bg-light rounded-4 p-2" style={{ fontSize: '13px' }}>
                                        <span className="mx-2 fw-bold">{pageNumber} Out of {numPages}</span>
                                    </div>
                                    <button className="btn btn-light rounded-5" onClick={handleNextPage}>
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                    <div className="zoom-controls">
                                        <button className="btn btn-light mx-2 rounded-5" onClick={handleZoomOut}>
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <button className="btn btn-light rounded-5 mx-2" onClick={handleZoomIn}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <a href={pdfUrl} className="btn btn-light rounded-4 fw-bold" download>
                                        Download PDF
                                    </a>
                                    {/* Bookmark Controls */}
                                    <button className="btn btn-light mx-2 rounded-5" onClick={handleBookmarkClick}>
                                        <i className="fas fa-bookmark"></i> Add Bookmark
                                    </button>
                                    {/* Display Bookmark Popup */}
            {showBookmarkPopup && (
                <div className="bookmark-popup">
                    <p>Bookmark saved!</p>
                    <button onClick={() => setShowBookmarkPopup(false)}>Close</button>
                </div>
            )}
                                </div>
                            </div>

                          
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default DocumentList;
