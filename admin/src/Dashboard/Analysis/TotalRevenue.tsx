import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import axios from "axios";
import { BASEURL } from "../../../BaseUrl";
import { useEffect, useState } from "react";

const TotalRevenue = () => {
    const [salesData, setSalesData] = useState({ totalSales: 0, salesPercentageChange: 0 });

    const fetchRealTimeData = (async () => {
        const { data } = await axios.get(`${BASEURL}/orders`, { withCredentials: true });
      
        const totalSales = data.orders.reduce((acc: number, order: any) => acc + order.totalAmount, 0);
      
        const currentDate = new Date();
        const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const firstDayLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      
        const currentMonthSales = data.orders
          .filter((order: any) => new Date(order.createdAt) >= firstDayCurrentMonth)
          .reduce((acc: number, order: any) => acc + order.totalAmount, 0);
      
        const lastMonthSales = data.orders
          .filter(
            (order: any) => new Date(order.createdAt) >= firstDayLastMonth && new Date(order.createdAt) <= lastDayLastMonth
          )
          .reduce((acc: number, order: any) => acc + order.totalAmount, 0);
      
        const salesPercentageChange = lastMonthSales === 0 ? 100 : ((currentMonthSales - lastMonthSales) / lastMonthSales) * 100;
      
        setSalesData({ totalSales, salesPercentageChange });
      });
      
      useEffect(() => {
        fetchRealTimeData();
        const interval = setInterval(() => {
          fetchRealTimeData();
        }, 10000);
        return () => clearInterval(interval);
      }, []);
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
        <CardDescription>All revenue generated</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">₹{salesData.totalSales.toFixed(2)}</div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{salesData.salesPercentageChange >= 0 ? `+${salesData.salesPercentageChange.toFixed(2)}%` : `${salesData.salesPercentageChange.toFixed(2)}%`} for this month</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TotalRevenue