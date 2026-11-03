// Provas do gerador no repo público.
// node --test test/gerar-visualizador.test.mjs
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tool = path.join(root, 'tools', 'gerar-visualizador.mjs');
const config = path.join(root, 'visualizadores', 'mesa-em-l.json');
const page = path.join(root, 'site', 'mesa-em-l-cliente.html');
const tmp = path.join(root, 'test', '.tmp');

function run(args) {
    return spawnSync(process.execPath, [tool, ...args], { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
}

function prepareTmp() {
    rmSync(tmp, { recursive: true, force: true });
    mkdirSync(tmp, { recursive: true });
}

after(() => rmSync(tmp, { recursive: true, force: true }));

test('AC-001: página pública em dia com o config @spec:AC-001', () => {
    const r = run(['--config', path.relative(root, config), '--check']);
    assert.equal(r.status, 0, `--check falhou:\n${r.stdout}\n${r.stderr}`);
    assert.ok(existsSync(page), 'falta site/mesa-em-l-cliente.html');
});

test('AC-002: config público recusa custo interno @spec:AC-002', () => {
    prepareTmp();
    const cfg = JSON.parse(readFileSync(config, 'utf8'));
    cfg.orcamento.opcoes[0].estrutura = 2970;
    cfg.saida = 'test/.tmp/nao-deve-existir.html';
    const arquivo = path.join(tmp, 'com-custo.json');
    writeFileSync(arquivo, JSON.stringify(cfg, null, 2) + '\n');

    const r = run(['--config', path.relative(root, arquivo)]);
    assert.equal(r.status, 1, 'config com custo deveria falhar');
    assert.match(r.stderr, /campo interno "estrutura"/);
    assert.ok(!existsSync(path.join(root, cfg.saida)), 'não deveria gravar a página com custo');
});

test('AC-003: o HTML público não carrega custo no JSON @spec:AC-003', () => {
    const html = readFileSync(page, 'utf8');
    const m = html.match(/<script type="application\/json" id="orcamento-cliente">([\s\S]*?)<\/script>/);
    assert.ok(m, 'bloco #orcamento-cliente não encontrado');
    const orc = JSON.parse(m[1]);
    for (const k of ['estrutura', 'tampos', 'acabamento', 'material', 'mao_obra', 'custo', 'margem', 'markup']) {
        assert.ok(!(k in orc.opcoes[0]), `campo interno "${k}" vazou para o HTML público`);
    }
    assert.equal(orc.opcoes[0].preco, 6060.26, 'o preço de referência mudou');
});
