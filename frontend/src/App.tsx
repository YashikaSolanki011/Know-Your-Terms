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
import RoleSelection from './pages/dashboard/agreement/RoleSelection';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getCurrentUserAsync } from './store/authSlice';
import SummaryPage from './pages/dashboard/agreement/SummaryPage';
import { useLocation } from 'react-router-dom';
import CasesList from './pages/dashboard/case/CasesList';
import AgreementProcess from './pages/dashboard/process/AgreementProcess';
import Dashboard from './pages/dashboard/Dashboard';
import Chatbot from './pages/home/Chatbot';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);

  // Helper to extract targetGroup from query param and map to category
  function SummaryPageWithTargetGroup() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const targetGroup = params.get('targetGroup');
    // Map role id to category prop
    let category: 'citizen' | 'student' | 'business_owner' = 'student';
    if (targetGroup === 'citizen') category = 'citizen';
    else if (targetGroup === 'business') category = 'business_owner';
    else if (targetGroup === 'student') category = 'student';
    return <SummaryPage targetGroup={category} />;
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
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
            <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Login />} />
            <Route path="/dashboard/role-selection" element={isAuthenticated ? <RoleSelection /> : <Login />} />
            <Route path="/dashboard/agreement/summary" element={isAuthenticated ? <SummaryPageWithTargetGroup /> : <Login />} />
            <Route path="/dashboard/case/case-details" element={isAuthenticated ? <CasesList /> : <Login />} />
            <Route path="/dashboard/process/summary" element={isAuthenticated ? <AgreementProcess /> : <Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </>
  );
}

export default App;
