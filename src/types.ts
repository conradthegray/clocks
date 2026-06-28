export type ClockId = "digital" | "binary" | "bar" | "bars";

export type Clock = {
  id: ClockId;
  label: string;
};
