import pino from "pino";

const isDevelopment = process.env.NODE_ENV === "development";

export const logger = isDevelopment
  ? pino({
      level: "debug",
      // Use basic formatter instead of pino-pretty to avoid worker thread issues
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    })
  : pino({
      level: "info",
      formatters: {
        level: (label) => {
          return { level: label };
        },
      },
    });
