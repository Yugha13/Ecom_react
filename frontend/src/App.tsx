import { Route, Routes } from "react-router-dom";
import Homepage from "./Home/Home";
import Products from "./Products/Products";
import ProductDivision from "./Products/CategoryProducts";
import ClothsCard from "./Products/ClothsCard"; 
import Cart from "./Products/Cart";
import Login from "./Login/Login";

const App = () => {
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