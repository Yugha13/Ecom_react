import Navbar from "@/Navbar/Navbar"
import TotalOrders from "./Cards/TotalOrders"
import TotalRevenue from "./Cards/TotalRevenue"
import NewOrders from "./Cards/NewOrders"
import TotalUsers from "./Cards/Customers"
import BarChart from "./Analysis/BarChart"
import PieChart from "./Analysis/PieChart"
import LineChart from "./Analysis/LineChart"




export default function Dashboard() {
    return (
      <div>
        <div className="flex flex-col">
          <Navbar info={'Dashboard'}/>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <TotalRevenue />
              <TotalUsers />
              <TotalOrders />
              <NewOrders />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
              <LineChart />
              <PieChart />
              <BarChart />
            </div>
          </main>
        </div>
      </div>
    );
  }
  