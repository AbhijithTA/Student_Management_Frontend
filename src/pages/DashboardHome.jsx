import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../redux/features/studentSlice';
import { fetchStaff } from '../redux/features/staffSlice';

const DashboardHome = () => {
  const dispatch = useDispatch();
  
  const { students, studentStatus } = useSelector((state) => state.students);
  const { staff, staffStatus } = useSelector((state) => state.staff);
  const user = useSelector((state) => state.auth.user);

  console.log(students, "students");
  console.log(staff, "staff");


  useEffect(() => {
    dispatch(fetchStudents());
    if (user?.role === 'admin' || user?.role === 'superadmin') {
      dispatch(fetchStaff());
    }
  }, [dispatch, user?.role]);

  const studentCount = students?.length || 0;
  const staffCount = staff?.length || 0;


  const isLoading = studentStatus === 'loading' || 
                   (staffStatus === 'loading' && (user?.role === 'admin' || user?.role === 'superadmin'));

  if (isLoading) {
    return (
      <div className="ml-64 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
       
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Total Students</h3>
          <p className="text-3xl font-bold">{studentCount}</p>
        </div>

     
        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium text-gray-500">Active Staff</h3>
            <p className="text-3xl font-bold">{staffCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;