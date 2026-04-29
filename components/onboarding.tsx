"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles,
  Settings2,
  FileCode,
  FolderSync,
  ArrowRight,
} from "lucide-react"

interface OnboardingProps {
  onStart: () => void
}

const steps = [
  {
    icon: Settings2,
    title: "Configure",
    description: "Escolha linguagem, framework, arquitetura e patterns",
  },
  {
    icon: FileCode,
    title: "Gere",
    description: "O sistema cria diretrizes em Markdown automaticamente",
  },
  {
    icon: FolderSync,
    title: "Integre",
    description: "Importe as skills para o seu projeto",
  },
]

export function Onboarding({ onStart }: OnboardingProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          AI Code Skills
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Gere diretrizes técnicas que guiam agentes de IA a produzir código
          consistente, seguindo sua arquitetura e boas práticas.
        </p>
      </div>

      <Card className="mb-8 border-dashed">
        <CardContent className="pt-6">
          <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Como funciona
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="mb-3 inline-flex items-center justify-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mb-1 font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <ArrowRight className="absolute right-0 top-3 hidden h-5 w-5 -translate-x-1/2 text-muted-foreground/50 sm:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button size="lg" onClick={onStart} className="gap-2 px-8">
          Começar Configuração
          <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Leva menos de 1 minuto para configurar
        </p>
      </div>
    </div>
  )
}
