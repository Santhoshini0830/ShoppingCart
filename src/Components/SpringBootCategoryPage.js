import React, { useState, useEffect } from "react";
import axios from "axios";

export const SpringBootCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCategoryId === null) {
      setProducts([]);
      return;
    }

    axios
      .get(
        `http://localhost:8080/api/products?categoryId=${selectedCategoryId}`
      )
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [selectedCategoryId]);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <a href="#" onClick={() => setSelectedCategoryId(category.id)}>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};
