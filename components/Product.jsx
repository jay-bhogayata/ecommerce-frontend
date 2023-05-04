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
    <div className="grid grid-cols-1 md:grid-cols-2">
      {product.map((p) => (
        <div key={p._id} className="border-2 p-5 ">
          <h1>{p.name}</h1>
          <p>category : {p.catagory}</p>
          <p>from:{p.brand}</p>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;
