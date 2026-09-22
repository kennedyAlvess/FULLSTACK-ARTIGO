# Casos de teste do benchmark

## Matriz

| Caso | CWE | Origem | Fluxo | Sink | Resultado vulnerável | Resultado seguro |
| --- | --- | --- | --- | --- | --- | --- |
| WEB-SC-01 | CWE-79 | campo `text` em `web/src/App.jsx` | `POST /api/notes` → `NoteStore` → `GET /api/notes` | `dangerouslySetInnerHTML` em `web/src/App.jsx` | `<b>BENCHMARK</b>` cria um elemento `b` | o texto completo aparece literalmente, sem elemento `b` |

Os números de linha devem ser registrados aqui somente depois do congelamento, porque mudam durante a implementação. Arquivos e IDs não devem mudar sem atualizar a especificação.

Localização candidata ao congelamento: fonte e estado em `web/src/App.jsx`; sink identificado nas linhas 86–87; verificação automatizada iniciada na linha 47 de `web/src/App.test.jsx`. Revalidar os números imediatamente antes de criar a tag.

## Procedimento automatizado

1. Execute `dotnet test .\tests\api.tests\Api.Tests.csproj --no-restore`.
2. Em `web`, execute `npm run test -- --run`.
3. O teste `interpreta a marcação inerte no cenário vulnerável WEB-SC-01` deve passar na branch vulnerável.
4. Na branch segura, substitua a asserção por texto literal e confirme que não existe um elemento `b`.

## Procedimento manual inerte

1. Inicie API e frontend somente em loopback conforme o README.
2. Cadastre `<b>BENCHMARK</b>`.
3. Na branch vulnerável, confirme visualmente o negrito.
4. Não use JavaScript, manipuladores de evento, URLs externas ou qualquer payload executável.
