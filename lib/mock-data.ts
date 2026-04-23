// Mock data - substituir por APIs futuramente

export interface Option {
  id: string
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
      name: "Java",
      description: "Linguagem orientada a objetos, robusta e multiplataforma",
      locked: false,
    },
    {
      id: "kotlin",
      name: "Kotlin",
      description: "Linguagem moderna para JVM e Android",
      locked: true,
    },
    {
      id: "csharp",
      name: "C#",
      description: "Linguagem da Microsoft para .NET Framework",
      locked: true,
    },
  ],

  frameworks: {
    java: [
      {
        id: "spring-boot",
        name: "Spring Boot",
        description: "Framework para criação de aplicações Java enterprise",
        locked: false,
      },
      {
        id: "quarkus",
        name: "Quarkus",
        description: "Framework Java supersônico e subatômico",
        locked: true,
      },
    ],
    kotlin: [
      {
        id: "ktor",
        name: "Ktor",
        description: "Framework assíncrono para Kotlin",
        locked: true,
      },
    ],
    csharp: [
      {
        id: "aspnet",
        name: "ASP.NET Core",
        description: "Framework web da Microsoft",
        locked: true,
      },
      {
        id: "blazor",
        name: "Blazor",
        description: "Framework para criar UI interativas com C#",
        locked: true,
      },
    ],
  },

  architectures: [
    {
      id: "clean-architecture",
      name: "Clean Architecture",
      description: "Arquitetura limpa com separação de responsabilidades",
      locked: false,
    },
    {
      id: "mvc",
      name: "MVC",
      description: "Model-View-Controller - padrão clássico de arquitetura",
      locked: false,
    },
    {
      id: "hexagonal",
      name: "Hexagonal",
      description: "Arquitetura de portas e adaptadores",
      locked: false,
    },
    {
      id: "microservices",
      name: "Microservices",
      description: "Arquitetura baseada em serviços independentes",
      locked: false,
    },
  ],

  designPatterns: [
    {
      id: "factory",
      name: "Factory",
      description: "Padrão para criação de objetos sem expor a lógica",
      locked: false,
    },
    {
      id: "singleton",
      name: "Singleton",
      description: "Garante uma única instância de uma classe",
      locked: false,
    },
    {
      id: "builder",
      name: "Builder",
      description: "Construção de objetos complexos passo a passo",
      locked: false,
    },
    {
      id: "observer",
      name: "Observer",
      description: "Define dependência um-para-muitos entre objetos",
      locked: true,
    },
    {
      id: "strategy",
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
