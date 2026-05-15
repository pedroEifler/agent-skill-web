"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  LayoutList,
  Layers,
  Database,
  Monitor,
  FolderOpen,
  Info,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface MvcAdvancedOptions {
  controller: {
    maximoLinhasPorController: number | ""
    maximoEndpointsPorController: number | ""
  }
  service: {
    interfaceParaServices: boolean
    serviceImplSeparado: boolean
    umServicePorDominio: boolean
  }
  repository: {
    genericRepositoryPermitido: boolean
    softDelete: boolean
    paginacaoObrigatoria: boolean
  }
  view: {
    viewModelObrigatorio: boolean
    templatesReutilizaveis: boolean
    componentizacaoDeViews: boolean
    layoutMaster: boolean
  }
  organizacao: {
    porFeature: boolean
    porCamada: boolean
    modularMvc: boolean
    sharedModule: boolean
  }
}

export const defaultMvcAdvancedOptions: MvcAdvancedOptions = {
  controller: {
    maximoLinhasPorController: "",
    maximoEndpointsPorController: "",
  },
  service: {
    interfaceParaServices: false,
    serviceImplSeparado: false,
    umServicePorDominio: true,
  },
  repository: {
    genericRepositoryPermitido: false,
    softDelete: false,
    paginacaoObrigatoria: false,
  },
  view: {
    viewModelObrigatorio: true,
    templatesReutilizaveis: false,
    componentizacaoDeViews: false,
    layoutMaster: false,
  },
  organizacao: {
    porFeature: false,
    porCamada: true,
    modularMvc: false,
    sharedModule: false,
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
        <Label htmlFor={id} className="cursor-pointer text-sm font-normal leading-snug">
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

interface NumberRowProps {
  id: string
  label: string
  hint: string
  value: number | ""
  onChange: (value: number | "") => void
}

function NumberRow({ id, label, hint, value, onChange }: NumberRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-0.5">
      <div className="flex items-center gap-1.5">
        <Label htmlFor={id} className="cursor-pointer text-sm font-normal leading-snug">
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
      <Input
        id={id}
        type="number"
        min={1}
        placeholder="Sem limite"
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        className="h-8 w-28 text-right text-sm"
      />
    </div>
  )
}

interface MvcAdvancedOptionsPanelProps {
  options: MvcAdvancedOptions
  onChange: (options: MvcAdvancedOptions) => void
}

export function MvcAdvancedOptionsPanel({ options, onChange }: MvcAdvancedOptionsPanelProps) {
  const setCtrl = <K extends keyof MvcAdvancedOptions["controller"]>(
    key: K,
    value: MvcAdvancedOptions["controller"][K]
  ) => onChange({ ...options, controller: { ...options.controller, [key]: value } })

  const setSvc = (key: keyof MvcAdvancedOptions["service"], value: boolean) =>
    onChange({ ...options, service: { ...options.service, [key]: value } })

  const setRepo = (key: keyof MvcAdvancedOptions["repository"], value: boolean) =>
    onChange({ ...options, repository: { ...options.repository, [key]: value } })

  const setView = (key: keyof MvcAdvancedOptions["view"], value: boolean) =>
    onChange({ ...options, view: { ...options.view, [key]: value } })

  const setOrg = (key: keyof MvcAdvancedOptions["organizacao"], value: boolean) =>
    onChange({ ...options, organizacao: { ...options.organizacao, [key]: value } })

  return (
    <div className="mt-6 rounded-lg border bg-muted/20 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Opções Avançadas — MVC
      </p>

      <Accordion type="multiple" className="space-y-2">
        {/* Controller */}
        <AccordionItem value="controller" className="rounded-md border bg-background px-4 last:border-b">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <LayoutList className="h-4 w-4 text-muted-foreground" />
              Controller
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <NumberRow
              id="mvc-max-linhas"
              label="Máximo linhas por controller"
              hint="Define um limite de linhas por arquivo de controller, incentivando controllers enxutos e bem divididos por responsabilidade."
              value={options.controller.maximoLinhasPorController}
              onChange={(v) => setCtrl("maximoLinhasPorController", v)}
            />
            <NumberRow
              id="mvc-max-endpoints"
              label="Máximo endpoints por controller"
              hint="Limita o número de rotas em um único controller, evitando que ele acumule responsabilidades de múltiplos recursos."
              value={options.controller.maximoEndpointsPorController}
              onChange={(v) => setCtrl("maximoEndpointsPorController", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Service */}
        <AccordionItem value="service" className="rounded-md border bg-background px-4 last:border-b">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              Service
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="mvc-svc-interface"
              label="Interface para services"
              hint="Exige que cada service seja definido por uma interface, desacoplando o contrato da implementação concreta."
              checked={options.service.interfaceParaServices}
              onCheckedChange={(v) => setSvc("interfaceParaServices", v)}
            />
            <SwitchRow
              id="mvc-svc-impl"
              label="ServiceImpl separado"
              hint="A classe concreta do service recebe o sufixo 'Impl', separando claramente a interface da implementação."
              checked={options.service.serviceImplSeparado}
              onCheckedChange={(v) => setSvc("serviceImplSeparado", v)}
            />
            <SwitchRow
              id="mvc-svc-dominio"
              label="Um service por domínio"
              hint="Cada entidade ou agregado de domínio possui seu próprio service, evitando serviços genéricos que acumulam responsabilidades."
              checked={options.service.umServicePorDominio}
              onCheckedChange={(v) => setSvc("umServicePorDominio", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Repository */}
        <AccordionItem value="repository" className="rounded-md border bg-background px-4 last:border-b">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              Repository
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="mvc-repo-generic"
              label="Generic repository permitido"
              hint="Permite o uso de um repositório genérico reutilizável com operações CRUD comuns, evitando repetição de código."
              checked={options.repository.genericRepositoryPermitido}
              onCheckedChange={(v) => setRepo("genericRepositoryPermitido", v)}
            />
            <SwitchRow
              id="mvc-repo-soft-delete"
              label="Soft delete"
              hint="Registros não são deletados fisicamente: apenas marcados como inativos, permitindo recuperação e rastreabilidade."
              checked={options.repository.softDelete}
              onCheckedChange={(v) => setRepo("softDelete", v)}
            />
            <SwitchRow
              id="mvc-repo-paginacao"
              label="Paginação obrigatória"
              hint="Consultas de listagem sempre requerem parâmetros de paginação, protegendo a aplicação de retornar volumes excessivos de dados."
              checked={options.repository.paginacaoObrigatoria}
              onCheckedChange={(v) => setRepo("paginacaoObrigatoria", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* View */}
        <AccordionItem value="view" className="rounded-md border bg-background px-4 last:border-b">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              View
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="mvc-view-viewmodel"
              label="ViewModel obrigatório"
              hint="A view nunca recebe a entidade diretamente. Um ViewModel é criado para expor somente os dados necessários para a tela."
              checked={options.view.viewModelObrigatorio}
              onCheckedChange={(v) => setView("viewModelObrigatorio", v)}
            />
            <SwitchRow
              id="mvc-view-templates"
              label="Templates reutilizáveis"
              hint="Partes comuns das telas (cabeçalho, rodapé, alertas) são extraídas em templates parciais reutilizáveis por outras views."
              checked={options.view.templatesReutilizaveis}
              onCheckedChange={(v) => setView("templatesReutilizaveis", v)}
            />
            <SwitchRow
              id="mvc-view-componentes"
              label="Componentização de views"
              hint="A interface é dividida em componentes visuais independentes e reutilizáveis, facilitando manutenção e consistência de UI."
              checked={options.view.componentizacaoDeViews}
              onCheckedChange={(v) => setView("componentizacaoDeViews", v)}
            />
            <SwitchRow
              id="mvc-view-layout"
              label="Layout master"
              hint="Todas as telas herdam de um layout master que define a estrutura base da aplicação, evitando duplicação de HTML."
              checked={options.view.layoutMaster}
              onCheckedChange={(v) => setView("layoutMaster", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Organização de Projeto */}
        <AccordionItem value="organizacao" className="rounded-md border bg-background px-4 last:border-b">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              Organização de Projeto
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="mvc-org-feature"
              label="Organização por feature"
              hint="Os arquivos são agrupados por funcionalidade (ex.: /pedidos contém o controller, service e repository de pedidos juntos)."
              checked={options.organizacao.porFeature}
              onCheckedChange={(v) => setOrg("porFeature", v)}
            />
            <SwitchRow
              id="mvc-org-camada"
              label="Organização por camada"
              hint="Os arquivos são agrupados por tipo (ex.: /controllers, /services, /repositories), seguindo a estrutura clássica do MVC."
              checked={options.organizacao.porCamada}
              onCheckedChange={(v) => setOrg("porCamada", v)}
            />
            <SwitchRow
              id="mvc-org-modular"
              label="Modular MVC"
              hint="O projeto é dividido em módulos independentes, cada um com seu próprio conjunto de controller, service e view."
              checked={options.organizacao.modularMvc}
              onCheckedChange={(v) => setOrg("modularMvc", v)}
            />
            <SwitchRow
              id="mvc-org-shared"
              label="Shared module"
              hint="Um módulo compartilhado centraliza componentes, utilitários e serviços comuns utilizados por todos os outros módulos."
              checked={options.organizacao.sharedModule}
              onCheckedChange={(v) => setOrg("sharedModule", v)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

