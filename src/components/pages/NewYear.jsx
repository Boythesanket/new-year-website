import React, { useEffect, useState } from "react";

const NewYear = ({ onFinish }) => {
  const targetDate = new Date("2026-01-01T00:00:00");
  const [timeLeft, setTimeLeft] = useState({});
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setIsNewYear(true);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔥 UNLOCK EVERYTHING
  useEffect(() => {
    if (isNewYear) {
      onFinish();
    }
  }, [isNewYear, onFinish]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-400 via-red-400 to-rose-500 text-white">
      <div className="text-center px-6 max-w-md">

        <p className="mb-2 text-sm opacity-90">
          ✨ a small wait for a big moment ✨
        </p>

        <h1 className="text-4xl font-bold mb-2">
          🎀 New Year Countdown 🎀
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm"
            >
              <p className="text-3xl font-bold">
                {timeLeft[unit] ?? "00"}
              </p>
              <p className="uppercase text-xs tracking-widest opacity-90">
                {unit}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm opacity-90">
          something beautiful is coming 💖
        </p>
      </div>
    </div>
  );
};

export default NewYear;
