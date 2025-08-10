import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/store';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';

export default function UserPage() {
   const user = useSelector((state: RootState) => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
 
   const handleLogout = () => {
     dispatch(logout());
     navigate("/login");
   };
 
   return (
     <div className="max-w-md mx-auto mt-16 p-8 bg-gray-50 rounded-xl shadow-lg">
       <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
         Добро пожаловать, {user.name || "Пользователь"}!
       </h2>
 
       <div className="space-y-4 text-gray-700">
         {Object.entries(user).map(([key, value]) => (
           <div
             key={key}
             className="flex justify-between border-b pb-2 text-sm"
           >
             <span className="font-medium capitalize">{key}:</span>
             <span>{value?.toString() || "—"}</span>
           </div>
         ))}
       </div>
 
       <button
         onClick={handleLogout}
         className="mt-8 w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition duration-200"
       >
         Выйти
       </button>
     </div>
   );
 }