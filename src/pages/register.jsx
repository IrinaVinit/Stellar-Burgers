import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../components/form/Form";
import { useState } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { registrateUser } from "../services/actions/user";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userData);
  const [form, setValue] = useState({name: '', email: '', password: '' });
  
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    console.log(user);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registrateUser(form, navigate));
    
  }

  return (
    <div style={{paddingTop: "180px"}}>
    <Form title="Регистрация" button = "true" buttonText="Зарегистрироваться" question='Уже зарегистрированы?' link='Войти' route='/login' onButtonClick={onSubmit}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        value={form.name}
        onChange={onChange}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <EmailInput
        onChange={onChange}
        value={form.email}
        name={"email"}
        placeholder="E-mail"
      />
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name={"password"}
        
      />
    </Form>
    </div>
  );
}
