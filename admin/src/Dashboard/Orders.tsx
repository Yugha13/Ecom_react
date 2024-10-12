import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoveHorizontalIcon } from "lucide-react";
import Navbar from "@/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../BaseUrl";
import TotalOrders from "./Analysis/TotalOrders";
import TotalRevenue from "./Analysis/TotalRevenue";
import NewOrders from "./Analysis/NewOrders";

const OrdersCard = ({ info }: any) => {
  const isoDate = info.createdAt;
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString();

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to="#" className="hover:underline">
          #{info.id.slice(-3)}
        </Link>
      </TableCell>
      <TableCell>{info.user.name}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <Badge variant="secondary">{info.status}</Badge>
      </TableCell>
      <TableCell>₹{info.totalAmount}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoveHorizontalIcon className="w-5 h-5" />
              <span className="sr-only">More actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default function Orders() {
  const [orderInfo, setOrderInfo] = useState<any[]>([]);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BASEURL}/orders`, { withCredentials: true });
      setOrderInfo(data.orders);
    })();
  }, []);

  const handleSort = (field: string) => {
    const direction = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
    sortOrders(field, direction);
  };


  const sortOrders = (field: string, direction: "asc" | "desc") => {
    const sortedOrders = [...orderInfo].sort((a: any, b: any) => {
      let fieldA = a[field];
      let fieldB = b[field];

      if (field === "user.name") {
        fieldA = a.user.name.toLowerCase();
        fieldB = b.user.name.toLowerCase();
      }

      if (fieldA < fieldB) return direction === "asc" ? -1 : 1;
      if (fieldA > fieldB) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setOrderInfo(sortedOrders);
  };


  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10">
        <TotalRevenue />
        <NewOrders />
        <TotalOrders />
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
            <Button variant="outline" size="sm">
              View All Orders
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort("id")}>
                    Order ID {sortField === "id" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("user.name")}>
                    Customer {sortField === "user.name" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("createdAt")}>
                    Date {sortField === "createdAt" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("status")}>
                    Status {sortField === "status" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("totalAmount")}>
                    Total {sortField === "totalAmount" && (sortDirection === "asc" ? "▲" : "▼")}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderInfo.map((item: any) => (
                  <OrdersCard key={item.id} info={item} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
