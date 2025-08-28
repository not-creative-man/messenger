import { useForm } from "react-hook-form";
import type { RegisterTypes } from "../types/LoginForm.interface";
import { useNavigate } from "react-router-dom";
import { login } from "../store/store";
import { useDispatch } from "react-redux";

export default function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterTypes>();

  const onSubmit = async (data: RegisterTypes) => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка регистрации:", errorData);
        return;
      }


      const { userId } = await response.json();
      console.log("Успешная регистрация, userId:", userId);

      const userResponse = await fetch(`/api/user/findUserById?id=${encodeURIComponent(userId)}`, {
        method: "GET",
      });

      if (!userResponse.ok) {
        console.error("Ошибка запроса данных пользователя:", userResponse.statusText);
        return;
      }

      const userData = await userResponse.json();
      console.log("Данные пользователя:", userData);

      dispatch(login({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        login: userData.login,
        avatar_url: userData.avatar_url,
        birth: userData.birth,
      }));
      navigate("/user");
    } catch (error) {
      console.error("Сетевая ошибка:", error);
    }
  };





  const baseInputClass =
    "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition duration-200";

  const getInputClass = (hasError: boolean) =>
    `${baseInputClass} ${hasError
      ? "border-red-500 focus:ring-red-300"
      : "border-gray-300 focus:ring-indigo-400"
    }`;

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Регистрация</h2>
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

        <input
          {...register("name")}
          placeholder="Имя"
          className={getInputClass(false)}
        />

        <input
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          placeholder="Email"
          className={getInputClass(!!errors.email)}
        />

        <input
          {...register("birth")}
          type="date"
          className={getInputClass(false)}
        />

        <input
          {...register("avatarUrl")}
          placeholder="URL фото"
          className={getInputClass(false)}
        />

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-200"
        >
          Зарегистрироваться
        </button>
        <p className="text-center text-sm text-gray-500 mt-5">
          Уже есть аккаунт?{' '}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">
            Войти
          </a>
        </p>
      </form>
    </div>
  );
}
