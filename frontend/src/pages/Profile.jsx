import { ArrowLeft, CircleUserRound, Key, Mail, UserPen, UserPlus } from "lucide-react";
import { Link } from "react-router";
import OAuth from "../components/OAuth";
import { useSelector } from "react-redux";

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-center mx-5 mt-20 ">
      <div className="card bg-base-100 card-border border-base-300 w-full max-w-7xl overflow-hidden">
        <div className="border-base-300 border-b border-dashed">
          <div className="flex items-center gap-2 p-4">
            <div className="grow">
              <div className="flex items-center gap-2 text-sm font-medium justify-between">
                <span className="flex items-center gap-2"> 
                  <CircleUserRound className="h-12 w-12" />
                  <span className="text-base-content font-extrabold sm:text-2xl">USER PROFILE</span>
                </span>
                <Link to="/" className="btn btn-ghost btn-sm">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="ml-2">Back to Home</span>
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
            <button className="btn btn-primary btn-sm sm:btn-md mt-4 sm:mt-0">
              <UserPen className="h-5 w-5" />
              <span className="ml-2">Edit Profile</span>
            </button>
          </div>


          <div className="grid md:grid-cols-3 gap-4">
             
          </div>
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2 mt-3">
              <Key className="h-5 w-5" /> 
              <input type="password" className="grow" placeholder="Password" id="password"  autoComplete="off"/>
            </label> 
          </div>  
          <div className="card-actions items-center gap-2 flex justify-start mt-5">
            <button className="btn btn-accent w-full">
              SIGN IN
            </button>
          </div>
          <OAuth />
          <div className="divider">OR</div>
          <div className="flex items-center justify-center gap-2">
            <Link to="/signup" className="btn btn-outline btn-accent w-full">
              <UserPlus className="h-5 w-5" />
              <span className="ml-2">Create Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile