import { useEffect, useState } from "react";
import { SITE } from "../site";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", {
    timeZone: SITE.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}

export default function LiveClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      {SITE.locationLine} • {time}
    </span>
  );
}
