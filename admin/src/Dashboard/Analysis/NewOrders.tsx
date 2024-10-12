import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import axios from "axios";
import { BASEURL } from "../../../BaseUrl";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "lucide-react";


const NewOrders = () => {
    const [salesData, setSalesData] = useState({ newOrders: 0 });
      const fetchRealTimeData = async () => {
        const { data } = await axios.get(`${BASEURL}/orders`, { withCredentials: true });
        const newOrders = data.orders.filter((order: any) => new Date(order.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000).length;
        setSalesData({ newOrders });
      };

      useEffect(() => {
        fetchRealTimeData();
        const interval = setInterval(() => {
          fetchRealTimeData();
        }, 10000);
        return () => clearInterval(interval);
      }, []);

  return (
    <>
      <Card>
        <CardHeader>
        <div className="flex items-center gap-3 mb-2">
        <ShoppingCartIcon className="w-5 h-5 text-muted-foreground" />
          <CardTitle>New Orders</CardTitle>
          </div>
          <CardDescription>Orders placed today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{salesData.newOrders}</div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Last 24 hours</span>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default NewOrders