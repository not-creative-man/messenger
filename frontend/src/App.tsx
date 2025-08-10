import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './pages/Registration.js';
import Login from './pages/Login.js';
import UserPage from './pages/UserPage.js';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store.js';

export default function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={ <UserPage />}
        />
                {/* <Route
          path="/user"
          element={isLoggedIn ? <UserPage /> : <Navigate to="/login" replace />}
        /> */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/user" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}
