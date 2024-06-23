import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import ProductList from "./pages/Products.jsx";
import ProductView from "./pages/ProductView.jsx";
import ProductCheckout from "./pages/ProductCheckout.jsx";
import Checkout from "./pages/Checkout.jsx";
import AuthLayout from "./components/auth/AuthLayout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/Contact.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Register />} />
      <Route
        path="products"
        element={
          <AuthLayout>
            <ProductList />
          </AuthLayout>
        }
      />
      <Route
        path="products/:id"
        element={
          <AuthLayout>
            <ProductView />
          </AuthLayout>
        }
      />
      <Route
        path="cart"
        element={
          <AuthLayout>
            <ProductCheckout />
          </AuthLayout>
        }
      />
      <Route
        path="checkout"
        element={
          <AuthLayout>
            <Checkout />
          </AuthLayout>
        }
      />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
