import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "../services/actions/user";
import { Navigate } from "react-router-dom";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isReset = useSelector((state) => state.user.isReset);
  console.log(isReset);

  const [form, setValue] = useState({ password: "", token: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setNewPassword(form, navigate));
  };

  return isReset ? (
    <div style={{ paddingTop: "180px" }}>
      <Form
        title="Восстановление пароля"
        button="true"
        buttonText="Сохранить"
        question="Вспомнили пароль?"
        link="Войти"
        route="/login"
        onButtonClick={onSubmit}
      >
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name="password"
          placeholder="Введите новый пароль"
          required
        />
        <Input
          type={"text"}
          placeholder="Введите код из письма"
          value={form.token}
          onChange={onChange}
          name="token"
          size="default"
          required
        />
      </Form>
    </div>
  ) : (
    <Navigate to="/forgot-password" />
  );
}
