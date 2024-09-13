import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentList from './components/DocumentList';
// import PdfViewer from './components/PdfViewer';
import NavBar from './components/NavBar';
import BookmarkList from './components/BookmarkList';

const App = () => {
  return (
    <Router>
       <NavBar/>
      <Routes>
       
        {/* Define the route for the Document List page */}
        <Route path="/" element={<DocumentList />} />
        {/* Define the route for the PDF Viewer page */}
        <Route path="/booklist" element={<BookmarkList />} />
      </Routes>
    </Router>
  );
};

export default App;
