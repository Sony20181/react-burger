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
import { useForm } from "../../../../hooks/useForm";

function ProfileForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [originalValues, setOriginalValues] = useState({ name: "", email: "" });
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const userData = {};
    if (values.name !== originalValues.name) userData.name = values.name;
    if (values.email !== originalValues.email) userData.email = values.email;
    if (values.password) userData.password = values.password;
    try {
      await dispatch(updateUser({ userData, accessToken })).unwrap();
      setOriginalValues({ name: values.name, email: values.email });
      setValues({ ...values, password: "" });
      setIsFormChanged(false);
    } catch (err) {
      console.log("Ошибка обноволения данных", err);
    }
  };

  const handleCancel = () => {
    setValues({ ...originalValues, password: "" });
    setIsFormChanged(false);
  };

  // загрузка данных
  useEffect(() => {
    if (user) {
      const userValues = {
        name: user.name || "",
        email: user.email || "",
        password: "",
      };
      setValues(userValues);
      setOriginalValues({ name: user.name || "", email: user.email || "" });
    }
  }, [user, setValues]);

  // наличие изменений
  useEffect(() => {
    if (user) {
      const isNameChanged = values.name !== originalValues.name;
      const isEmailChanged = values.email !== originalValues.email;
      const isPasswordChanged = values.password !== "";
      setIsFormChanged(isNameChanged || isEmailChanged || isPasswordChanged);
    }
  }, [values, originalValues, user]);

  if (!user) {
    return <div>Подождите, идет загрузка...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChange}
        value={values.name}
        name={"name"}
        icon={"EditIcon"}
        size={"default"}
        extraClass="mb-6"
      />
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        placeholder="E-mail"
        isIcon={true}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
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
