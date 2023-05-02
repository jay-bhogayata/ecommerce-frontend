import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const profile = () => {
  const [data, setData] = useState({});

  const notify = (msg) => toast.success(`${msg} success`);
  const notifyErr = (msg) => toast.error(msg);

  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleLogout = () => {
    fetch(`${server_url}/logout`, {
      credentials: "include",
      sameSite: "none",
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.success) {
          notify("logout");
          localStorage.clear();
          window.location.href = "/";
        } else {
          notifyErr(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user !== null) {
        const userInfo = JSON.parse(user);
        setData(userInfo.name);
      }
    }
  }, []);

  return (
    <div className="flex flex-col  min-h-screen items-center">
      <ToastContainer />
      <div className="flex  w-full justify-center items-center space-x-10 ">
        <div
          className={`w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 my-3 border-1 border-black`}
        />
        <div className="space-y-1">
          <p className="text-2xl">Hello,</p>
          <h1 className="text-3xl text-center font-medium">{data.userName}</h1>
        </div>
      </div>

      <button
        type="submit"
        className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 
        w-1/2
        md:w-1/4"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
};

export default profile;
