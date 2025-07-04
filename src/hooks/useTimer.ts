
import React from "react";

export const useTimer = (initialTime: number = 90) => {
  const [timeLeft, setTimeLeft] = React.useState(initialTime);
  const [isTimerActive, setIsTimerActive] = React.useState(true);

  // Timer effect
  React.useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsTimerActive(true);
  };

  return {
    timeLeft,
    isTimerActive,
    resetTimer,
  };
};
