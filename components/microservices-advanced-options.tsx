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
  Network,
  Eye,
  Server,
  Database,
  Info,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface MicroservicesAdvancedOptions {
  comunicacao: {
    rest: boolean
    grpc: boolean
    kafka: boolean
    rabbitmq: boolean
  }
  observabilidade: {
    distributedTracing: boolean
    openTelemetry: boolean
    prometheusMetrics: boolean
  }
  infraestrutura: {
    dockerObrigatorio: boolean
    kubernetes: boolean
    apiGateway: boolean
    serviceDiscovery: boolean
  }
  banco: {
    databasePorServico: boolean
    eventSourcing: boolean
    cqrs: boolean
  }
}

export const defaultMicroservicesAdvancedOptions: MicroservicesAdvancedOptions = {
  comunicacao: {
    rest: true,
    grpc: false,
    kafka: false,
    rabbitmq: false,
  },
  observabilidade: {
    distributedTracing: false,
    openTelemetry: false,
    prometheusMetrics: false,
  },
  infraestrutura: {
    dockerObrigatorio: false,
    kubernetes: false,
    apiGateway: false,
    serviceDiscovery: false,
  },
  banco: {
    databasePorServico: false,
    eventSourcing: false,
    cqrs: false,
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

interface MicroservicesAdvancedOptionsPanelProps {
  options: MicroservicesAdvancedOptions
  onChange: (options: MicroservicesAdvancedOptions) => void
}

export function MicroservicesAdvancedOptionsPanel({
  options,
  onChange,
}: MicroservicesAdvancedOptionsPanelProps) {
  const setCom = (key: keyof MicroservicesAdvancedOptions["comunicacao"], value: boolean) =>
    onChange({ ...options, comunicacao: { ...options.comunicacao, [key]: value } })

  const setObs = (key: keyof MicroservicesAdvancedOptions["observabilidade"], value: boolean) =>
    onChange({ ...options, observabilidade: { ...options.observabilidade, [key]: value } })

  const setInfra = (key: keyof MicroservicesAdvancedOptions["infraestrutura"], value: boolean) =>
    onChange({ ...options, infraestrutura: { ...options.infraestrutura, [key]: value } })

  const setBanco = (key: keyof MicroservicesAdvancedOptions["banco"], value: boolean) =>
    onChange({ ...options, banco: { ...options.banco, [key]: value } })

  return (
    <div className="mt-6 rounded-lg border bg-muted/20 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Opções Avançadas — Microserviços
      </p>

      <Accordion type="multiple" className="space-y-2">
        {/* Comunicação */}
        <AccordionItem
          value="comunicacao"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-muted-foreground" />
              Comunicação
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="ms-rest"
              label="REST"
              hint="Os serviços se comunicam via HTTP com JSON. É o padrão mais simples e amplamente suportado."
              checked={options.comunicacao.rest}
              onCheckedChange={(v) => setCom("rest", v)}
            />
            <SwitchRow
              id="ms-grpc"
              label="gRPC"
              hint="Comunicação binária de alta performance entre serviços, ideal quando velocidade e eficiência são prioridade."
              checked={options.comunicacao.grpc}
              onCheckedChange={(v) => setCom("grpc", v)}
            />
            <SwitchRow
              id="ms-kafka"
              label="Kafka"
              hint="Mensageria assíncrona de alta vazão. Serviços publicam e consomem eventos sem precisar se conhecer diretamente."
              checked={options.comunicacao.kafka}
              onCheckedChange={(v) => setCom("kafka", v)}
            />
            <SwitchRow
              id="ms-rabbitmq"
              label="RabbitMQ"
              hint="Fila de mensagens para comunicação assíncrona entre serviços. Mais simples que Kafka para fluxos de trabalho tradicionais."
              checked={options.comunicacao.rabbitmq}
              onCheckedChange={(v) => setCom("rabbitmq", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Observabilidade */}
        <AccordionItem
          value="observabilidade"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              Observabilidade
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="ms-tracing"
              label="Distributed tracing"
              hint="Rastreia uma requisição enquanto ela passa por vários serviços, mostrando onde está o gargalo ou o erro."
              checked={options.observabilidade.distributedTracing}
              onCheckedChange={(v) => setObs("distributedTracing", v)}
            />
            <SwitchRow
              id="ms-otel"
              label="OpenTelemetry"
              hint="Padrão aberto para coletar logs, métricas e rastreamentos de todos os serviços em um único lugar."
              checked={options.observabilidade.openTelemetry}
              onCheckedChange={(v) => setObs("openTelemetry", v)}
            />
            <SwitchRow
              id="ms-prometheus"
              label="Prometheus metrics"
              hint="Cada serviço expõe um endpoint de métricas que o Prometheus coleta periodicamente para monitorar saúde e desempenho."
              checked={options.observabilidade.prometheusMetrics}
              onCheckedChange={(v) => setObs("prometheusMetrics", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Infraestrutura */}
        <AccordionItem
          value="infraestrutura"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-muted-foreground" />
              Infraestrutura
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="ms-docker"
              label="Docker obrigatório"
              hint="Cada serviço roda dentro de um container Docker, garantindo que funciona igual em qualquer ambiente."
              checked={options.infraestrutura.dockerObrigatorio}
              onCheckedChange={(v) => setInfra("dockerObrigatorio", v)}
            />
            <SwitchRow
              id="ms-k8s"
              label="Kubernetes"
              hint="Orquestra os containers automaticamente: escala, reinicia e distribui os serviços sem intervenção manual."
              checked={options.infraestrutura.kubernetes}
              onCheckedChange={(v) => setInfra("kubernetes", v)}
            />
            <SwitchRow
              id="ms-gateway"
              label="API Gateway"
              hint="Ponto único de entrada para todos os serviços. Centraliza autenticação, roteamento e rate limiting."
              checked={options.infraestrutura.apiGateway}
              onCheckedChange={(v) => setInfra("apiGateway", v)}
            />
            <SwitchRow
              id="ms-discovery"
              label="Service discovery"
              hint="Os serviços se encontram automaticamente pelo nome, sem precisar saber o endereço IP de cada um."
              checked={options.infraestrutura.serviceDiscovery}
              onCheckedChange={(v) => setInfra("serviceDiscovery", v)}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Banco */}
        <AccordionItem
          value="banco"
          className="rounded-md border bg-background px-4 last:border-b"
        >
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              Banco
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <SwitchRow
              id="ms-db-por-servico"
              label="Database por serviço"
              hint="Cada serviço tem seu próprio banco de dados, isolando os dados e evitando que um serviço quebre o outro."
              checked={options.banco.databasePorServico}
              onCheckedChange={(v) => setBanco("databasePorServico", v)}
            />
            <SwitchRow
              id="ms-event-sourcing"
              label="Event sourcing"
              hint="Em vez de salvar o estado atual, salva todos os eventos que aconteceram. Permite reconstruir qualquer estado passado."
              checked={options.banco.eventSourcing}
              onCheckedChange={(v) => setBanco("eventSourcing", v)}
            />
            <SwitchRow
              id="ms-cqrs"
              label="CQRS"
              hint="Separa as operações de leitura e escrita em modelos distintos, permitindo otimizar cada uma de forma independente."
              checked={options.banco.cqrs}
              onCheckedChange={(v) => setBanco("cqrs", v)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
