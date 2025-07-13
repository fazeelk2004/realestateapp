import { ArrowLeft, CircleUserRound, Key, Mail, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";


export default function SignUp() {

  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email && !formData.password) {
      toast.error("Please Fill All Fields");
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
    if (!formData.password) {
      toast.error("Password Is Required");
      return;
    }

    try {
      dispatch(signInStart());
      const res = await api.post("/auth/signin", {
        email: formData.email,
        password: formData.password
      });
      const data = res.data;
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      toast.success("Successfully Logged In");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        dispatch(signInFailure(error.response.data.message));
        toast.error(error.response.data.message);
      } else {
        dispatch(signInFailure(error.message));
        toast.error("Sign In Failed");
      }
      console.log("Error Signing In:", error.message);
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
                  <CircleUserRound className="h-6 w-6" />
                  <span className="text-base-content font-extrabold ">Sign In</span>
                </span>
                <Link to="/" className="link font-extralight flex items-center"><ArrowLeft className="w-4 h-4" />Back To Home</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body gap-4">
          <p className="text-xs opacity-60">Signing in takes just a moment and gets you back to what matters.</p>   
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2">
              <Mail className="h-5 w-5" /> 
              <input type="email" className="grow" placeholder="Email" id="email" onChange={handleChange} autoComplete="off"/>
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2 mt-3">
              <Key className="h-5 w-5" /> 
              <input type="password" className="grow" placeholder="Password" id="password" onChange={handleChange} autoComplete="off"/>
            </label> 
          </div>  
          <div className="card-actions items-center gap-2 flex justify-start mt-5">
            <button className="btn btn-accent w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? <span className="loading loading-infinity loading-lg text-secondary"></span> : "SIGN IN"}
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
