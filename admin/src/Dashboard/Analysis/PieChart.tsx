import { ResponsivePie } from '@nivo/pie';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASEURL } from '../../../BaseUrl';

type PieChartData = {
    id: string;
    value: number;
};

const PieChart = () => {
    const [data, setData] = useState<PieChartData[]>([]);

    const fetchData = async () => {
        try {
            const { data: responseData } = await axios.get(`${BASEURL}/users`, { withCredentials: true });
            const userMonthsCount = responseData.users.reduce((acc: any, user: any) => {
                const createdAt = new Date(user.createdAt);
                const month = createdAt.toLocaleString('default', { month: 'long' });
                acc[month] = (acc[month] || 0) + 1;
                return acc;
            }, {});

            const transformedData: PieChartData[] = Object.entries(userMonthsCount).map(([month, count]) => ({
                id: month,
                value: Number(count),
            }));
            setData(transformedData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Card>
                <CardHeader>
                  <CardTitle>Users Joined</CardTitle>
                  <CardDescription>Growth of Users vs Months</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="h-[300px]">
            <ResponsivePie
                data={data}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={['#ADD8E6', '#C0C0C0', '#FFC0CB', '#808080', '#5CB3FF', '#E3E4FA', '#7C9D8E','#848B79', '#B8BC86', '#FFFACD']}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableArcLinkLabels={false}
                arcLabel={(d) => `${d.id}`}
                tooltip={({ datum }) => (
                    <div style={{ padding: '5px', background: '#fff', borderRadius: '5px' }}>
                        {'Users'}: {datum.value}
                    </div>
                )}
                theme={{
                    labels: {
                        text: {
                            fontSize: '16px',
                        },
                    },
                    tooltip: {
                        container: {
                            background: '#333',
                            color: '#fff',
                            fontSize: '14px',
                            borderRadius: '5px',
                        },
                    },
                }}
            />
        </div>
                </CardContent>
              </Card>
        
    );
};

export default PieChart;
