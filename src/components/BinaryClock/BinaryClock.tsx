import { useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import { getCurrentTime } from "@/utils/getCurrentTime";
import { pad } from "@/utils/pad";

/** Converts a single decimal digit to a 4-bit binary string, e.g. "5" -> "0101". */
const toBinary = (digit: string) => Number(digit).toString(2).padStart(4, "0");

const dotClasses = [
  // Body of the dot — Snow Storm by default, Polar Night in dark mode
  "relative m-1 h-8 w-8 rounded-full min-[380px]:h-11 min-[380px]:w-11",
  "bg-[linear-gradient(145deg,#e5e9f0,#eceff4)] dark:bg-[linear-gradient(145deg,#24282f,#2b2f38)]",
  "shadow-[4px_4px_9px_#c2c8d2,-4px_-4px_9px_#ffffff] dark:shadow-[4px_4px_9px_#22252c,-4px_-4px_9px_#2e333c]",
  // Inner highlight via ::before
  "before:absolute before:left-1/2 before:top-1/2 before:block before:rounded-full before:content-['']",
  "before:h-4 before:w-4 before:-translate-x-2 before:-translate-y-2",
  "min-[380px]:before:h-6 min-[380px]:before:w-6 min-[380px]:before:-translate-x-3 min-[380px]:before:-translate-y-3",
].join(" ");

const onClass =
  "before:bg-[linear-gradient(145deg,#6d92c0,#5e81ac)] dark:before:bg-[linear-gradient(145deg,#cfe7ff,#aec2e6)]";
const offClass =
  "before:bg-[linear-gradient(145deg,#d8dee9,#c4cad6)] dark:before:bg-[linear-gradient(145deg,#424957,#383d49)]";

type DotProps = {
  on: boolean;
};

function Dot({ on }: DotProps) {
  return (
    <div
      data-testid="binary-dot"
      data-on={on ? "true" : "false"}
      className={`${dotClasses} ${on ? onClass : offClass}`}
    />
  );
}

type BinaryDigitProps = {
  digit: string;
};

function BinaryDigit({ digit }: BinaryDigitProps) {
  return (
    <div className="flex flex-col">
      {toBinary(digit)
        .split("")
        .map((bit, index) => (
          <Dot key={`dot-${index}`} on={bit === "1"} />
        ))}
    </div>
  );
}

function BinaryBlock({ value }: { value: number }) {
  return (
    <div className="flex m-2 min-[380px]:m-4">
      {pad(value)
        .split("")
        .map((digit, index) => (
          <BinaryDigit key={`binary-digit-${index}`} digit={digit} />
        ))}
    </div>
  );
}

export function BinaryClock() {
  const [now, setNow] = useState(getCurrentTime);

  useInterval(() => setNow(getCurrentTime()), 1000);

  return (
    <div className="flex" aria-label="Binary clock" role="img">
      <BinaryBlock value={now.hour} />
      <BinaryBlock value={now.minutes} />
      <BinaryBlock value={now.seconds} />
    </div>
  );
}
