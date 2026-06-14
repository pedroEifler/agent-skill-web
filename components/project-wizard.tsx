"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { OptionCard } from "@/components/option-card"
import { StepHeader } from "@/components/step-header"
import { Summary } from "@/components/summary"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { getLanguages, type Language } from "@/lib/language-service"
import { getFrameworksByLanguage, type Framework } from "@/lib/framework-service"
import { getArchitectures, type Architecture } from "@/lib/architecture-service"
import { getDesignPatterns, type DesignPattern } from "@/lib/design-pattern-service"
import type { SkillType } from "@/lib/skills-service"

const TOTAL_STEPS = 4

type Option = Language | Framework | Architecture | DesignPattern

interface Selections {
  language: Language | null
  framework: Framework | null
  architecture: Architecture | null
  designPatterns: DesignPattern[]
}

export function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Dados carregados dos services
  const [languages, setLanguages] = useState<Language[]>([])
  const [frameworks, setFrameworks] = useState<Framework[]>([])
  const [architectures, setArchitectures] = useState<Architecture[]>([])
  const [designPatterns, setDesignPatterns] = useState<DesignPattern[]>([])

  // Seleções do usuário
  const [selections, setSelections] = useState<Selections>({
    language: null,
    framework: null,
    architecture: null,
    designPatterns: [],
  })

  // IDs selecionados para controle
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(null)
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string | null>(null)
  const [selectedArchitectureId, setSelectedArchitectureId] = useState<string | null>(null)
  const [selectedPatternIds, setSelectedPatternIds] = useState<string[]>([])

  // Tipo de skill: estudante ou profissional
  const [skillType, setSkillType] = useState<SkillType>("student")

  // Carregar linguagens na montagem
  useEffect(() => {
    getLanguages().then(setLanguages)
    getArchitectures().then(setArchitectures)
    getDesignPatterns().then(setDesignPatterns)
  }, [])

  // Carregar frameworks quando linguagem muda
  useEffect(() => {
    if (selectedLanguageId) {
      const lang = languages.find((l) => l.id === selectedLanguageId)
      const numericId = lang?.numericId ?? selectedLanguageId
      getFrameworksByLanguage(numericId).then(setFrameworks)
    }
  }, [selectedLanguageId, languages])

  const handleLanguageSelect = (id: string) => {
    const selected = languages.find((l) => l.id === id) || null
    setSelectedLanguageId(id)
    setSelections((prev) => ({ ...prev, language: selected, framework: null }))
    setSelectedFrameworkId(null)
  }

  const handleFrameworkSelect = (id: string) => {
    const selected = frameworks.find((f) => f.id === id) || null
    setSelectedFrameworkId(id)
    setSelections((prev) => ({ ...prev, framework: selected }))
  }

  const handleArchitectureSelect = (id: string) => {
    const selected = architectures.find((a) => a.id === id) || null
    setSelectedArchitectureId(id)
    setSelections((prev) => ({ ...prev, architecture: selected }))
  }

  const handlePatternToggle = (id: string) => {
    const pattern = designPatterns.find((p) => p.id === id)
    if (!pattern || pattern.locked) return

    setSelectedPatternIds((prev) => {
      const isSelected = prev.includes(id)
      const newIds = isSelected
        ? prev.filter((pId) => pId !== id)
        : [...prev, id]

      const selectedPatterns = designPatterns.filter((p) =>
        newIds.includes(p.id)
      )
      setSelections((prevSel) => ({ ...prevSel, designPatterns: selectedPatterns }))

      return newIds
    })
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedLanguageId !== null
      case 1:
        return selectedFrameworkId !== null
      case 2:
        return selectedArchitectureId !== null
      case 3:
        return selectedPatternIds.length > 0
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setIsComplete(false)
    setSelectedLanguageId(null)
    setSelectedFrameworkId(null)
    setSelectedArchitectureId(null)
    setSelectedPatternIds([])
    setSkillType("student")
    setSelections({
      language: null,
      framework: null,
      architecture: null,
      designPatterns: [],
    })
  }

  if (isComplete) {
    return (
      <Summary
        selections={selections}
        skillType={skillType}
        onSkillTypeChange={setSkillType}
        onRestart={handleRestart}
      />
    )
  }

  const stepConfig = [
    {
      title: "Selecione a Linguagem",
      description: "Escolha a linguagem de programação para seu projeto",
      options: languages,
      selectedId: selectedLanguageId,
      onSelect: handleLanguageSelect,
      multiSelect: false,
    },
    {
      title: "Selecione o Framework",
      description: "Escolha o framework para desenvolvimento",
      options: frameworks,
      selectedId: selectedFrameworkId,
      onSelect: handleFrameworkSelect,
      multiSelect: false,
    },
    {
      title: "Selecione a Arquitetura",
      description: "Defina a arquitetura do seu projeto",
      options: architectures,
      selectedId: selectedArchitectureId,
      onSelect: handleArchitectureSelect,
      multiSelect: false,
    },
    {
      title: "Selecione os Design Patterns",
      description: "Escolha os padrões de design (pode selecionar múltiplos)",
      options: designPatterns,
      selectedIds: selectedPatternIds,
      onSelect: handlePatternToggle,
      multiSelect: true,
    },
  ]

  const currentConfig = stepConfig[currentStep]

  return (
    <div className="mx-auto max-w-3xl">
      <StepHeader
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        title={currentConfig.title}
        description={currentConfig.description}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {currentConfig.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={
              currentConfig.multiSelect
                ? selectedPatternIds.includes(option.id)
                : currentConfig.selectedId === option.id
            }
            onSelect={currentConfig.onSelect}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="gap-2"
        >
          {currentStep === TOTAL_STEPS - 1 ? "Finalizar" : "Próximo"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
