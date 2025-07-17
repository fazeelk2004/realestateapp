import { ArrowLeft, Key, Lock, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";


export default function ResetPassword() {

  const [formData, setFormData] = useState({});
  const {currentUser, loading} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (
      formData.password !== undefined &&
      formData.repeatpassword !== undefined &&
      formData.password !== formData.repeatpassword
    ) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  }, [formData.password, formData.repeatpassword]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currentpassword) {
      toast.error("Current Password Is Required");
      return;
    }
    if (!formData.password) {
      toast.error("New Password Is Required");
      return;
    }
    if (!formData.repeatpassword) {
      toast.error("Repeat New Password Is Required");
      return;
    }
    try {
      dispatch(updateUserStart())
      
      const res = await api.post(`/user/update/${currentUser._id}`, {
        currentpassword: formData.currentpassword,
        password: formData.password,
      });
      const data = res.data;
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(updateUserSuccess(data.user));
      toast.success("Successfully Changed Password!");
      navigate("/profile")
    } catch (error) {
      
      dispatch(updateUserFailure(error.message));
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Show backend error
      } else {
        toast.error("Failed To Change Password. Please Try Again.");
      }
      console.log("Error Changing Password:", error); 
    }
  };

  return (
    <div className="flex items-center justify-center mx-5 mt-20 ">
      <div className="card bg-base-100 card-border border-base-300 w-full max-w-xl overflow-hidden">
        <div className="border-base-300 border-b border-dashed">
          <div className="flex items-center gap-2 p-4">
            <div className="grow">
              <div className="flex items-center gap-2 text-sm font-medium justify-between">
                <span className="flex items-center gap-2"> 
                  <Key className="h-6 w-6" />
                  <span className="text-base-content font-extrabold ">CHANGE PASSWORD</span>
                </span>
                <Link to="/profile" className="link font-extralight flex items-center"><ArrowLeft className="w-4 h-4" />Back To Profile</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body gap-4">
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2">
              <LockKeyhole className="h-5 w-5" /> 
              <input type="password" className="grow" placeholder="Current Password" id="currentpassword" onChange={handleChange} autoComplete="off"/>
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2 mt-3">
              <Lock className="h-5 w-5" /> 
              <input type="password" className="grow" placeholder="New Password" id="password" onChange={handleChange} autoComplete="off"/>
            </label> 
          </div>
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2 mt-3">
              <Lock className="h-5 w-5" /> 
              <input type="password" className="grow" placeholder="Repeat New Password" id="repeatpassword" onChange={handleChange} autoComplete="off"/>
            </label> 
          </div>  
          <div className="card-actions items-center gap-2 flex justify-start mt-5">
            <button className="btn btn-accent w-full" onClick={handleSubmit} disabled={loading || !passwordsMatch} >
              {passwordsMatch ? loading ? <span className="loading loading-infinity loading-lg text-secondary"></span> : "CHANGE PASSWORD" : "PASSWORD DOES NOT MATCH"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
