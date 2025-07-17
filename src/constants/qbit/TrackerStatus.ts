export enum TrackerStatus {
  /** Tracker is disabled (used for DHT, PeX, and LSD) */
  DISABLED = 0,
  /** Tracker has not been contacted yet */
  NOT_YET_CONTACTED = 1,
  /** Tracker has been contacted and is working */
  WORKING = 2,
  /** Tracker is updating */
  UPDATING = 3,
  /** Tracker has been contacted, but it is not working (or doesn't send proper replies) */
  NOT_WORKING = 4,
}
