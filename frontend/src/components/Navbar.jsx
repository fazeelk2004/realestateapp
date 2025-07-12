import { Menu, Search } from 'lucide-react';
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  // Function to open modal
  const openSearchModal = () => {
    document.getElementById('my_modal_1').showModal();
  };

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={() => setDropdownOpen((prev) => !prev)}>
            <Menu className="h-5 w-5" />
          </div>
          {dropdownOpen && (
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
        {!isLoggedIn && location.pathname !== "/signin" && <Link to="/signin"><span className='btn btn-primary btn-sm sm:btn-md items-center'>Sign In</span></Link>}
        {isLoggedIn &&
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a onClick={() => setIsLoggedIn(false)}>Logout</a></li>
            </ul>
          </div>
        }
      </div>


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

