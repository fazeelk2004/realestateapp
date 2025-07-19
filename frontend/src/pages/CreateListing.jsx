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
    <main className='flex flex-col justify-center items-center m-10'>
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
            
          </div>
        </div>
      </div>
    </main>
  )
}

export default CreateListing