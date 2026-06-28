import { useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import { getCurrentTime } from "@/utils/getCurrentTime";
import { pad } from "@/utils/pad";

export function DigitalClock() {
  const [now, setNow] = useState(getCurrentTime);
  const [colonVisible, setColonVisible] = useState(true);

  useInterval(() => {
    setNow(getCurrentTime());
    setColonVisible((visible) => !visible);
  }, 500);

  const colon = (
    <span
      data-testid="digital-colon"
      data-visible={colonVisible ? "true" : "false"}
      className={`transition-opacity ${colonVisible ? "opacity-100" : "opacity-0"}`}
    >
      :
    </span>
  );

  return (
    <div
      role="timer"
      aria-label="Digital clock"
      className="font-sans text-5xl font-bold tabular-nums tracking-wide text-[#5e81ac] dark:text-[#aec2e6] min-[380px]:text-7xl"
    >
      <span>{pad(now.hour)}</span>
      {colon}
      <span>{pad(now.minutes)}</span>
      {colon}
      <span>{pad(now.seconds)}</span>
    </div>
  );
}
