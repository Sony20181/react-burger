import { useState } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../../services/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function LoginPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      const result = await dispatch(
        loginUser({
          email: email,
          password: password,
        }),
      ).unwrap();
      if (result.success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${styles.containerLogin} mb-6`}>
      <h1 className={`mb-6`}>Вход</h1>
      <form onSubmit={handleSubmit}>
        <EmailInput
          onChange={onEmailChange}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass={`mb-6`}
        />
        <PasswordInput
          onChange={onPasswordChange}
          value={password}
          name={"password"}
          extraClass="mb-6"
        />
        {error && (
          <p className="text text_type_main-default textColorError mb-4">
            Ошибка: {error}
          </p>
        )}
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`mb-20`}
          disabled={loading || !email || !password}
        >
          Вход
        </Button>
      </form>

      <div className={`${styles.containerRegister} mb-4`}>
        <p className={`text text_type_main-default`}>
          Вы - новый пользователь?
        </p>
        <Link to="/register">
          <p className={`${styles.text} text text_type_main-default`}>
            Зарегестрироваться
          </p>
        </Link>
      </div>
      <div className={`${styles.containerForgotPassword}`}>
        <p className={`text text_type_main-default`}>Забыли пароль?</p>
        <Link to="/forgot-password">
          <p className={`${styles.text} text text_type_main-default`}>
            Восстановить пароль
          </p>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
