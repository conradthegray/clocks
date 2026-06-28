import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DigitalClock } from "@/components/DigitalClock";
import { BinaryClock } from "@/components/BinaryClock";
import { BarClock } from "@/components/BarClock";
import type { Clock, ClockId } from "@/types";
import "./App.css";

const CLOCKS: Clock[] = [
  { id: "digital", label: "Digital" },
  { id: "binary", label: "Binary" },
  { id: "bar", label: "Bar" },
];

function App() {
  const [selectedClockId, setSelectedClockId] = useState<ClockId>("digital");

  return (
    <div className="mx-auto grid min-h-svh w-full max-w-[1126px] grid-rows-[auto_1fr_auto] text-center">
      <Header
        clocks={CLOCKS}
        selectedClockId={selectedClockId}
        onClockSelect={setSelectedClockId}
      />

      <section className="grid place-content-center place-items-center px-5 py-8">
        {selectedClockId === "digital" && <DigitalClock />}
        {selectedClockId === "binary" && <BinaryClock />}
        {selectedClockId === "bar" && <BarClock />}
      </section>

      <Footer />
    </div>
  );
}

export default App;
