import React from 'react'

const Search = () => {
  return (
    <div className='grid grid-cols-12 gap-3'>
      <div className="col-span-12 [@media(min-width:1185px)]:col-span-3 w-full px-4 mt-10 flex justify-center">
        <div className="card bg-base-100/90 border border-base-300 w-full max-w-xl p-4 rounded-lg shadow-md">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col [@media(min-width:350px)]:flex-row items-start [@media(min-width:350px)]:items-center gap-2">
              <label htmlFor="searchTerm" className="font-semibold text-lg w-full [@media(min-width:350px)]:w-20">Search:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search property..."
                className="input input-bordered border-accent w-full rounded-full"
              />
            </div>
            <div className="flex flex-col [@media(min-width:350px)]:flex-row items-start [@media(min-width:350px)]:items-center gap-2">
              <label className="font-semibold text-lg w-full [@media(min-width:350px)]:w-20">Type:</label>
              <div className="flex flex-wrap gap-4 justify-start [@media(min-width:350px)]:justify-center">
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="all" className="checkbox" />
                  <label htmlFor="all">All</label>
                </div>
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="sale" className="checkbox" />
                  <label htmlFor="sale">Sell</label>
                </div>
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="rent" className="checkbox" />
                  <label htmlFor="rent">Rent</label>
                </div>
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="offer" className="checkbox" />
                  <label htmlFor="rent">Offer</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col [@media(min-width:350px)]:flex-row items-start [@media(min-width:350px)]:items-center gap-2">
              <label className="font-semibold text-lg w-full [@media(min-width:350px)]:w-20 me-7">Amenities:</label>
              <div className="flex flex-wrap gap-4 justify-start [@media(min-width:350px)]:justify-center">
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="furnished" className="checkbox" />
                  <label htmlFor="all">Furnished</label>
                </div>
                <div className="flex items-center gap-1">
                  <input type="checkbox" id="parking" className="checkbox" />
                  <label htmlFor="sale">Parking</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col [@media(min-width:350px)]:flex-row items-start [@media(min-width:350px)]:items-center gap-2">
              <label className="font-semibold text-lg w-full [@media(min-width:350px)]:w-20 ">Sort:</label>
              <select id='sort_order' className="select select-bordered w-48">
                <option>Sort By Latest</option>
                <option>Sort By Oldest</option>
                <option>Price High To Low</option>
                <option>Price Low To High</option>
              </select>
            </div>
            <button className='btn btn-accent'>Search</button>
          </form>
        </div>
      </div>
      <div className="col-span-12 [@media(min-width:1058px)]:col-span-9 mt-5 justify-center">
        <h1 className="text-3xl text-base-200 font-bold text-center">LISTING RESULT</h1>
      </div>
    </div>
  )
}

export default Search