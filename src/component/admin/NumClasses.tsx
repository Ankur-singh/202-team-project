import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { axiosRequest } from "../../AxiosRequest";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LocationData {
  name: string;
  data: Record<string, number>;
}

const NumClassesGraph: React.FC = () => {
  const [data, setData] = useState<LocationData[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) {
      void axiosRequest
        .get("/analytics/classes?location=all&date_range=all")
        .then((response) => {
          const rawData: Record<string, any> = response.data;
          const locations: string[] = [
            ...new Set(
              Object.values(rawData).map((classData: any) => classData.location)
            ),
          ];
          const newData: LocationData[] = locations.map((location: string) => {
            const classData: any[] = Object.values(rawData).filter(
              (classData: any) => classData.location === location
            );
            const classesByDay: Record<string, number> = {};
            for (const data of classData) {
              const date: string = data.time.split("T")[0];
              classesByDay[date] = (classesByDay[date] || 0) + 1;
            }
            return {
              name: location,
              data: classesByDay,
            };
          });
          setData(newData);
          setIsLoaded(true);
        });
    }
  }, [isLoaded]);

  const chartData = {
    labels: Object.keys(data.length > 0 ? data[0].data : {}),
    datasets: data.map((locationData: LocationData, index: number) => {
      return {
        label: locationData.name,
        data: Object.values(locationData.data),
        backgroundColor: `rgba(${(index * 60) % 255}, ${(index * 80) % 255}, ${
          (index * 100) % 255
        }, 0.5)`,
        borderColor: `rgba(${(index * 60) % 255}, ${(index * 80) % 255}, ${
          (index * 100) % 255
        }, 1)`,
        borderWidth: 1,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Number of Classes Each Day by Location",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default NumClassesGraph;
