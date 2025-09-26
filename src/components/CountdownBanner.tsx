import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(true);

  // Target date: October 2nd, 11:10 AM Ontario time (EDT/EST)
  const targetDate = new Date("2026-10-02T11:10:00-04:00");
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
          minutes: Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)),
          seconds: Math.floor(difference % (1000 * 60) / 1000)
        });
      } else {
        setIsVisible(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  if (!isVisible) return null;
  return;
};
export default CountdownBanner;