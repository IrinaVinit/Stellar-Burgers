import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../services/actions/user";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previousRoute = useSelector((store) => store.user.previousRoute);

  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(form, navigate, previousRoute));
  };

  return (
    <div style={{ paddingTop: "180px" }}>
      <Form
        title="Вход"
        button="true"
        buttonText="Войти"
        question="Вы — новый пользователь?"
        link="Зарегистрироваться"
        question2="Забыли пароль?"
        link2="Восстановить пароль"
        route="/register"
        route2="/forgot-password"
        onButtonClick={onSubmit}
      >
        <EmailInput
          onChange={onChange}
          value={form.email}
          name="email"
          placeholder="E-mail"
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name="password"
        />
      </Form>
    </div>
  );
}
