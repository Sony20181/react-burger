import passwordResetReducer, {
  requestPasswordForgot,
  requestPasswordReset,
  clearPasswordResetState,
} from "./passwordResetSlice";

describe("passwordResetSlice", () => {
  // Начальное состояние
  test("должен вернуть начальное состояние", () => {
    const initialState = passwordResetReducer(undefined, { type: "unknown" });
    expect(initialState).toEqual({
      loading: false,
      error: null,
      success: false,
      emailSent: false,
    });
  });

  // REQUEST PASSWORD FORGOT
  describe("requestPasswordForgot", () => {
    // requestPasswordForgot.pending
    test("должен установить loading true", () => {
      const initialState = {
        loading: false,
        error: null,
        success: false,
        emailSent: false,
      };

      const action = { type: requestPasswordForgot.pending.type };
      const newState = passwordResetReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.success).toBe(false);
    });

    // requestPasswordForgot.fulfilled
    test("должен установить emailSent true при fulfilled", () => {
      const initialState = {
        loading: true,
        error: null,
        success: false,
        emailSent: false,
      };

      const action = {
        type: requestPasswordForgot.fulfilled.type,
        payload: { success: true, message: "Email sent" },
      };

      const newState = passwordResetReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.success).toBe(true);
      expect(newState.emailSent).toBe(true);
      expect(newState.error).toBeNull();
    });

    // requestPasswordForgot.rejected
    test("должен сохранить ошибку при rejected", () => {
      const initialState = {
        loading: true,
        error: null,
        success: false,
        emailSent: false,
      };

      const errorMessage = "Пользователь не найден";
      const action = {
        type: requestPasswordForgot.rejected.type,
        error: { message: errorMessage },
      };

      const newState = passwordResetReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.success).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });

  // REQUEST PASSWORD RESET
  describe("requestPasswordReset", () => {
    // requestPasswordReset.pending
    test("должен установить loading true", () => {
      const initialState = {
        loading: false,
        error: null,
        success: false,
        emailSent: false,
      };

      const action = { type: requestPasswordReset.pending.type };
      const newState = passwordResetReducer(initialState, action);
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    //  requestPasswordReset.fulfilled
    test("должен установить success: true при fulfilled", () => {
      const initialState = {
        loading: true,
        error: null,
        success: false,
        emailSent: false,
      };

      const action = {
        type: requestPasswordReset.fulfilled.type,
        payload: { success: true, message: "Password reset" },
      };
      const newState = passwordResetReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.success).toBe(true);
      expect(newState.error).toBeNull();
    });

    //requestPasswordReset.rejected
    test("должен сохранить ошибку при rejected", () => {
      const initialState = {
        loading: true,
        error: null,
        success: false,
        emailSent: false,
      };

      const errorMessage = "Неверный код подтверждения";
      const action = {
        type: requestPasswordReset.rejected.type,
        error: { message: errorMessage },
      };
      const newState = passwordResetReducer(initialState, action);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe("clearPasswordResetState", () => {
    //clearPasswordResetState
    test("должен полностью сбросить состояние", () => {
      const initialState = {
        loading: true,
        error: "Some error",
        success: true,
        emailSent: true,
      };

      const action = { type: clearPasswordResetState.type };
      const newState = passwordResetReducer(initialState, action);
      expect(newState).toEqual({
        loading: false,
        error: null,
        success: false,
        emailSent: false,
      });
    });
  });
});
