import { useTheme } from "@/hooks/useTheme";
import type { Clock, ClockId } from "@/types";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  clocks: Clock[];
  selectedClockId: ClockId;
  onClockSelect: (id: ClockId) => void;
};

export function Header({
  clocks,
  selectedClockId,
  onClockSelect,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div>
        <Logo />
      </div>
      <select
        value={selectedClockId}
        onChange={(e) => onClockSelect(e.target.value as ClockId)}
        className="rounded-md border border-[#d8dee9] bg-[#eceff4] px-8 py-3 text-sm font-medium text-[#2e3440] shadow-sm focus:outline-none dark:border-[#3b4252] dark:bg-[#2e3440] dark:text-[#eceff4]"
      >
        {clocks.map((clock) => (
          <option key={clock.id} value={clock.id}>
            {clock.label}
          </option>
        ))}
      </select>
      <div className="self-start">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </header>
  );
}
