# Full Stack Notes — corpus para análise estática

Aplicação mínima com API ASP.NET Core e frontend React usada como corpus experimental no artigo sobre ferramentas de análise estática com recursos de IA.

> **Aviso:** a branch `benchmark-vulnerable` contém intencionalmente o cenário DOM XSS `WEB-SC-01` (CWE-79). Ela existe apenas para pesquisa e educação. Não publique, implante ou exponha esta aplicação à rede.

## Escopo

- API ASP.NET Core Minimal API em `net9.0`;
- dados sintéticos em memória;
- frontend React + Vite somente com JavaScript/JSX, HTML e CSS;
- endpoints `GET /health`, `GET /api/notes` e `POST /api/notes`;
- testes xUnit, Vitest e Testing Library;
- API em `127.0.0.1:5081` e frontend em `127.0.0.1:5173`.

O contexto, requisitos, arquitetura, decisões e plano incremental estão em [`docs/sdd`](docs/sdd). Os casos verificáveis estão em [`docs/test-cases.md`](docs/test-cases.md).

## Pré-requisitos registrados

- .NET SDK `10.0.401`, compilando o alvo `net9.0`;
- runtime base .NET `9.0.16`;
- runtime ASP.NET Core `10.0.12` (o projeto usa roll-forward quando ASP.NET Core 9 não está instalado);
- Node.js `24.15.0`;
- npm `11.12.1`.

Em 22/09/2026, o .NET 9 permanece suportado pela Microsoft até 11/11/2026 e é listado como suportado pelo Snyk Code. Essas condições devem ser reconfirmadas no congelamento do experimento.

## Restaurar, compilar e testar

Na raiz do repositório:

```powershell
dotnet restore .\FullStackArticle.sln --use-lock-file
dotnet build .\FullStackArticle.sln --no-restore
dotnet test .\tests\api.tests\Api.Tests.csproj --no-restore

Set-Location .\web
npm ci
npm run build
npm run test -- --run
```

Após restaurar uma vez, as dependências .NET e npm ficam registradas nos lockfiles. Os testes subsequentes podem ser executados sem acesso à internet.

## Executar localmente

Terminal 1, na raiz:

```powershell
dotnet run --project .\src\api\Api.csproj --no-restore --urls http://127.0.0.1:5081
```

Terminal 2, na raiz:

```powershell
Set-Location .\web
npm ci
npm run dev
```

Abra `http://127.0.0.1:5173`. A variável opcional `VITE_API_BASE_URL` está documentada em `web/.env.example`; não versione arquivos `.env` reais.

## Verificação inerte de WEB-SC-01

Na branch vulnerável, adicione exatamente `<b>BENCHMARK</b>`. A lista interpreta apenas essa marcação inerte e mostra o texto em negrito. Não use payload executável, evento HTML, URL externa ou JavaScript hostil.

A branch segura de referência deve alterar somente o sink do componente para interpolação textual do React. A tag `experiment-001` só deve ser criada após revisão e aprovação do commit vulnerável.
