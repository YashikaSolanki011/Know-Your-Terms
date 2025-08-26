import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import { useAppDispatch } from './hooks/redux';
import About from './pages/general/About';
import Help from './pages/general/Help';
import HomePage from './pages/home/HomePage';
import Footer from './layouts/Footer';
import Navbar from './layouts/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getCurrentUserAsync } from './store/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);
  
  console.log("Hello", user, isAuthenticated);

  return (
    <>
      <ToastContainer
        position="bottom-right"  // This will show the toast in the center of the screen
        autoClose={3000}  // Toast will disappear after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        closeButton={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/active" element={<div>frontend active</div>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
