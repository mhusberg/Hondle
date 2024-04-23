import React, { useState, useEffect } from 'react';

const TimeUntilTomorrow = () => {
  const [timeUntilTomorrow, setTimeUntilTomorrow] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeUntilTomorrow = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const timeDifference = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeUntilTomorrow({ hours, minutes, seconds });
    };

    const interval = setInterval(calculateTimeUntilTomorrow, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{`Next game in: ${timeUntilTomorrow.hours}:${timeUntilTomorrow.minutes}:${timeUntilTomorrow.seconds}`}</p>
    </div>
  );
};

export default TimeUntilTomorrow;