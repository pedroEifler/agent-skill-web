"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, RotateCcw, Download, Loader2, Eye, GraduationCap, Briefcase, Maximize2, Minimize2 } from "lucide-react"
import type { Option } from "@/lib/types"
import JSZip from "jszip"
import { generateSkill, type GenerateSkillResponse, type SkillType } from "@/lib/skills-service"

interface Selections {
  language: Option | null
  framework: Option | null
  architecture: Option | null
  designPatterns: Option[]
}

interface SummaryProps {
  selections: Selections
  skillType: SkillType
  onSkillTypeChange: (type: SkillType) => void
  onRestart: () => void
}

export function Summary({ selections, skillType, onSkillTypeChange, onRestart }: SummaryProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [skillResponse, setSkillResponse] = useState<GenerateSkillResponse | null>(null)
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)

  const stripFrontmatter = (content: string) =>
    content.replace(/^[ \t]*---[ \t]*\r?\n[\s\S]*?\r?\n[ \t]*---[ \t]*\r?\n?/gm, "").trimStart()

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
      const result = await generateSkill({
        languageId: selections.language.id,
        frameworkId: selections.framework.id,
        architectureId: selections.architecture.id,
        designPatternIds: selections.designPatterns.map((p) => p.id),
        type: skillType
      })
      setSkillResponse(result)
    } catch (error) {
      console.error("Erro ao gerar skill:", error)
      alert("Erro ao gerar o skill. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!skillResponse || !selections.language || !selections.framework || !selections.architecture) return

    const zip = new JSZip()
    const skillFolder = zip.folder(".skill")!
    skillFolder.file("SKILL.md", skillResponse.content)

    if (skillResponse.references.length > 0) {
      const refsFolder = skillFolder.folder("references")!
      for (const ref of skillResponse.references) {
        const refFolder = refsFolder.folder(ref.folder)!
        refFolder.file(ref.fileName, ref.content)
      }
    }

    const blob = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Skills.zip`
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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tipo de Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onSkillTypeChange("student")}
              className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                skillType === "student"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <GraduationCap className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Estudante</p>
                <p className="text-sm text-muted-foreground">
                  Explicações didáticas e detalhadas
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSkillTypeChange("business")}
              className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                skillType === "business"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Briefcase className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Profissional</p>
                <p className="text-sm text-muted-foreground">
                  Foco em boas práticas de produção
                </p>
              </div>
            </button>
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
          disabled={!skillResponse}
        >
          <Download className="h-4 w-4" />
          Baixar .md
        </Button>
        <Button onClick={onRestart} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Começar Novamente
        </Button>
      </div>

      {skillResponse && (
        <Card
          className={`mt-6 transition-all duration-300 ${
            isPreviewExpanded
              ? "relative left-1/2 ml-[-45vw] w-[90vw] max-w-[90vw]"
              : ""
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Preview do Skill</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => setIsPreviewExpanded((prev) => !prev)}
            >
              {isPreviewExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
              {isPreviewExpanded ? "Recolher" : "Expandir"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-y-auto text-sm text-foreground max-h-[600px]">
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
                {stripFrontmatter(skillResponse.content)}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
