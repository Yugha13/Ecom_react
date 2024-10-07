import { Route, Routes } from "react-router-dom"
import {KindeProvider} from "@kinde-oss/kinde-auth-react";
import Homepage from "./Home/Home"
import Products from "./Products/Products"
import ProductDivision from "./Products/CategoryProducts"
import ProductDetails from "./Products/ElectroCard"
import Cart from "./Products/Cart"


const App = () => {
  return (
      <div>
        <KindeProvider
		      clientId="9520c6a53b09439bbd991ad785d01a29"
		      domain="https://ecomproducts123.kinde.com"
		      redirectUri="http://localhost:5173"
		      logoutUri="http://localhost:5173"
	      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:category" element={<ProductDivision />} />
          <Route path="/product/:name" element={<ProductDetails />} />
        </Routes>
        </KindeProvider>
      </div>
  )
}

export default App