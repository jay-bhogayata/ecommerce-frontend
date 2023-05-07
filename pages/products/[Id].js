import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Product = () => {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const id  = router.query;
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${server_url}/product/${id.Id}`, {
        credentials: "include",
        sameSite: "none",
      });
      const data = await res.json();
      setProduct(data.singleProduct);
    };
    fetchProduct();
  }, [id]);
  
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          {/* <Image
            className="object-cover object-center rounded"
            src={"/myshop.png"}
            width={720}
            height={400}
            alt={product.name}
          /> */}
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-10 md:pl-6 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {product.name}
          </h1>
          <h2 className="text-sm mb-4 font-medium text-gray-600">
            {product.category}
          </h2>
          <p className="mb-8 leading-relaxed">{product.description}</p>
          <div className="flex justify-center">
            <span className="title-font font-medium text-2xl text-gray-900">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
