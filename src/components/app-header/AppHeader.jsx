import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { useLocation, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../utils/data";

function AppHeader() {
  const { userData } = useSelector(getUser);
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={`${styles.navList} pb-4 pt-4`}>
          <NavLink
            to="/"
            className={`${styles.link} pb-4 pt-4 pl-5 pr-5`}
            style={({ isActive }) => ({
              color: isActive ? " #f2f2f3" : "#8585AD",
            })}
          >
            <BurgerIcon type={pathname == "/" ? "primary" : "secondary"} />
            <p className="text text_type_main-default pl-2">Конструктор</p>
          </NavLink>

          <NavLink
            to="/feed"
            className={`${styles.link} pb-4 pt-4 pl-5 pr-5`}
            style={({ isActive }) => ({
              color: isActive ? " #f2f2f3" : "#8585AD",
            })}
          >
            <ListIcon type={pathname == "/feed" ? "primary" : "secondary"} />
            <p className="text text_type_main-default pl-2">Лента заказов</p>
          </NavLink>
        </nav>
        <Logo />
        <div className={`${styles.account} pb-4 pt-4 pl-5 pr-5`}>
          <NavLink
            to="/profile"
            className={styles.link}
            style={({ isActive }) => ({
              color: isActive ? " #f2f2f3" : "#8585AD",
            })}
          >
            <ProfileIcon
              type={pathname == "/profile" ? "primary" : "secondary"}
            />
            <p className="text text_type_main-default pl-2 pr-5">
              {userData ? `${userData.name}` : "Личный кабинет"}
            </p>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
export default AppHeader;
