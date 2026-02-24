import styles from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../services/slices/authSlice";
import { useForm } from "../../hooks/useForm";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.password) {
      return;
    }
    try {
      const result = await dispatch(
        registerUser({
          email: values.email,
          password: values.password,
          name: values.name,
        }),
      ).unwrap();
      if (result.success) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${styles.containerRegister} mb-6`}>
      <h1 className={`mb-6`}>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={false}
          extraClass={`mb-6`}
        />

        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          extraClass="mb-6"
        />
        {error && (
          <p className="text text_type_main-default text_color_error mb-4">
            Ошибка регистрация
          </p>
        )}
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`mb-20`}
          disabled={
            loading || !values.name || !values.email || !values.password
          }
        >
          Зарегистрироваться
        </Button>
      </form>

      <div className={`${styles.footer} mb-4`}>
        <p className={`text text_type_main-default`}>Уже зарегистрированы?</p>
        <Link to="/login">
          <p className={`${styles.signInText} text text_type_main-default`}>
            Войти
          </p>
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
