import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';

export const ListingCard = ({ listing }) => {
  const { name, description, address, imageUrls } = listing;

  return (
    <Link to="" className='card bg-primary p-4 hover:border-[#00c3ff] transition-all duration-200 border-t-4 border-solid border-[#8FA0B8] h-96 overflow-hidden'>
      <div className="w-full h-48 overflow-hidden">
        <img src={imageUrls} alt={name} className='w-full h-48 object-cover rounded-lg' />
      </div>
      <div className='card-body pt-4'>
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
    </Link>
  );
};
