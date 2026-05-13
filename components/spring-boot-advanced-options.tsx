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
  LayoutList,
  Layers,
  Database,
  ShieldCheck,
  ScrollText,
  Settings2,
  Info,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface SpringBootAdvancedOptions {
  controllers: {
    retornoPadronizado: boolean
    versionamentoEndpoints: boolean
    swaggerHabilitado: boolean
    paginacaoObrigatoria: boolean
  }
  services: {
    servicesInterfaces: boolean
    implementacoesServiceImpl: boolean
    transactionsObrigatorias: boolean
    metodosAssincronos: boolean
  }
  repository: {
    springDataJpa: boolean
    queriesNativas: boolean
    specificationPattern: boolean
    softDelete: boolean
  }
  seguranca: {
    jwtObrigatorio: boolean
    springSecurity: boolean
    oauth2: boolean
    corsAutomatico: boolean
  }
}

export const defaultSpringBootAdvancedOptions: SpringBootAdvancedOptions = {
  controllers: {
    retornoPadronizado: false,
    versionamentoEndpoints: false,
    swaggerHabilitado: true,
    paginacaoObrigatoria: false,
  },
  services: {
    servicesInterfaces: false,
    implementacoesServiceImpl: false,
    transactionsObrigatorias: false,
    metodosAssincronos: false,
  },
  repository: {
    springDataJpa: true,
    queriesNativas: false,
    specificationPattern: false,
    softDelete: false,
  },
  seguranca: {
    jwtObrigatorio: false,
    springSecurity: false,
    oauth2: false,
    corsAutomatico: false,
  }
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

interface SpringBootAdvancedOptionsPanelProps {
  options: SpringBootAdvancedOptions
  onChange: (options: SpringBootAdvancedOptions) => void
}

export function SpringBootAdvancedOptionsPanel({
  options,
  onChange,
}: SpringBootAdvancedOptionsPanelProps) {
  const setCtrl = (key: keyof SpringBootAdvancedOptions["controllers"], value: boolean) =>
    onChange({ ...options, controllers: { ...options.controllers, [key]: value } })

  const setSvc = (key: keyof SpringBootAdvancedOptions["services"], value: boolean) =>
    onChange({ ...options, services: { ...options.services, [key]: value } })

  const setRepo = (key: keyof SpringBootAdvancedOptions["repository"], value: boolean) =>
    onChange({ ...options, repository: { ...options.repository, [key]: value } })

  const setSeg = (key: keyof SpringBootAdvancedOptions["seguranca"], value: boolean) =>
    onChange({ ...options, seguranca: { ...options.seguranca, [key]: value } })

  return (
    <div className="mt-6 rounded-lg border bg-muted/20 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Opções Avançadas — Spring Boot
      </p>

      <Accordion type="multiple" className="space-y-2">
        {/* Controllers */}
        <AccordionItem
          value="controllers"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <LayoutList className="h-4 w-4 text-muted-foreground" />
              Controllers
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="sb-retorno-padronizado"
              label="Retorno padronizado da API"
              hint="Todas as respostas seguem a mesma estrutura (ex.: { data, message, status }), facilitando o consumo pelo front-end."
              checked={options.controllers.retornoPadronizado}
              onCheckedChange={(v) => setCtrl("retornoPadronizado", v)}
            />
            <SwitchRow
              id="sb-versionamento"
              label="Versionamento de endpoints"
              hint="As rotas incluem a versão da API (ex.: /api/v1/usuarios), permitindo evoluir sem quebrar quem já usa a versão anterior."
              checked={options.controllers.versionamentoEndpoints}
              onCheckedChange={(v) => setCtrl("versionamentoEndpoints", v)}
            />
            <SwitchRow
              id="sb-swagger"
              label="Swagger habilitado"
              hint="Gera automaticamente uma página de documentação interativa onde qualquer um pode ver e testar os endpoints da API."
              checked={options.controllers.swaggerHabilitado}
              onCheckedChange={(v) => setCtrl("swaggerHabilitado", v)}
            />
            <SwitchRow
              id="sb-paginacao"
              label="Paginação obrigatória"
              hint="Listagens não podem retornar todos os registros de uma vez. Obriga o uso de página e tamanho para evitar sobrecarga."
              checked={options.controllers.paginacaoObrigatoria}
              onCheckedChange={(v) => setCtrl("paginacaoObrigatoria", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Services */}
        <AccordionItem
          value="services"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              Services
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="sb-svc-interfaces"
              label="Services devem ser interfaces"
              hint="A regra de negócio é definida por uma interface, não pela classe diretamente. Facilita trocar a implementação sem afetar o resto."
              checked={options.services.servicesInterfaces}
              onCheckedChange={(v) => setSvc("servicesInterfaces", v)}
            />
            <SwitchRow
              id="sb-svc-impl"
              label="Implementações em ServiceImpl"
              hint="A classe que implementa o service recebe o sufixo 'Impl' (ex.: UserServiceImpl), deixando clara a separação de contrato e código."
              checked={options.services.implementacoesServiceImpl}
              onCheckedChange={(v) => setSvc("implementacoesServiceImpl", v)}
            />
            <SwitchRow
              id="sb-transactions"
              label="Transactions obrigatórias"
              hint="Operações no banco de dados são sempre executadas dentro de uma transação, garantindo que tudo salva junto ou nada salva."
              checked={options.services.transactionsObrigatorias}
              onCheckedChange={(v) => setSvc("transactionsObrigatorias", v)}
            />
            <SwitchRow
              id="sb-assincronos"
              label="Métodos assíncronos permitidos"
              hint="Permite que métodos rodem em segundo plano com @Async, liberando a resposta ao usuário sem esperar a tarefa terminar."
              checked={options.services.metodosAssincronos}
              onCheckedChange={(v) => setSvc("metodosAssincronos", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Repository */}
        <AccordionItem
          value="repository"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              Repository
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="sb-jpa"
              label="Usar Spring Data JPA"
              hint="O acesso ao banco é feito através do JPA, que converte objetos Java em tabelas automaticamente sem escrever SQL manual."
              checked={options.repository.springDataJpa}
              onCheckedChange={(v) => setRepo("springDataJpa", v)}
            />
            <SwitchRow
              id="sb-queries-nativas"
              label="Queries nativas permitidas"
              hint="Permite escrever SQL puro quando o JPA não consegue fazer uma consulta eficiente para casos complexos."
              checked={options.repository.queriesNativas}
              onCheckedChange={(v) => setRepo("queriesNativas", v)}
            />
            <SwitchRow
              id="sb-specification"
              label="Specification Pattern habilitado"
              hint="Permite montar filtros de busca dinâmicos de forma reutilizável, sem criar um método diferente pra cada combinação de filtro."
              checked={options.repository.specificationPattern}
              onCheckedChange={(v) => setRepo("specificationPattern", v)}
            />
            <SwitchRow
              id="sb-soft-delete"
              label="Soft delete obrigatório"
              hint="Registros nunca são apagados de verdade: apenas marcados como deletados. Permite recuperar dados excluídos por engano."
              checked={options.repository.softDelete}
              onCheckedChange={(v) => setRepo("softDelete", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Segurança */}
        <AccordionItem
          value="seguranca"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              Segurança
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="sb-jwt"
              label="JWT obrigatório"
              hint="A autenticação usa tokens JWT: o usuário faz login uma vez e recebe um token que prova sua identidade em cada requisição."
              checked={options.seguranca.jwtObrigatorio}
              onCheckedChange={(v) => setSeg("jwtObrigatorio", v)}
            />
            <SwitchRow
              id="sb-spring-security"
              label="Spring Security habilitado"
              hint="Ativa o módulo oficial de segurança do Spring, que controla quem pode acessar cada parte da aplicação."
              checked={options.seguranca.springSecurity}
              onCheckedChange={(v) => setSeg("springSecurity", v)}
            />
            <SwitchRow
              id="sb-oauth2"
              label="OAuth2 habilitado"
              hint="Permite login via provedores externos (Google, GitHub etc.), sem precisar gerenciar senha do usuário diretamente."
              checked={options.seguranca.oauth2}
              onCheckedChange={(v) => setSeg("oauth2", v)}
            />
            <SwitchRow
              id="sb-cors"
              label="CORS configurado automaticamente"
              hint="Define quais domínios externos podem chamar a API, evitando que o navegador bloqueie requisições do front-end."
              checked={options.seguranca.corsAutomatico}
              onCheckedChange={(v) => setSeg("corsAutomatico", v)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
