import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import RSVP from './pages/RSVP';
import TravelInfo from './pages/TravelInfo';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ThankYou from './pages/ThankYou';
import CreateAccount from './pages/CreateAccount';
import UploadPhoto from './pages/UploadPhoto';
import AdminLogin from './pages/AdminLogin';
import OurStory from './pages/OurStory';
import WeddingDetails from './pages/WeddingDetails';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Hardcoded admin email
  const ADMIN_EMAIL = "realnewages@gmail.com";

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (loading) return <div className="loading-screen">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (user.email !== ADMIN_EMAIL) {
      return <Navigate to="/" />;
    }
    return children;
  };


  return (
    <Router>
      <div className="App">
        <Navigation user={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            {user && (
              <>
                <Route path="/rsvp" element={<RSVP />} />
                <Route path="/travel-info" element={<TravelInfo />} />
                <Route path="/upload-photo" element={<UploadPhoto />} />
              </>
            )}
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/wedding-details" element={<WeddingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/upload-photo" element={user ? <UploadPhoto /> : <Navigate to="/login" />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={<ProtectedRoute><Admin /></ProtectedRoute>} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
