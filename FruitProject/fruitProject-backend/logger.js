// const pino = require("pino");
// const streams = [
//     {
//       level: "trace", // support logging of all levels to this location
//       stream: process.stdout, // logs to the standard output
//     },
//     {
//       level: "trace", // support logging of all levels to this location
//       stream: pino.destination("logs/server-log"), // log to this file
//     },
//   ];
  
// const logger = pino(
//   {
//     level: "debug", // minimum level to log
//   },
//   pino.multistream(streams)
// );

// module.exports = logger;

const pino = require('pino')
const minimum_log_level = "info";


const streams = [
  {
    level: "trace", // support logging of all levels to this location
    stream: process.stdout, // logs to the standard output
  },
  {
    level: "trace", // support logging of all levels to this location
    stream: pino.destination("logs/server-log"), // log to this file
  },
];


const logger = process.env.CONSOLE_ONLY == "true"
? pino(
  {
    level: process.env.PINO_LOG_LEVEL || minimum_log_level // minimum level to log
  }): pino(
      {
        level: process.env.PINO_LOG_LEVEL || minimum_log_level ,
      },
  pino.multistream(streams)
);

module.exports = logger;
