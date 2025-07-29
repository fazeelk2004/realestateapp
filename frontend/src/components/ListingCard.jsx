import { PenSquare, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export const ListingCard = ({ listing, onDeleteClick }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/listing/${listing._id}/edit`);
  };

  return (
    <Link to={`/listing/${listing._id}`} className='card bg-primary p-4 hover:border-[#00c3ff] hover:scale-105 transition-all duration-200 border-t-4 border-solid border-[#8FA0B8] h-96 overflow-hidden'>
      <div className="h-full w-full overflow-hidden">
        <img src={listing.imageUrls[0]} alt={listing.name} className='w-full h-full rounded-t-lg object-cover' />
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
        <div className="flex justify-end gap-3">
          <PenSquare onClick={handleEdit} className='text-green-600 hover:text-green-600/70 cursor-pointer w-5' />
          <Trash2 onClick={e => { e.preventDefault(); onDeleteClick(listing); }} className='text-red-600 hover:text-red-600/70 cursor-pointer w-5' />
        </div>
      </div>
    </Link>
  );
};
