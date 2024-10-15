import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { BASEURL } from "../../../BaseUrl";
import { ChevronDown, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/Navbar/Navbar";

const ProductCard = ({ info }: any) => (
  <TableRow>
    <TableCell>{info.name}</TableCell>
    <TableCell>{info.quantity}</TableCell>
    <TableCell>${info.price}</TableCell>
    <TableCell>${info.quantity * info.price}</TableCell>
  </TableRow>
);

export default function UserOrders() {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BASEURL}/order/${id}`, { withCredentials: true });
      setOrderInfo(data.order);
      setSelectedStatus(data.order.status);
    })();
  }, [id]);

  const isoDate = orderInfo?.createdAt;
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString();

  const handleStatusChange = async (newStatus: string) => {
    setSelectedStatus(newStatus);
    await axios.post(`${BASEURL}/editorder/${id}`, { status: newStatus }, { withCredentials: true });
  };

  const getStatusOptions = (currentStatus: string) => {
    switch (currentStatus) {
      case "PENDING":
        return ["SHIPPED", "DELIVERED", "CANCELLED"];
      case "SHIPPED":
        return ["DELIVERED", "CANCELLED"];
      default:
        return [];
    }
  };

  if (!orderInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar info={'Order Details'} />
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Order #{id?.slice(-3)}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status: {selectedStatus}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {getStatusOptions(selectedStatus).map((status) => (
              <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)}>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-semibold">Order Date:</dt>
              <dd>{formattedDate}</dd>
              <dt className="font-semibold">Status:</dt>
              <dd>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    selectedStatus === "DELIVERED"
                      ? "bg-green-100 text-green-800"
                      : selectedStatus === "SHIPPED"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedStatus === "CANCELLED"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {selectedStatus}
                </span>
              </dd>
              <dt className="font-semibold">Payment Status:</dt>
              <dd>Paid</dd>
              <dt className="font-semibold">Payment Method:</dt>
              <dd>Online</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-semibold">Name:</dt>
              <dd>{orderInfo.user.name}</dd>
              <dt className="font-semibold">Email:</dt>
              <dd>{orderInfo.user.email}</dd>
              <dt className="font-semibold">Phone:</dt>
              <dd>{orderInfo.user.phone}</dd>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <address className="text-sm not-italic">
              {orderInfo.user.name},
              <br />
              {orderInfo.user.street},
              <br />
              {orderInfo.user.state},
              <br />
              {orderInfo.user.pincode},
              <br />
              Phone - {orderInfo.user.phone}
            </address>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent>
            <address className="text-sm not-italic">
              {orderInfo.user.name},
              <br />
              {orderInfo.user.street},
              <br />
              {orderInfo.user.state},
              <br />
              {orderInfo.user.pincode},
              <br />
              Phone - {orderInfo.user.phone}
            </address>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderInfo.product?.map((item: any) => (
                  <ProductCard key={item.id} info={item} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal :</dt>
              <dd>${orderInfo.subtotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping :</dt>
              <dd>${orderInfo.shipping}</dd>
            </div>
            <div className="flex justify-between font-bold">
              <dt>Total :</dt>
              <dd>${orderInfo.totalAmount}</dd>
            </div>
          </dl>
        </CardFooter>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          <Package className="mr-2 h-4 w-4" />
          Update Tracking
        </Button>
        <Button>Process Refund</Button>
      </div>
    </div>
    </div>
  );
}
