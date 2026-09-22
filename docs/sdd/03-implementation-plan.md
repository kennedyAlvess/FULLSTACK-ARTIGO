# SDD 03 — Plano incremental

## Incremento 1 — Fundação e contexto

- criar solução, estrutura, licença, ignore e contexto SDD;
- registrar versões e decisão de alvo;
- resultado: estrutura navegável e requisitos rastreáveis.

## Incremento 2 — API e contrato

- implementar armazenamento em memória e os três endpoints;
- restringir CORS à origem local;
- adicionar quatro cenários de teste xUnit e lockfiles;
- resultado: contrato executável e verificável sem frontend.

## Incremento 3 — Frontend e cenário experimental

- implementar tela, estados e cliente HTTP;
- identificar o sink `WEB-SC-01`;
- adicionar testes de UI, inclusive a entrada inerte;
- resultado: fluxo ponta a ponta pronto para smoke test local.

## Incremento 4 — Congelamento experimental

- revisar segredos, portas, dependências, licença e linhas do cenário;
- executar todos os testes e smoke tests;
- criar/confirmar branch `benchmark-vulnerable`;
- após aprovação, criar a tag imutável `experiment-001` e registrar o hash.

## Incremento 5 — Referência segura

- criar `benchmark-secure` a partir do commit vulnerável;
- substituir somente o sink por `{note.text}`;
- adaptar o teste para confirmar texto literal e ausência de elemento `b`;
- repetir a suíte e registrar o hash de referência.

