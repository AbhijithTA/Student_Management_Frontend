import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaUserGraduate, FaUsersCog, FaHome, FaUserTie, FaBook } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/features/authSlice";

const Sidebar = () => {
  const user = useSelector(selectCurrentUser);
  const role = user?.role;
  const userName = user?.name ||  "User";

  
  
  const adminMenu = [
    { name: "Students", path: "/dashboard/students", icon: <FaUserGraduate /> },
    { name: "Staff", path: "/dashboard/staff", icon: <FaUsersCog /> },
  ];

  const staffMenu = [
    { name: "Students", path: "/dashboard/students", icon: <FaUserGraduate /> },
   
  ];

 
  const menu = [
    ...(role === 'superadmin' ? adminMenu : []),
    ...(role === 'staff' ? staffMenu : []),
  ];

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-white shadow-md min-h-screen px-4 py-6 fixed"
    >
     <div className="mb-6 px-3 py-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-medium text-gray-700">Welcome back,</h2>
        <h1 className="text-xl font-bold text-blue-700">
          {userName.split(' ')[0]} 
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {role === 'superadmin' ? 'Super Admin' : 'Staff'}
        </p>
      </div>

      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <NavLink
            end={item.exact}
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-100"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;