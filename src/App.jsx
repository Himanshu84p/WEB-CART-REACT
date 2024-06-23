import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { fetchCart } from "./store/cartSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus) {
      fetchCart(dispatch);
    }
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(login(userData));
      setLoading(false);
    } else {
      dispatch(logout());
      setLoading(false);
    }
  }, []);

  return loading ? (
    <div className="text-center my-24">Loading....</div>
  ) : (
    <div>
      <Header />
      <main style={{ minHeight: "100vh" }} className="mt-24">
        <Outlet />
      </main>
      <div className="footer-div">
        <Footer />
      </div>
    </div>
  );
}

export default App;
