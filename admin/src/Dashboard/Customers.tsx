import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoveHorizontalIcon, ArrowUpIcon, ArrowDownIcon, User } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../BaseUrl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import TotalUsers from "./Analysis/Customers";


const UserDetailsModal = ({ isOpen, onClose, user }: any) => {
  if (!user) return null;

  const totalOrder = user.orders ? user.orders.length : 0;
  const totalAmount = user.orders ? user.orders.reduce((acc: number, order: any) => acc + (order.totalAmount || 0), 0) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-1 place-items-center">
              <User/>{user.name}
            </div>
          </DialogTitle>
          <DialogDescription>
            Gmail : {user.email}
          </DialogDescription>
          <DialogDescription>
            Phone : {user.phone}
          </DialogDescription>
          <DialogDescription>
            Address : {user.address}
          </DialogDescription>
          <DialogDescription>
            Total Orders : {totalOrder}
          </DialogDescription>
          <DialogDescription>
            Total Spent : ₹{totalAmount}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p><strong>Order Detials: </strong></p>
          {user.orders && user.orders.length > 0 ? (
            user.orders.map((order: any) => (
              <div key={order.id} className="border p-5 rounded-md">
                <p><strong>Order ID:</strong> #{order.id.slice(-3)}</p>
                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>
            ))
          ) : (
            <p>No orders available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const CustomerCard = ({ info, onDelete, onView  }: any) => {
  const totalOrder = info.orders ? info.orders.reduce((acc: number) => acc + (1 || 0), 0) : 0;
  const totalAmount = info.orders ? info.orders.reduce((acc: number, order: any) => acc + (order.totalAmount || 0), 0) : 0;

  const handleDelete = async () => {
    const { data } = await axios.post(`${BASEURL}/user/delete`, { userId: info.id }, { withCredentials: true });
    console.log(data);
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
            <DropdownMenuItem onClick={onView}>View</DropdownMenuItem>
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
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
          ? a.orders.reduce((acc: number, order: any) => acc + (order.totalAmount || 0), 0)
          : 0;
        const totalB = b.orders
          ? b.orders.reduce((acc: number, order: any) => acc + (order.totalAmount || 0), 0)
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
      <Navbar />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10">
        <TotalUsers />
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Customer Overview</CardTitle>
            <Button variant="outline" size="sm">
              View Customers
            </Button>
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
                  <CustomerCard key={user.id} info={user} onDelete={refreshUsers} onView={() => handleViewUser(user)} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <UserDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={selectedUser} />
    </div>
  );
}



export default Customers;
