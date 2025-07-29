import { useEffect, useState } from 'react';
import { ListingCard } from './ListingCard.jsx';

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const ListingsCarousel = ({ listings }) => {
  const [chunkSize, setChunkSize] = useState(1);
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setChunkSize(3);
      } else if (window.innerWidth >= 768) {
        setChunkSize(2);
      } else {
        setChunkSize(1);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update active slide when URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const slideNumber = parseInt(hash.replace('#slide', ''));
      if (!isNaN(slideNumber)) {
        setActiveSlide(slideNumber);
      }
    };

    // Set initial active slide
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (!listings || listings.length === 0) return null;
  const chunkedListings = chunkArray(listings, chunkSize);

  return (
    <div className="w-full">
      <div className="carousel w-full py-8">
        {chunkedListings.map((chunk, idx) => (
          <div
            key={idx}
            id={`slide${idx + 1}`}
            className="carousel-item relative w-full"
          >
            <div className={`flex w-full gap-6 justify-center items-center`}>
              {chunk.map(listing => (
                <div
                  key={listing._id}
                  className={
                    chunkSize === 1
                      ? 'max-w-xs w-full flex-shrink-0 mx-auto'
                      : 'flex-1 min-w-0 max-w-xs'
                  }
                >
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {chunkedListings.length > 1 && (
        <div className="flex w-full justify-center gap-2 py-2">
          {chunkedListings.map((_, idx) => (
            <a 
              key={idx} 
              href={`#slide${idx + 1}`} 
              className={`btn btn-xs ${activeSlide === idx + 1 ? 'bg-accent border-accent text-accent-content' : ''}`}
            >
              {idx + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsCarousel; 