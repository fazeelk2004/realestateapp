import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import {PrivateProfileRoute, PrivateSignInUpRoute} from './components/PrivateRoute';
import ResetPassword from './pages/ResetPassword';
import EditProfile from './pages/EditProfile';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';
import Search from './pages/Search';

export default function App() {
  return (
    <div>
      <Toaster />
      {/* <div className="fixed inset-0 -z-10 min-h-screen w-full px-5 py-24 bg-stone-900 bg-opacity-75"></div> */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-stone-800 [background:radial-gradient(200%_200%_at_50%_0%,rgba(230,225,211,100)_27%,rgba(69,142,181,100)_60%,rgba(24,173,237,0.6)_100%)]"></div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/search" element={<Search />} />
          <Route element={<PrivateSignInUpRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<PrivateProfileRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/listing/:listingId" element={<Listing />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
