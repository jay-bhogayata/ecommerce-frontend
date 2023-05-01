import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auth({ isSignupComponent }) {
  const notify = (msg) => toast.success(`${msg} success`);
  const notifyErr = (msg) => toast.error(msg);
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
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  // handle login ans signup
  const handleAuth = (data) => {
    if (isSignupComponent) {
      fetch(`${server_url}/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        credentials: "same-origin",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            notify("signup");
          } else {
            notifyErr(data.message);
          }
        })
        .catch((e) => console.log(e));
    } else {
      console.log(server_url);

      fetch(`${server_url}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "access-control-expose-headers": "Set-Cookie",
          sameSite: "none",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.success) {
            notify("login");
          } else {
            notifyErr(data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleLogout = () => {
    fetch(`${server_url}/logout`, {
      credentials: "include",
      sameSite: "none",
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);

        if (data.success) {
          notify("logout");
        } else {
          notifyErr(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className=" flex min-h-full flex-col-reverse   md:flex-row md:my-20 md:mx-20 justify-center px-6 lg:px-8 md:space-x-20">
        <div className="left md:w-1/2 flex justify-center items-center">
          <Image
            src="./shop.svg"
            alt="shop-img"
            width={500}
            height={900}
            className="self-center py-10 px-10 md:px-0"
          />
        </div>
        <div className="left md:w-1/2 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col ">
            <Image
              src="/myshop.png"
              alt="me"
              width="150"
              height="150"
              className="self-center  pr-5"
            />
            <h2 className="my-5 text-center text-4xl font-semibold leading-9 tracking-tight text-blue-400 ">
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
              <ToastContainer />
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder:text-gray-400  sm:text-lg  p-2 sm:leading-6 mb-2"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-red-600  ">
                        name filed is required.
                      </span>
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 p-2 mb-2"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-600 ">
                      email field is required.
                    </span>
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg p-2 sm:leading-6 mb-2"
                    {...register("password", rule.password)}
                  />
                  {errors.password && (
                    <span className="text-red-600 ">
                      {errors.password.message}.
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
      </div>
    </>
  );
}
