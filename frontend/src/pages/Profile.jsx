import { ArrowLeft, BadgePlus, CircleSmall, CircleUserRound, Flag, Key, LogOut, Mail, Phone, Trash, User, UserPen } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, logoutUserFailure, logoutUserStart, logoutUserSuccess } from "../redux/user/userSlice.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal.jsx";

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalLogout, setShowModalLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setShowModalDelete(false)
      dispatch(deleteUserStart());
      const res = await api.delete(`/user/delete/${currentUser._id}`)
      const data = res.data;
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data.user));
      navigate("/")
      toast.success("Successfully Deleted The Profile!");
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleLogout = async () => {
    try {
      setShowModalLogout(false)
      dispatch(logoutUserStart());
      const res = await api.get("/auth/signout");
      const data = res.data
      if (data.success === false){
        dispatch(logoutUserFailure(data.message));
        return;
      }
      dispatch(logoutUserSuccess(data.user));
      navigate("/")
      toast.success("Successfully Logged Out!");
    } catch (error) {
      dispatch(logoutUserFailure(error.message))
    }
  }

  return (
    <div className="flex items-center justify-center mx-5 my-10 ">
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
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <button onClick={() => setShowModalLogout(true)} className="btn btn-error hover:bg-[#831c1c] hover:border-[#831c1c] text-white btn-md mt-4 sm:mt-0">
                <LogOut className="h-5 w-5" />
                <span className="ml-2">Sign Out</span>
              </button>
              <Link to="/profile/edit" className="btn btn-accent btn-md mt-4 sm:mt-0">
                <UserPen className="h-5 w-5" />
                <span className="ml-2">Edit Profile</span>
              </Link>
            </div>
          </div>


          <div className="grid grid-cols-12 gap-4">
            {/* Username */}
            <div className="col-span-12 sm:col-span-12 md:col-span-5 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full">Username</span>
              <label className="input input-bordered overflow-auto border-accent rounded-full flex items-center font-semibold text-lg gap-2 w-full">
                <User className="h-5 w-5" /> 
                <input disabled className="grow" placeholder={currentUser.username} />
              </label>
            </div>
            {/* Email */}
            <div className="col-span-12 sm:col-span-12  md:col-span-5 md:col-start-8 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full">Email</span>
              <label className="input input-bordered overflow-auto border-accent rounded-full flex items-center font-semibold text-lg gap-2 w-full">
                <Mail className="h-5 w-5" /> 
                <input disabled className="grow" placeholder={currentUser.email} />
              </label>
            </div>
            {/* Gender */}
            <div className="col-span-12 sm:col-span-12 md:col-span-5 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full">Gender</span>
              <label className="input input-bordered overflow-auto border-accent rounded-full flex items-center font-semibold text-lg gap-2 w-full">
                <CircleSmall className="h-5 w-5" /> 
                <input disabled className="grow" placeholder={currentUser.gender} />
              </label>
            </div>
            {/* Country */}
            <div className="col-span-12 sm:col-span-12 md:col-span-5 md:col-start-8 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full">Country</span>
              <label className="input input-bordered overflow-auto border-accent rounded-full flex items-center font-semibold text-lg gap-2 w-full">
                <Flag className="h-5 w-5" /> 
                <input disabled className="grow" placeholder={currentUser.country} />
              </label>
            </div>
            {/* Phone No. */}
            <div className="col-span-12 sm:col-span-12 md:col-span-5 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full">Phone No.</span>
              <label className="input input-bordered overflow-auto border-accent rounded-full flex items-center font-semibold text-lg gap-2 w-full">
                <Phone className="h-5 w-5" /> 
                <input disabled className="grow" placeholder={currentUser.phoneNo} />
              </label>
            </div>
            {/* Password */}
            <div className="col-span-12 sm:col-span-12 md:col-span-5 md:col-start-8 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full">Password</span>
              <Link to="/reset-password" className="btn btn-accent btn-md w-full flex justify-center items-center gap-2">
                <Key className="h-5 w-5" />
                <span className="ml-2">Password Reset</span>
              </Link>
            </div>
            <div className="col-span-12 sm:col-span-12 md:col-span-2 md:col-start-11 mb-4 flex flex-col items-center">
              <button onClick={() => setShowModalDelete(true)} className="btn btn-error hover:bg-[#831c1c] hover:border-[#831c1c] text-white btn-md w-full flex justify-center items-center gap-2">
                <Trash className="h-5 w-5" />
                <span className="ml-2">Delete Account</span>
              </button>
            </div>

          </div>
            
          <div className="divider font-bold">YOUR LISTING</div>
          
          
          
          <div className="flex flex-col items-center justify-center mb-4 p-3 sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-5">
              <span className="text-lg font-semibold">You Have No Listing Yet.</span>
            </div>
            <Link to="/create-listing" className="btn btn-primary btn-sm sm:btn-md mt-4 sm:mt-0">
              <BadgePlus className="h-5 w-5" />
              <span className="ml-2">Create Listing</span>
            </Link>
          </div>

          <ConfirmDeleteModal
            open={showModalDelete}
            onCancel={() => setShowModalDelete(false)}
            onDelete={e => handleDelete(e)}
          />
          <ConfirmLogoutModal
            open={showModalLogout}
            onCancel={() => setShowModalLogout(false)}
            onDelete={e => handleLogout(e)}
          />


        </div>
      </div>
    </div>
  )
}

export default Profile