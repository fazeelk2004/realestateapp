import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/effect-coverflow'
import ListingItem from '../components/ListingItem';
import api from '../lib/axios';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Pagination, Autoplay, Navigation, EffectCoverflow]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await api.get('/listing/get?offer=true&limit=4');
        const data = res.data;
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await api.get('/listing/get?type=rent&limit=4');
        const data = res.data;
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await api.get('/listing/get?type=sale&limit=4');
        const data = res.data;
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Noble Acres is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='btn btn-accent bg-[#334155] border-[#334155]'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper pagination = {{clickable: true}} autoplay = {{delay: 3000}}>
        {saleListings &&
          saleListings.length > 0 &&
          saleListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1 },
                770: { slidesPerView: 2 },
                1145: { slidesPerView: 3 },
              }}
              spaceBetween={20}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              modules={[Pagination, Autoplay]}
              className="my-10"
            >
              {offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div className="h-full w-full p-2 mb-10">
                    <ListingItem listing={listing} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1 },
                770: { slidesPerView: 2 },
                1145: { slidesPerView: 3 },
              }}
              spaceBetween={20}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              modules={[Pagination, Autoplay]}
              className="my-10 "
            >
              {saleListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div className="h-full w-full p-2 mb-10">
                    <ListingItem listing={listing} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1 },
                770: { slidesPerView: 2 },
                1145: { slidesPerView: 3 },
              }}
              spaceBetween={20}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              modules={[Pagination, Autoplay]}
              className="my-10"
            >
              {rentListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div className="h-full w-full p-2 mb-10">
                    <ListingItem listing={listing} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        
      </div>
    </div>
  );
}