import { useEffect, useState } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-form.module.css";
import { updateUser } from "../../../../services/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [isFormChanged, setIsFormChanged] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const userData = {};
    if (name !== originalName) userData.name = name;
    if (email !== originalEmail) userData.email = email;
    if (password) userData.password = password;
    try {
      await dispatch(updateUser({ userData, accessToken })).unwrap();
      setOriginalName(name);
      setOriginalEmail(email);
      setPassword("");
      setIsFormChanged(false);
    } catch (err) {
      console.log("Ошибка обноволения данных", err);
    }
  };

  const handleCancel = () => {
    setName(originalName);
    setEmail(originalEmail);
    setPassword("");
    setIsFormChanged(false);
  };

  // загрузка данных
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setOriginalName(user.name || "");
      setOriginalEmail(user.email || "");
    }
  }, [user]);

  // наличие изменений
  useEffect(() => {
    if (user) {
      const isNameChanged = name !== originalName;
      const isEmailChanged = email !== originalEmail;
      const isPasswordChanged = password !== "";
      setIsFormChanged(isNameChanged || isEmailChanged || isPasswordChanged);
    }
  }, [name, email, password, originalName, originalEmail, user]);

  if (!user) {
    return <div>Подождите, идет загрузка...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeName}
        value={name}
        name={"name"}
        icon={"EditIcon"}
        size={"default"}
        extraClass="mb-6"
      />
      <EmailInput
        onChange={onEmailChange}
        value={email}
        name={"email"}
        placeholder="E-mail"
        isIcon={true}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        name={"password"}
        icon="EditIcon"
        extraClass="mb-6"
      />

      {isFormChanged && (
        <div className={`${styles.buttons}`}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}
export default ProfileForm;
