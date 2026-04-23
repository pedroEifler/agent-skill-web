import { ProjectWizard } from "@/components/project-wizard"

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Configurador de Projeto
          </h1>
          <p className="mt-3 text-muted-foreground">
            Configure seu novo projeto selecionando as tecnologias desejadas
          </p>
        </header>

        <ProjectWizard />
      </div>
    </main>
  )
}
