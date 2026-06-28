export type ClockId = "digital" | "binary" | "bar";

export type Clock = {
  id: ClockId;
  label: string;
};
