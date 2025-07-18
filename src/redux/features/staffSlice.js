import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/staffApi";

export const fetchStaff = createAsyncThunk("staff/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await api.getAllStaff();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const createStaff = createAsyncThunk("staff/create", async (staffData, { rejectWithValue }) => {
  try {
    const response = await api.createStaff(staffData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const updateStaff = createAsyncThunk("staff/update", async ({ id, staffData }, { rejectWithValue }) => {
  try {
    const response = await api.updateStaff(id, staffData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const deleteStaff = createAsyncThunk("staff/delete", async (id, { rejectWithValue }) => {
  try {
    await api.deleteStaff(id);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const assignPermissions = createAsyncThunk(
  "staff/assignPermissions",
  async ({ staffId, permissions }, { rejectWithValue }) => {
    try {
     
      const transformedPermissions = {
        create: permissions.create,
        view: permissions.view,
        edit: permissions.edit,
        del: permissions.delete 
      };

      const response = await api.assignPermissions(staffId, transformedPermissions);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
const staffSlice = createSlice({
  name: "staff",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch staff";
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.items.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s._id !== action.payload);
      });
  },
});

export const selectAllStaff = (state) => state.staff.items;
export const selectStaffStatus = (state) => state.staff.status;
export const selectStaffError = (state) => state.staff.error;

export default staffSlice.reducer;
