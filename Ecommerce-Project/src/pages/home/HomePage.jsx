import { Header } from "../../components/Header.jsx";
import axios from "axios";
import { useEffect, useState } from "react";;
import "./HomePage.css";
import { ProductsGrid } from "../home/ProductsGrid.jsx";

export function HomePage({cart}) {
  const [products,setProducts] = useState([]);
  useEffect(() => {
  const getHomeData = async () => {
    const response = await axios.get("/api/products")
      setProducts(response.data);
  };

  getHomeData();
}, []);

    

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="public/home-favicon.png" />

      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products}/>
      </div>
    </>
  );
}
