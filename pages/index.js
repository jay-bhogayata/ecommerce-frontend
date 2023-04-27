import Link from "next/link";

const index = () => {
  return (
    <div className="h-screen bg-stone-900 flex flex-col space-y-3  items-center">
      <h1 className="text-3xl font-semibold text-center pt-10 text-purple-700">
        Hello from my ecomm app
      </h1>
      <Link
        href={"/login"}
        className="text-white text-lg
      bg-green-600 px-5 py-2 rounded-lg
      lg:w-1/5 text-center
      "
      >
        Login Page{" "}
      </Link>
      <Link
        href={"/signup"}
        className="text-white text-lg
      bg-green-600 px-5 py-2 rounded-lg
      lg:w-1/5 text-center
      "
      >
        Signup Page{" "}
      </Link>
    </div>
  );
};

export default index;
