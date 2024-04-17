import fs from 'fs';
import path from 'path';

// ************************ CONFIGURE LOG PATH ************************

const logFilePath = path.join(__dirname, '../../logs/app.log');

// ************************ CONFIGURE LOG PATH ************************

export function info(message) {
  _writeToLog('INFO', message);
}

export function error(message, error) {
  _writeToLog('ERROR', `${message}: ${error.message}`);
}

function _writeToLog(level, message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}\n`;

  try {
    fs.appendFileSync(logFilePath, logEntry);
  } catch (err) {
    console.error('Error writing to log file:', err);
  }
}

// **************** To use logger... ****************

// import { info, error } from '../core/utils/logger';

// info('This is an informational message');
// error('An error occurred', new Error('Something went wrong'));