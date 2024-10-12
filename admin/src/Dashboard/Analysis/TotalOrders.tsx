import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import axios from "axios";
import { BASEURL } from "../../../BaseUrl";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "lucide-react";

const TotalOrders = () => {
    const [salesData, setSalesData] = useState({orderHistory: 0});
    useEffect(()=>{
        (async () => {
            const { data } = await axios.get(`${BASEURL}/orders`, { withCredentials: true });
            const orderHistory = data.orders.length;
            setSalesData({orderHistory});
        })();
    })
  return (
    <>
      <Card>
        <CardHeader>
            <div className="flex items-center gap-3 mb-2">
          <ShoppingCartIcon className="w-5 h-5 text-muted-foreground" />
          <CardTitle>Total Orders</CardTitle>
            </div>
          <CardDescription>All orders placed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{salesData.orderHistory}</div>
        </CardContent>
      </Card>
    </>
  );
};

export default TotalOrders