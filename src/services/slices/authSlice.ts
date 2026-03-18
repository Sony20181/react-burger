import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AUTH_REGISTER_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  INFO_USER_ENDPOINT,
  TOKEN_UPDATE_ENDPOINT,
  request,
} from "../../utils/api";

type User = {
  user: string;
  email: string;
};

type AuthResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
};

type UserResponse = {
  success: boolean;
  user: User;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

type RegisterCredentials = {
  email: string;
  password: string;
  name: string | null;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type UpdateUser = {
  userData: Partial<User>;
  accessToken: string;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<AuthResponse, RegisterCredentials>(
  "auth/register",
  async ({ email, password, name }) => {
    const data = await request<AuthResponse>(AUTH_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      mode: "cors",
      body: JSON.stringify({ email, password, name }),
    });
    if (data.success) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    return data;
  },
);

export const loginUser = createAsyncThunk<AuthResponse, LoginCredentials>(
  "auth/login",
  async ({ email, password }) => {
    const data = await request<AuthResponse>(LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (data.success) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    return data;
  },
);

export const logoutUser = createAsyncThunk<{ success: boolean }, string>(
  "auth/logout",
  async (refreshToken) => {
    const data = await request<{ success: boolean }>(LOGOUT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });
    if (data.success) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    return data;
  },
);

export const getUser = createAsyncThunk<UserResponse, string>(
  "auth/getUser",
  async (accessToken) => {
    const data = await request<UserResponse>(INFO_USER_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
    return data;
  },
);

export const updateUser = createAsyncThunk<UserResponse, UpdateUser>(
  "auth/updateUser",
  async ({ userData, accessToken }) => {
    const data = await request<UserResponse>(INFO_USER_ENDPOINT, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(userData),
    });
    return data;
  },
);

export const refreshToken = createAsyncThunk<AuthResponse, string>(
  "auth/refreshToken",
  async (refreshToken) => {
    const data = await request<AuthResponse>(TOKEN_UPDATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });
    return data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Авторизация
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        state.isAuthenticated = false;
        state.user = null;
      })

      // Выход
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // Получение пользователя
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // Обновление пользователя
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});
export default authSlice.reducer;
