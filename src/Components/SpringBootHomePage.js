import React, { useState, useEffect } from "react";
import { Cards } from "./Cards";
import { Ratings } from "./Ratings";
import { NumberFormat } from "./NumberFormat";
// import { Quantity } from "./Quantity";
import { AddToCart } from "./AddToCart";
import { PlaceOrder } from "./PlaceOrder";

export const SpringBootHomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="products">
      <div className="" id="productRow">
        {products.map((product) => (
          <div className="card" key={product.id} id="productCard">
            <div className="icons"></div>
            <Cards
              id={product.id}
              title={product.title}
              image={product.image}
            />
            <div className="content">
              <h5 className="title">{product.title}</h5>
              <h5>{NumberFormat(product.price)}</h5>
              <p className="rating">
                <Ratings rating={product.stars} />
              </p>
            </div>
            <div className="counter">
              <b className="qnty">Quantity:</b>
              {/* <div className="num">
                <Quantity product={product} />
              </div> */}
            </div>
            <div className="section">
              <div className="left">
                <AddToCart id={product.id} title={product.title} />
              </div>
              <div className="right">
                <PlaceOrder id={product.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
