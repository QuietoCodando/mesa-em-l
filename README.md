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
site/mesa-em-l-cliente-v3-2-dev-2026-10-28.html  template-fonte da v3.3.0 (não editar sem o gerador)
site/mesa-em-l-cliente-2026-10-26.html          final anterior (histórico)
site/mesa-em-l-cliente-v3-2.html                v3.2 (histórico)
site/mesa-em-l-cliente-v3.html                  v3.1 (histórico)
site/mesa-em-l-cliente-v2.html                  v2.1 (histórico)
site/index.html                                 redireciona para o modo cliente
site/p/<cliente>/index.html                     link fixo da proposta do cliente
site/logo.jpg · og-mesa-em-l.jpg                marca e cartão de prévia
tools/make-og.py                                gerador do cartão de prévia
visualizadores/                                 config do gerador (chega do repo do Ygor)
```

## Como está versionado

- **Semver** em `VERSION` + tag `vX.Y.Z` + entrada em `CHANGELOG.md`.
- Cada release registra **bytes e SHA256** do `site/mesa-em-l-cliente.html`.
- A **fonte da verdade do código** é este repo. Documentos internos (custos, RFQ, JORNADA, análise de reunião) ficam no Drive `CaosTF/10-documentacao/PROJETOS/mesa-em-l/` e **não entram aqui**.
- Versões anteriores ficam no histórico do git e nos arquivos `v2`/`v3`/`v3-2` — nada é apagado.

## Publicação

GitHub Pages via GitHub Actions (pasta `site/`). O passo a passo, os gates e o domínio próprio estão em `PUBLICAR.md`. **Publicar é gate do dono** — nenhum agente publica sozinho.

## O que não entra neste repo

- custo, margem, markup, RFQ e qualquer número interno;
- o configurador interno (`mesa-em-l-ferro.html`) — vive só no Drive/local, nunca aqui;
- JORNADA, atas, conversas e análise de fornecedor;
- dados de clientes que não sejam o próprio preset público do link;
- `.env`, tokens, `cookies.txt` ou qualquer segredo.
