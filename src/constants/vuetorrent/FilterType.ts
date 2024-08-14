export enum FilterType {
  /**
   * Applies conjunctive filtering
   *
   * Conjunctive refers to a connection or "and" relation between statements.
   * Every filters MUST match for the data to match
   */
  CONJUNCTIVE,
  /**
   * Applies disjunctive filtering
   *
   * Disjunctive denotes an "either/or" condition.
   * Any filter must match for the data to match
   */
  DISJUNCTIVE
}
