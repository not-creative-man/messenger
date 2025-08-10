import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/store.js";
import type { LoginTypes } from "../types/LoginForm.interface";


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTypes>();

  const onSubmit = async (data: LoginTypes) => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка входа:", errorData);
        return;
      }
  
      const userId = await response.json(); 
      console.log("Успешный вход. ID пользователя:", userId);
  
    
      const userResponse = await fetch(`/api/user/findUserById?id=${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!userResponse.ok) {
        console.error("Ошибка запроса данных пользователя:", userResponse.statusText);
        return;
      }
  
      const userData = await userResponse.json();
      console.log("Данные пользователя:", userData);
  
      dispatch(login({   id: userData.id,
        name: userData.name,
        email: userData.email,
        login: userData.login,
        avatar_url: userData.avatar_url,
        birth: userData.birth, }));
      navigate("/user");
  
    } catch (error) {
      console.error("Сетевая ошибка:", error);
    }
  };
  
  

  const baseInputClass =
    "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition duration-200 bg-white";

  const getInputClass = (hasError: boolean) =>
    `${baseInputClass} ${
      hasError
        ? "border-red-500 focus:ring-red-300"
        : "border-gray-300 focus:ring-indigo-400"
    }`;

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Вход
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          {...register("login", { required: true })}
          placeholder="Логин"
          className={getInputClass(!!errors.login)}
        />

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Пароль"
          className={getInputClass(!!errors.password)}
        />

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-200"
        >
          Войти
        </button>

        <p className="text-center text-sm text-gray-500 mt-5">
          Еще нет аккаунта?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Зарегистрироваться
          </a>
        </p>
      </form>
    </div>
  );
}
