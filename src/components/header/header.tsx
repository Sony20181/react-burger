import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./header.module.css";
import navStyles from "../navMenu/navItem.module.css";
import { NavItem } from "../navMenu/navItem";
import { NavLink, useLocation } from "react-router-dom";

function AppHeader() {
  const location = useLocation();
  return (
    <header className={`${headerStyles.headerContainer} p-4`}>
      <Logo className={headerStyles.headerlogo} />
      <nav className={`${headerStyles.headerNavMenu}`}>
        <div className={`${navStyles.navSection}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? navStyles.active : "text_color_inactive"
            }
          >
            <NavItem
              icon={
                <BurgerIcon
                  type={location.pathname === "/" ? "primary" : "secondary"}
                />
              }
              text="Конструктор"
            />
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? navStyles.active : "text_color_inactive"
            }
          >
            <NavItem
              icon={<ListIcon type={"secondary"} />}
              text="Лента заказов"
            />
          </NavLink>
        </div>
        <div className={`${navStyles.navSection}`}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? navStyles.active : "text_color_inactive"
            }
          >
            <NavItem
              icon={
                <ProfileIcon
                  type={
                    location.pathname.startsWith("/profile")
                      ? "primary"
                      : "secondary"
                  }
                />
              }
              text="Личный кабинет"
            />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
