import { ArrowLeft, CircleUserRound, Key, UserPen, UserPlus } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-center mx-5 mt-20 ">
      <div className="card bg-base-100 card-border border-base-300 w-full max-w-7xl overflow-hidden">
        <div className="border-base-300 border-b border-dashed">
          <div className="flex items-center gap-2 p-4">
            <div className="grow">
              <div className="flex items-center gap-2 text-sm font-medium justify-between">
                <span className="flex items-center gap-2"> 
                  <UserPen className="h-12 w-12" />
                  <span className="text-base-content font-extrabold sm:text-2xl">EDIT PROFILE</span>
                </span>
                <Link to="/profile" className="btn btn-ghost btn-sm">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="ml-2">Back to Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="flex flex-col items-center justify-center mb-4 p-3 sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-5">
              <img src={currentUser.avatar} alt="User Image" className="w-32 h-32 rounded-full" />
              <div className="flex flex-col items-center sm:items-start">
                <h1 className="text-3xl font-bold mt-2 text-center sm:text-left">{currentUser.username}</h1>
                <p className="text-md text-gray-500 text-center sm:text-left">{currentUser.email}</p>
              </div>
            </div>
            <Link to="/profile/edit" className="btn btn-primary btn-sm sm:btn-md mt-4 sm:mt-0">
              <UserPen className="h-5 w-5" />
              <span className="ml-2">Edit Profile</span>
            </Link>
          </div>


          <div className="grid grid-cols-12">
            <div className="flex-col col-span-5 mb-4" >
              <span className="ms-4">Username</span>
              <label className="input input-bordered border-accent rounded-full flex max-w-none items-center font-semibold text-lg gap-2 mt-1">
                <Key className="h-5 w-5" /> 
                <input disabled className="grow" placeholder={currentUser.username} />
              </label>
            </div>
            <div className="flex-col col-span-5 col-start-8 mb-4" >
              <span className="ms-4">Email</span>
              <label className="input input-bordered border-accent rounded-full flex max-w-none items-center font-semibold text-lg gap-2 mt-1">
                <Key className="h-5 w-5" /> 
                <input disabled className="grow" placeholder={currentUser.email} />
              </label>
            </div>
            <div className="flex-col col-span-5 mb-4" >
              <span className="ms-4">Gender</span>
              <label className="input input-bordered border-accent rounded-full flex max-w-none items-center font-semibold text-lg gap-2 mt-1">
                <Key className="h-5 w-5" /> 
                <input disabled className="grow" placeholder={currentUser.gender} />
              </label>
            </div>
            <div className="flex-col col-span-5 col-start-8 mb-4" >
              <span className="ms-4">Country</span>
              <label className="input input-bordered border-accent rounded-full flex max-w-none items-center font-semibold text-lg gap-2 mt-1">
                <Key className="h-5 w-5" /> 
                <input disabled className="grow" placeholder={currentUser.country} />
              </label>
            </div> 
            <div className="flex-col col-span-5 mb-4" >
              <span className="ms-4">Phone No.</span>
              <label className="input input-bordered border-accent rounded-full flex max-w-none items-center font-semibold text-lg gap-2 mt-1">
                <Key className="h-5 w-5" /> 
                <input disabled className="grow" placeholder={currentUser.phoneNo} />
              </label>
            </div>
            <div className="flex-col col-span-5 mb-4 col-start-8" >
              <span className="ms-4">Password</span>
              <button className="col-span-5 col-start-8 w-full btn btn-secondary">
                <Link to="/reset-password" className="btn btn-ghost btn-sm">
                  <Key className="h-5 w-5" />
                  <span className="ml-2">Password Reset</span>
                </Link>
              </button>
            </div>
          </div>
            
          <div className="divider font-bold">YOUR LISTING</div>
          
          
          
          <div className="flex flex-col items-center justify-center mb-4 p-3 sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-5">
              <span className="text-lg font-semibold">You Have No Listings Yet.</span>
            </div>
            <Link to="/create-listing" className="btn btn-primary btn-sm sm:btn-md mt-4 sm:mt-0">
              <UserPlus className="h-5 w-5" />
              <span className="ml-2">Create Listing</span>
            </Link>
          </div>



        </div>
      </div>
    </div>
  )
}

export default EditProfile