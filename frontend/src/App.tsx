import { Route, Routes } from "react-router-dom";
import Homepage from "./Home/Home";
import Products from "./Products/Products";
import ProductDivision from "./Products/CategoryProducts";
import ClothsCard from "./Products/ClothsCard"; 
import Cart from "./Products/Cart";
import Login from "./Login/Login";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../BaseUrl";
import useStore from "./store/userState";
import { Loader2Icon } from "lucide-react";


const App = () => {
  const {login, loading, setloading} = useStore();
  useEffect(() => {
    (async () => {
      const {data} = await axios.get(`${BASEURL}/usercheck`, {withCredentials : true});
      login(data.user)
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
          <Route path="/category/:category" element={<ProductDivision />} />
          <Route path="/product/:name" element={<ClothsCard />} />
        </Routes>
    </div>
  );
};

export default App;