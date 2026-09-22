# SDD 02 — Arquitetura e fluxo de dados

```text
Navegador React (127.0.0.1:5173)
  │  GET/POST JSON
  ▼
Minimal API (127.0.0.1:5081)
  │
  ▼
NoteStore singleton em memória
```

## Componentes

- `web/src/App.jsx`: estados da tela, formulário, listagem e sink experimental.
- `web/src/api.js`: fronteira HTTP do frontend e URL configurável.
- `src/api/Program.cs`: composição e endpoints HTTP.
- `src/api/Notes.cs`: contratos e armazenamento thread-safe em memória.
- `tests/api.tests`: testes de contrato em servidor ASP.NET Core em memória.

## Fluxo WEB-SC-01

1. O usuário fornece `text` no formulário.
2. `createNote` serializa `{ text }` para `POST /api/notes`.
3. A API valida apenas que o valor não seja vazio e o armazena como texto.
4. `GET /api/notes` devolve o mesmo valor em JSON.
5. Na branch vulnerável, `App.jsx` usa `dangerouslySetInnerHTML` perto do comentário `WEB-SC-01`.
6. A verificação usa apenas `<b>BENCHMARK</b>`, sem execução de script ou acesso externo.

## Fronteiras de segurança

- o serviço é destinado apenas a loopback;
- CORS não concede origens curingas;
- o dado em memória desaparece ao reiniciar;
- o sink inseguro é intencional, único, identificado e não deve ser reutilizado em produção.

