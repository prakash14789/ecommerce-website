import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Heritage from './pages/Heritage';
import Collections from './pages/Collections';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import ManageProducts from './pages/ManageProducts';
import OrderRegistry from './pages/OrderRegistry';
import CustomerProfile from './pages/CustomerProfile';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import EliteDashboard from './pages/EliteDashboard';
import AdminLogin from './pages/AdminLogin';

const AdminRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAppContext();
  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/shop" element={<Home />} />
            <Route path="/heritage" element={<Heritage />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/elite" element={<EliteDashboard />} />
            
            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/inventory" element={<AdminRoute><ManageProducts /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><OrderRegistry /></AdminRoute>} />
            <Route path="/admin/customers" element={<AdminRoute><CustomerProfile /></AdminRoute>} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}
