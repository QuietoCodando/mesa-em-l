# Publicar — GitHub Pages (gate do dono)

> Só depois de: parecer do `financeiro` (18/30), re-ok do `design` e **OK explícito do Murilo**.
> O repo é público e o Pages é grátis; a proteção de `main` (regra dos 2) exige repo público no plano free.

## 1. Ligar o Pages por Actions (uma vez)

```powershell
gh api -X POST repos/QuietoCodando/mesa-em-l/pages -f "build_type=workflow"
```

O workflow `.github/workflows/pages.yml` publica a pasta `site/` na URL:
`https://quietocodando.github.io/mesa-em-l/`

> Ainda **não** existe o workflow no repo — ele entra no PR de publicação junto com o OK do dono.

## 2. Conferir o artefato

```powershell
$h = (Get-FileHash site/mesa-em-l-cliente.html -Algorithm SHA256).Hash
"$h | $((Get-Item site/mesa-em-l-cliente.html).Length) b"
```

Tem que bater com o `CHANGELOG.md` (`1FF68578…` / 206.633 b na v3.3.0).

## 3. Domínio próprio (opcional, decisão do dono + infra)

- `CNAME` no Pages para `mesa.caostf.com.br` (ou `orcamento.caostf.com.br`).
- DNS: `CNAME mesa → quietocodando.github.io` (Cloudflare/Vercel DNS).
- Enquanto não houver domínio, a URL `quietocodando.github.io/mesa-em-l/` funciona.

## 4. URL antiga (`birigjow.github.io/mesa-em-l/`)

- O repo do Lucas continua no ar até o novo estar validado.
- Depois: `index.html` + `404.html` no repo antigo redirecionando para a URL nova (mantém links já enviados).
- **Não** desligar o Pages antigo antes de 30 dias de convivência.

## 5. Checklist de publicação

- [ ] PR aprovado por outra pessoa (regra dos 2)
- [ ] hash/bytes conferidos
- [ ] 390 px e 1440 px sem overflow, 0 erro de console
- [ ] preço/selo iguais ao parecer do financeiro
- [ ] `p/<cliente>/` abre e cai na página certa
- [ ] `robots.txt` bloqueando `/p/`
- [ ] OK do Murilo registrado no `REGISTRO-MUDANCAS.md` e no card `op-mar-013`
