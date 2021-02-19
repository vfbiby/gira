import { useForm } from "react-hook-form";
import { localStorageKey } from "./auth-provider";
import { useDarkTheme } from "./context/dark-context";

interface LoginFormProps {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm<LoginFormProps>();
  const onSubmit = (data: any) => {
    console.log(data);
    localStorage.setItem(localStorageKey, "valid-token");
  };

  return (
    <form className="w-full p-2 sm:max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-3">
        <label
          className="w-full py-3 text-gray-900 dark:text-white"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="w-full px-4 py-2 rounded bg-gray-50"
          type="text"
          name="username"
          ref={register}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label
          className="w-full py-3 to-gray-900 dark:text-white"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full px-4 py-2 rounded bg-gray-50"
          type="password"
          name="password"
          ref={register({ required: true })}
        />
      </div>
      <div>
        {errors.password && (
          <p className="pt-3 text-pink-700">The field is required.</p>
        )}
      </div>
      <input
        className="w-full py-4 mt-10 tracking-widest text-white uppercase bg-pink-500 rounded"
        style={{ letterSpacing: "0.6rem" }}
        type="submit"
      />
    </form>
  );
};

const UnauthenticatedApp = () => {
  const darkTheme = useDarkTheme();
  return (
    <div className="flex flex-col items-center w-full h-screen min-h-full mx-auto">
      <LoginForm />
      <div className="w-full">
        <button
          type="button"
          className={
            "absolute focus:outline-none h-8 w-8 text-white uppercase bg-gray-900 rounded-full left-5 top-4 dark:text-gray-900 dark:bg-white focu"
          }
          onClick={() => {
            darkTheme?.setDark(!darkTheme.isDark);
          }}
        >
          D
        </button>
      </div>
    </div>
  );
};

export default UnauthenticatedApp;
