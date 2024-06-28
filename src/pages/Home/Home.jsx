import React, { useEffect } from "react";
import HeroSection from "../../components/home/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/cartSlice";

function Home() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authStatus) {
      fetchCart(dispatch);
    }
    const userData = localStorage.getItem("user");
  }, []);
  return (
    <>
      <HeroSection />
    </>
  );
}

export default Home;
