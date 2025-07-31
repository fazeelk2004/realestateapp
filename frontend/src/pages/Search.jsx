/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import api from "../lib/axios";
import ListingItem from "../components/ListingItem.jsx";

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  })
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState(false);
  const [showMore, setShowMore] = useState(false);


  const handleChange = (e) => {
      if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
        setSidebardata({...sidebardata, type: e.target.id})
      }
      if(e.target.id === 'searchTerm'){
        setSidebardata({...sidebardata, searchTerm: e.target.value})
      }
      if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
        setSidebardata({...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false })
      }

      if(e.target.id === 'sort_order') {
        const sort = e.target.value.split('_')[0] || 'created_at';
        const order = e.target.value.split('_')[1] || 'desc';
        setSidebardata({...sidebardata, sort, order});
      }
  }
  console.log(listings)
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    if(
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }
    
     const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await api.get(`/listing/get?${searchQuery}`);
      const data = res.data;
      if(data.length > 8) {
        setShowMore(true);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();

  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    urlParams.set('offer', sidebardata.offer);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex', startIndex)
    const searchQuery = urlParams.toString();
    const res = await api.get(`/listing/get?${searchQuery}`);
    const data = res.data;
    if (data.length < 9) {
      setShowMore(false)
    }
    setListings([...listings, ...data]);
  }

  return (
    <div className='grid grid-cols-12 gap-3'>
      <div className="col-span-12 [@media(min-width:1185px)]:col-span-3 w-full [@media(min-width:1185px)]:h-[400px] px-4 mt-10 flex justify-center">
        <div className="card bg-base-100/90 border border-base-300 w-full max-w-xl p-4 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col [@media(min-width:350px)]:flex-row items-start [@media(min-width:350px)]:items-center gap-2">
              <label htmlFor="searchTerm" className="font-semibold text-lg w-full [@media(min-width:350px)]:w-20">Search:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search property..."
                className="input input-bordered border-accent w-full rounded-full"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col [@media(min-width:350px)]:flex-row items-start [@media(min-width:350px)]:items-center gap-2">
              <label className="font-semibold text-lg w-full [@media(min-width:350px)]:w-20">Type:</label>
              <div className="flex flex-wrap gap-4 justify-start [@media(min-width:350px)]:justify-center">
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="all" className="checkbox" onChange={handleChange} checked={sidebardata.type === 'all'} />
                  <label htmlFor="all">All</label>
                </div>
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="sale" className="checkbox" onChange={handleChange} checked={sidebardata.type === 'sale'} />
                  <label htmlFor="sale">Sell</label>
                </div>
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="rent" className="checkbox" onChange={handleChange} checked={sidebardata.type === 'rent'} />
                  <label htmlFor="rent">Rent</label>
                </div>
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="offer" className="checkbox" onChange={handleChange} checked={sidebardata.offer} />
                  <label htmlFor="rent">Offer</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col [@media(min-width:350px)]:flex-row items-start [@media(min-width:350px)]:items-center gap-2">
              <label className="font-semibold text-lg w-full [@media(min-width:350px)]:w-20 me-7">Amenities:</label>
              <div className="flex flex-wrap gap-4 justify-start [@media(min-width:350px)]:justify-center">
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="furnished" className="checkbox" onChange={handleChange} checked={sidebardata.furnished} />
                  <label htmlFor="all">Furnished</label>
                </div>
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="parking" className="checkbox" onChange={handleChange} checked={sidebardata.parking} />
                  <label htmlFor="sale">Parking</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col [@media(min-width:350px)]:flex-row items-start [@media(min-width:350px)]:items-center gap-2">
              <label className="font-semibold text-lg w-full [@media(min-width:350px)]:w-20 ">Sort:</label>
              <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className="select select-bordered w-48">
                <option value='createdAt_desc'>Sort By Latest</option>
                <option value='createdAt_asc'>Sort By Oldest</option>
                <option value='regularPrice_desc'>Price High To Low</option>
                <option value='regularPrice_asc'>Price Low To High</option>
              </select>
            </div>
            <button className='btn btn-accent'>Search</button>
          </form>
        </div>
      </div>
      <div className="col-span-12 [@media(min-width:1185px)]:col-span-9 mt-5">
        <h1 className="text-3xl text-base-200 font-bold text-center">LISTING RESULT</h1>

        {/* Message + Loading */}
        <div className="flex justify-center px-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-base-200 font-bold text-center">NO LISTING FOUND!</p>
          )}
          {loading && (
            <span className="loading loading-circle w-40 text-accent"></span>
          )}
        </div>

        {/* Flexbox listings wrapper */}
        <div className="flex flex-wrap justify-center gap-10 px-4 mt-4">
          {!loading && listings && listings.map((listing) => (
            <div
              key={listing._id}
              className="flex-shrink-0 basis-full sm:basis-[45%] xl:basis-[30%] max-w-sm"
            >
              <ListingItem listing={listing} />
            </div>
          ))}
          
        </div>
        <div className="flex justify-center">
          {showMore && (
            <button className="btn btn-base-100 my-10" onClick={()=>{
              onShowMoreClick()
            }}>
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search