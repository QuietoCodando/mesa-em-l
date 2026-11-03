#!/usr/bin/env node
// gerar-visualizador.mjs — gera a página de apresentação do cliente a partir de
// um template validado + um config de projeto (JSON).
//
// O que ele NÃO faz: calcular preço, publicar no GitHub Pages, gerar PDF ou
// mexer no 3D. O preço e as medidas vêm do config; o template é a página que já
// foi validada (3D, mobile, orçamento, aceite).
//
// Uso:
//   node tools/gerar-visualizador.mjs --config visualizadores/mesa-em-l.json
//   node tools/gerar-visualizador.mjs --config visualizadores/mesa-em-l.json --check
//
// --check  não escreve nada: compara a saída atual com o que seria gerado e
//          sai com código 1 se estiver diferente (prova de reprodutibilidade).
import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function fail(msg) {
    console.error('ERRO: ' + msg);
    process.exit(1);
}

function assert(cond, msg) {
    if (!cond) fail(msg);
}

function parseArgs(argv) {
    const out = { config: null, check: false, out: null, quiet: false };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--config' || a === '-c') out.config = argv[++i];
        else if (a === '--check') out.check = true;
        else if (a === '--out' || a === '-o') out.out = argv[++i];
        else if (a === '--quiet' || a === '-q') out.quiet = true;
        else if (a === '--help' || a === '-h') {
            console.log('uso: node tools/gerar-visualizador.mjs --config <config.json> [--out <arquivo>] [--check]');
            process.exit(0);
        } else {
            fail(`argumento desconhecido: ${a}`);
        }
    }
    assert(out.config, 'falta --config <arquivo.json>');
    return out;
}

function readJson(file) {
    assert(existsSync(file), `arquivo não existe: ${file}`);
    const txt = readFileSync(file, 'utf8');
    try {
        return JSON.parse(txt);
    } catch (e) {
        fail(`JSON inválido em ${file}: ${e.message}`);
    }
}

function insideRepo(p, label) {
    const abs = path.resolve(root, p);
    assert(abs === root || abs.startsWith(root + path.sep), `${label} fora do repo: ${p}`);
    return abs;
}

function countMatches(html, re) {
    const global = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    return [...html.matchAll(global)].length;
}

function replaceOnce(html, re, replacement, label) {
    const n = countMatches(html, re);
    assert(n === 1, `marcador "${label}": esperava 1 ocorrência, achei ${n}`);
    return html.replace(re, typeof replacement === 'function' ? replacement : () => replacement);
}

function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, '&quot;');
}

function validateConfig(cfg, cfgPath) {
    assert(cfg && typeof cfg === 'object' && !Array.isArray(cfg), 'config precisa ser um objeto JSON');
    for (const k of ['slug', 'template', 'saida', 'titulo', 'descricao', 'public_base', 'defaults', 'orcamento']) {
        assert(cfg[k] !== undefined && cfg[k] !== '', `config sem "${k}"`);
    }
    assert(/^[a-z0-9][a-z0-9-]*$/.test(cfg.slug), `slug inválido: ${cfg.slug} (use minúsculas, números e hífen)`);
    assert(typeof cfg.titulo === 'string' && cfg.titulo.length >= 3, 'titulo curto demais');
    assert(typeof cfg.descricao === 'string' && cfg.descricao.length >= 10, 'descricao curta demais');
    assert(typeof cfg.public_base === 'string' && /^https?:\/\/.+\/$/.test(cfg.public_base), 'public_base precisa ser URL terminada em /');
    if (cfg.og_url !== undefined) assert(/^https?:\/\/.+/.test(cfg.og_url), 'og_url inválida');
    if (cfg.og_image !== undefined) assert(/^https?:\/\/.+/.test(cfg.og_image), 'og_image inválida');
    if (cfg.og_descricao !== undefined) assert(typeof cfg.og_descricao === 'string' && cfg.og_descricao.length >= 10, 'og_descricao curta demais');

    const d = cfg.defaults;
    assert(d && typeof d === 'object', 'defaults precisa ser objeto');
    for (const k of ['L1', 'L2', 'P', 'P2', 'H']) {
        assert(Number.isFinite(d[k]) && d[k] > 0, `defaults.${k} precisa ser número > 0`);
    }
    assert(d.side === 'left' || d.side === 'right', 'defaults.side precisa ser "left" ou "right"');

    const o = cfg.orcamento;
    assert(o && typeof o === 'object', 'orcamento precisa ser objeto');
    assert(o.schema === 'orcamento-cliente/1', 'orcamento.schema precisa ser "orcamento-cliente/1"');
    assert(o.projeto === cfg.slug, `orcamento.projeto (${o.projeto}) diferente do slug (${cfg.slug})`);
    assert(o.medidas && typeof o.medidas === 'object', 'orcamento.medidas ausente');
    for (const k of ['L1', 'L2', 'P1', 'P2', 'H', 'T']) {
        assert(Number.isFinite(o.medidas[k]) && o.medidas[k] > 0, `orcamento.medidas.${k} precisa ser número > 0`);
    }
    assert([18, 30].includes(o.medidas.T), 'orcamento.medidas.T precisa ser 18 ou 30 (as espessuras que a página simula)');
    assert(o.medidas.L1 === d.L1 && o.medidas.L2 === d.L2 && o.medidas.P1 === d.P && o.medidas.P2 === d.P2 && o.medidas.H === d.H,
        'medidas do orçamento não batem com defaults (L1/L2/P1/P2/H) — a página abriria em "sob medida"');
    assert(typeof o.auditado_financeiro === 'boolean', 'orcamento.auditado_financeiro precisa ser true/false');
    assert(Array.isArray(o.opcoes) && o.opcoes.length > 0, 'orcamento.opcoes precisa ter pelo menos 1 opção');
    for (const [i, op] of o.opcoes.entries()) {
        assert(op && typeof op === 'object', `opcoes[${i}] inválida`);
        assert(typeof op.id === 'string' && op.id.length > 0, `opcoes[${i}].id ausente`);
        assert(typeof op.rotulo === 'string' && op.rotulo.length > 0, `opcoes[${i}].rotulo ausente`);
        assert(Number.isFinite(op.preco) && op.preco > 0, `opcoes[${i}].preco precisa ser número > 0`);
    }

    if (cfg.publico !== undefined) assert(typeof cfg.publico === 'boolean', 'publico precisa ser true/false');
    if (cfg.publico === true) {
        const internos = ['estrutura', 'tampos', 'acabamento', 'material', 'mao_obra', 'custo', 'margem', 'markup'];
        for (const [i, op] of o.opcoes.entries()) {
            for (const k of internos) {
                assert(!(k in op), `opcoes[${i}] tem campo interno "${k}" — config público não pode carregar custo`);
            }
        }
    }

    const json = JSON.stringify(cfg).toLowerCase();
    for (const bad of ['token', 'senha', 'password', 'secret', 'api_key', 'apikey', 'cookie']) {
        assert(!json.includes(bad), `config contém campo proibido: "${bad}" (segredo nunca vai para o repo)`);
    }

    insideRepo(cfg.template, 'template');
    insideRepo(cfg.saida, 'saida');
    if (cfgPath) assert(existsSync(path.resolve(root, cfg.template)), `template não existe: ${cfg.template}`);
    return cfg;
}

function buildPage(cfg) {
    const tplPath = path.resolve(root, cfg.template);
    let html = readFileSync(tplPath, 'utf8');

    const titulo = escapeHtml(cfg.titulo);
    const descricao = escapeAttr(cfg.descricao);
    const ogDescricao = escapeAttr(cfg.og_descricao || cfg.descricao);
    const ogUrl = escapeAttr(cfg.og_url || cfg.public_base);
    const ogImage = escapeAttr(cfg.og_image || (cfg.public_base + 'og-' + cfg.slug + '.jpg'));

    html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${titulo}</title>`, 'title');
    html = replaceOnce(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${descricao}">`, 'meta description');
    html = replaceOnce(html, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${titulo}">`, 'og:title');
    html = replaceOnce(html, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${ogDescricao}">`, 'og:description');
    html = replaceOnce(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${ogUrl}">`, 'og:url');
    html = replaceOnce(html, /<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${ogImage}">`, 'og:image');

    const d = cfg.defaults;
    const defaults = `const DEFAULTS = { L1:${d.L1}, L2:${d.L2}, P:${d.P}, P2:${d.P2}, H:${d.H}, side:"${d.side}" };`;
    html = replaceOnce(html, /const DEFAULTS = \{[^}]*\};/, defaults, 'DEFAULTS');
    html = replaceOnce(html, /const PUBLIC_BASE = "[^"]*";/, `const PUBLIC_BASE = "${cfg.public_base}";`, 'PUBLIC_BASE');

    const orcamentoJson = JSON.stringify(cfg.orcamento, null, 2);
    assert(!orcamentoJson.includes('</script'), 'orcamento contém "</script" — quebraria o HTML');
    html = replaceOnce(
        html,
        /(<script type="application\/json" id="orcamento-cliente">)[\s\S]*?(<\/script>)/,
        (m, open, close) => open + orcamentoJson + close,
        'bloco #orcamento-cliente'
    );

    // chaves de localStorage do template (ex.: caostf.mesa-em-l.cliente.caixa.v1)
    const antes = (html.match(/caostf\.mesa-em-l\./g) || []).length;
    if (cfg.slug !== 'mesa-em-l' && antes > 0) {
        html = html.split('caostf.mesa-em-l.').join(`caostf.${cfg.slug}.`);
    }

    return { html, antes };
}

function sha256(txt) {
    return createHash('sha256').update(txt).digest('hex');
}

function firstDiff(a, b) {
    const la = a.split(/\r?\n/);
    const lb = b.split(/\r?\n/);
    for (let i = 0; i < Math.max(la.length, lb.length); i++) {
        if (la[i] !== lb[i]) {
            return {
                linha: i + 1,
                atual: (la[i] || '<fim>').slice(0, 160),
                novo: (lb[i] || '<fim>').slice(0, 160)
            };
        }
    }
    return null;
}

const args = parseArgs(process.argv.slice(2));
const cfgPath = path.resolve(root, args.config);
const cfg = validateConfig(readJson(cfgPath), args.config);
const tplPath = path.resolve(root, cfg.template);
const outPath = args.out ? insideRepo(args.out, 'out') : path.resolve(root, cfg.saida);

const templateHtml = readFileSync(tplPath, 'utf8');
const { html } = buildPage(cfg);
const tplHash = sha256(templateHtml);
const novoHash = sha256(html);

if (args.check) {
    assert(existsSync(outPath), `--check: saída não existe (${path.relative(root, outPath)}). Rode sem --check para gerar.`);
    const atual = readFileSync(outPath, 'utf8');
    if (sha256(atual) === novoHash) {
        if (!args.quiet) {
            console.log(`OK: ${path.relative(root, outPath)} está em dia (${html.length} bytes, sha256 ${novoHash.slice(0, 12)}…).`);
        }
        process.exit(0);
    }
    const diff = firstDiff(atual, html);
    console.error(`ERRO: ${path.relative(root, outPath)} está diferente do que o config gera.`);
    if (diff) {
        console.error(`  primeira diferença na linha ${diff.linha}:`);
        console.error(`  atual: ${diff.atual}`);
        console.error(`  novo : ${diff.novo}`);
    }
    console.error(`  sha256 atual ${sha256(atual).slice(0, 12)}… · novo ${novoHash.slice(0, 12)}…`);
    process.exit(1);
}

mkdirSync(path.dirname(outPath), { recursive: true });
const tmp = outPath + '.tmp-' + process.pid;
writeFileSync(tmp, html, 'utf8');
renameSync(tmp, outPath);

if (!args.quiet) {
    const rel = (p) => path.relative(root, p) || p;
    console.log(`Gerado: ${rel(outPath)}`);
    console.log(`  template: ${rel(tplPath)} (${templateHtml.length} bytes, sha256 ${tplHash.slice(0, 12)}…)`);
    console.log(`  saída:    ${html.length} bytes, sha256 ${novoHash.slice(0, 12)}…`);
    console.log(`  projeto:  ${cfg.orcamento.projeto} · cliente: ${cfg.orcamento.cliente || '-'} · opções: ${cfg.orcamento.opcoes.length}`);
    console.log(`  preço:    ${cfg.orcamento.opcoes.map(o => `${o.id}=R$ ${o.preco.toFixed(2)}`).join(' · ')}`);
    console.log(`  slug:     ${cfg.slug}`);
}
