# Template de Geração de 3 Níveis de Site

Usa a skill **`ui-ux-pro-max`** (`~/.claude/skills/ui-ux-pro-max/scripts/search.py`) como motor de decisão de design deste template — nunca escolher cor/tipografia/ícones "a olho". Ver Passo 0.5.

## Passo 0 — Pergunta inicial ao cliente

> "Queres que eu já gere os 3 níveis (Standard, Premium, Dynamic) com a
> informação que tenho do teu negócio? Depois disso, fazemos iterações
> para ajustar cada um ao teu gosto e explico o que pode ser mudado em
> cada nível."

- Se SIM → gerar os 3 com valores default (indicados em cada pergunta abaixo) e avançar para iterações.
- Se NÃO → percorrer as perguntas de cada nível antes de gerar.

---

## Informação base (preencher sempre)
- Nome do negócio:
- Setor/atividade:
- Público-alvo:
- Conteúdo/textos principais (ou pedir ao cliente):
- Cores de marca (se existirem):
- Logótipo (sim/não):

---

## Passo 0.5 — Gerar o sistema de design com `ui-ux-pro-max` (OBRIGATÓRIO)

Antes de gerar qualquer um dos 3 níveis, correr **um único** comando para obter a base de design partilhada pelos 3 (mesma marca, mesma cor, mesma tipografia — só a produção visual sobe por nível):

```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "<setor> <palavras-chave do negócio>" \
  --design-system -p "<Nome do Negócio>" -f markdown
```

- Se as cores/tipografia devolvidas não fizerem sentido para o setor (ex.: paleta de "hospitality" a puxar fontes de restaurante para um fornecedor B2B), afinar com pesquisas de domínio antes de aceitar o resultado:
  ```bash
  python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<setor específico>" --domain color -n 5
  python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<mood>" --domain typography -n 5
  python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<mood>" --domain style -n 5
  ```
- Guardar o resultado final (paleta, tipografia, ícones, padrão de landing) — é a **fonte única de verdade** usada nos 3 prompts abaixo. Os 3 níveis **nunca** devem ter cor/tipografia diferentes entre si; o que muda é produção (animação, imagens, estrutura), não identidade.
- Opcional — persistir para reutilizar entre sessões:
  ```bash
  python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "<Nome>"
  # cria demos/<slug>/design-system/MASTER.md
  ```

### Ícones — regra fixa para os 3 níveis
**Nunca usar emojis nativos (💧🌱🏆🍽️ etc.) como ícones estruturais** — nem no Standard. Usar SVG vetorial, por defeito **Phosphor** (`--domain icons "<palavras-chave>"` para escolher os ícones certos; fallback Heroicons se Phosphor não tiver o ícone). Isto está agora acima do nível "Premium" do template original — é regra base, porque emoji-como-ícone quebra consistência de marca, contraste e legibilidade em dark mode logo no nível mais simples.

### Checklist de acessibilidade/UX — aplicar aos 3 níveis
Antes de dar qualquer nível como pronto, correr:
```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "animation accessibility loading reduced-motion" --domain ux
```
E confirmar: contraste texto ≥4.5:1, `cursor: pointer` em clicáveis, alvos de toque ≥44×44px, `prefers-reduced-motion` respeitado em qualquer animação (mesmo as subtis do Standard), foco visível em navegação por teclado.

---

## NÍVEL 1 — STANDARD

Cor e tipografia **não se escolhem aqui** — vêm do sistema de design gerado no Passo 0.5. As perguntas deste nível são só de composição/estrutura.

| # | Pergunta | Opções |
|---|---|---|
| 1 | Aplicação da paleta | (a) Monocromática — só neutros + 1 accent do design system **[default]** (b) Paleta completa do design system (c) Pastel suave (tons claros da mesma paleta) |
| 2 | Navegação | (a) Menu horizontal simples **[default]** (b) Menu hambúrguer (c) Scroll suave entre secções |
| 3 | Imagens | (a) Fotos do cliente **[default]** (b) Fotos de stock (c) Ilustrações simples |
| 4 | Hero (topo da página) | (a) Texto centrado + botão **[default]** (b) Texto e imagem lado a lado (c) Formulário de contacto em destaque |

**Prompt gerado:**
```
Cria um site STANDARD para [NOME_NEGÓCIO], setor [SETOR].
- Layout limpo, estrutura clássica (header, secções, footer)
- Cor e tipografia: sistema de design do Passo 0.5 (paleta [PALETA], fontes [TIPOGRAFIA])
- Aplicação da paleta: [RESPOSTA 1]
- Navegação: [RESPOSTA 2]
- Imagens: [RESPOSTA 3]
- Hero: [RESPOSTA 4]
- Ícones: SVG (Phosphor), nunca emoji — ver regra fixa acima
- Sem animações (só transições de hover 150–250ms, respeitando prefers-reduced-motion). Foco em clareza e rapidez de carregamento.
Conteúdo: [CONTEÚDO]
```

---

## NÍVEL 2 — PREMIUM

Mesma cor e tipografia do Passo 0.5 (não escolher de novo — o Premium usa-as com mais peso visual: pesos de fonte mais altos, mais espaço em branco, imagens maiores). As perguntas abaixo são só de composição/produção.

| # | Pergunta | Opções |
|---|---|---|
| 1 | Imagem de hero | (a) Foto cheia com overlay escuro + texto por cima **[default]** (b) Slideshow de imagens (c) Vídeo curto em loop |
| 2 | Peso tipográfico | (a) Usar a tipografia do design system, pesos altos no heading (600–800) **[default]** (b) Par alternativo — pedir `--domain typography` com outro mood (c) Display/editorial (heading maior, tracking mais apertado) |
| 3 | Aplicação da paleta | (a) Cor de marca (primary/accent do design system) + branco **[default]** (b) Versão dark do design system (fundo escuro, texto claro) (c) Tons neutros da paleta com accent pontual |
| 4 | Ícones | (a) Phosphor, do resultado de `--domain icons` **[default]** (b) Heroicons como fallback (c) Sem ícones, só tipografia — nunca emoji |
| 5 | Estrutura de secções | (a) Blocos alternados texto/imagem **[default]** (b) Grid de cards (c) Scroll storytelling |

**Prompt gerado:**
```
Cria um site PREMIUM para [NOME_NEGÓCIO], setor [SETOR].
- Imagens grandes, full-width, sem rebordos (edge-to-edge)
- Cor e tipografia: mesmo sistema de design do Passo 0.5 (paleta [PALETA], fontes [TIPOGRAFIA]) — mais peso visual, não cores novas
- Hero: [RESPOSTA 1]
- Peso tipográfico: [RESPOSTA 2]
- Paleta: [RESPOSTA 3]
- Ícones: [RESPOSTA 4] (nunca usar emojis nativos do sistema operativo)
- Estrutura: [RESPOSTA 5]
- Estrutura limpa mas com mais respiração visual.
Conteúdo: [CONTEÚDO]
```

---

## NÍVEL 3 — DYNAMIC
*(referência: belgradearbor.rs/en — parallax, progress bar, secções numeradas, mapa interativo)*

Antes de gerar, buscar os snippets de animação certos em vez de inventar curvas/easings:
```bash
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "scroll reveal stagger parallax hero" --domain gsap
```
Regras não-negociáveis (vêm do checklist de acessibilidade — severidade alta):
- **Parallax só em camadas de fundo/decorativas, nunca em texto ou controlos** — delta pequeno (5–15% yPercent).
- **`@media (prefers-reduced-motion: reduce)`** desativa parallax/scroll-jacking/Ken Burns e troca por fade estático — sem exceção, mesmo no Dynamic.
- Animar só `transform`/`opacity` (nunca `width`/`height`/`top`/`left`) por performance.
- Máx. 1–2 elementos animados em simultâneo por secção visível — não animar tudo de uma vez.

| # | Pergunta | Opções |
|---|---|---|
| 1 | Animação de entrada (loading) | (a) Barra de progresso 0–100% **[default]** (b) Fade-in simples (c) Sem intro |
| 2 | Comportamento do scroll | (a) Parallax em camadas (2–3 camadas máx., fundo mais lento) **[default]** (b) Scroll-snap por secção (c) Scroll normal com fade-in nos elementos (stagger 30–50ms) |
| 3 | Hero | (a) Imagem com zoom lento (efeito Ken Burns) **[default]** (b) Vídeo de fundo em loop (c) Sequência de imagens tipo "3D experience" |
| 4 | Secção interativa extra | (a) Mapa/localização com cards ao hover **[default]** (b) Galeria horizontal arrastável (c) Timeline animada (ex: fases de um processo) |
| 5 | Micro-interações | (a) Hover com zoom nas imagens (scale 0.95–1.05) **[default]** (b) Cursor customizado (c) Transição animada entre páginas |
| 6 | Secções numeradas (01/02/03) | (a) Sim **[default]** (b) Não |

**Prompt gerado:**
```
Cria um site DYNAMIC para [NOME_NEGÓCIO], setor [SETOR], inspirado em
belgradearbor.rs/en (parallax storytelling premium).
- Cor e tipografia: mesmo sistema de design do Passo 0.5 — não mudar identidade, só produção
- Loading: [RESPOSTA 1]
- Scroll: [RESPOSTA 2]
- Hero: [RESPOSTA 3]
- Secção interativa: [RESPOSTA 4]
- Micro-interações: [RESPOSTA 5]
- Secções numeradas: [RESPOSTA 6]
- Todas as animações respeitam prefers-reduced-motion (fallback estático), usam só transform/opacity, e limitam-se a 1-2 elementos em simultâneo por secção
- Usar as mesmas imagens/tipografia/ícones premium do Nível 2 como base.
Conteúdo: [CONTEÚDO]
```

---

## Depois de gerar os 3
Pergunta de iteração (repetir por nível):
> "O que gostarias de ajustar neste nível? Podes mudar: cor, tipografia,
> tipo de hero, estrutura das secções, ou o tipo de animação."

## Automatização
1. Guardar este ficheiro na raiz do projeto.
2. Criar slash command `/gerar-3-sites` no Claude Code que:
   - Lê este ficheiro
   - Faz a pergunta do Passo 0
   - Só depois pede a "Informação base" do cliente novo
   - Corre o Passo 0.5 (`ui-ux-pro-max --design-system`) para gerar a paleta/tipografia/ícones partilhados
   - Gera as 3 pastas: `/standard`, `/premium`, `/dynamic`, todas a partir do mesmo sistema de design
   - Corre o checklist de acessibilidade (`--domain ux`) nos 3 antes de dar como concluído
