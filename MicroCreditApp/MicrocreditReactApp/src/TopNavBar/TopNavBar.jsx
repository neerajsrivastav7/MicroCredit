// src/components/DateTimeStrip.jsx
import React, { useEffect, useState } from "react";
import "./TopNavBar.css"

const TopNavBar = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return (
    <div className="date-time-strip bg-dark text-white text-center py-3 strip">
      <strong>{dateTime.toLocaleDateString("en-US", options)}</strong>
    </div>
  );
};

export default TopNavBar;
