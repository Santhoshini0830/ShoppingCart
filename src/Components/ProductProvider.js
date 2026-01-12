import React, { createContext } from "react";
import { useQuery } from "react-query";

const ProductContext = createContext();

const fetchProducts = async () => {
  const response = await fetch("http://localhost:8081/api/products");
  const data = await response.json();
  return data;
};

const ProductProvider = ({ children }) => {
  const { isLoading, error, data } = useQuery("products", fetchProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
