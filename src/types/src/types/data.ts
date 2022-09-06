export enum JSON_DATA_TYPES {
  OBJECT = 'object',
  STRING = 'string',
  BOOLEAN = 'boolean',
  NUMBER = 'number',
}

export enum JSON_DATA_FORMAT {
  DATE_TIME = 'date-time',
  TIME = 'time',
  DATE = 'date',
  PERCENT = 'percent',
}

export enum RefreshmentErrorType {
  TOKEN = 'TOKEN',
  CONFIGURATION = 'CONFIGURATION',
  CONNECTION = 'CONNECTION',
  STOPPED = 'STOPPED',
  OTHER = 'OTHER',
}

export enum RefreshmentErrorLevel {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}

export interface RefreshmentError {
  message: string;
  type: RefreshmentErrorType;
  level: RefreshmentErrorLevel;
  stack?: string;
}
