import { FormEvent } from "react";
import styles from "./reset-password.module.css";
import { useNavigate, Link } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { requestPasswordReset } from "../../services/slices/passwordResetSlice";
import { useAppDispatch } from "../../hooks/redux";
import { useForm } from "../../hooks/useForm";

function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.password || !values.token) return;

    try {
      const result = await dispatch(
        requestPasswordReset({
          password: values.password,
          token: values.token,
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
          onChange={handleChange}
          value={values.password}
          name={"password"}
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChange}
          value={values.token}
          name={"token"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`mb-20`}
          disabled={!values.password || !values.token}
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
