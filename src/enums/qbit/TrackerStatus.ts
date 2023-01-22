export enum TrackerStatus {
  /** Tracker is disabled (used for DHT, PeX, and LSD) */
  DISABLED,
  /** Tracker has not been contacted yet */
  NOT_YET_CONTACTED,
  /** Tracker has been contacted and is working */
  WORKING,
  /** Tracker is updating */
  UPDATING,
  /** Tracker has been contacted, but it is not working (or doesn't send proper replies) */
  NOT_WORKING
}
