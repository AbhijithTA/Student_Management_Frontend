import { useDispatch, useSelector } from "react-redux";
import {
  fetchStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  assignPermissions,
  selectAllStaff,
  selectStaffStatus,
  selectStaffError,
} from "../redux/features/staffSlice";

import { toast } from "react-hot-toast";

import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Table from "../components/Table";
import Button from "../components/Button";
import StaffForm from "../components/StaffForm";
import StaffPermissions from "../components/StaffPermissions";

const StaffPage = () => {
  const dispatch = useDispatch();
  const staffList = useSelector(selectAllStaff);
  const status = useSelector(selectStaffStatus);
  const error = useSelector(selectStaffError);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  //crud function for the staffs and admin
  const handleCreate = () => {
    setCurrentStaff(null);
    setIsFormOpen(true);
  };

  const handleEdit = (staff) => {
    setCurrentStaff(staff);
    setIsFormOpen(true);
  };

const handleDelete = async (staff) => {
    try {
      await dispatch(deleteStaff(staff._id)).unwrap();
      toast.success("Staff deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete staff");
    }
  };

const handleSubmit = async (data) => {
    try {
      if (currentStaff) {
        await dispatch(updateStaff({ 
          id: currentStaff._id, 
          staffData: data 
        })).unwrap();
        toast.success("Staff updated successfully");
      } else {
        await dispatch(createStaff(data)).unwrap();
        toast.success("Staff created successfully");
      }
      setIsFormOpen(false);
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleAssignPermissions = async (id, perms) => {
    try {
      await dispatch(assignPermissions({ 
        staffId: id, 
        permissions: perms 
      })).unwrap();
      toast.success("Permissions updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update permissions");
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Permissions",
      accessor: "_id",
      Cell: ({ value, row }) => (
        <StaffPermissions
          staffId={value}
          defaultPermissions={row.original.permissions} 
          onAssign={handleAssignPermissions}
        />
      ),
    },

    {
      header: "Actions",
      accessor: "_id",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row.original)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="ml-64 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <Button onClick={handleCreate}>Add New Staff</Button>
      </div>

      {status === "loading" && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <Table data={staffList} columns={columns} emptyMessage="No staff found" />

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentStaff ? "Edit Staff" : "Add New Staff"}
      >
        <StaffForm
          onSubmit={handleSubmit}
          defaultValues={currentStaff}
          onCancel={() => setIsFormOpen(false)}
          isSubmitting={status === "loading"}
        />
      </Modal>
    </div>
  );
};

export default StaffPage;
