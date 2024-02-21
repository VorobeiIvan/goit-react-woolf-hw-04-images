import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import fetchImages from './api/fetchImages';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    if (query !== '') {
      fetchImagesData(query, page); 
    }
  }, [query, page]); 
  const fetchImagesData = async (query, page) => {
    setLoading(true);
    try {
      const data = await fetchImages(query, page);
      const { hits, totalHits } = data;
      if (hits.length === 0) {
        setAllImagesLoaded(true);
      }
        if (page === 1) {
        setImages(hits);
      } else {
        setImages(prevImages => [...prevImages, ...hits]);
      }
      setError(hits.length === 0 ? 'No images found' : null);
      setAllImagesLoaded(page >= Math.ceil(totalHits / 12));
    } catch (error) {
      setError('Error fetching images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1); 
    setImages([]); 
    setAllImagesLoaded(false);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <p>{error}</p>}
      {loading && <Loader />}
      <ImageGallery images={images} handleImageClick={handleImageClick} />
      {images.length > 0 && !loading && !allImagesLoaded && (
        <Button onClick={loadMoreImages}>Load more</Button>
      )}
      {allImagesLoaded && <p>All images loaded for this query.</p>}
      {showModal && <Modal src={largeImageURL} alt="" onClose={closeModal} />}
    </div>
  );
};

export default App;
