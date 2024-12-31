'use client';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice'; // Import logout action
import { useRouter } from 'next/navigation';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth); // Get user info from Redux state

  const handleLogout = () => {
    dispatch(logout()); // Clear user state
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-between p-4 bg-blue-50 border-b border-gray-200">
      <h1 className="text-xl font-bold">
        Welcome, {user?.name || 'Guest'} {/* Display the user's name */}
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
