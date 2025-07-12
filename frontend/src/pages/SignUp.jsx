import { ArrowLeft, Key, Mail, User, UserPlus } from "lucide-react";
import { Link } from "react-router";

export default function SignUp() {
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
              <input type="text" className="grow" placeholder="Username" id="username"/>
            </label>
          </div> 
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2">
              <Mail className="h-5 w-5" /> 
              <input type="email" className="grow" placeholder="Email" id="email"/>
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label className="input input-bordered border-accent rounded-full flex max-w-none items-center gap-2">
              <Key className="h-5 w-5" /> 
              <input type="password" className="grow" placeholder="Password" id="password"/>
            </label> 
            <span className="text-base-content/60 flex items-center gap-2 px-1 text-[0.6875rem]">
              <span className="status status-error inline-block">
                Password must be 8+ characters
              </span> 
            </span>
          </div>  
          <div className="card-actions items-center gap-6 flex justify-end mt-5">
            <button className="btn btn-accent w-full">SIGN UP</button> 
          </div>
        </div>
      </div>
    </div>
  )
}
