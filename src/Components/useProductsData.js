import axios from "axios";
import { useQuery } from "react-query";

export const useProductsData = () => {
  return useQuery("products", async () => {
    const response = await axios.get("http://localhost:8081/api/products");
    return response.data;
  });
};
