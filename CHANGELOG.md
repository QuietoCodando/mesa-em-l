# Changelog — Mesa em L (vista de cliente)

Formato: [SemVer](https://semver.org/lang/pt-BR/). Cada release registra bytes e SHA256 do `site/mesa-em-l-cliente.html`.

## [Não lançado] — 2026-11-05 (segurança, sem mudança no cliente)

**Remoção do configurador interno do repo público.** O `site/mesa-em-l-ferro.html` expunha números internos de precificação (custo, margem, desconto máximo e a fórmula) — contra a regra do próprio README. Os valores não são repetidos aqui de propósito. O arquivo continua no Drive `CaosTF/10-documentacao/PROJETOS/mesa-em-l/` e no workspace local; sai só do repo público e do Pages.

- **Arquivo removido:** `site/mesa-em-l-ferro.html` (172.029 b)
- **Versões antigas fora do Pages:** `mesa-em-l-cliente-2026-10-26.html`, `-v3-2.html`, `-v3.html`, `-v2.html` saíram do repo (ficam no histórico do git)
- **Template fora do Pages:** `mesa-em-l-cliente-v3-2-dev-2026-10-28.html` → `templates/` (só `site/` é publicado)
- **Link de cliente sem nome:** `site/p/ygor/` → `site/p/001/`; `site/p/ygor-preco/` removido
- **Dados de terceiros:** `tools/make-og.py` usa variáveis de ambiente (`CAOS_LOGO`, `CAOS_OG_OUT`) em vez de caminho de máquina; `visualizadores/README.md` não cita mais o nome do repo privado
- **`.gitignore`:** passa a cobrir `.env`, `.env.*`, `*.key`, `*.pem`, `*.p12`, `*.pfx`, `secrets*`, `cookies*`, `*.log`
- **Não mudou:** `site/mesa-em-l-cliente.html` (206.648 b / `0657BAE5...`) — a página do cliente continua igual.
- **Pendente:** o `ferro.html` ainda existe no histórico do git (repo público). Decisão do dono (05/11): **não** reescrever o histórico. A composição de preço no JSON do cliente (campos não lidos pelo código) fica para o PR do `dev`, com bump de versão.

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
