# Como alterar este repositório — regra dos 2

> Decisão do dono em **03/11/2026**: **nenhuma alteração entra com uma pessoa só.**
> Vale para Murilo, Lucas e Ygor; vale para agente também.

## 1. Regra

1. **`main` é protegida**: ninguém dá push direto — nem admin, nem sócio, nem agente.
2. Toda mudança nasce em **branch** (`feat/…`, `fix/…`, `versao/…`) e entra por **Pull Request**.
3. O PR precisa de **1 aprovação de outra pessoa** (autor ≠ aprovador direto).
4. O revisor obrigatório de cada área está no `.github/CODEOWNERS`.
5. **Agente pode preparar** branch, commit, PR, provas e texto — **nunca aprovar** nem fazer merge sozinho.
6. Merge só com: aprovação, conversa resolvida e checagem de hash/prova anexada.
7. **Tag/release só a partir da `main`** — com `VERSION`, `CHANGELOG.md` e o SHA256 do artefato.
8. Emergência **não** é exceção: se a `main` quebrar, o conserto também é PR (revert ou fix).

## 2. Fluxo de uma mudança

```powershell
git switch -c fix/descricao-curta
# editar
git add -A
git commit -m "fix: descricao curta (prova: arquivo/linha)"
git push -u origin fix/descricao-curta
gh pr create --fill --base main
```

O segundo sócio revisa, comenta e aprova. Depois do merge:

```powershell
git switch main
git pull
```

## 3. Fluxo de versão (upgrade)

1. Atualizar o template/config e gerar `site/mesa-em-l-cliente.html` (`tools/gerar-visualizador.mjs`).
2. Conferir bytes e SHA256 do arquivo gerado.
3. Atualizar `VERSION` e `CHANGELOG.md` com: versão, data, bytes, SHA256, o que mudou e o que ficou pendente.
4. PR `versao/x.y.z` → 1 aprovação → merge.
5. Tag anotada: `git tag -a vX.Y.Z -m "..." && git push origin vX.Y.Z`.
6. Publicar é **gate do dono** (ver `PUBLICAR.md`).

## 4. O que o revisor confere

- [ ] o link abre em 390 px e 1440 px, sem overflow e sem erro de console;
- [ ] o preço e o selo não mudaram sem parecer do financeiro;
- [ ] as medidas/dados técnicos não mudaram sem o marceneiro;
- [ ] o hash no CHANGELOG é o hash do arquivo do commit;
- [ ] `node tools/gerar-visualizador.mjs --config visualizadores/mesa-em-l.json --check` passa;
- [ ] nada de custo/margem/JORNADA entrou no repo público (o config usa `publico: true`);
- [ ] o preset de cliente não expõe dado de outro cliente.

## 5. Quem é quem

| Pessoa | GitHub | Dono de |
|---|---|---|
| Murilo | `@QuietoCodando` | repo, versão, publicação, preço final |
| Lucas | `@birigjow` | página do cliente, links fixos, Pages |
| Ygor | `@Paspalho-create` | gerador do visualizador, template, deploy técnico |

Qualquer **dupla** entre os três fecha a regra. Se um dos três não puder revisar, a mudança espera — não entra com um só.
