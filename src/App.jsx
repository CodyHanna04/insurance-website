// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoleBasedHeader from './components/RoleBasedHeader';

import Home              from './pages/Home';
import StartPolicy       from './pages/StartPolicy';
import FAQ               from './pages/FAQ';
import About             from './pages/About';
import Login             from './pages/Login';
import ClientDashboard   from './pages/ClientDashboard';
import AdminDashboard    from './pages/AdminDashboard';
import RequireAuth       from './components/RequireAuth';
import ManagePolicies  from './pages/admin/ManagePolicies';
import Clients         from './pages/admin/Clients';
import UserPolicies from './pages/admin/UserPolicies';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RoleBasedHeader />
        <Routes>
          {/* public */}
          <Route path="/"            element={<Home />} />
          <Route path="/start-policy"element={<StartPolicy />} />
          <Route path="/faq"         element={<FAQ />} />
          <Route path="/about"       element={<About />} />
          <Route path="/login"       element={<Login />} />

          {/* protected */}
          <Route
            path="/client-dashboard"
            element={
              <RequireAuth allowedRoles={['client']}>
                <ClientDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <RequireAuth allowedRoles={['admin']}>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
              path="/admin-dashboard/manage-policies"
              element={<RequireAuth allowedRoles={['admin']}>
                <ManagePolicies />
                </RequireAuth>}
            />
            <Route
              path="/admin-dashboard/user-policies"
              element={<RequireAuth allowedRoles={['admin']}>
                <UserPolicies />
                </RequireAuth>}
            />
            <Route
              path="/admin-dashboard/clients"
              element={<RequireAuth allowedRoles={['admin']}>
                <Clients />
                </RequireAuth>}
            />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
