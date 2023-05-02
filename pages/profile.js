import React, { useState, useEffect } from "react";
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
        console.log(data);

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
        setData(JSON.parse(user));
      }
    }
  }, []);

  return (
    <div className="flex flex-col   items-center">
      <ToastContainer />
      <h1 className="text-xl text-center my-3">{data.name?.email}</h1>
      <h1 className="text-xl text-center my-3">{data.name?.userName}</h1>
      <h1 className="text-xl text-center my-3">{data.name?.role}</h1>

      <button
        type="submit"
        className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 md:w-1/4"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
};

export default profile;
