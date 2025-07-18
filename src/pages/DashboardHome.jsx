// Example DashboardHome.jsx with common dashboard elements
const DashboardHome = () => {
  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Total Students</h3>
          <p className="text-3xl font-bold">1,248</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Active Staff</h3>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Pending Tasks</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Activity list would go here */}
      </div>
    </div>
  );
};

export default DashboardHome;