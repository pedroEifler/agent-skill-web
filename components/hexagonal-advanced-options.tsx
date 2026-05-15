"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Plug, GitBranch, Radio, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface HexagonalAdvancedOptions {
  portsAdapters: {
    portsObrigatorios: boolean
    adaptersSeparados: boolean
    primaryAdapters: boolean
    secondaryAdapters: boolean
  }
  dependencias: {
    coreIsolado: boolean
    infraestruturaDesacoplada: boolean
    frameworkForaDoDominio: boolean
  }
  comunicacao: {
    eventosDeDominio: boolean
    mensageriaHabilitada: boolean
    outboxPattern: boolean
  }
}

export const defaultHexagonalAdvancedOptions: HexagonalAdvancedOptions = {
  portsAdapters: {
    portsObrigatorios: false,
    adaptersSeparados: false,
    primaryAdapters: false,
    secondaryAdapters: false,
  },
  dependencias: {
    coreIsolado: false,
    infraestruturaDesacoplada: false,
    frameworkForaDoDominio: false,
  },
  comunicacao: {
    eventosDeDominio: false,
    mensageriaHabilitada: false,
    outboxPattern: false,
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

interface HexagonalAdvancedOptionsPanelProps {
  options: HexagonalAdvancedOptions
  onChange: (options: HexagonalAdvancedOptions) => void
}

export function HexagonalAdvancedOptionsPanel({
  options,
  onChange,
}: HexagonalAdvancedOptionsPanelProps) {
  const setPorts = (key: keyof HexagonalAdvancedOptions["portsAdapters"], value: boolean) =>
    onChange({ ...options, portsAdapters: { ...options.portsAdapters, [key]: value } })

  const setDeps = (key: keyof HexagonalAdvancedOptions["dependencias"], value: boolean) =>
    onChange({ ...options, dependencias: { ...options.dependencias, [key]: value } })

  const setCom = (key: keyof HexagonalAdvancedOptions["comunicacao"], value: boolean) =>
    onChange({ ...options, comunicacao: { ...options.comunicacao, [key]: value } })

  return (
    <div className="mt-6 rounded-lg border bg-muted/20 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Opções Avançadas — Arquitetura Hexagonal
      </p>

      <Accordion type="multiple" className="space-y-2">
        {/* Ports & Adapters */}
        <AccordionItem
          value="ports-adapters"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Plug className="h-4 w-4 text-muted-foreground" />
              Ports &amp; Adapters
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="hex-ports"
              label="Ports obrigatórios"
              hint="Todo ponto de entrada ou saída do sistema deve ser definido como uma interface (port), sem depender de tecnologia específica."
              checked={options.portsAdapters.portsObrigatorios}
              onCheckedChange={(v) => setPorts("portsObrigatorios", v)}
            />
            <SwitchRow
              id="hex-adapters-sep"
              label="Adapters separados"
              hint="Cada adapter fica em seu próprio arquivo ou módulo, sem misturar a lógica de diferentes tecnologias no mesmo lugar."
              checked={options.portsAdapters.adaptersSeparados}
              onCheckedChange={(v) => setPorts("adaptersSeparados", v)}
            />
            <SwitchRow
              id="hex-primary"
              label="Primary adapters"
              hint="Adapters que acionam o sistema (ex.: controller HTTP, CLI). Eles chamam o core, nunca o contrário."
              checked={options.portsAdapters.primaryAdapters}
              onCheckedChange={(v) => setPorts("primaryAdapters", v)}
            />
            <SwitchRow
              id="hex-secondary"
              label="Secondary adapters"
              hint="Adapters que o sistema aciona (ex.: banco de dados, e-mail). Implementam as interfaces definidas pelo core."
              checked={options.portsAdapters.secondaryAdapters}
              onCheckedChange={(v) => setPorts("secondaryAdapters", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Dependências */}
        <AccordionItem
          value="dependencias"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              Dependências
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="hex-core"
              label="Core isolado"
              hint="O código de regras de negócio não pode importar nada de framework, banco ou biblioteca externa — só Java puro."
              checked={options.dependencias.coreIsolado}
              onCheckedChange={(v) => setDeps("coreIsolado", v)}
            />
            <SwitchRow
              id="hex-infra"
              label="Infraestrutura desacoplada"
              hint="Detalhes técnicos (banco, cache, e-mail) ficam fora do domínio e podem ser trocados sem alterar a regra de negócio."
              checked={options.dependencias.infraestruturaDesacoplada}
              onCheckedChange={(v) => setDeps("infraestruturaDesacoplada", v)}
            />
            <SwitchRow
              id="hex-framework"
              label="Framework fora do domínio"
              hint="Anotações e classes do Spring (ou qualquer framework) não podem aparecer nas classes de domínio."
              checked={options.dependencias.frameworkForaDoDominio}
              onCheckedChange={(v) => setDeps("frameworkForaDoDominio", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Comunicação */}
        <AccordionItem
          value="comunicacao"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-muted-foreground" />
              Comunicação
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="hex-domain-events"
              label="Eventos de domínio"
              hint="Quando algo importante acontece no sistema (ex.: pedido criado), um evento é disparado para quem quiser reagir a ele."
              checked={options.comunicacao.eventosDeDominio}
              onCheckedChange={(v) => setCom("eventosDeDominio", v)}
            />
            <SwitchRow
              id="hex-mensageria"
              label="Mensageria habilitada"
              hint="Eventos de domínio podem ser publicados em filas (Kafka, RabbitMQ) para outros serviços consumirem de forma assíncrona."
              checked={options.comunicacao.mensageriaHabilitada}
              onCheckedChange={(v) => setCom("mensageriaHabilitada", v)}
            />
            <SwitchRow
              id="hex-outbox"
              label="Outbox Pattern"
              hint="Garante que o evento seja publicado na fila apenas após o banco confirmar a gravação, evitando mensagens perdidas em caso de falha."
              checked={options.comunicacao.outboxPattern}
              onCheckedChange={(v) => setCom("outboxPattern", v)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
