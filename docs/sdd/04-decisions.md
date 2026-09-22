# SDD 04 — Registro de decisões

## ADR-001 — Manter o alvo net9.0

**Status:** aceita para o corpus inicial em 22/09/2026.

**Decisão:** compilar com SDK 10.0.401, apontar os projetos para `net9.0` e permitir roll-forward de runtime para a próxima versão principal quando ASP.NET Core 9 não estiver instalado.

**Motivo:** preserva a comparabilidade definida pela especificação e permanece dentro do suporte Microsoft e da faixa declarada pelo Snyk Code nesta data.

**Consequência:** reconfirmar antes do congelamento, porque o suporte Microsoft termina em 11/11/2026. Neste ambiente, a execução usa ASP.NET Core 10.0.12; em um host com ASP.NET Core 9, o runtime correspondente ao alvo continua preferido.

## ADR-002 — Armazenamento em memória

**Status:** aceita.

**Decisão:** usar um singleton thread-safe inicializado com uma nota sintética.

**Motivo:** mantém o fluxo de dados curto e elimina infraestrutura irrelevante para a análise.

## ADR-003 — Sink vulnerável explícito

**Status:** aceita somente na branch experimental.

**Decisão:** usar `dangerouslySetInnerHTML` diretamente com `note.text`, identificado por `WEB-SC-01`.

**Motivo:** cria uma fonte–fluxo–sink pequena e reconhecível por ferramentas. A verificação automatizada usa apenas HTML inerte.

## ADR-004 — Dependências mínimas e fixadas

**Status:** aceita.

**Decisão:** usar versões exatas no NuGet e npm e versionar `packages.lock.json` e `package-lock.json`.

**Motivo:** melhora a reprodutibilidade entre as execuções experimentais.
