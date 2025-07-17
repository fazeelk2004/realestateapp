/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { ArrowLeft, Ban, Check, CircleCheckBig, CircleSmall, CircleUserRound, Flag, Info, Key, Mail,  Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { toast } from "react-hot-toast";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice.js";
import api from "../lib/axios.js";

const EditProfile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser, loading} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined); 
  const [filePercent, setFilePercent] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showUploadComplete, setShowUploadComplete] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  

  useEffect(() => {
    if (file) { 
      handlefileUpload(file);
    }
  }, [file]);
  // USED TO SHOW AND THEN HIDE THE UPLOADING STATUS
  useEffect(() => {
    if ((filePercent === 100 && !fileError) || fileError) {
      setShowUploadComplete(true);
      const timer = setTimeout(() => setShowUploadComplete(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [filePercent, fileError]);

  const handlefileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileError(true);
        console.error("File Upload Error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      
      const res = await api.post(`/user/update/${currentUser._id}`, {
        username: formData.username,
        email: formData.email,
        avatar: formData.avatar,
        gender: formData.gender,
        country: formData.country,
        phoneNo: formData.phoneNo,
      });
      const data = res.data;
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data.user));
      toast.success("Successfully Updated The Profile!");
      navigate("/profile")
    } catch (error) {
      
      dispatch(updateUserFailure(error.message))
      toast.error("Failed To Update Profile. Please Try Again.");
      console.log("Error Updating Profile:", error); 
    }
  }

  return (
    <div className="flex items-center justify-center mx-5 mt-20 ">
      <div className="card bg-base-100 card-border border-base-300 w-full max-w-7xl overflow-hidden">
        <div className="border-base-300 border-b border-dashed">
          <div className="flex items-center gap-2 p-4">
            <div className="grow">
              <div className="flex items-center gap-2 text-sm font-medium justify-between">
                <span className="flex items-center gap-2"> 
                  <CircleUserRound className="h-12 w-12" />
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
              <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
              <div className="relative flex flex-col items-center">
                <img
                  src={formData.avatar || currentUser.avatar}
                  alt="User Image"
                  onClick={() => fileRef.current.click()}
                  className="w-32 h-32 rounded-full hover:opacity-75"
                /> 
                {/* Spinner for upload */}
                {filePercent > 0 && filePercent < 100 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                )}
                {/* Upload complete with tick icon, disappears after 4s */}
                {showUploadComplete && !fileError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <CircleCheckBig className="w-12 h-12 text-green-500 mb-1" />
                    <span className="bg-black/70 text-green-400 text-xs font-semibold px-1 py-0.5 rounded-full">
                      UPLOADED!
                    </span>
                  </div>
                )}
                {/* Upload failed with cross icon, disappears after 4s */}
                {showUploadComplete && fileError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Ban className="w-12 h-12 text-red-700 mb-1" />
                    <span className="bg-black/70 text-red-700 text-xs font-semibold px-1 py-0.5 rounded-full">
                      FAILED!
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <h1 className="text-3xl font-bold mt-2 text-center sm:text-left">{currentUser.username}</h1>
                <p className="text-md text-gray-500 text-center sm:text-left">{currentUser.email}</p>
              </div>
            </div>
            {showUploadComplete && fileError && (
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <span className="text-warning text-xs font-semibold mb-2 items-center flex">
                  <Info className="inline h-4 w-4 mr-1" />
                  Image Size Should Be Less Than 2MB
                </span>
              </div>
            )}
          </div>


          <div className="grid grid-cols-12 gap-4">
            {/* Username */}
            <div className="col-span-12 sm:col-span-12 md:col-span-5 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full flex flex-auto items-center justify-center">
                <User className="h-5 w-5 mr-2" />
                Username
              </span>
              <label className="input input-bordered overflow-auto border-accent rounded-full flex items-center font-semibold text-lg gap-2 w-full">
                <input  
                  className="grow" 
                  defaultValue={currentUser.username}
                  id="username" 
                  placeholder="Username" 
                  onChange={handleChange}
                />
              </label>
            </div>
            {/* Email */}
            <div className="col-span-12 sm:col-span-12  md:col-span-5 md:col-start-8 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full flex flex-auto items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                Email
              </span>
              <label className="input input-bordered overflow-auto border-accent rounded-full flex items-center font-semibold text-lg gap-2 w-full">
                <input  
                  className="grow" 
                  defaultValue={currentUser.email} 
                  placeholder="Email" 
                  id="email"
                  onChange={handleChange}
                />
              </label>
            </div>



            {/* Gender */}
            <div className="col-span-12 sm:col-span-12 md:col-span-5 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full flex flex-auto items-center justify-center">
                <CircleSmall className="h-5 w-5 mr-2" />
                Gender
              </span>
              <div className="w-full flex items-center gap-2">
                <div className="dropdown w-full">
                  <input
                    type="text"
                    id="gender"
                    className="input input-bordered overflow-auto border-accent rounded-full font-semibold text-lg w-full"
                    value={formData.gender ?? currentUser.gender ?? ""}
                    onChange={e => {
                      const val = e.target.value;
                      if (["Male", "Female", "Not Specified"].some(opt => opt.toLowerCase().startsWith(val.toLowerCase()))) {
                        handleChange(e);
                      }
                    }}
                    onFocus={e => setShowGenderDropdown(true)}
                    onBlur={e => setTimeout(() => setShowGenderDropdown(false), 150)}
                    tabIndex={0}
                    autoComplete="off"
                    role="combobox"
                  />
                  {showGenderDropdown && (
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow absolute left-0 top-full">
                      {["Male", "Female", "Not Specified"].map(option => (
                        <li key={option}>
                          <button
                            type="button"
                            onMouseDown={e => {
                              e.preventDefault();
                              setFormData({ ...formData, gender: option });
                              setShowGenderDropdown(false);
                            }}
                            className={formData.gender === option ? "active" : ""}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>


            
            {/* Country */}
            <div className="col-span-12 sm:col-span-12 md:col-span-5 md:col-start-8 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full flex flex-auto items-center justify-center">
                <Flag className="h-5 w-5 mr-2" />
                Country
              </span>
              <div className="w-full flex items-center gap-2">
                <div className="dropdown w-full">
                  <input
                    type="text"
                    className="input input-bordered overflow-auto border-accent rounded-full font-semibold text-lg w-full"
                    value={formData.country ?? currentUser.country ?? ""}
                    onChange={e => {
                      const val = e.target.value;
                      if (["Pakistan", "India", "USA", "UK", "Canada", "Australia", "Not Specified"].some(opt => opt.toLowerCase().startsWith(val.toLowerCase()))) {
                        handleChange(e);
                      }
                    }}
                    onFocus={e => setShowCountryDropdown(true)}
                    onBlur={e => setTimeout(() => setShowCountryDropdown(false), 150)}
                    tabIndex={0}
                    autoComplete="off"
                    role="combobox"
                  />
                  {showCountryDropdown && (
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow absolute left-0 top-full">
                      {["Pakistan", "India", "USA", "UK", "Canada", "Australia", "Not Specified"].map(option => (
                        <li key={option}>
                          <button
                            type="button"
                            onMouseDown={e => {
                              e.preventDefault();
                              setFormData({ ...formData, country: option });
                              setShowCountryDropdown(false);
                            }}
                            className={formData.country === option ? "active" : ""}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            {/* Phone No. */}
            <div className="col-span-12 sm:col-span-12 md:col-span-5 mb-4 flex flex-col items-center">
              <span className="mb-1 text-center w-full flex flex-auto items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                Phone No.
              </span>
              <label className="input input-bordered overflow-auto border-accent rounded-full flex items-center font-semibold text-lg gap-2 w-full">
                <input
                  className="grow"
                  type="text"
                  placeholder="Phone No."
                  value={formData.phoneNo ?? currentUser.phoneNo ?? ""}
                  maxLength={11}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, ""); // Only digits
                    if (
                      (val === "" || (val.startsWith("0") && val.length <= 11))
                    ) {
                      setFormData({ ...formData, phoneNo: val });
                    }
                  }}
                />
              </label>
            </div>
            {/* Save Changes */}
            <div className="col-span-12 sm:col-span-12 md:col-span-2 md:col-start-11 my-6 flex flex-col items-center">
              <button disabled={loading} onClick={handleSubmit} className="btn btn-success text-white btn-md w-full  flex justify-center items-center gap-2">
                <Check className="h-5 w-5" />
                {loading ? <span className="loading loading-infinity loading-lg text-secondary"></span> : <span>Save Changes</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default EditProfile



