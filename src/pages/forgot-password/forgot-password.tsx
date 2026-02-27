import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { requestPasswordForgot } from "../../services/slices/passwordResetSlice";
import { useForm } from "../../hooks/useForm";

function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.passwordReset);
  const { values, handleChange } = useForm({ email: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.email) {
      return;
    }
    // временное решение
    try {
      const result = await dispatch(
        (requestPasswordForgot as any)(values.email),
      ).unwrap();
      if (result) {
        navigate("/reset-password");
      }
    } catch (error) {
      console.error("Ошибка при запросе восстановления пароля:", error);
    }
  };

  return (
    <div className={`${styles.containerForgotPassword} mb-6`}>
      <h1 className={`mb-6`}>Восстановление пароля</h1>
      <form onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={false}
          extraClass={`mb-6`}
        />
        {error && (
          <p>
            Простите, возникла непредвиденная ошибка.Попробуйте изменить пароль
            позже
          </p>
        )}
        {loading && <p>Пожалуйста,ожидайте. Идет загрузка...</p>}
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`mb-20`}
          disabled={loading || !values.email}
        >
          Восстановить
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

export default ForgotPasswordPage;
