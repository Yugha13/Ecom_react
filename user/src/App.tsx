import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./Home/Home";
import Products from "./Products/Products";
import ProductDivision from "./Products/CategoryProducts";
import ClothsCard from "./Products/ProductDetials/ClothsCard"; 
import Cart from "./Cart/Cart";
import Login from "./Login/Login";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../BaseUrl";
import useStore from "./store/userState";
import { Loader2Icon } from "lucide-react";
import Wishlist from "./Wishlist/Wishlist";
import Orders from "./Orders/Orders";

const App = () => {
  const {login, loading, setloading} = useStore();
  const navigate = useNavigate(); 
  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(`${BASEURL}/usercheck`, {withCredentials : true});
        login(data.user)
      } catch(e) {
        navigate("/")
      }
      setloading();
    })();
  }, []);
  if(loading){
    return (
      <div className="grid place-items-center h-screen w-full">
        <Loader2Icon className="animate-spin" />
      </div>
    )
  }
  return (
    <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/category/:category" element={<ProductDivision />} />
          <Route path="/product/:name" element={<ClothsCard />} />
        </Routes>
    </div>
  );
};

export default App;