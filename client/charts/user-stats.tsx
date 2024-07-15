"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PropsTypes {
  solved: number;
  total: number;
  attempting: number;
}

const UserStats = ({ solved, total, attempting }: PropsTypes) => {
  const data = {
    labels: ["Solved", "Attempting", "Remaining"],
    datasets: [
      {
        label: "# of Tasks",
        data: [solved, attempting, total - solved - attempting],
        backgroundColor: [
          "rgb(0, 191, 166)", // Solved color
          "rgb(144, 202, 249)", // Attempting color
          "rgb(189, 189, 189)", // Remaining color
        ],
        borderColor: [
          "rgb(0, 191, 166)",
          "rgb(144, 202, 249)",
          "rgb(189, 189, 189)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%", // Creates the inner circle
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return tooltipItem.label + ": " + tooltipItem.raw;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "200px", height: "200px" }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ fontSize: "24px" }}>{solved}</div>
        <div style={{ fontSize: "14px" }}>Solved</div>
        <div style={{ fontSize: "12px" }}>{attempting} Attempting</div>
      </div>
    </div>
  );
};

export default UserStats;
