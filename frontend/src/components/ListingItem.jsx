import { Link } from 'react-router-dom';
import { Bath, Bed, Check, MapPin, ParkingSquare, Sofa, X } from 'lucide-react';

export default function ListingItem({ listing }) {
  return (
    <div className='card bg-base-100/90 mt-2 overflow-hidden rounded-lg w-full sm:w-[400px] h-full p-2 hover:scale-105 transition-scale duration-300'>
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0] ||'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'}
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover '
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <span className='truncate text-lg font-semibold'>
            {listing.name}
          </span>
          <div className='flex items-center gap-1'>
            <MapPin className='h-4 w-4 text-accent' />
            <p className='text-sm text-gray-400 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-400 line-clamp-1 mb-2'>
            {listing.description}
          </p>
          {listing.offer === true ? (
            <div className='flex items-center gap-2 justify-between'>
                <span className='text-sm text-base-content/40 overflow-hidden text-ellipsis whitespace-nowrap font-bold'>Original Price: <span className='line-through'> ${listing.regularPrice}</span> </span>
                <span className='text-sm text-base-content/100 overflow-hidden text-ellipsis whitespace-nowrap font-bold'>Discounted Price: ${listing.regularPrice - listing.discountPrice}</span>
            </div>
            ) : (
            <span className='text-sm text-base-content/100 overflow-hidden text-ellipsis text-end whitespace-nowrap font-bold'>Price: ${listing.regularPrice}</span>
            )}
          <div className='text-white mt-3 flex gap-7'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? <span className='flex items-center gap-2'><Bed/>{listing.bedrooms} Beds </span>
                : <span className='flex items-center gap-2'><Bed/>{listing.bedrooms} Bed </span>}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? <span className='flex items-center gap-2'><Bath/>{listing.bathrooms} Beds </span>
                : <span className='flex items-center gap-2'><Bath/>{listing.bathrooms} Bed </span>}
            </div>
            <div className='font-bold text-xs'>
              {listing.furnished
                ? <span className='flex items-center gap-2'><Sofa/><Check/> </span>
                : <span className='flex items-center gap-2'><Sofa/><X/> </span>}
            </div>
            <div className='font-bold text-xs'>
              {listing.parking
                ? <span className='flex items-center gap-2'><ParkingSquare/><Check/> </span>
                : <span className='flex items-center gap-2'><ParkingSquare/><X/> </span>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}


// import { PenSquare, Trash2 } from 'lucide-react';
// import { Link, useNavigate } from 'react-router';

// export default function ListingItem({ listing }) {
//   return (
//     <Link to={`/listing/${listing._id}`} className='card bg-primary p-4 hover:border-[#00c3ff] hover:scale-105 transition-all duration-200 border-t-4 border-solid border-[#8FA0B8] h-96 overflow-hidden'>
//       <div className="h-full w-full overflow-hidden">
//         <img src={listing.imageUrls[0]} alt={listing.name} className='w-full h-full rounded-t-lg object-cover' />
//       </div>
//       <div className='card-body pt-4'>
//         <h3 className='card-title text-base-content overflow-hidden text-ellipsis whitespace-nowrap'>{listing.name}</h3>
//         <span className='text-base-content/70 overflow-hidden text-ellipsis whitespace-nowrap'>{listing.description}</span>
//         <span className='text-sm text-base-content/60 overflow-hidden text-ellipsis whitespace-nowrap'>{listing.address}</span>
//         {listing.offer === true ? (
//           <div className='flex items-center gap-2 justify-between'>
//             <span className='text-sm text-base-content/40 overflow-hidden text-ellipsis whitespace-nowrap font-bold line-through'>${listing.regularPrice}</span>
//             <span className='text-sm text-base-content/100 overflow-hidden text-ellipsis whitespace-nowrap font-bold'>${listing.regularPrice - listing.discountPrice}</span>
//           </div>
//         ) : (
//           <span className='text-sm text-base-content/100 overflow-hidden text-ellipsis text-end whitespace-nowrap font-bold'>${listing.regularPrice}</span>
//         )}
//         <div className="flex justify-end gap-3">
//           <PenSquare onClick={handleEdit} className='text-green-600 hover:text-green-600/70 cursor-pointer w-5' />
//           <Trash2 onClick={e => { e.preventDefault(); onDeleteClick(listing); }} className='text-red-600 hover:text-red-600/70 cursor-pointer w-5' />
//         </div>
//       </div>
//     </Link>
//   );
// }