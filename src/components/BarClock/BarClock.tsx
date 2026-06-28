import { useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import { getCurrentTime } from "@/utils/getCurrentTime";

const MINUTES_IN_DAY = 24 * 60;

export function BarClock() {
  const [now, setNow] = useState(getCurrentTime);

  useInterval(() => setNow(getCurrentTime()), 1000);

  const progress = ((now.hour * 60 + now.minutes) / MINUTES_IN_DAY) * 100;

  return (
    <div className="w-80 min-[380px]:w-96 sm:w-[32rem]">
      <div
        role="progressbar"
        aria-label="Day progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-5 w-full overflow-hidden rounded-full bg-surface"
      >
        <div
          data-testid="bar-fill"
          className="h-full rounded-full bg-accent transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
