import Image from "next/image";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [product, setProduct] = useState([]);
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      const data = await (
        await fetch(`${server_url}/products`, {
          credentials: "include",
          sameSite: "none",
        })
      ).json();
      setProduct(data.products);
    };
    fetchData();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <h1 className="text-center my-5 text-2xl font-semibold">
        {" "}
        product catalog{" "}
      </h1>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {product.map((p) => (
            <div
              key={p._id}
              className="lg:w-1/4 md:w-1/2 p-4 w-full border-2 border-stone-700 my-2"
            >
              <Image src={"/myshop.png"} width={100} height={100} />

              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {p.catagory}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {p.name}
                </h2>
                <p className="mt-1">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
