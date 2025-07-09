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
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
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
        <div className="relative hidden sm:block">
          <button
            className="btn btn-ghost"
            onClick={openSearchModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </button>
        </div>
        {!isLoggedIn && <Link to="/signin"><span className='btn btn-primary btn-sm sm:btn-md items-center'>Sign In</span></Link>}
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

