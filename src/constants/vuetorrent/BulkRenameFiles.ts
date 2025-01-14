export enum ApplyTo {
  FILENAME = (1 << 0),
  EXTENSION = (1 << 1),

  BOTH = FILENAME | EXTENSION
}
