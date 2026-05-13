"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Layers,
  Package,
  Workflow,
  Info,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface CleanArchitectureAdvancedOptions {
  camadas: {
    domainIsolado: boolean
    infrastructureSeparada: boolean
    applicationLayerObrigatoria: boolean
    sharedKernelHabilitado: boolean
  }
  useCases: {
    useCasePorAcao: boolean
    umMetodoExecute: boolean
    dtosSeparadosPorCamada: boolean
  }
}

export const defaultCleanArchitectureAdvancedOptions: CleanArchitectureAdvancedOptions = {
  camadas: {
    domainIsolado: true,
    infrastructureSeparada: true,
    applicationLayerObrigatoria: false,
    sharedKernelHabilitado: false,
  },
  useCases: {
    useCasePorAcao: true,
    umMetodoExecute: true,
    dtosSeparadosPorCamada: false,
  },
}

interface SwitchRowProps {
  id: string
  label: string
  hint: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
}

function SwitchRow({ id, label, hint, checked, onCheckedChange }: SwitchRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-0.5">
      <div className="flex items-center gap-1.5">
        <Label
          htmlFor={id}
          className="cursor-pointer text-sm font-normal leading-snug"
        >
          {label}
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-3.5 w-3.5 shrink-0 cursor-help text-muted-foreground/60 hover:text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-56">
            {hint}
          </TooltipContent>
        </Tooltip>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

interface CleanArchitectureAdvancedOptionsPanelProps {
  options: CleanArchitectureAdvancedOptions
  onChange: (options: CleanArchitectureAdvancedOptions) => void
}

export function CleanArchitectureAdvancedOptionsPanel({
  options,
  onChange,
}: CleanArchitectureAdvancedOptionsPanelProps) {
  const setCamadas = (key: keyof CleanArchitectureAdvancedOptions["camadas"], value: boolean) =>
    onChange({ ...options, camadas: { ...options.camadas, [key]: value } })

  const setUseCases = (key: keyof CleanArchitectureAdvancedOptions["useCases"], value: boolean) =>
    onChange({ ...options, useCases: { ...options.useCases, [key]: value } })

  return (
    <div className="mt-6 rounded-lg border bg-muted/20 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Opções Avançadas — Clean Architecture
      </p>

      <Accordion type="multiple" className="space-y-2">
        {/* Camadas */}
        <AccordionItem
          value="camadas"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              Camadas
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="ca-domain-isolado"
              label="Domain isolado"
              hint="O domínio não depende de nenhuma outra camada ou framework externo. Contém apenas regras de negócio puras, entidades e interfaces."
              checked={options.camadas.domainIsolado}
              onCheckedChange={(v) => setCamadas("domainIsolado", v)}
            />
            <SwitchRow
              id="ca-infrastructure-separada"
              label="Infrastructure separada"
              hint="Banco de dados, e-mail, filas e outras integrações ficam na camada de infraestrutura, isoladas do domínio e da aplicação."
              checked={options.camadas.infrastructureSeparada}
              onCheckedChange={(v) => setCamadas("infrastructureSeparada", v)}
            />
            <SwitchRow
              id="ca-application-layer"
              label="Application layer obrigatória"
              hint="Garante a existência de uma camada de aplicação responsável por orquestrar os casos de uso, sem conter regras de negócio."
              checked={options.camadas.applicationLayerObrigatoria}
              onCheckedChange={(v) => setCamadas("applicationLayerObrigatoria", v)}
            />
            <SwitchRow
              id="ca-shared-kernel"
              label="Shared kernel habilitado"
              hint="Permite um módulo compartilhado entre contextos delimitados com tipos e utilitários comuns, mantendo o acoplamento explícito e controlado."
              checked={options.camadas.sharedKernelHabilitado}
              onCheckedChange={(v) => setCamadas("sharedKernelHabilitado", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Use Cases */}
        <AccordionItem
          value="use-cases"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-muted-foreground" />
              Use Cases
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="ca-usecase-por-acao"
              label="UseCase por ação"
              hint="Cada caso de uso representa uma única ação do sistema (ex.: CreateUserUseCase, DeleteOrderUseCase), evitando classes genéricas com múltiplas responsabilidades."
              checked={options.useCases.useCasePorAcao}
              onCheckedChange={(v) => setUseCases("useCasePorAcao", v)}
            />
            <SwitchRow
              id="ca-metodo-execute"
              label="Um método execute() por caso de uso"
              hint="Cada classe de caso de uso expõe somente o método execute(), tornando a interface previsível e simples de invocar."
              checked={options.useCases.umMetodoExecute}
              onCheckedChange={(v) => setUseCases("umMetodoExecute", v)}
            />
            <SwitchRow
              id="ca-dtos-separados"
              label="DTOs separados por camada"
              hint="Cada camada possui seus próprios objetos de transferência de dados (Input, Output, ViewModel), evitando o vazamento de detalhes de implementação entre camadas."
              checked={options.useCases.dtosSeparadosPorCamada}
              onCheckedChange={(v) => setUseCases("dtosSeparadosPorCamada", v)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

