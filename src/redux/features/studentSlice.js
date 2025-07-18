import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/studentApi";

export const fetchStudents = createAsyncThunk(
  "students/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllStudents();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const createStudent = createAsyncThunk(
  "students/create",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await api.createStudent(studentData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const response = await api.updateStudent(id, studentData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteStudent(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch students";
      })

      .addCase(createStudent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s._id !== action.payload);
      });
  },
});

export const selectAllStudents = (state) => state.students.items;
export const selectStudentsStatus = (state) => state.students.status;
export const selectStudentsError = (state) => state.students.error;

export default studentsSlice.reducer;
