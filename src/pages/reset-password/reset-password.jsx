import styles from "./reset-password.module.css";
import { useNavigate, Link } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { requestPasswordReset } from "../../services/slices/passwordResetSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordResetValue, setPasswordResetValue] = useState("");
  const [tokenValue, setTokenValue] = useState("");

  const onChangePassword = (e) => {
    setPasswordResetValue(e.target.value);
  };

  const onTokenChange = (e) => {
    setTokenValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordResetValue || !tokenValue) return;

    try {
      const result = await dispatch(
        requestPasswordReset({
          password: passwordResetValue,
          token: tokenValue,
        }),
      ).unwrap();

      if (result.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${styles.containerForgotPassword} mb-6`}>
      <h1 className={`mb-6`}>Восстановление пароля</h1>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          onChange={onChangePassword}
          value={passwordResetValue}
          name={"password"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onTokenChange}
          value={tokenValue}
          name={"token"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`mb-20`}
          disabled={!passwordResetValue || !tokenValue}
        >
          Сохранить
        </Button>
      </form>

      <div className={`${styles.footer}`}>
        <p className={`text text_type_main-default`}>Вспомнили пароль?</p>
        <Link to="/login">
          <p className={`${styles.signInText} text text_type_main-default`}>
            Войти
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
