import { useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import { getCurrentTime } from "@/utils/getCurrentTime";

type BarProps = {
  label: string;
  valuenow: number;
  valuemax: number;
  progress: number;
};

function Bar({ label, valuenow, valuemax, progress }: BarProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={valuenow}
      aria-valuemin={0}
      aria-valuemax={valuemax}
      className="h-5 w-full overflow-hidden rounded-full bg-surface shadow-[inset_2px_2px_5px_#c2c8d2,inset_-1px_-1px_3px_#ffffff] dark:shadow-[inset_2px_2px_5px_#22252c,inset_-1px_-1px_3px_#2e333c]"
    >
      <div
        className="h-full rounded-full bg-accent transition-[width] duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function BarsClock() {
  const [now, setNow] = useState(getCurrentTime);

  useInterval(() => setNow(getCurrentTime()), 1000);

  return (
    <div className="flex w-80 flex-col gap-4 min-[380px]:w-96 sm:w-[32rem]">
      <Bar
        label="Hours"
        valuenow={now.hour}
        valuemax={23}
        progress={(now.hour / 23) * 100}
      />
      <Bar
        label="Minutes"
        valuenow={now.minutes}
        valuemax={59}
        progress={(now.minutes / 59) * 100}
      />
      <Bar
        label="Seconds"
        valuenow={now.seconds}
        valuemax={59}
        progress={(now.seconds / 59) * 100}
      />
    </div>
  );
}
