import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/slices/authSlice";

function ProfilePage() {
  const dispatch = useDispatch();
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
    <div className={`${styles.containerProfile} mb-6`}>
      <nav className={`${styles.nav}`}>
        <ul className={`${styles.navList}`}>
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

      <div className={`${styles.content}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePage;
