"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, RotateCcw, FolderOpen, Download } from "lucide-react"
import type { Option } from "@/lib/mock-data"

interface Selections {
  language: Option | null
  framework: Option | null
  architecture: Option | null
  designPatterns: Option[]
}

interface SummaryProps {
  selections: Selections
  onRestart: () => void
}

export function Summary({ selections, onRestart }: SummaryProps) {
  const items = [
    { label: "Linguagem", value: selections.language },
    { label: "Framework", value: selections.framework },
    { label: "Arquitetura", value: selections.architecture },
  ]

  const handleImportToProject = async () => {
    try {
      // Usa a File System Access API para abrir o seletor de diretório
      if ("showDirectoryPicker" in window) {
        const directoryHandle = await (window as unknown as { showDirectoryPicker: () => Promise<FileSystemDirectoryHandle> }).showDirectoryPicker()
        console.log("Diretório selecionado:", directoryHandle.name)
        console.log("Seleções para importar:", selections)
      } else {
        // Fallback para navegadores que não suportam a API
        console.log("Navegador não suporta seleção de diretório. Usando fallback...")
        console.log("Seleções para importar:", selections)
        alert("Seu navegador não suporta a seleção de diretório. Use Chrome ou Edge para esta funcionalidade.")
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Erro ao selecionar diretório:", error)
      }
    }
  }

  const handleDownload = () => {
    console.log("Download solicitado")
    console.log("Seleções para download:", selections)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Configuração Completa!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Veja abaixo o resumo das suas seleções
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumo do Projeto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <span className="font-medium text-muted-foreground">
                {item.label}
              </span>
              <span className="font-semibold text-foreground">
                {item.value?.name || "Não selecionado"}
              </span>
            </div>
          ))}

          <div className="pt-2">
            <span className="font-medium text-muted-foreground">
              Design Patterns
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {selections.designPatterns.length > 0 ? (
                selections.designPatterns.map((pattern) => (
                  <span
                    key={pattern.id}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {pattern.name}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  Nenhum selecionado
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button onClick={handleImportToProject} className="gap-2">
          <FolderOpen className="h-4 w-4" />
          Importar para Projeto
        </Button>
        <Button onClick={handleDownload} variant="secondary" className="gap-2">
          <Download className="h-4 w-4" />
          Baixar
        </Button>
        <Button onClick={onRestart} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Começar Novamente
        </Button>
      </div>
    </div>
  )
}
