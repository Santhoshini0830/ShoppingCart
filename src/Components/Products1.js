// import { QueryClient, QueryClientProvider, useQuery } from "react-query";

// // const queryClient = new QueryClient();

// export const Products1 = () => {
//   const { isLoading, data, error } = useQuery("products", () =>
//     fetch("http://localhost:8081/api/products").then((res) => res.json())
//   );

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <ul>
//       {data.map((product) => (
//         <li key={product.id}>{product.title}</li>
//       ))}
//     </ul>
//   );
// };

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ProductList />
//     </QueryClientProvider>
//   );
// }

import React from "react";

const Products1 = ({ product }) => (
  <div>
    <img src={product.image} alt={product.title} />
    <h2>{product.title}</h2>
    <p>{product.price}</p>
  </div>
);

export default Products1;
