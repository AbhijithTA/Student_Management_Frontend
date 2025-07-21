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

import { toastOptions } from "./config/toastConfig";

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
    
    <Toaster {...toastOptions} />
      </>
  );
}

export default App;
