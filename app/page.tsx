"use client"

import { useState } from "react"
import { ProjectWizard } from "@/components/project-wizard"
import { Onboarding } from "@/components/onboarding"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [showWizard, setShowWizard] = useState(false)

  return (
    <main className="relative min-h-screen bg-background px-4 py-12">
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-4xl">
        {showWizard ? (
          <>
            <header className="mb-12 text-center">
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                Configurador de Projeto
              </h1>
              <p className="mt-3 text-muted-foreground">
                Configure seu novo projeto selecionando as tecnologias desejadas
              </p>
            </header>
            <ProjectWizard />
          </>
        ) : (
          <Onboarding onStart={() => setShowWizard(true)} />
        )}
      </div>
    </main>
  )
}
