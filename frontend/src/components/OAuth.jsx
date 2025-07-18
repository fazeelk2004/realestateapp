import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await api.post('/auth/google', {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            });
            const data = res.data;
            dispatch(signInSuccess(data));
            toast.success("Successfully Logged In");
            navigate("/");
            
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Google OAuth failed. Please try again.");
            }
            console.log("Error During Google OAuth:", error);
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-600 border-red-600 hover:border-red-900 hover:bg-red-900 btn w-full'>CONTINUE WITH GOOGLE</button>
  )
}
