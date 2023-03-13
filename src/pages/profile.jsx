import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/Form";
import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./profile.module.css";
import {
  logOut,
  setNewUserData,
  IS_CHANGING,
  STOP_CHANGING,
} from "../services/actions/user";

export default function ProfilePage() {
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user?.userData?.name);
  const email = useSelector((store) => store.user?.userData?.email);
  const isChanging = useSelector((state) => state.user?.isChanging);
  const [user, changeValue] = useState({
    name: name,
    email: email,
    password: "",
  });

  const onIconClick = (ref) => {
    ref.current.focus();
  };

  const onChange = (e) => {
    dispatch({ type: IS_CHANGING });
    changeValue({ ...user, [e.target.name]: e.target.value });
  };

  const canselChanging = () => {
    changeValue({ name: name, email: email });
    dispatch({ type: STOP_CHANGING });
  };

  const handleLogout = () => {
    dispatch(logOut(navigate));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setNewUserData(user));
    changeValue({ ...user, password: "" });
    dispatch({ type: STOP_CHANGING });
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileSection}>
        <nav className={styles.profileList}>
          <NavLink
            to="/profile"
            className={`${styles.link} text text_type_main-medium`}
            style={({ isActive }) => ({
              color: isActive ? " #f2f2f3" : "#8585AD",
            })}
          >
            Профиль
          </NavLink>

          <NavLink
            to="/profile/orders"
            className={`${styles.link} text text_type_main-medium`}
            style={({ isActive }) => ({
              color: isActive ? " #f2f2f3" : "#8585AD",
            })}
          >
            История заказов
          </NavLink>

          <Button
            onClick={handleLogout}
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={`${styles.link} text text_type_main-medium`}
          >
            Выход
          </Button>
        </nav>
        <span className="text text_type_main-default text_color_inactive">
          В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp;свои персональные
          данные
        </span>
      </div>
      <Form extraClass={styles.position} button="false">
        <Input
          type={"text"}
          placeholder={"Имя"}
          value={user.name}
          onChange={onChange}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon={"EditIcon"}
          ref={inputRef}
          onIconClick={() => onIconClick(inputRef)}
        />
        <EmailInput
          onChange={onChange}
          value={user.email}
          name={"email"}
          placeholder="E-mail"
          icon={"EditIcon"}
          required
        />
        <PasswordInput
          onChange={onChange}
          value={user.password}
          name={"password"}
          icon={"EditIcon"}
        />
        {isChanging && (
          <div className={styles.buttons}>
            <Button
              onClick={canselChanging}
              htmlType="button"
              type="secondary"
              size="medium"
              extraClass={styles.buttonSize}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              onClick={onSubmit}
            >
              Сохранить
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
