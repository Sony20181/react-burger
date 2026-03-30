import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  PASSWORD_FORGOT_ENDPOINT,
  PASSWORD_RESET_ENDPOINT,
  request,
} from "../../utils/api";

type PasswordForgotState = {
  loading: boolean;
  error: string | null;
  success: boolean;
  emailSent: boolean;
};

type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

type ResetPasswordParams = {
  password: string;
  token: string;
};

const initialState: PasswordForgotState = {
  loading: false,
  error: null,
  success: false,
  emailSent: false,
};

export const requestPasswordForgot = createAsyncThunk<
  ForgotPasswordResponse,
  string
>("passwordReset/requestForgot", async (email) => {
  const data = await request<ForgotPasswordResponse>(PASSWORD_FORGOT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
    },
    mode: "cors",
    body: JSON.stringify({
      email,
    }),
  });
  return data;
});

export const requestPasswordReset = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordParams
>("passwordReset/requestReset", async ({ password, token }) => {
  const data = await request<ResetPasswordResponse>(PASSWORD_RESET_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
    },
    mode: "cors",
    body: JSON.stringify({
      password,
      token,
    }),
  });
  return data;
});

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    clearPasswordResetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.emailSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPasswordForgot.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        requestPasswordForgot.fulfilled,
        (state, action: PayloadAction<ForgotPasswordResponse>) => {
          state.loading = false;
          state.success = action.payload.success;
          state.emailSent = true;
        },
      )
      .addCase(requestPasswordForgot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        state.success = false;
      });

    builder
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { clearPasswordResetState } = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
