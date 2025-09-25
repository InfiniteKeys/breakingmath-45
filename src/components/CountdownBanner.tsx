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
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setIsVisible(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary via-blue-600 to-secondary text-white py-8 px-4 shadow-lg border-b-2 border-blue-400">
      <div className="container mx-auto">
        <div className="text-center space-y-6">
          {/* Main Heading */}
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-bold tracking-wide">
              Breaking Math Starts In…
            </h2>
            <div className="h-1 w-32 bg-white/30 mx-auto rounded-full"></div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center space-x-2 md:space-x-6">
            <div className="countdown-timer">
              <div className="countdown-number animate-pulse">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="countdown-label">DAYS</div>
            </div>
            
            <div className="text-white/60 text-2xl md:text-4xl font-bold animate-pulse">:</div>
            
            <div className="countdown-timer">
              <div className="countdown-number animate-pulse">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="countdown-label">HOURS</div>
            </div>
            
            <div className="text-white/60 text-2xl md:text-4xl font-bold animate-pulse">:</div>
            
            <div className="countdown-timer">
              <div className="countdown-number animate-pulse">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="countdown-label">MINUTES</div>
            </div>
            
            <div className="text-white/60 text-2xl md:text-4xl font-bold animate-pulse">:</div>
            
            <div className="countdown-timer">
              <div className="countdown-number animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="countdown-label">SECONDS</div>
            </div>
          </div>

          {/* Supporting Text */}
          <div className="space-y-1">
            <p className="text-lg md:text-xl font-medium">
              Our first session starts October 2nd at 11:10 AM Ontario Time.
            </p>
            <p className="text-base md:text-lg font-bold text-blue-200">
              Get ready!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;