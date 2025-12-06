import { HomePage } from "./pages/home/HomePage";
import { Routes, Route } from "react-router";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async() => {
    const response = await axios.get("/api/cart-items?expand=product")
      setCart(response.data);
    };

  useEffect(() => {
    loadCart();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart}/>} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
