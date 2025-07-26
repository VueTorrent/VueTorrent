export type CardProps<T> = {
  active?: boolean
  grow?: boolean

  title: string
  icon: string

  orientation?: 'row' | 'column'
  color?: string

  value: T | T[]
}
