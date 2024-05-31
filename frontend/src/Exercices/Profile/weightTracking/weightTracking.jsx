import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Modal from "./Modal/modal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./weightTracking.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function WeightTracking() {
  const [userInfo, setUserInfo] = useState({});
  const [goal, setGoal] = useState({});
  const [weightTracking, setWeightTracking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 3;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/weight-tracking/1")
      .then((response) => {
        const { weightTracking, user_info, goal } = response.data;
        setWeightTracking(weightTracking);
        setUserInfo(user_info);
        setGoal(goal);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const addWeightTracking = (newData) => {
    setWeightTracking((prevWeightTracking) => [
      ...prevWeightTracking,
      newData,
    ]);
  };

  const totalItems = weightTracking.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = weightTracking
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let lastWeight = 0;
  if (weightTracking.length > 0) {
    lastWeight = weightTracking[weightTracking.length - 1].weight;
  }

  let mainLineColor = "white";

  if (goal.label === "Losing weight") {
    mainLineColor = lastWeight > userInfo.weight ? "red" : "rgb(94, 255, 54)";
  } else if (goal.label === "Gaining weight") {
    mainLineColor = lastWeight < userInfo.weight ? "red" : "rgb(94, 255, 54)";
  } else if (goal.label === "Maintaining weight") {
    mainLineColor =
      Math.abs(lastWeight - userInfo.weight) <= 2 ? "rgb(94, 255, 54)" : "red";
  } else if (goal.label === "Build muscle") {
    mainLineColor = lastWeight >= userInfo.weight ? "rgb(94, 255, 54)" : "red";
  }

  const chartData = {
    labels: weightTracking.map((item) => {
      const [year, month, day] = item.date.split("-");
      return `${day}/${month}`;
    }),
    datasets: [
      {
        label: "Weight Over Time",
        data: weightTracking.map((item) => item.weight),
        fill: false,
        borderColor: mainLineColor,
        backgroundColor: mainLineColor,
        tension: 0.5,
      },
      {
        label: "Target Weight",
        data: Array(weightTracking.length).fill(userInfo.weight),
        borderColor: "black",
        borderDash: [12, 0.5],
        fill: false,
        pointRadius: 2,
      },
    ],
  };

  const yearTitle =
    weightTracking.length > 0
      ? weightTracking[weightTracking.length - 1].date.split("-")[0]
      : "";

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
        position: "top",
      },
      title: {
        display: true,
        text: `Weight Tracking Chart (${yearTitle})`,
        color: "white",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hoursInt = parseInt(hours);
    const period = hoursInt >= 12 ? 'PM' : 'AM';
    const formattedHours = hoursInt % 12 || 12; // convert 0 to 12 for midnight
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <Fragment>
      <div className="parentWeightComposant">
        <div className="parentWeightTracking">
          <div className="headerWeightTracking">
            <h3>Weight Tracking</h3>
            <button onClick={() => setIsModalOpen(true)}>
              <i className="bx bx-calendar-plus"></i>
            </button>
          </div>
          <div className="contentWeightTracking">
            {weightTracking.length === 0 ? (
              <div className="noWeightTrackingMessage">
                <button onClick={() => setIsModalOpen(true)}><i className='bx bxs-calendar-plus'></i></button>
                <h6>Add your weight</h6>
              </div>
            ) : (
              currentItems.map((item, index) => (
                <div className="rowWeightTracking" key={index}>
                  <div className="headerRowWeightTracking">
                    <span>{item.date}</span>
                    <span>{formatTime(item.time)}</span>
                  </div>
                  <div className="contentRowTracking">
                    <h3>{item.weight} kg</h3>
                    <h5
                      style={{
                        color: item.weight > userInfo.weight ? "red" : "rgb(94, 255, 54)",
                      }}
                    >
                      {item.weight > userInfo.weight
                        ? `+${(item.weight - userInfo.weight).toFixed(2)}kg`
                        : `-${(userInfo.weight - item.weight).toFixed(2)}kg`}
                      <i
                        className={`bx bxs-up-arrow-circle ${
                          item.weight > userInfo.weight
                            ? "rotate-up"
                            : "rotate-down"
                        }`}
                      ></i>
                    </h5>
                  </div>
                </div>
              ))
            )}
            <div
              className="weightChangeMessage"
              style={{ color: mainLineColor }}
            >
              <i className="bx bxs-info-circle"></i>{" "}
              {userInfo.weight
                ? `You ${
                    lastWeight > userInfo.weight ? "gained" : "lost"
                  } ${Math.abs(lastWeight - userInfo.weight).toFixed(2)} kg`
                : ""}
            </div>
          </div>
          {weightTracking.length > 0 && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              <div className="currentPage">
                {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          )}
        </div>

        <div className="parentWeightChart">
          <Line
            data={chartData}
            options={chartOptions}
            className="chartWeightTracking"
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal 
          onClose={() => setIsModalOpen(false)} 
          onAddWeightTracking={addWeightTracking} 
        />
      )}
    </Fragment>
  );
}
