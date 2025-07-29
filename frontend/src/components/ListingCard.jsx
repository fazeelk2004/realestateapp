import { Link } from 'react-router';

export const ListingCard = ({ listing }) => {

  return (
    <Link to="" className='card bg-primary p-4 hover:border-[#00c3ff] hover:scale-105 transition-all duration-200 border-t-4 border-solid border-[#8FA0B8] h-96 overflow-hidden'>
      <div className="w-full h-full overflow-hidden">
        <img src={listing.imageUrls[0]} alt={listing.name} className='rounded-t-lg object-cover' />
      </div>
      <div className='card-body pt-4'>
        <h3 className='card-title text-base-content overflow-hidden text-ellipsis whitespace-nowrap'>{listing.name}</h3>
        <span className='text-base-content/70 overflow-hidden text-ellipsis whitespace-nowrap'>{listing.description}</span>
        <span className='text-sm text-base-content/60 overflow-hidden text-ellipsis whitespace-nowrap'>{listing.address}</span>
          {listing.offer === true ? (
            <div className='flex items-center gap-2 justify-between'>
              <span className='text-sm text-base-content/40 overflow-hidden text-ellipsis whitespace-nowrap font-bold line-through'>${listing.regularPrice}</span>
              <span className='text-sm text-base-content/100 overflow-hidden text-ellipsis whitespace-nowrap font-bold'>${listing.regularPrice - listing.discountPrice}</span>
            </div>
          ) : (
            <span className='text-sm text-base-content/100 overflow-hidden text-ellipsis text-end whitespace-nowrap font-bold'>${listing.regularPrice}</span>
          )}
      </div>
    </Link>
  );
};
