import { useEffect, useState } from 'react'
import { Bath, Bed, Check, Cross, MapPin, ParkingSquare, Sofa } from 'lucide-react'
import { useParams } from 'react-router'
import api from '../lib/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const Listing = () => {
  SwiperCore.use([Pagination, Autoplay]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const listingId = params.listingId;
        const res = await api.get(`/listing/get/${listingId}`)
        const data = res.data;
        if (data.success === false){
          console.log(data.message);
          setError(true);
          setLoading(false);
          return
        }
        setListing(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    }
    fetchListing();
  }, [params.listingId])
  console.log(listing)

  return (
    <div className='flex justify-center items-center flex-col'>
      {loading && <span className="loading loading-circle w-40 text-accent"></span>}
      {error && <span>Something went wrong, Please refresh the page</span>}
      {listing && !error && !loading && 
        <div className='w-full  border-8 border-t-0 border-base-200'>
          <Swiper pagination = {{clickable: true}} autoplay = {{delay: 3000}}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="h-full sm:h-[500px] w-full flex justify-center items-center bg-transparent ">
                  <img
                    src={url}
                    alt="listing"
                    className="h-full w-full"  
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
      {listing && !error && !loading && 
        <div className='p-4 gap-3 w-full max-w-7xl'>
          <h1 className='text-4xl text-base-200 font-extrabold '>{listing.name}</h1>
          <p className='text-md text-base-200/80 font-semibold flex gap-2 my-3'><MapPin/>{listing.address}</p>
          <div className='flex flex-col [@media(min-width:810px)]:flex-row justify-between items-center bg-base-200 p-2 px-5 rounded-xl mb-2 gap-3'>
            {listing.type === 'sale' ? (
              <button disabled className='btn disabled:bg-green-600 disabled:text-white w-40'>FOR SALE</button> ) : (
              <button disabled className='btn disabled:bg-red-600 disabled:text-white'>FOR RENT</button>
            )}
            <div className='grid grid-cols-12 gap-6'>
              <span className='flex gap-3 font-bold col-span-6 [@media(min-width:450px)]:col-span-3 justify-center'><Bed className='w-6 h-6'/>{listing.bedrooms}</span>
              <span className='flex gap-3 font-bold col-span-6 [@media(min-width:450px)]:col-span-3 justify-center'><Bath className='w-6 h-6'/>{listing.bathrooms}</span>
              <span className='flex gap-3 font-bold col-span-6 [@media(min-width:450px)]:col-span-3 justify-center'><Sofa className='w-6 h-6'/>{listing.furnished === true ? (<Check />):(<Cross />)}</span>
              <span className='flex gap-3 font-bold col-span-6 [@media(min-width:450px)]:col-span-3 justify-center'><ParkingSquare className='w-6 h-6'/>{listing.parking === true ? (<Check />):(<Cross />)}</span>
            </div>
            <div className='flex flex-col text-white font-semibold items-end'>
              {listing.offer ? (
                <>
                  <span className='text-xl'>
                    Original Price: <span className='line-through'>${listing.regularPrice}{listing.type === 'rent' ? ' / Month' : ''}</span>
                  </span>
                  <span className='text-xl'>
                    Discounted Price: ${listing.regularPrice - listing.discountPrice}{listing.type === 'rent' ? ' / Month' : ''}
                  </span>
                </>
              ) : (
                <span className='text-xl'>
                  Price: ${listing.regularPrice}{listing.type === 'rent' ? ' / Month' : ''}
                </span>
              )}
            </div>
          </div>
          <p className='text-base-200 text-lg font-bold'>Description - <span className='font-normal'>{listing.description}</span></p>
        </div>
      }
    </div>
  )
}

export default Listing