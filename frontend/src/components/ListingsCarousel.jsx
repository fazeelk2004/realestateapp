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

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setChunkSize(3);
      } else {
        setChunkSize(1);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!listings || listings.length === 0) return null;
  const chunkedListings = chunkArray(listings, chunkSize);

  return (
    <div className="carousel w-full">
      {chunkedListings.map((chunk, idx) => (
        <div
          key={idx}
          id={`slide${idx + 1}`}
          className="carousel-item relative w-full"
        >
          <div className={`flex w-full gap-4 ${chunkSize === 1 ? 'justify-center items-center' : 'justify-center'} `}>
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
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={`#slide${idx === 0 ? chunkedListings.length : idx}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${idx === chunkedListings.length - 1 ? 1 : idx + 2}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingsCarousel; 