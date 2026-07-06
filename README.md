# Agent Skill Web

> **Projeto Acadêmico** — Trabalho desenvolvido com fins educacionais para explorar a integração entre interfaces web modernas e agentes de inteligência artificial.

---

## 📋 Sobre o Projeto

O **Agent Skill Web** é uma aplicação web que permite ao usuário gerar **skills** (diretrizes técnicas em formato Markdown) personalizadas para guiar agentes de IA — como GitHub Copilot, Cursor ou Claude — a produzir código mais consistente, seguindo a arquitetura e as boas práticas definidas pelo próprio desenvolvedor.

### O que faz?

A aplicação guia o usuário por um wizard em 4 etapas:

1. **Linguagem** — Escolha da linguagem de programação (ex: Java, TypeScript, Python)
2. **Framework** — Seleção do framework adequado à linguagem escolhida (ex: Spring Boot, Next.js, FastAPI)
3. **Arquitetura** — Definição da arquitetura do projeto (ex: MVC, Hexagonal, Clean Architecture)
4. **Design Patterns** — Seleção dos padrões de projeto desejados (ex: Repository, Factory, Observer)

Ao final, o usuário escolhe entre o perfil **Estudante** (explicações didáticas e detalhadas) ou **Profissional** (foco em boas práticas de produção) e gera um arquivo `.zip` contendo um `SKILL.md` pronto para ser importado no agente de IA de sua preferência.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework React com App Router |
| [React 19](https://react.dev/) | Biblioteca para construção da interface |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização utilitária |
| [Radix UI](https://www.radix-ui.com/) | Componentes acessíveis e sem estilo |
| [shadcn/ui](https://ui.shadcn.com/) | Biblioteca de componentes baseada em Radix UI |
| [Lucide React](https://lucide.dev/) | Ícones SVG |
| [React Hook Form](https://react-hook-form.com/) | Gerenciamento de formulários |
| [Zod](https://zod.dev/) | Validação de schemas |
| [JSZip](https://stuk.github.io/jszip/) | Geração de arquivos `.zip` no cliente |
| [React Markdown](https://github.com/remarkjs/react-markdown) | Renderização de Markdown |
| [next-themes](https://github.com/pacocoursey/next-themes) | Suporte a tema claro/escuro |
| [Sonner](https://sonner.emilkowal.ski/) | Notificações toast |

---

## 🖼️ Imagens do Projeto

### Tela de Onboarding
> Apresentação do produto com as instruções de uso e chamada para ação.

<img width="1920" height="1032" alt="Tela inicial 1" src="https://github.com/user-attachments/assets/acee84b6-d480-4614-bc07-03999f5eab33" />

### Wizard — Seleção de Linguagem
> Primeiro passo do wizard: escolha da linguagem de programação.

<img width="1920" height="1032" alt="Linguagens" src="https://github.com/user-attachments/assets/09581c7c-2a78-4e7c-9cce-58bbcaa023ec" />


### Wizard — Seleção de Framework
> Segundo passo: frameworks filtrados dinamicamente pela linguagem escolhida.

<img width="1902" height="904" alt="Framework" src="https://github.com/user-attachments/assets/6f1648b0-b9e0-4691-945e-62ce3ae323c5" />

### Resumo e Geração da Skill
> Tela final com resumo das seleções, escolha do perfil e preview do Markdown gerado.

<img width="1920" height="1032" alt="Resumo" src="https://github.com/user-attachments/assets/b62d2d1c-c50f-4b09-a73a-e5e56cba3a9f" />
<img width="1920" height="1032" alt="Preview" src="https://github.com/user-attachments/assets/09f88504-8bdc-4f8f-aa95-627b7b982c80" />

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [pnpm](https://pnpm.io/) (recomendado) — ou npm/yarn
- API back-end rodando em `http://localhost:8080` (ou configure a variável de ambiente abaixo)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/agent-skill-web.git
cd agent-skill-web

# 2. Instale as dependências
pnpm install
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

> Se a variável não for definida, a aplicação usará `http://localhost:8080` como padrão.

### Executando em Desenvolvimento

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Build de Produção

```bash
# Gerar o build
pnpm build

# Iniciar o servidor de produção
pnpm start
```

### Endpoints Consumidos

A aplicação consome os seguintes endpoints da API:

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/languages` | Lista todas as linguagens disponíveis |
| `GET` | `/api/frameworks` | Lista todos os frameworks |
| `GET` | `/api/frameworks/language/{languageId}` | Lista frameworks por linguagem |
| `GET` | `/api/architectures` | Lista as arquiteturas disponíveis |
| `GET` | `/api/design-patterns` | Lista os design patterns |
| `POST` | `/api/skills/generate` | Gera o conteúdo da skill em Markdown |

---

## 📁 Estrutura de Pastas

```
agent-skill-web/
├── app/                    # App Router do Next.js
│   ├── layout.tsx          # Layout raiz
│   └── page.tsx            # Página principal
├── components/             # Componentes React
│   ├── onboarding.tsx      # Tela de apresentação
│   ├── project-wizard.tsx  # Wizard de configuração
│   ├── summary.tsx         # Tela de resumo e geração
│   ├── option-card.tsx     # Card de opção selecionável
│   ├── step-header.tsx     # Cabeçalho de cada etapa
│   └── ui/                 # Componentes de UI (shadcn)
├── lib/                    # Serviços e utilitários
│   ├── api.ts              # Utilitário base de HTTP
│   ├── language-service.ts # Serviço de linguagens
│   ├── framework-service.ts# Serviço de frameworks
│   ├── architecture-service.ts # Serviço de arquiteturas
│   ├── design-pattern-service.ts # Serviço de design patterns
│   ├── skills-service.ts   # Serviço de geração de skills
│   └── types.ts            # Tipos compartilhados
└── public/                 # Arquivos estáticos
```

---
