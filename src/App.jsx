import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentsPage from "./pages/StudentsPage";
import DashboardHome from "./pages/DashboardHome";
import StaffPage from "./pages/StaffPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/dashboard" element={<DashboardLayout />}>
         <Route index element={<DashboardHome />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="staff" element={<StaffPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
