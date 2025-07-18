import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./pages/Login'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const StudentsPage = lazy(() => import('./pages/StudentsPage'));
const StaffPage = lazy(() => import('./pages/StaffPage'));

import LoadingSpinner from './components/LoadingSpinner';

import RoleBasedRoute from "./components/RoleBasedRoute";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={<RoleBasedRoute allowedRoles={["superadmin", "staff"]} />}
        >
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<StudentsPage />} />
            <Route path="students" element={<StudentsPage />} />

            <Route element={<RoleBasedRoute allowedRoles={["superadmin"]} />}>
              <Route path="staff" element={<StaffPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
    <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      </>
  );
}

export default App;
