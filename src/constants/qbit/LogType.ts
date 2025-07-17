export enum LogType {
  NONE = 0,
  NORMAL = 1 << 0,
  INFO = 1 << 1,
  WARNING = 1 << 2,
  CRITICAL = 1 << 3,
  ALL = NORMAL | INFO | WARNING | CRITICAL,
}
