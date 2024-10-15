import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { BASEURL } from "../../../BaseUrl";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function BarChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BASEURL}/orders`, { withCredentials: true });
        const orders = data.orders;
        const groupedData = groupDataByQuarterAndYear(orders, currentYear);
        setData(groupedData);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentYear]);

  const groupDataByQuarterAndYear = (orders: any[], year: number) => {
    const quarterMap: { [key: string]: { quarter: string, orders: Set<any> } } = {
      Q1: { quarter: "Q1", orders: new Set() },
      Q2: { quarter: "Q2", orders: new Set() },
      Q3: { quarter: "Q3", orders: new Set() },
      Q4: { quarter: "Q4", orders: new Set() },
    };

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      if (orderDate.getFullYear() === year) {
        const month = orderDate.getMonth();

        let quarter: string;
        if (month < 3) {
          quarter = "Q1";
        } else if (month < 6) {
          quarter = "Q2";
        } else if (month < 9) {
          quarter = "Q3";
        } else {
          quarter = "Q4";
        }

        quarterMap[quarter].orders.add(order.userId);
      }
    });

    return Object.values(quarterMap).map(({ quarter, orders }) => ({
      quarter,
      orders: orders.size,
    }));
  };

  const handlePreviousYear = () => {
    setCurrentYear((prevYear) => prevYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear((prevYear) => prevYear + 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Orders Placed</CardTitle>
          <CardDescription>Based on months vs orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }}>
            <ResponsiveBar
              data={data}
              keys={["orders"]}
              indexBy="quarter"
              margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
              padding={0.3}
              colors={["#2563eb"]}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Quarter',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Orders',
                legendPosition: 'middle',
                legendOffset: -40,
              }}
              enableGridX={false}
              gridYValues={4}
              theme={{
                tooltip: {
                  chip: {
                    borderRadius: "9999px",
                  },
                  container: {
                    fontSize: "12px",
                    textTransform: "capitalize",
                    borderRadius: "6px",
                  },
                },
                grid: {
                  line: {
                    stroke: "#e0e0e0",
                    strokeWidth: 1,
                  },
                },
              }}
              tooltip={({ id, value }) => (
                <div style={{ padding: "6px", borderRadius: "4px", background: "#fff", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}>
                  <strong>{id}:</strong> {value}
                </div>
              )}
              enableLabel={false}
              role="application"
              ariaLabel="A bar chart showing quarterly user data"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePreviousYear} className="p-2 bg-gray-200 rounded">
              ←
            </button>
            <h2 className="text-lg font-bold">{currentYear}</h2>
            <button onClick={handleNextYear} className="p-2 bg-gray-200 rounded">
              →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
