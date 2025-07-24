import { ArrowLeft, FilePlus2, Key, Mail, User } from "lucide-react";
import { Link } from "react-router";
import OAuth from "../components/OAuth";
import { useState } from "react";
import bannerListing from "../assets/banner-listing.png";


const CreateListing = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }


  return (
    <main className='flex flex-col justify-center items-center m-10 p-3 max-w-7xl mx-auto'>
      <div className="flex items-center justify-center mx-5 ">
        <div className="card bg-base-100 card-border border-base-300 w-full min-w-full overflow-hidden">
          <div className="border-base-300 border-b border-dashed">
            <div className="flex items-center gap-2 p-4">
              <div className="grow">
                <div className="flex items-center gap-2 text-sm font-medium justify-between">
                  <span className="flex flex-col gap-4">
                      <img src={bannerListing} alt="" className="hidden lg:inline" /> 
                    <span className="flex items-center justify-center gap-2 lg:hidden mx-6">  
                      <FilePlus2 className="h-6 w-6" />
                      <h1 className="text-base-content text-3xl font-extrabold ">CREATE LISTING</h1>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body gap-4">
            <form className="flex flex-col sm:flex-row gap-10">
              <div className="flex flex-col gap-6 flex-1">
                <input type="text" placeholder="Name" className="input input-bordered overflow-auto border-accent rounded-box flex items-center font-semibold text-lg gap-2 w-full" id="name" maxLength='62' minLength='10' required/>
                <textarea type="text" placeholder="Description" className="textarea textarea-bordered overflow-auto border-accent rounded-box flex items-center font-semibold text-lg gap-2 w-full" id="description" required/>
                <input type="text" placeholder="Address" className="input input-bordered overflow-auto border-accent rounded-box flex items-center font-semibold text-lg gap-2 w-full" id="address" required/>
                <div className="flex gap-6 flex-wrap">
                  <label className="items-center flex gap-3">
                    <span className="label-text">Sell</span>
                    <input type="checkbox" id="sell" className="checkbox border-accent" />
                  </label>
                  <label className="items-center flex gap-3">
                    <span className="label-text">Rent</span>
                    <input type="checkbox" id="rent" className="checkbox border-accent" />
                  </label>
                  <label className="items-center flex gap-3">
                    <span className="label-text">Parking Spot</span>
                    <input type="checkbox" id="parking" className="checkbox border-accent" />
                  </label>
                  <label className="items-center flex gap-3">
                    <span className="label-text">Furnished</span>
                    <input type="checkbox" id="furnished" className="checkbox border-accent" />
                  </label>
                  <label className="items-center flex gap-3">
                    <span className="label-text">Offer</span>
                    <input type="checkbox" id="offer" className="checkbox border-accent" />
                  </label>   
                </div>
                <div className="flex gap-6 flex-wrap">
                  <label className="items-center flex gap-2">
                    <input type="number" id="bedroom" min='1' max='10' required className="input input-bordered border-accent font-bold w-16" />
                    <span className="label-text">Bedrooms</span>
                  </label>
                  <label className="items-center flex gap-2">
                    <input type="number" id="bathroom" min='1' max='10' required className="input input-bordered border-accent font-bold w-16" />
                    <span className="label-text">Bathrooms</span>
                  </label>
                  <label className="items-center flex gap-2">
                    <input type="number" id="regularPrice" min='1' required className="input input-bordered border-accent font-bold w-50" />
                    <div className="flex flex-col items-center">
                      <span className="label-text">Regular Price</span>
                      <span className="text-xs text-gray-500">($ / Month)</span>
                    </div>
                  </label>
                  <label className="items-center flex gap-2">
                    <input type="number" id="discountPrice" min='1' required className="input input-bordered border-accent font-bold w-50" />
                    <div className="flex flex-col items-center">
                      <span className="label-text">Discounted Price</span>
                      <span className="text-xs text-gray-500">($ / Month)</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-6">
                <span className="font-semibold">IMAGES: <span className="text-gray-500 italic font-normal">THE FIRST IMAGE WILL BE THE COVER. (MAX 6)</span></span>
                <div className="flex items-center gap-3">
                  <input type="file" id="images" accept="image/*" multiple className="file-input file-input-bordered w-full max-w-xs" />
                  <button className="btn bg-[#43546A] border-[#43546A] hover:shadow-lg">UPLOAD</button>
                </div>
                <button className="btn btn-accent rounded-lg uppercase hover:shadow-lg">Create Listing</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CreateListing