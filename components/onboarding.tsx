"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles,
  Settings2,
  FileCode,
  FolderSync,
  ArrowRight,
  Bot,
  BookOpen,
  Info,
  ChevronDown,
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

const notes = [
  {
    icon: Bot,
    title: "Precisa de um agente",
    description:
      "As skills geradas são usadas por um agente de IA (como Copilot, Cursor ou Claude). Sozinhas elas não escrevem código.",
  },
  {
    icon: BookOpen,
    title: "É apenas um guia",
    description:
      "O resultado é um conjunto de diretrizes em Markdown. Ele orienta o agente, mas não substitui sua revisão e decisões.",
  },
]

export function Onboarding({ onStart }: OnboardingProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Skills para Agentes
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Gere diretrizes técnicas que guiam agentes de IA a produzir código
          consistente, seguindo sua arquitetura e boas práticas.
        </p>
        <div className="mt-16 flex animate-bounce flex-col items-center gap-1 text-muted-foreground">
          <span className="text-xs uppercase tracking-wider">Role para saber mais</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>

      <section className="flex min-h-screen flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Como funciona
        </h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          Três passos simples para gerar e usar suas skills.
        </p>

        <div className="mt-16 grid w-full gap-10 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center"
            >
              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                Passo {index + 1}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <ArrowRight className="absolute -right-5 top-6 hidden h-6 w-6 text-muted-foreground/40 sm:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto mb-16 grid max-w-2xl gap-6 sm:grid-cols-2">
        {notes.map((note) => (
          <Card key={note.title} className="bg-muted/30">
            <CardContent className="flex flex-col gap-2 pt-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <note.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{note.title}</h3>
              <p className="text-sm text-muted-foreground">
                {note.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Pronto para começar?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Clique no botão abaixo e gere suas skills em menos de 1 minuto. É
          gratuito e sem complicação.
        </p>
        <Button
          size="lg"
          onClick={onStart}
          className="mt-8 gap-2 px-10 py-6 text-base font-semibold shadow-lg transition-transform hover:scale-105"
        >
          <Sparkles className="h-5 w-5" />
          Começar agora
          <ArrowRight className="h-5 w-5" />
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Sem cadastro · Leva menos de 1 minuto
        </p>
      </div>
    </div>
  )
}
