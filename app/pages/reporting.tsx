"use client";

import dynamic from "next/dynamic";
import chart, {
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from "chart.js/auto";

export default function Reporting() {
  chart.register(LineController, LineElement, PointElement, LinearScale, Title);

  const Line = dynamic(
    () => import("react-chartjs-2").then((mod) => mod.Line),
    {
      ssr: false,
    }
  );

  const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
    ssr: false,
  });

  const barData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "GeeksforGeeks Bar Chart",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "GeeksforGeeks Line Chart",
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <h1 className="text-3xl font-bold leading-7 text-gray-900">Reporting</h1>

      <hr></hr>

      <div className="flex justify-center">
        <div style={{ width: "400px", height: "400px" }}>
          <h1>Example 1: Line Chart</h1>
          <Line data={lineData} />
        </div>

        <div style={{ width: "400px", height: "400px" }}>
          <h1>Example 2: Bar Chart</h1>
          <Bar data={barData} />
        </div>
      </div>
    </>
  );
}
