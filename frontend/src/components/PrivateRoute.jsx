import {useSelector} from 'react-redux';
import { Outlet, Navigate } from 'react-router';



export const PrivateProfileRoute = () => {
  const {currentUser} = useSelector((state) => state.user);
  return (
    currentUser ? <Outlet /> : <Navigate to="/signin" />
  )
}

export const PrivateSignInUpRoute = () => {
  const {currentUser} = useSelector((state) => state.user);
  return (
    !currentUser ? <Outlet /> : <Navigate to="/" />
  )
}
