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
import TotalOrders from "./Cards/TotalOrders";
import TotalRevenue from "./Cards/TotalRevenue";
import NewOrders from "./Cards/NewOrders";


const statusColors = {
  PENDING: "bg-gray-400 text-white hover:bg-gray-500",
  SHIPPED: "bg-blue-400 text-white hover:bg-blue-500",
  DELIVERED: "bg-green-400 text-white hover:bg-green-500",
  CANCELLED: "bg-red-400 text-white hover:bg-red-500",
};

const OrdersCard = ({ info }: any) => {
  const isoDate = info.createdAt;
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString();

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to={`/order/${info.id}`} className="hover:underline">
          #{info.id.slice(-3)}
        </Link>
      </TableCell>
      <TableCell>{info.user.name}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <Badge className={statusColors[info.status as keyof typeof statusColors]}>
          {info.status}
        </Badge>
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
            <Link to={`/order/${info.id}`}>
              <DropdownMenuItem>Update</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default function Orders() {
  const [orderInfo, setOrderInfo] = useState<any[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BASEURL}/orders`, { withCredentials: true });

      const sortedOrders = [...data.orders].sort((a: any, b: any) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setOrderInfo(sortedOrders);
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
      <Navbar info="Orders" />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10">
        <TotalRevenue />
        <NewOrders />
        <TotalOrders />
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All Orders"}
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
                {(showAll ? orderInfo : orderInfo.slice(0, 10)).map((item: any) => (
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
