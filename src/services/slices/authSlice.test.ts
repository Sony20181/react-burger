import authReducer, {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  refreshToken,
} from "./authSlice";

const mockUser = {
  user: "testuser",
  email: "test@example.com",
};

const mockAuthResponse = {
  success: true,
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
  user: mockUser,
};

const mockUserResponse = {
  success: true,
  user: mockUser,
};

describe("authSlice", () => {
  // начальное состояние
  test("должен вернуть начальное состояние", () => {
    const initialState = authReducer(undefined, { type: "unknown" });
    expect(initialState).toEqual({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  });

  // РЕГИСТРАЦИЯ
  describe("registerUser", () => {
    // registerUser.pending
    test("должен установить loading true", () => {
      const initialState = {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

      const action = { type: registerUser.pending.type };
      const newState = authReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    // registerUser.fulfilled
    test("должен сохранить пользователя и токены при fulfilled", () => {
      const initialState = {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null,
      };

      const action = {
        type: registerUser.fulfilled.type,
        payload: mockAuthResponse,
      };

      const newState = authReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.user).toEqual(mockUser);
      expect(newState.error).toBeNull();
    });

    // registerUser.rejected
    test("должен сохранить ошибку при rejected", () => {
      const initialState = {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null,
      };

      const errorMessage = "Ошибка";
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage },
      };

      const newState = authReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.user).toBeNull();
      expect(newState.error).toBe(errorMessage);
    });
  });

  // ЛОГИН - АВТОРИЗАЦИЯ
  describe("loginUser", () => {
    // loginUser.pending
    test("должен установить loading true", () => {
      const initialState = {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

      const action = { type: loginUser.pending.type };
      const newState = authReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    // loginUser.fulfilled
    test("должен сохранить пользователя и токены при fulfilled", () => {
      const initialState = {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null,
      };

      const action = {
        type: loginUser.fulfilled.type,
        payload: mockAuthResponse,
      };

      const newState = authReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.user).toEqual(mockUser);
      expect(newState.error).toBeNull();
    });

    //loginUser.rejected
    test("должен сохранить ошибку при rejected", () => {
      const initialState = {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null,
      };

      const errorMessage = "Неверный email или пароль";
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage },
      };

      const newState = authReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.user).toBeNull();
      expect(newState.error).toBe(errorMessage);
    });
  });

  // LOGOUT

  describe("logoutUser", () => {
    //logoutUser.fulfilled
    test("должен очистить пользователя при fulfilled", () => {
      const initialState = {
        user: mockUser,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
      const action = {
        type: logoutUser.fulfilled.type,
        payload: { success: true },
      };

      const newState = authReducer(initialState, action);
      expect(newState.user).toBeNull();
      expect(newState.isAuthenticated).toBe(false);
    });
  });

  // GET USER
  describe("getUser", () => {
    // getUser.fulfilled
    test("должен сохранить пользователя при fulfilled", () => {
      const initialState = {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

      const action = {
        type: getUser.fulfilled.type,
        payload: mockUserResponse,
      };

      const newState = authReducer(initialState, action);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthenticated).toBe(true);
    });

    // getUser.rejected
    test("должен очистить пользователя при rejected", () => {
      const initialState = {
        user: mockUser,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

      const action = {
        type: getUser.rejected.type,
        error: { message: "Токен истек" },
      };

      const newState = authReducer(initialState, action);
      expect(newState.user).toBeNull();
      expect(newState.isAuthenticated).toBe(false);
    });
  });

  // UPDATE USER
  describe("updateUser", () => {
    // updateUser.fulfilled
    test("должен обновить данные пользователя", () => {
      const updatedUser = {
        user: "usernamenew",
        email: "emailNew@example.com",
      };

      const initialState = {
        user: mockUser,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

      const action = {
        type: updateUser.fulfilled.type,
        payload: { success: true, user: updatedUser },
      };

      const newState = authReducer(initialState, action);
      expect(newState.user).toEqual(updatedUser);
    });
  });

  // REFRESH TOKEN
  describe("refreshToken", () => {
    // refreshToken.fulfilled
    test("должен обновить токены ", () => {
      const initialState = {
        user: mockUser,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

      const action = {
        type: refreshToken.fulfilled.type,
        payload: mockAuthResponse,
      };
      const newState = authReducer(initialState, action);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthenticated).toBe(true);
    });
  });
});
