# Changelog — Mesa em L (vista de cliente)

Formato: [SemVer](https://semver.org/lang/pt-BR/). Cada release registra bytes e SHA256 do `site/mesa-em-l-cliente.html`.

## [3.4.0] — 2026-11-25 (pronta para publicar; gate do dono)

**Orçamento final para o cliente: 18 mm a R$ 5.000,00, sinal 50%, 30 mm sob consulta.**

- **Arquivo:** `site/mesa-em-l-cliente.html`
- **Bytes:** 206.104
- **SHA256:** `F547F96EE56EA38F8391ECE541ACA3444E30DE8B4D319BEB6EDF10341E46C18B`
- **Preço:** R$ 5.000,00 · sinal Pix R$ 2.500,00 · sinal cartão R$ 2.590,67 · total cartão R$ 5.181,35 (÷ 0,965).
- **Espessura:** 18 mm travado; 30 mm é opção **sem preço** — selecionar 30 mm cai no lock “Projeto sob medida — orçamento a confirmar”.
- **Custo/ferragens:** os 5 campos de custo saíram do JSON público; a lista de ferragens e a margem ficam no documento dos sócios (`ORCAMENTO-INTERNO-2026-11-25.md`).
- **OK do cliente:** o botão “Dar o OK” (mock) virou “Enviar meu OK pelo WhatsApp”, com resumo pronto (medidas, espessura, valor, sinal) e pedido da chave Pix; sem endpoint, token ou registro no navegador.
- **Selo:** “sujeito a confirmação” visível enquanto `auditado_financeiro:false` (auditoria do `financeiro` em paralelo).
- **Não mudou:** 3D, medidas, furos, acabamentos, navegação e os links por cliente.

## [3.3.1] — 2026-11-03 (publicada)

**Correção de base para publicação no repo canônico.** A v3.3.0 foi congelada com `PUBLIC_BASE` apontando para o Pages antigo (`birigjow.github.io/mesa-em-l/`); ao publicar em `quietocodando.github.io/mesa-em-l/`, o botão “Copiar link do cliente” geraria links para o build velho. Esta versão troca a base em `mesa-em-l-cliente.html`, `index.html`, `p/ygor/` e `p/ygor-preco/`.

- **Arquivo:** `site/mesa-em-l-cliente.html`
- **Bytes:** 206.648
- **SHA256:** `0657BAE53A328C0B6374EA8BCF0A7260CEDCE9A6AEB73BA24CD37A24C3846F1D`
- **Mudança:** 3 ocorrências de `https://birigjow.github.io/mesa-em-l/` → `https://quietocodando.github.io/mesa-em-l/` (+15 b).
- **Não mudou:** conteúdo visual, 3D, medidas, preço (18 = R$ 6.060,26 + selo; 30 = a confirmar).
- **Publicada em:** `https://quietocodando.github.io/mesa-em-l/` (03/11).

## [3.3.0] — 2026-11-03 (congelada, não publicada)

**Origem:** cópia de trabalho `mesa-em-l-cliente-v3-2-dev-2026-10-28.html`, aprovada pelo `design` para a caixa de boas-vindas e o guia de orçamento (re-ok 28/10, tutorial C).

- **Arquivo:** `site/mesa-em-l-cliente.html`
- **Bytes:** 206.633
- **SHA256:** `1FF685786CFB85E4531F9C5E99BB03C86A28E4AD54E555F9B3A60E6FED31692F`
- **Preço 18 mm:** R$ 6.060,26 + selo “sujeito a confirmação” (travado pelo dono em 26/10)
- **Preço 30 mm:** a confirmar (bloqueado no front)
- **Entrou:** caixa de boas-vindas (só `?modo=cliente`, `inert`, focus trap, “não mostrar”), guia “As medidas mudam o orçamento”, banner/chip ligados ao cálculo real e demo “Ver como funciona”.
- **Não mudou:** 3D, medidas/dados técnicos, preço e o aceite (`#btn-aceite`).
- **Pendente para publicar:** parecer do `financeiro` (18/30) + OK do dono. **Nada publicado.**
- **Final anterior (histórico):** `v3` + patch = 186.422 b / `36AB6A063A7FB67D…` (`site/mesa-em-l-cliente-2026-10-26.html`).

## Histórico anterior ao repo

As versões v2.1, v3 (v3.1) e v3.2 foram produzidas entre 24 e 26/10/2026 e estão preservadas como arquivos no `site/` e na JORNADA do Drive. A v3.2 é 183.140 b / `21D040B43BF4D051…`.
