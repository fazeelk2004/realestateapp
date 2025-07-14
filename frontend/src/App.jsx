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

export default function App() {
  return (
    <div>
      <Toaster />
      <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 bg-stone-950"/>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route element={<PrivateSignInUpRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<PrivateProfileRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile/edit" element={<EditProfile />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
