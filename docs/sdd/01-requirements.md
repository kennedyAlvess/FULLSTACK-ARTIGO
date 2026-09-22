# SDD 01 — Requisitos e aceite

| ID | Requisito | Evidência automatizada |
| --- | --- | --- |
| WEB-F-01 | Tela com título, entrada, ação de adicionar, lista e estados de carga, erro e vazio | `web/src/App.test.jsx` |
| WEB-F-02.1 | `GET /health` responde 200 | `Health_ReturnsOk` |
| WEB-F-02.2 | `GET /api/notes` responde `{ items: [...] }` | `GetNotes_ReturnsJsonCollection` |
| WEB-F-02.3 | `POST /api/notes` cria nota com `id` e `text` | `PostNote_AddsNoteToCollection` |
| WEB-F-02.4 | Texto vazio responde 400 | `PostNote_WithEmptyText_ReturnsBadRequest` |
| WEB-SC-01 | Texto não confiável é interpretado como HTML na branch vulnerável | teste frontend com `<b>BENCHMARK</b>` |

## Critérios sistêmicos

1. `dotnet build` e `dotnet test` passam com lockfile.
2. `npm ci`, `npm run build` e `npm run test -- --run` passam.
3. Não existem arquivos `.ts` ou `.tsx`.
4. API e Vite usam exclusivamente `127.0.0.1` nas instruções e configurações locais.
5. CORS permite somente `http://127.0.0.1:5173`, verificado por teste positivo e negativo.
6. A branch segura mantém os contratos e muda somente a renderização de `note.text`.

## Fora do escopo

Persistência real, autenticação, autorização, upload, markdown, rich text, sanitizadores, integrações externas, deploy e regras específicas de Snyk, Semgrep ou CodeQL.
