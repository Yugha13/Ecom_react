import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import axios from "axios";
import { BASEURL } from "../../../BaseUrl";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

const TotalUsers = () => {
  const [customerData, setCustomerData] = useState({ totalCustomers: 0, customersPercentageChange: 0 });

  const fetchCustomerData = async () => {
    try {
      const { data } = await axios.get(`${BASEURL}/users`, { withCredentials: true });

      const currentDate = new Date();
      const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      const currentMonthCustomers = data.users
        .filter((customer: any) => new Date(customer.createdAt) >= firstDayCurrentMonth)
        .length;

      const totalCustomers = data.users.length;
      const customersPercentageChange = totalCustomers === 0
        ? 100
        : (currentMonthCustomers / totalCustomers) * 100;

      setCustomerData({ totalCustomers, customersPercentageChange });
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchCustomerData();
    const interval = setInterval(fetchCustomerData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <User className="w-5 h-5 text-muted-foreground" />
          <CardTitle>Total Customers</CardTitle>
        </div>
        <CardDescription>All customers who have joined</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{customerData.totalCustomers}</div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>
            {customerData.customersPercentageChange >= 0
              ? `+${customerData.customersPercentageChange.toFixed(2)}%`
              : `${customerData.customersPercentageChange.toFixed(2)}%`} new this month
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TotalUsers;
