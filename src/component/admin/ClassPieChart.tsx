import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { axiosRequest } from "../../AxiosRequest";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ClassPieChart: React.FC = () => {
  const [data, setData] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) {
      void axiosRequest
        .get("/analytics/classes?location=all&date_range=all")
        .then((response) => {
          const temp: Record<string, any> = {};
          for (const [key, value] of Object.entries(
            response.data as Record<string, any>
          )) {
            const location = value.location;
            const name = value.name;
            if (temp[location]) {
              if (temp[location][name]) {
                temp[location][name] = (temp[location][name] as number) + 1;
              } else {
                temp[location][name] = 1;
              }
            } else {
              temp[location] = { [name]: 1 };
            }
          }
          setData(temp);
          setIsLoaded(true);
        });
    }
  }, [isLoaded]);

  const chartData = {
    labels: Object.keys(data),
    datasets: Object.entries(data).map(([location, classes], index) => {
      const classCounts = Object.values(classes);
      return {
        label: location,
        data: classCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ].slice(0, classCounts.length),
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ].slice(0, classCounts.length),
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
        text: "Number of Classes per Location",
      },
    },
  };

  return (
    <div>
      <h2 className="mb-4 text-center text-xl font-bold">Class Pie Chart</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ClassPieChart;
