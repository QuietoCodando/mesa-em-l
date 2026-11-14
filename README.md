# Mesa em L — vista de cliente (CaosTF)

> **Status:** repo canônico criado em 03/11/2026 · versão **3.3.1** (ver `VERSION`)
> **Dono:** Murilo ([@QuietoCodando](https://github.com/QuietoCodando))
> **Sócios com escrita:** Lucas ([@birigjow](https://github.com/birigjow)) e Ygor ([@Paspalho-create](https://github.com/Paspalho-create))
> **Regra da casa:** toda alteração passa por **PR + 1 aprovação de outra pessoa** — ver `CONTRIBUTING.md`.

Página pública de proposta e orçamento de móveis sob medida da **Caos Tábua e Filamentos**.
O cliente abre o link, ajusta medidas/furos/acabamento e vê o valor de referência; o link fixo de cada cliente fica em `site/p/<cliente>/`.

## Estrutura

```
site/mesa-em-l-cliente.html                     página final do cliente (v3.3.1)
site/index.html                                 redireciona para o modo cliente
site/p/<codigo>/index.html                      link fixo da proposta do cliente (código, sem nome)
site/logo.jpg · og-mesa-em-l.jpg                marca e cartão de prévia
templates/mesa-em-l-cliente-v3-2-dev-2026-10-28.html  template-fonte (fora do Pages)
tools/make-og.py                                gerador do cartão de prévia
visualizadores/                                 config do gerador (chega do repo do Ygor)
```

> **Só o que está em `site/` vai para o Pages.** Template, ferramentas e config ficam fora de `site/` de propósito.

## Como está versionado

- **Semver** em `VERSION` + tag `vX.Y.Z` + entrada em `CHANGELOG.md`.
- Cada release registra **bytes e SHA256** do `site/mesa-em-l-cliente.html`.
- A **fonte da verdade do código** é este repo. Documentos internos (custos, RFQ, JORNADA, análise de reunião) ficam no Drive `CaosTF/10-documentacao/PROJETOS/mesa-em-l/` e **não entram aqui**.
- Versões anteriores ficam **só no histórico do git** — não são publicadas no Pages.

## Publicação

GitHub Pages via GitHub Actions (pasta `site/`). O passo a passo, os gates e o domínio próprio estão em `PUBLICAR.md`. **Publicar é gate do dono** — nenhum agente publica sozinho.

## O que não entra neste repo

- custo, margem, markup, RFQ e qualquer número interno;
- o configurador interno (`mesa-em-l-ferro.html`) — vive só no Drive/local, nunca aqui;
- JORNADA, atas, conversas e análise de fornecedor;
- dados de clientes que não sejam o próprio preset público do link;
- `.env`, tokens, `cookies.txt` ou qualquer segredo.
