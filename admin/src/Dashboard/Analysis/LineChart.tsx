import { ResponsiveLine } from "@nivo/line";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../../BaseUrl";


type SalesData = {
  month: string;
  totalAmount: number;
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LineChart = () => {
  const [currentYearSales, setCurrentYearSales] = useState<SalesData[]>([]);
  const [previousYearSales, setPreviousYearSales] = useState<SalesData[]>([]);

  const fetchSalesData = async () => {
    try {
      const { data } = await axios.get(`${BASEURL}/orders`, { withCredentials: true });
      const currentYear = new Date().getFullYear();
      const lastYear = currentYear - 1;
      const thisYearSales: { [key: string]: number } = {};
      const lastYearSales: { [key: string]: number } = {};

      months.forEach(month => {
        thisYearSales[month] = 0;
        lastYearSales[month] = 0;
      });

      data.orders.forEach((order: any) => {
        const createdAt = new Date(order.createdAt);
        const month = createdAt.toLocaleString('default', { month: 'short' });
        const year = createdAt.getFullYear();
        const totalAmount = parseInt(order.totalAmount);

        if (year === currentYear) {
          thisYearSales[month] += totalAmount;
        } else if (year === lastYear) {
          lastYearSales[month] += totalAmount;
        }
      });

      const transformedCurrentYearSales = months.map((month) => ({
        month,
        totalAmount: thisYearSales[month],
      }));

      const transformedPreviousYearSales = months.map((month) => ({
        month,
        totalAmount: lastYearSales[month],
      }));

      setCurrentYearSales(transformedCurrentYearSales);
      setPreviousYearSales(transformedPreviousYearSales);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <Card>
     <CardHeader>
     <CardTitle>Sales Overview</CardTitle>
      <CardDescription>Monthly sales performance</CardDescription>
    </CardHeader>
    <CardContent>
    <div className="h-[300px]">
      <ResponsiveLine
        data={[
          {
            id: "This Year",
            data: currentYearSales.map(({ month, totalAmount }) => ({ x: month, y: totalAmount })),
          },
          {
            id: "Last Year",
            data: previousYearSales.map(({ month, totalAmount }) => ({ x: month, y: totalAmount })),
          },
        ]}
        margin={{ top: 20, right: 100, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Total Amount",
          legendOffset: -55,
          legendPosition: "middle",
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={10}
        pointColor={{ from: "color", modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
    </CardContent>
  </Card>
  );
};

export default LineChart;
