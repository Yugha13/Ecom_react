import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoveHorizontalIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../BaseUrl";
import TotalUsers from "./Cards/Customers";




const CustomerCard = ({ info, onDelete }: any) => {
  const totalOrder = info.orders ? info.orders.reduce((acc: number) => acc + (1 || 0), 0) : 0;
  const totalAmount = info.orders ? info.orders.reduce((acc: number, order: any) => acc + parseInt(order.totalAmount || 0), 0) : 0;

  const handleDelete = async () => {
    await axios.post(`${BASEURL}/user/delete`, { userId: info.id }, { withCredentials: true });
    onDelete();
  }
  

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <Link to="#" className="hover:underline">
            {info.name}
          </Link>
        </TableCell>
        <TableCell>{info.email}</TableCell>
        <TableCell>{totalOrder}</TableCell>
        <TableCell>₹{totalAmount}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoveHorizontalIcon className="w-5 h-5" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to={`/user/${info.id}`}>
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  )
}



const Customers = () => {
  const [userInfo, setUserInfo] = useState([] as any);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BASEURL}/users`, { withCredentials: true });
      setUserInfo(data.users);
    })();
  }, []);

  const refreshUsers = async () => {
    const { data } = await axios.get(`${BASEURL}/users`, { withCredentials: true });
    setUserInfo(data.users);
  };



  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...userInfo].sort((a, b) => {
      if (key === "totalAmount") {
        const totalA = a.orders
          ? a.orders.reduce((acc: number, order: any) => acc + parseInt(order.totalAmount), 0)
          : 0;
        const totalB = b.orders
          ? b.orders.reduce((acc: number, order: any) => acc + parseInt(order.totalAmount), 0)
          : 0;
        return direction === "asc" ? totalA - totalB : totalB - totalA;
      } else {
        if (a[key] < b[key]) {
          return direction === "asc" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      }
    });
    setUserInfo(sortedUsers);
  };

  const renderSortArrow = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <div className="flex flex-col">
      <Navbar info={'Users'}/>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10">
        <TotalUsers />
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Customer Overview</CardTitle>
            <Link to={`/users`}>
              <Button variant="outline" size="sm">
                View Customers
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort("name")}>
                    <div className="flex gap-2 place-items-center">
                      Customer {renderSortArrow("name")}
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort("email")}>
                    <div className="flex gap-2 place-items-center">
                      Email {renderSortArrow("email")}
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort("orders")}>
                    <div className="flex gap-2 place-items-center">
                      Orders {renderSortArrow("orders")}
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort("totalAmount")}>
                    <div className="flex gap-2 place-items-center">
                      Total Spent {renderSortArrow("totalAmount")}
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userInfo.map((user: any) => (
                  <CustomerCard key={user.id} info={user} onDelete={refreshUsers} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}



export default Customers;
