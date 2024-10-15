import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, CreditCard, DollarSign, Package } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { BASEURL } from "../../../BaseUrl"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/Navbar/Navbar"
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "SHIPPED":
      return "bg-blue-100 text-blue-800";
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function BarChart() {
  const { id } = useParams();
  const [user, setUser] = useState([] as any);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(`${BASEURL}/user/${id}`, {}, { withCredentials: true });
      setUser(data.user);
    })();
  }, []);

  const totalSales = user.orders?.reduce((acc: number, order: any) => acc + parseInt(order.totalAmount), 0);

  const ordersPerMonth = user.orders?.reduce((acc: any, order: any) => {
    const month = new Date(order.createdAt).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, []);

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Orders',
        data: ordersPerMonth,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      },
    },
  };

  return (
    <div>
      <Navbar info={'User Information'} />
      <div className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>
                {user.name?.split(' ').map((n: any) => n[0] + n[1]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4">
                    <CalendarDays className="h-4 w-4 opacity-70" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Joined</p>
                      <p className="text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CalendarDays className="h-4 w-4 opacity-70" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Last Login</p>
                      <p className="text-sm text-muted-foreground">{new Date(user.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Package className="h-4 w-4 opacity-70" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Total Orders</p>
                      <p className="text-sm text-muted-foreground">{user.orders?.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <DollarSign className="h-4 w-4 opacity-70" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Total Spent</p>
                      <p className="text-sm text-muted-foreground">₹ {totalSales}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Address</Label>
                    <p className="text-sm text-muted-foreground">{user.name},</p>
                    <p className="text-sm text-muted-foreground">{user.street},</p>
                    <p className="text-sm text-muted-foreground">{user.state},</p>
                    <p className="text-sm text-muted-foreground">{user.pincode}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="text-lg text-center m-2">
                <h1><b>Bar Chart</b></h1>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Orders per Month</CardTitle>
              </CardHeader>
              <CardContent>
              <div style={{ width: '100%', maxWidth: '600px', height: '350px', margin: '0 auto' }}>
                <Bar data={barChartData} options={barChartOptions}/>
                </div>
              </CardContent>
            </Card>

            
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            {user.orders?.map((order: any) => (
              <Link to={`/order/${order.id}`}>
                <Card key={order.id} className="mb-3">
                  <CardHeader>
                    <CardTitle className="text-lg">Order #{order.id.slice(-3)}</CardTitle>
                    <CardDescription>{new Date(order.createdAt).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 opacity-70" />
                        <span className="text-sm font-medium">₹{order.totalAmount}</span>
                      </div>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
