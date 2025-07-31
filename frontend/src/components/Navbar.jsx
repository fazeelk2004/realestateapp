/* eslint-disable react-hooks/exhaustive-deps */
import { Menu, Search } from 'lucide-react';
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import ConfirmLogoutModal from './ConfirmLogoutModal.jsx'
import api from '../lib/axios.js';
import { logoutUserFailure, logoutUserStart, logoutUserSuccess } from "../redux/user/userSlice.js";
import toast from 'react-hot-toast';
import SearchModal from './SearchModal.jsx';


const Navbar = () => {

  const {currentUser} = useSelector((state) => state.user);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);

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

  const handleSearch = () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
    setShowSearchModal(false);
  };

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
              <li><Link to='/search'>All Listings</Link></li>
              <li className='inline sm:hidden'>
                <span onClick={() => setShowSearchModal(true)} style={{ cursor: 'pointer' }}>Search</span>
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
            <button className="btn btn-ghost" onClick={() => setShowSearchModal(true)}>
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
      <SearchModal
        open={showSearchModal}
        onCancel={() => setShowSearchModal(false)}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  )
}

export default Navbar

