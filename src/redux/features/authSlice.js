import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/authApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.login(credentials);
      console.log("Login response:", response.user);
      
      if (response.user.role === 'admin' ) {
        const adminUser = {
          ...response.user,
          permissions: {
            studentCreate: true,
            studentView: true,
            studentEdit: true,
            studentDelete: true,
           
          }
        };
        return { 
          user: adminUser, 
          token: response.token 
        };
      }

      const userWithPermissions = {
        ...response.user,
        permissions: response.user.permissions || {
          studentCreate: false,
          studentView: false,
          studentEdit: false,
          studentDelete: false
        }
      };
      
      return { 
        user: userWithPermissions, 
        token: response.token 
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: (() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
    
      if (storedUser?.role === 'admin' || storedUser?.role === 'superadmin') {
        return {
          ...storedUser,
          permissions: {
            studentCreate: true,
            studentView: true,
            studentEdit: true,
            studentDelete: true
          }
        };
      }
      return storedUser || null;
    })(),
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    refreshPermissions: (state) => {
      if (state.user) {
        state.user = {
          ...state.user,
          permissions: state.user.permissions || {
            studentCreate: false,
            studentView: false,
            studentEdit: false,
            studentDelete: false
          }
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } else {
          console.error("No payload received in loginUser.fulfilled");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { logout, refreshPermissions } = authSlice.actions;


export const selectCurrentUser = (state) => {
  const user = state.auth.user;
  
  if (!user) return null;
  
  if (user.role === 'admin' || user.role === 'superadmin') {
    return {
      ...user,
      permissions: {
        studentCreate: true,
        studentView: true,
        studentEdit: true,
        studentDelete: true
      }
    };
  }
  
  return {
    ...user,
    permissions: user.permissions || {
      studentCreate: false,
      studentView: false,
      studentEdit: false,
      studentDelete: false
    }
  };
};

export const selectAuthToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;