import { Menu, Search } from 'lucide-react';
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import ConfirmLogoutModal from './ConfirmLogoutModal.jsx'
import api from '../lib/axios.js';
import { logoutUserFailure, logoutUserStart, logoutUserSuccess } from "../redux/user/userSlice.js";
import toast from 'react-hot-toast';


const Navbar = () => {

  const {currentUser} = useSelector((state) => state.user);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen1(false);
  }, [location]);

  useEffect(() => {
    setDropdownOpen2(false);
  }, [location]);

  // Function to open modal
  const openSearchModal = () => {
    document.getElementById('my_modal_1').showModal();
  };

  const handleLogout = async () => {
    try {
      setShowModal(false)
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
    <div className="navbar bg-base-200 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={() => setDropdownOpen1((prev) => !prev)}>
            <Menu className="h-5 w-5" />
          </div>
          {dropdownOpen1 && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 shadow">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li className='inline sm:hidden'>
                <span onClick={openSearchModal} style={{ cursor: 'pointer' }}>Search</span>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="navbar-center">
        <Link to="/" className="text-2xl font-bold hover:text-[#8e8e8e]">Nexa Living</Link>
      </div>

      <div className="navbar-end flex items-center gap-2">
        {location.pathname !== "/signin" &&
          <div className="relative hidden sm:block">
            <button className="btn btn-ghost" onClick={openSearchModal}>
              <Search className="h-5 w-5" />
            </button>
          </div>
        }
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" onClick={() => setDropdownOpen2((prev) => !prev)}>
              <div className="w-10 rounded-full">
                <img src={currentUser.avatar} alt="User Avatar" />
              </div>
            </div>
            {dropdownOpen2 && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">Profile</Link>
                  <Link to="/create-listing" className="justify-between">Create Listing</Link>
                </li>
                <li><a onClick={() => setShowModal(true)}>Logout</a></li>
              </ul>
            )}
          </div>
        ) : ( location.pathname !== "/signin" && <Link to="/signin"><span className='btn btn-primary btn-sm sm:btn-md items-center'>Sign In</span></Link> )}
      </div>

      <ConfirmLogoutModal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onDelete={e => handleLogout(e)}
      />

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Search</h3>
          <input
            type="text"
            placeholder="Type to search..."
            className="input input-bordered w-full my-4"
            autoFocus
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Navbar

