import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createLoginService, createUserService, getUsersByRoleService, getUserService } from "../../services/user/user.service";
import type { LoginPayload } from "../../types/user.types";

export const createUserThunk = createAsyncThunk(
  "user/create",
  async (userData: any, { rejectWithValue }) => {
    try {
      const res = await createUserService(userData);
      if (!res.ok) throw new Error("Ya existe un usuario con ese correo.");
      return res.message;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error inesperado.");
    }
  }
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await createLoginService(data);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al iniciar sesión.");
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserService();
      console.log("User response", response);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al obtener el usuario.");
    }
  }
);

export const getUsersByRoleThunk = createAsyncThunk(
  "user/byRole",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsersByRoleService();
      console.log("User rol", response);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al obtener el usuario.");
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    successMessage: "",
    error: "",
    usersByRol: [],
    me: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = "";
      state.error = "";
    },
    logout: (state) => {
      state.me = null;
      state.successMessage = "";
      state.error = "";
      localStorage.removeItem("access_token");
    }
  },
  extraReducers: (builder) => {
    builder
      // CREATE USER
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.error = "";
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // LOGIN USER
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {

        state.loading = false;
        state.me = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET USER
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.me = action.payload;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET USER BY ROLE
      .addCase(getUsersByRoleThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUsersByRoleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.me = state.me;
        state.usersByRol = action.payload;
      })
      .addCase(getUsersByRoleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }
});

export const { clearMessages, logout } = userSlice.actions;
export default userSlice.reducer;
