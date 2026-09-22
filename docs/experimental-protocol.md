# Protocolo experimental — registro a completar

## Ambiente observado em 22/09/2026

| Item | Valor |
| --- | --- |
| Sistema operacional | Windows 10.0.26200 x64 |
| .NET SDK | 10.0.401 |
| Runtime base .NET 9 | 9.0.16 |
| Runtime ASP.NET Core efetivo | 10.0.12 (roll-forward; ASP.NET Core 9 ausente) |
| Node.js | 24.15.0 |
| npm | 11.12.1 |
| Target framework | net9.0 |

## Congelamento

- branch vulnerável: `benchmark-vulnerable`;
- commit da implementação vulnerável candidata: `b7cd9d682d7b99266287d6deda0c274a8fb0f556`;
- tag imutável: `experiment-001` (`PENDENTE DE APROVAÇÃO`);
- branch segura: `benchmark-secure`;
- commit da implementação segura candidata: `945876fb74d4b94908aa85fa441f7a5bf3e65236`;
- data e versões das ferramentas de análise: `PENDENTE`.

## Checklist antes da publicação

- [x] suíte .NET passa (7 casos);
- [x] suíte web passa (4 casos) e o build Vite conclui;
- [x] smoke test em loopback passa;
- [x] nenhum segredo ou dado pessoal foi identificado;
- [x] nenhuma porta pública ou workflow de deploy foi adicionado;
- [x] licença e lockfiles estão presentes;
- [x] linhas candidatas de `WEB-SC-01` foram registradas;
- [x] suporte efetivo do framework foi reconfirmado em 22/09/2026;
- [ ] disponibilidade dos recursos gratuitos das ferramentas será reconfirmada na medição;
- [ ] hash completo e tag foram registrados após aprovação.
