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

const ClassesGraph: React.FC = () => {
  const [data, setData] = useState<Record<string, any>>({
    weekday: {},
    weekend: {},
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) {
      void axiosRequest
        .get("/analytics/visitors?location=all")
        .then((response) => {
          setData(response.data);
          setIsLoaded(true);
        });
    }
  }, [isLoaded]);

  const chartData = {
    labels: Object.keys(data.weekday),
    datasets: [
      {
        label: "Weekday",
        data: Object.values(data.weekday),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Weekend",
        data: Object.values(data.weekend),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  return (
    <div>
      <h2 className="text-center">Number of Visitors</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ClassesGraph;
