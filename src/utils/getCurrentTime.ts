export type Time = {
  hour: number;
  minutes: number;
  seconds: number;
};

/** Returns the current local time split into hour, minutes, and seconds. */
export const getCurrentTime = (): Time => {
  const now = new Date();
  return {
    hour: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
};
