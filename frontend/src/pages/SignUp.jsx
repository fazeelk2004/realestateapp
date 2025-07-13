import { ArrowLeft, Key, Mail, User, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import OAuth from "../components/OAuth";

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username && !formData.email && !formData.password) {
      toast.error("Please Fill All Fields");
      return;
    }
    if (!formData.username) {
      toast.error("Username Is Required");
      return;
    }
    if (!formData.email) {
      toast.error("Email Is Required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid Email Address");
      return;
    }
    if (!formData.password || formData.password.length < 8) {
      toast.error("Password Must Be At Least 8 Characters");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      toast.success("User Created Successfully");
      navigate("/signin");
    } catch (error) {
      // HANDLE SPECIFIC ERROR MESSAGES FROM BACKEND
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed To Create User");
      }
      console.log("Error Creating User:", error.message);
    } finally {
      setLoading(false);
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
                  <UserPlus className="h-6 w-6" />
                  <span className="text-base-content font-extrabold ">Create An Account</span>
                </span>
                <Link to="/signin" className="link font-extralight flex items-center"><ArrowLeft className="w-4 h-4" />Back To Login</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body gap-4">
          <p className="text-xs opacity-60">Registration is free and only takes a minute</p> 
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2">
              <User className="h-5 w-5" /> 
              <input type="text" className="grow" placeholder="Username" id="username" onChange={handleChange}/>
            </label>
          </div> 
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2">
              <Mail className="h-5 w-5" /> 
              <input type="email" className="grow" placeholder="Email" id="email" onChange={handleChange} autoComplete="off"/>
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2">
              <Key className="h-5 w-5" /> 
              <input type="password" className="grow" placeholder="Password" id="password" onChange={handleChange} autoComplete="off"/>
            </label> 
            <span className="text-base-content/60 flex items-center gap-2 px-1 text-[0.6875rem]">
              <span className="status status-error inline-block">
                Password must be 8+ characters
              </span> 
            </span>
          </div>  
          <div className="card-actions items-center gap-6 flex justify-end mt-5">
            <button className="btn btn-accent w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? <span className="loading loading-infinity loading-lg text-secondary"></span> : "SIGN UP"}
            </button> 
            <OAuth />
          </div>
        </div>
      </div>
    </div>
  )
}
