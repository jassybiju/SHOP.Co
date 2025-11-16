import winston from 'winston';
const {combine , timestamp, json} = winston.format
export const logger = winston.createLogger({
    level : "info",
    format : combine(timestamp(), json()),
    transports : [new winston.transports.File({ filename : 'logs.log' })],
    exceptionHandlers : [new winston.transports.File({ filename : 'logs.log'})]
})