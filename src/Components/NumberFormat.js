import React from "react";

export const NumberFormat = (price) => {
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  return <>{numberFormat(price)}</>;
};
