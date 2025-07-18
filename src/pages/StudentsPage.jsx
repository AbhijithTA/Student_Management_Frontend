import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  selectAllStudents,
  selectStudentsStatus,
  selectStudentsError,
} from "../redux/features/studentSlice";
import { selectCurrentUser } from "../redux/features/authSlice";
import StudentForm from "../components/StudentForm";
import Modal from "../components/Modal";
import Table from "../components/Table";
import Button from "../components/Button";
import { toast } from "react-hot-toast";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectAllStudents);
  const status = useSelector(selectStudentsStatus);
  const error = useSelector(selectStudentsError);
  const user = useSelector(selectCurrentUser);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  //Getting the permissions
  const canCreate = user?.role === "superadmin" || user?.permissions?.create;
  const canEdit = user?.role === "superadmin" || user?.permissions?.edit;
  const canDelete = user?.role === "superadmin" || user?.permissions?.del;

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleCreate = () => {
    setCurrentStudent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteStudent(studentToDelete._id));
      toast.success("Student deleted successfully!");
      setIsDeleteConfirmOpen(false);
      setStudentToDelete(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete student");
    }
  };

  const handleSubmit = async (studentData) => {
    if (currentStudent) {
      await dispatch(
        updateStudent({ id: currentStudent._id, studentData })
      ).unwrap();
      toast.success("Student updated successfully!");
    } else {
      dispatch(createStudent(studentData)).unwrap();
      toast.success("Student created successfully!");
    }
    setIsFormOpen(false);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
    { header: "Grade", accessor: "grade" },

    { header: "Phone", accessor: "phone" },
    {
      header: "Actions",
      accessor: "_id",
      Cell: ({ value, row }) => (
        <div className="flex space-x-2">
          {canEdit && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </Button>
          )}
          {canDelete && (
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleDeleteClick(row.original)}
            >
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="ml-64 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Management</h1>
        {canCreate && <Button onClick={handleCreate}>Add New Student</Button>}
      </div>

      {status === "loading" && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <Table
        data={students}
        columns={columns}
        emptyMessage="No students found"
      />

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentStudent ? "Edit Student" : "Add New Student"}
      >
        <StudentForm
          onSubmit={handleSubmit}
          defaultValues={currentStudent}
          onCancel={() => setIsFormOpen(false)}
          isSubmitting={status === "loading"}
        />
      </Modal>

      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete {studentToDelete?.name}?</p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              loading={status === "loading"}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentsPage;
