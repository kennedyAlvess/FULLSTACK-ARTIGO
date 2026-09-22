# SDD 00 — Contexto do produto

## Problema

O artigo precisa de um corpus full stack pequeno, reproduzível e público para comparar ferramentas de análise estática com recursos de IA em C# e JavaScript.

## Objetivo

Entregar uma aplicação de notas que torne curto e observável o fluxo entrada do usuário → API → armazenamento em memória → resposta JSON → DOM. A versão experimental contém um único cenário vulnerável controlado, `WEB-SC-01` (CWE-79), e uma referência segura deve diferir somente no sink de renderização.

## Fonte e rastreabilidade

Este contexto deriva de:

- `C:\Users\Usuario\Documents\ARTIGO DEP\Especificações SDD\README.md`;
- `C:\Users\Usuario\Documents\ARTIGO DEP\Especificações SDD\Full-Stack\Especificação - Aplicação full stack.md`.

A implementação local está em `C:\Users\Usuario\Documents\FULLSTACK-ARTIGO`. Alterações de contrato devem atualizar a especificação, os testes e `docs/test-cases.md` no mesmo incremento.

## Restrições

- somente dados sintéticos e armazenamento volátil;
- sem autenticação, banco, Docker, deploy ou serviços externos;
- sem TypeScript;
- somente loopback durante execução;
- nenhum payload executável nos testes ou documentos;
- nenhuma regra específica de fornecedor de análise antes da medição.

## Estado do suporte em 22/09/2026

- alvo experimental: `net9.0`;
- .NET 9 STS suportado pela Microsoft até 11/11/2026;
- Snyk Code lista .NET 6–9 como frameworks suportados;
- a situação deve ser reconfirmada e registrada no commit/tag congelado.

