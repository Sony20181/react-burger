import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../profile.module.css";
import { useAppDispatch } from "../../../../hooks/redux";
import { logoutUser } from "../../../../services/slices/authSlice";

export const ProfileNav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        await dispatch(logoutUser(refreshToken)).unwrap();
        navigate("/login");
      } catch (err) {
        console.error("Ошибка при выходе:", err);
      }
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} text text_type_main-medium`}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            end
          >
            Профиль
          </NavLink>
        </li>
        <li className={`${styles.navItem} text text_type_main-medium`}>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            История заказов
          </NavLink>
        </li>
        <li className={`${styles.navItem} text text_type_main-medium`}>
          <button
            onClick={handleLogout}
            className={`${styles.link} ${styles.logoutButton}`}
          >
            Выход
          </button>
        </li>
      </ul>
      <p className={"text text_type_main-default text_color_inactive mt-20"}>
        В этом разделе вы можете <br />
        изменить свои персональные данные
      </p>
    </nav>
  );
};
