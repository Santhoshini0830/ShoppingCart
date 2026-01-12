import React from "react";
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Routes, Route } from "react-router-dom";
import { LastLocationProvider } from "react-router-dom-last-location";
import { Header } from "./Components/Header";
import { Products } from "./Components/Products";
import { OrderSummary } from "./Components/OrderSummary";
import { ProductDetails } from "./Components/ProductDetails";
import { Cart } from "./Components/Cart";
import { Footer } from "./Components/Footer";
import { Wishlist } from "./Components/Wishlist";
import { Categories } from "./Components/Categories";
import { BreadcrumbsTemplate } from "./Components/BreadcrumbsTemplate";
import { ScrollButton } from "./Components/ScrollButton";
import { Thankyou } from "./Components/Thankyou";
import { SpringBootHomePage } from "./Components/SpringBootHomePage";
import { SignupPagewithApi } from "./Components/SignupPagewithApi";
import { LoginPagewithApi } from "./Components/LoginPagewithApi";
import { SpringBootCategoryPage } from "./Components/SpringBootCategoryPage";
import { CustomSnackBar } from "./Components/CustomSnackBar";
import { Hamburger } from "./Components/Hamburger";
import { Products2 } from "./Components/Products2";
import { ProductProvider } from "./Components/ProductProvider";
import { CartContext, CartContextProvider } from "./Components/CartContext";
// import CartContext from "./Components/CartContext";
// import ProductList from "./Components/ProductList";

const App = () => {
  const productItem = useSelector((state) => state.allProduct);

  const queryClient = new QueryClient();

  const {
    productList,
    list,
    cart,
    selectedProduct,
    categories,
    dataList,
    order,
    filterItem,
    wishlistStoreObjects,
  } = productItem;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ProductProvider> */}
        {/* <CartContext> */}
        <CartContextProvider>
          <Header
          list={list} cart={cart} dataList={dataList}
          />
          <Hamburger />
          <BreadcrumbsTemplate />
          <CustomSnackBar />
          <LastLocationProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <Products
                  productList={productList}
                  list={list}
                  cart={cart}
                  selectedProduct={selectedProduct}
                  filterItem={filterItem}
                  />
                }
              />
              <Route path="/categories" element={<Products />} />
              <Route
                path="productDetails/:id"
                element={
                  <ProductDetails
                  productList={productList}
                  list={list}
                  cart={cart}
                  />
                }
              />
              <Route
                path="wishlist"
                element={
                  <Wishlist
                  productList={productList}
                  list={list}
                  cart={cart}
                  selectedProduct={selectedProduct}
                  filterItem={filterItem}
                  wishlistStoreObjects={wishlistStoreObjects}
                  />
                }
              />
              <Route
                path="categories/:category"
                element={
                  <Categories
                  productList={productList}
                  list={list}
                  cart={cart}
                  selectedProduct={selectedProduct}
                  categories={categories}
                  filterItem={filterItem}
                  />
                }
              />
              <Route
                path="cart"
                element={
                  <Cart
                  productList={productList}
                  list={list}
                  cart={cart}
                  order={order}
                  productList={productList}
                  selectedProduct={selectedProduct}
                  filterItem={filterItem}
                  />
                }
              />
              <Route
                path="checkOut"
                element={
                  <OrderSummary
                  order={order}
                  productList={productList}
                  cart={cart}
                  selectedProduct={selectedProduct}
                  />
                }
              />
              <Route path="thankYou" element={<Thankyou />} />
              <Route
                path="springBootHomePage"
                element={<SpringBootHomePage />}
              />
              <Route
                path="springBootSignupPage"
                element={<SignupPagewithApi />}
              />
              <Route
                path="springBootLoginPage"
                element={<LoginPagewithApi />}
              />
              <Route
                path="springBootCategoryPage"
                element={<SpringBootCategoryPage />}
              />
              {/* <Route path="api" element={<ProductList />} /> */}
              {/* <Route path="test" element={<Products2 />} /> */}
            </Routes>
          </LastLocationProvider>
          <ScrollButton />
          <Footer />
        </CartContextProvider>
        {/* </CartContext> */}
        {/* </ProductProvider> */}
      </QueryClientProvider>
    </>
  );
};

export default App;
