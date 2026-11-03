# visualizadores/

Config do gerador `tools/gerar-visualizador.mjs`.

- `mesa-em-l.json` — título, OG, `DEFAULTS`, `PUBLIC_BASE` e orçamento injetados no template.
- O gerador **não calcula preço** e **não publica**; ele escreve `site/mesa-em-l-cliente.html`.
- O config é **público**: `publico: true` faz o gerador recusar campos de custo
  (`estrutura`, `tampos`, `acabamento`, `material`, `mao_obra`, `custo`, `margem`, `markup`).
  O custo/margem fica no repo privado do Ygor, nunca aqui.

## Uso

```bash
node tools/gerar-visualizador.mjs --config visualizadores/mesa-em-l.json
node tools/gerar-visualizador.mjs --config visualizadores/mesa-em-l.json --check
node --test test/gerar-visualizador.test.mjs
```

- Sem `--check`: gera `site/mesa-em-l-cliente.html`.
- Com `--check`: não escreve; sai 0 se a página está em dia e 1 se está velha/editada.
- O template é `site/mesa-em-l-cliente-v3-2-dev-2026-10-28.html`; o gerador só lê, nunca edita.

**Entrega:** v3.3.2 (03/11/2026). O gerador reproduz a v3.3.1 byte a byte quando usa o
JSON cheio; a v3.3.2 é a mesma página com os 5 campos de custo removidos.
