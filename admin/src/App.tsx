import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login/Login";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../BaseUrl";
import useStore from "./store/adminState";
import { Loader2Icon } from "lucide-react";
import Dashboard from "./Dashboard/Dashboard";
import Sidebar from "./Navbar/Sidebar";
import Orders from "./Dashboard/Orders";
import Products from "./Dashboard/Products";
import Customers from "./Dashboard/Customers";


const App = () => {
  const { login, loading, setloading, data } = useStore();
  const navigate = useNavigate(); 
  
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASEURL}/admincheck`, { withCredentials: true });
        login(data.data);
        // console.log("in app res - ",data.data);
        
      } catch (e) {
        navigate("/");
      }
      setloading();  
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center h-screen w-full">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className={`${data ? 'w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] overflow-hidden' : ''}`}>
      {data && <Sidebar />}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </div>
  );
};

export default App;
