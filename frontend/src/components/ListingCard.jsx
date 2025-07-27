import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';

export const ListingCard = ({ listing }) => {
  const { name, description, address } = listing;

  return (
    <div className='card bg-base-100 hover:border-[#00FF9D] transition-all duration-200 border-t-4 border-solid border-[#1b362c]'>
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{name}</h3>
        <p className='text-base-content/70 line-clamp-3'>{description}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>{address}</span>
          <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4 text-gray-500 hover:text-white transition-colors duration-200 mx-2' />
            <Trash2Icon className='size-4 text-red-400 hover:text-red-800 transition-colors duration-200 mx-2' />
          </div>
        </div>
      </div>
    </div>
  );
};
