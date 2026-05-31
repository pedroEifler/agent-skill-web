"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, RotateCcw, Download, Loader2, Eye } from "lucide-react"
import type { Option } from "@/lib/types"
import { generateSkill } from "@/lib/skills-service"

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
  const [isLoading, setIsLoading] = useState(false)
  const [markdownContent, setMarkdownContent] = useState<string | null>(null)

  const items = [
    { label: "Linguagem", value: selections.language },
    { label: "Framework", value: selections.framework },
    { label: "Arquitetura", value: selections.architecture },
  ]

  const handleGenerate = async () => {
    if (
      !selections.language ||
      !selections.framework ||
      !selections.architecture
    ) {
      return
    }

    setIsLoading(true)
    try {
      const content = await generateSkill({
        languageId: selections.language.id,
        frameworkId: selections.framework.id,
        architectureId: selections.architecture.id,
        designPatternIds: selections.designPatterns.map((p) => p.id),
      })
      setMarkdownContent(content)
    } catch (error) {
      console.error("Erro ao gerar skill:", error)
      alert("Erro ao gerar o skill. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!markdownContent || !selections.language || !selections.framework || !selections.architecture) return

    const patterns = selections.designPatterns.map((p) => p.name).join(", ") || "Nenhum"
    const date = new Date().toISOString().split("T")[0]

    const frontmatter = [
      "---",
      `title: "${selections.language.name} + ${selections.framework.name} - Skills & Best Practices"`,
      `language: "${selections.language.name}"`,
      `framework: "${selections.framework.name}"`,
      `architecture: "${selections.architecture.name}"`,
      `patterns: "${patterns}"`,
      `generated: "${date}"`,
      "---",
      "",
    ].join("\n")

    const fullContent = frontmatter + markdownContent

    const blob = new Blob([fullContent], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `skill-${selections.language.id}-${selections.framework.id}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
        <Button onClick={handleGenerate} className="gap-2" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          {isLoading ? "Gerando..." : "Gerar Skill"}
        </Button>
        <Button
          onClick={handleDownload}
          variant="secondary"
          className="gap-2"
          disabled={!markdownContent}
        >
          <Download className="h-4 w-4" />
          Baixar .md
        </Button>
        <Button onClick={onRestart} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Começar Novamente
        </Button>
      </div>

      {markdownContent && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Preview do Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[600px] overflow-y-auto text-sm text-foreground">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-3 border-b border-border pb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold mt-5 mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-semibold mt-4 mb-1">{children}</h3>,
                  p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="ml-2">{children}</li>,
                  code: ({ children, className }) => {
                    const isBlock = className?.includes("language-")
                    return isBlock
                      ? <code className="block bg-muted rounded p-3 text-xs font-mono overflow-x-auto mb-3 whitespace-pre">{children}</code>
                      : <code className="bg-muted rounded px-1 py-0.5 text-xs font-mono">{children}</code>
                  },
                  pre: ({ children }) => <pre className="mb-3">{children}</pre>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-3">{children}</blockquote>,
                  hr: () => <hr className="border-border my-4" />,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  a: ({ children, href }) => <a href={href} className="text-primary underline underline-offset-2" target="_blank" rel="noopener noreferrer">{children}</a>,
                  table: ({ children }) => <div className="overflow-x-auto mb-3"><table className="w-full text-sm border-collapse">{children}</table></div>,
                  th: ({ children }) => <th className="border border-border bg-muted px-3 py-1 text-left font-semibold">{children}</th>,
                  td: ({ children }) => <td className="border border-border px-3 py-1">{children}</td>,
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
