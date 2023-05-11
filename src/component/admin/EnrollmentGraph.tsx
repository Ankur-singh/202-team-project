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

const EnrollmentGraph: React.FC = () => {
  const [data, setData] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) {
      void axiosRequest
        .get("/analytics/classes?location=all&date_range=all")
        .then((response) => {
          const temp: Record<string, number> = {};
          for (const [key, value] of Object.entries(
            response.data as Record<string, any>
          )) {
            if (value.name in temp) {
              temp[value.name] =
                temp[value.name] + (value.enrollment as number);
            } else {
              temp[value.name] = value.enrollment;
            }
          }
          setData(temp);
          setIsLoaded(true);
        });
    }
  }, [isLoaded]);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Number of Enrollments",
        data: Object.values(data),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
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
        text: "Number of Enrollments per Class",
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EnrollmentGraph;
