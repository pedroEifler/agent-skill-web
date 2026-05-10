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
  FileText,
  Code2,
  FolderCode,
  PackageOpen,
  ShieldCheck,
  Boxes,
  Info,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface JavaAdvancedOptions {
  documentacao: {
    javadocObrigatorio: boolean
    documentarMetodosPublicos: boolean
    gerarExemplosJavadoc: boolean
    documentarExceptions: boolean
  }
  convencoes: {
    classesPascalCase: boolean
    metodosCamelCase: boolean
    proibirAbreviacoes: boolean
    prefixoInterfaces: boolean
  }
  estruturaCodigo: {
    maxLinhasPorMetodo: string
    maxParametros: string
    maxNiveisIdentacao: string
    permitirMetodosEstaticos: boolean
    permitirClassesUtilitarias: boolean
  }
  imports: {
    proibirWildcard: boolean
    ordenarAutomaticamente: boolean
    separarImportsEstaticos: boolean
  }
  qualidade: {
    responsabilidadeUnica: boolean
    proibirDuplicacao: boolean
    exigirTratamentoExcecoes: boolean
    obrigarOptional: boolean
    evitarNullReturns: boolean
  }
  orientacaoObjetos: {
    preferirComposicao: boolean
    classesFinalsPorPadrao: boolean
    interfacesObrigatoriasServices: boolean
    dtoObrigatorioApis: boolean
  }
}

export const defaultJavaAdvancedOptions: JavaAdvancedOptions = {
  documentacao: {
    javadocObrigatorio: false,
    documentarMetodosPublicos: false,
    gerarExemplosJavadoc: false,
    documentarExceptions: false,
  },
  convencoes: {
    classesPascalCase: true,
    metodosCamelCase: true,
    proibirAbreviacoes: false,
    prefixoInterfaces: false,
  },
  estruturaCodigo: {
    maxLinhasPorMetodo: "30",
    maxParametros: "7",
    maxNiveisIdentacao: "5",
    permitirMetodosEstaticos: true,
    permitirClassesUtilitarias: true,
  },
  imports: {
    proibirWildcard: false,
    ordenarAutomaticamente: false,
    separarImportsEstaticos: false,
  },
  qualidade: {
    responsabilidadeUnica: false,
    proibirDuplicacao: true,
    exigirTratamentoExcecoes: false,
    obrigarOptional: false,
    evitarNullReturns: false,
  },
  orientacaoObjetos: {
    preferirComposicao: false,
    classesFinalsPorPadrao: false,
    interfacesObrigatoriasServices: false,
    dtoObrigatorioApis: false,
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

interface NumberInputRowProps {
  id: string
  label: string
  hint: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function NumberInputRow({
  id,
  label,
  hint,
  value,
  onChange,
  placeholder = "Sem limite",
}: NumberInputRowProps) {
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
      <Input
        id={id}
        type="number"
        min={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-7 w-28 text-right text-sm"
      />
    </div>
  )
}

interface JavaAdvancedOptionsPanelProps {
  options: JavaAdvancedOptions
  onChange: (options: JavaAdvancedOptions) => void
}

export function JavaAdvancedOptionsPanel({
  options,
  onChange,
}: JavaAdvancedOptionsPanelProps) {
  const setDoc = (
    key: keyof JavaAdvancedOptions["documentacao"],
    value: boolean
  ) =>
    onChange({
      ...options,
      documentacao: { ...options.documentacao, [key]: value },
    })

  const setConv = (
    key: keyof JavaAdvancedOptions["convencoes"],
    value: boolean
  ) =>
    onChange({
      ...options,
      convencoes: { ...options.convencoes, [key]: value },
    })

  const setEstrutura = (
    key: keyof JavaAdvancedOptions["estruturaCodigo"],
    value: boolean | string
  ) =>
    onChange({
      ...options,
      estruturaCodigo: { ...options.estruturaCodigo, [key]: value },
    })

  const setImports = (
    key: keyof JavaAdvancedOptions["imports"],
    value: boolean
  ) =>
    onChange({
      ...options,
      imports: { ...options.imports, [key]: value },
    })

  const setQualidade = (
    key: keyof JavaAdvancedOptions["qualidade"],
    value: boolean
  ) =>
    onChange({
      ...options,
      qualidade: { ...options.qualidade, [key]: value },
    })

  const setOO = (
    key: keyof JavaAdvancedOptions["orientacaoObjetos"],
    value: boolean
  ) =>
    onChange({
      ...options,
      orientacaoObjetos: { ...options.orientacaoObjetos, [key]: value },
    })

  return (
    <div className="mt-6 rounded-lg border bg-muted/20 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Opções Avançadas — Java
      </p>

      <Accordion type="multiple" className="space-y-2">
        {/* Documentação */}
        <AccordionItem
          value="documentacao"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Documentação
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="javadoc-obrigatorio"
              label="Usar Javadoc obrigatório"
              hint="Todo método e classe precisa ter um comentário explicativo no padrão Javadoc."
              checked={options.documentacao.javadocObrigatorio}
              onCheckedChange={(v) => setDoc("javadocObrigatorio", v)}
            />
            <SwitchRow
              id="doc-metodos-publicos"
              label="Documentar métodos públicos"
              hint="Métodos visíveis para outros devem ter descrição do que fazem, parâmetros e retorno."
              checked={options.documentacao.documentarMetodosPublicos}
              onCheckedChange={(v) => setDoc("documentarMetodosPublicos", v)}
            />
            <SwitchRow
              id="doc-exemplos-javadoc"
              label="Gerar exemplos no Javadoc"
              hint="Inclui pequenos exemplos de uso diretamente na documentação do método."
              checked={options.documentacao.gerarExemplosJavadoc}
              onCheckedChange={(v) => setDoc("gerarExemplosJavadoc", v)}
            />
            <SwitchRow
              id="doc-exceptions"
              label="Documentar exceptions"
              hint="Registra quais erros o método pode lançar e em que situação isso acontece."
              checked={options.documentacao.documentarExceptions}
              onCheckedChange={(v) => setDoc("documentarExceptions", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Convenções */}
        <AccordionItem
          value="convencoes"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-muted-foreground" />
              Convenções
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="conv-pascal"
              label="Nome de classes em PascalCase"
              hint="Cada palavra do nome começa com letra maiúscula, ex.: MinhaClasse."
              checked={options.convencoes.classesPascalCase}
              onCheckedChange={(v) => setConv("classesPascalCase", v)}
            />
            <SwitchRow
              id="conv-camel"
              label="Nome de métodos em camelCase"
              hint="A primeira palavra em minúsculo e as seguintes com inicial maiúscula, ex.: calcularTotal."
              checked={options.convencoes.metodosCamelCase}
              onCheckedChange={(v) => setConv("metodosCamelCase", v)}
            />
            <SwitchRow
              id="conv-abreviacoes"
              label="Proibir abreviações em variáveis"
              hint="Nomes como 'usr' ou 'cnt' são proibidos; prefira 'usuario' e 'contador'."
              checked={options.convencoes.proibirAbreviacoes}
              onCheckedChange={(v) => setConv("proibirAbreviacoes", v)}
            />
            <SwitchRow
              id="conv-prefixo"
              label="Prefixo obrigatório para interfaces (IUserService)"
              hint="Toda interface deve começar com 'I' para ficar fácil de identificar no código."
              checked={options.convencoes.prefixoInterfaces}
              onCheckedChange={(v) => setConv("prefixoInterfaces", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Estrutura de Código */}
        <AccordionItem
          value="estrutura"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <FolderCode className="h-4 w-4 text-muted-foreground" />
              Estrutura de Código
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <NumberInputRow
              id="max-linhas"
              label="Número máximo de linhas por método"
              hint="Métodos longos são difíceis de entender. Defina um limite para forçar divisão em métodos menores."
              value={options.estruturaCodigo.maxLinhasPorMetodo}
              onChange={(v) => setEstrutura("maxLinhasPorMetodo", v)}
            />
            <NumberInputRow
              id="max-parametros"
              label="Número máximo de parâmetros"
              hint="Muitos parâmetros indicam que o método faz coisas demais. Limite incentiva refatoração."
              value={options.estruturaCodigo.maxParametros}
              onChange={(v) => setEstrutura("maxParametros", v)}
            />
            <NumberInputRow
              id="max-identacao"
              label="Número máximo de níveis de identação"
              hint="Código muito aninhado (if dentro de for dentro de while…) fica ilegível. Limitar evita isso."
              value={options.estruturaCodigo.maxNiveisIdentacao}
              onChange={(v) => setEstrutura("maxNiveisIdentacao", v)}
            />
            <SwitchRow
              id="est-metodos-estaticos"
              label="Permitir métodos estáticos"
              hint="Métodos estáticos pertencem à classe, não ao objeto. Desabilitar incentiva design mais orientado a objetos."
              checked={options.estruturaCodigo.permitirMetodosEstaticos}
              onCheckedChange={(v) => setEstrutura("permitirMetodosEstaticos", v)}
            />
            <SwitchRow
              id="est-classes-utilitarias"
              label="Permitir classes utilitárias"
              hint="Classes como 'StringUtils' só têm métodos estáticos. Desabilitar força o uso de instâncias."
              checked={options.estruturaCodigo.permitirClassesUtilitarias}
              onCheckedChange={(v) =>
                setEstrutura("permitirClassesUtilitarias", v)
              }
            />
          </AccordionContent>
        </AccordionItem>

        {/* Imports */}
        <AccordionItem
          value="imports"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <PackageOpen className="h-4 w-4 text-muted-foreground" />
              Imports
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="imp-wildcard"
              label="Proibir wildcard imports"
              hint="Proíbe 'import java.util.*'. Cada classe importada deve aparecer explicitamente."
              checked={options.imports.proibirWildcard}
              onCheckedChange={(v) => setImports("proibirWildcard", v)}
            />
            <SwitchRow
              id="imp-ordenar"
              label="Ordenar imports automaticamente"
              checked={options.imports.ordenarAutomaticamente}
              hint="Mantém os imports em ordem alfabética para facilitar leitura e evitar conflitos no git."
              onCheckedChange={(v) => setImports("ordenarAutomaticamente", v)}
            />
            <SwitchRow
              id="imp-estaticos"
              label="Separar imports estáticos"
              hint="Coloca imports de membros estáticos (ex.: import static Math.PI) em um bloco separado."
              checked={options.imports.separarImportsEstaticos}
              onCheckedChange={(v) => setImports("separarImportsEstaticos", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Qualidade */}
        <AccordionItem
          value="qualidade"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              Qualidade
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="qual-responsabilidade"
              label="Métodos devem ter responsabilidade única"
              hint="Cada método deve fazer só uma coisa. Se precisar explicar com 'e', provavelmente está fazendo de mais."
              checked={options.qualidade.responsabilidadeUnica}
              onCheckedChange={(v) => setQualidade("responsabilidadeUnica", v)}
            />
            <SwitchRow
              id="qual-duplicacao"
              label="Proibir duplicação de lógica"
              hint="O mesmo trecho de código não deve aparecer em dois lugares. Repita zero, reutilize sempre."
              checked={options.qualidade.proibirDuplicacao}
              onCheckedChange={(v) => setQualidade("proibirDuplicacao", v)}
            />
            <SwitchRow
              id="qual-excecoes"
              label="Exigir tratamento de exceções"
              hint="Erros não podem ser silenciados. Todo catch deve ter uma ação real, não apenas ignorar."
              checked={options.qualidade.exigirTratamentoExcecoes}
              onCheckedChange={(v) =>
                setQualidade("exigirTratamentoExcecoes", v)
              }
            />
            <SwitchRow
              id="qual-optional"
              label="Obrigar uso de Optional"
              hint="Em vez de retornar null, use Optional para deixar explícito que o valor pode não existir."
              checked={options.qualidade.obrigarOptional}
              onCheckedChange={(v) => setQualidade("obrigarOptional", v)}
            />
            <SwitchRow
              id="qual-null"
              label="Evitar null returns"
              hint="Métodos não devem retornar null. Use Optional, listas vazias ou objetos padrão no lugar."
              checked={options.qualidade.evitarNullReturns}
              onCheckedChange={(v) => setQualidade("evitarNullReturns", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Orientação a Objetos */}
        <AccordionItem
          value="oo"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Boxes className="h-4 w-4 text-muted-foreground" />
              Orientação a Objetos
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="oo-composicao"
              label="Preferir composição ao invés de herança"
              hint="Em vez de herdar de uma classe mãe, inclua outros objetos dentro da sua classe."
              checked={options.orientacaoObjetos.preferirComposicao}
              onCheckedChange={(v) => setOO("preferirComposicao", v)}
            />
            <SwitchRow
              id="oo-final"
              label="Classes finais por padrão"
              hint="Classes são bloqueadas para herança por padrão. Assim você permite herança só quando realmente faz sentido."
              checked={options.orientacaoObjetos.classesFinalsPorPadrao}
              onCheckedChange={(v) => setOO("classesFinalsPorPadrao", v)}
            />
            <SwitchRow
              id="oo-interfaces"
              label="Interfaces obrigatórias para services"
              hint="Todo service deve ter uma interface correspondente, facilitando trocar implementações e criar testes."
              checked={options.orientacaoObjetos.interfacesObrigatoriasServices}
              onCheckedChange={(v) =>
                setOO("interfacesObrigatoriasServices", v)
              }
            />
            <SwitchRow
              id="oo-dto"
              label="DTO obrigatório para APIs"
              hint="A API não pode expor a entidade do banco diretamente; deve usar um objeto de transferência (DTO)."
              checked={options.orientacaoObjetos.dtoObrigatorioApis}
              onCheckedChange={(v) => setOO("dtoObrigatorioApis", v)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
