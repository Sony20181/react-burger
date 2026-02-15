import { useState } from "react";
import styles from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../services/slices/authSlice";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onChangeNama = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    try {
      const result = await dispatch(
        registerUser({
          email: email,
          password: password,
          name: name,
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
          onChange={onChangeNama}
          value={name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass={`mb-6`}
        />

        <PasswordInput
          onChange={onChangePassword}
          value={password}
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
          disabled={loading || !name || !email || !password}
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
