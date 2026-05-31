export interface Option {
  id: string
  name: string
  description: string
  locked: boolean
}

export interface MockData {
  languages: Option[]
  frameworks: Record<string, Option[]>
  architectures: Option[]
  designPatterns: Option[]
}
