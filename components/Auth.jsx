import Link from "next/link";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

export default function Auth({ isSignupComponent }) {
  // setup useForm (fhf)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // define rule for password
  const rule = {
    password: {
      required: "password field is required",
      minLength: {
        value: 8,
        message: "password length at least be 8 ch. long",
      },
      maxLength: {
        value: 20,
        message: "password length can not be more then 20 ch.",
      },
    },
  };

  // handle login ans signup
  const handleAuth = (data) => {
    if (isSignupComponent) {
      fetch("http://localhost:8080/api/v1/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
    } else {
      fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            Cookies.set("token", data.token);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const handleLogout = () => {
    fetch("http://localhost:8080/api/v1/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className=" flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isSignupComponent ? "Sign up to MyShop" : "Sing in to MyShop"}
          </h2>
        </div>
        <button
          className="bg-red-800 px-5 py-2 rounded-lg sm:w-1/4 self-center"
          onClick={handleLogout}
        >
          logout
        </button>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            {isSignupComponent && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder:text-gray-400  sm:text-lg  p-2 sm:leading-6"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500">name filed is required</span>
                  )}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 p-2"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">email field is required</span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {!isSignupComponent && (
                  <div className="text-sm">
                    <Link
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg p-2 sm:leading-6"
                  {...register("password", rule.password)}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              {isSignupComponent ? (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSubmit(handleAuth)}
                >
                  Sign up
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSubmit(handleAuth)}
                >
                  Sign in
                </button>
              )}
            </div>
          </form>

          {isSignupComponent ? (
            <p className="mt-10 text-center text-sm text-gray-500">
              already have account ?
              <Link
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                {"   "}
                go to login
              </Link>
            </p>
          ) : (
            <p className="mt-10 text-center text-sm text-gray-500">
              new to myShop
              <Link
                href="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                create account today
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
