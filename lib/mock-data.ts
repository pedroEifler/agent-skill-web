// Mock data - substituir por APIs futuramente

export interface Option {
  id: string
  numericId: number
  name: string
  description: string
  icon?: string
  locked: boolean
}

export interface MockData {
  languages: Option[]
  frameworks: Record<string, Option[]>
  architectures: Option[]
  designPatterns: Option[]
}

export const mockData: MockData = {
  languages: [
    {
      id: "java",
      numericId: 1,
      name: "Java",
      description: "Linguagem orientada a objetos, robusta e multiplataforma",
      locked: false,
    },
    {
      id: "kotlin",
      numericId: 2,
      name: "Kotlin",
      description: "Linguagem moderna para JVM e Android",
      locked: true,
    },
    {
      id: "csharp",
      numericId: 3,
      name: "C#",
      description: "Linguagem da Microsoft para .NET Framework",
      locked: true,
    },
  ],

  frameworks: {
    java: [
      {
        id: "spring-boot",
        numericId: 1,
        name: "Spring Boot",
        description: "Framework para criação de aplicações Java enterprise",
        locked: false,
      },
      {
        id: "quarkus",
        numericId: 2,
        name: "Quarkus",
        description: "Framework Java supersônico e subatômico",
        locked: true,
      },
    ],
    kotlin: [
      {
        id: "ktor",
        numericId: 3,
        name: "Ktor",
        description: "Framework assíncrono para Kotlin",
        locked: true,
      },
    ],
    csharp: [
      {
        id: "aspnet",
        numericId: 4,
        name: "ASP.NET Core",
        description: "Framework web da Microsoft",
        locked: true,
      },
      {
        id: "blazor",
        numericId: 5,
        name: "Blazor",
        description: "Framework para criar UI interativas com C#",
        locked: true,
      },
    ],
  },

  architectures: [
    {
      id: "clean-architecture",
      numericId: 1,
      name: "Clean Architecture",
      description: "Arquitetura limpa com separação de responsabilidades",
      locked: false,
    },
    {
      id: "mvc",
      numericId: 2,
      name: "MVC",
      description: "Model-View-Controller - padrão clássico de arquitetura",
      locked: false,
    },
    {
      id: "hexagonal",
      numericId: 3,
      name: "Hexagonal",
      description: "Arquitetura de portas e adaptadores",
      locked: false,
    },
    {
      id: "microservices",
      numericId: 4,
      name: "Microservices",
      description: "Arquitetura baseada em serviços independentes",
      locked: false,
    },
  ],

  designPatterns: [
    {
      id: "factory",
      numericId: 1,
      name: "Factory",
      description: "Padrão para criação de objetos sem expor a lógica",
      locked: false,
    },
    {
      id: "singleton",
      numericId: 2,
      name: "Singleton",
      description: "Garante uma única instância de uma classe",
      locked: false,
    },
    {
      id: "builder",
      numericId: 3,
      name: "Builder",
      description: "Construção de objetos complexos passo a passo",
      locked: false,
    },
    {
      id: "observer",
      numericId: 4,
      name: "Observer",
      description: "Define dependência um-para-muitos entre objetos",
      locked: true,
    },
    {
      id: "strategy",
      numericId: 5,
      name: "Strategy",
      description: "Define família de algoritmos intercambiáveis",
      locked: true,
    },
  ],
}

// Funções para simular chamadas de API
export async function getLanguages(): Promise<Option[]> {
  // Simula delay de API
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockData.languages
}

export async function getFrameworks(languageId: string): Promise<Option[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockData.frameworks[languageId] || []
}

export async function getArchitectures(): Promise<Option[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockData.architectures
}

export async function getDesignPatterns(): Promise<Option[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockData.designPatterns
}
