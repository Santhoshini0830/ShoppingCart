import React from "react";
import { useQuery } from "react-query";

export const Products2 = () => {
  const { isLoading, error, data } = useQuery("products", () =>
    fetch("http://localhost:8081/api/products").then((response) =>
      response.json()
    )
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      {data.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

// export default ProductList;
