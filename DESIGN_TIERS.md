# Template de Geração de 3 Níveis de Site

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

## NÍVEL 1 — STANDARD

| # | Pergunta | Opções |
|---|---|---|
| 1 | Estilo de cor | (a) Neutro/monocromático **[default]** (b) Cor de marca vibrante (c) Pastel suave |
| 2 | Navegação | (a) Menu horizontal simples **[default]** (b) Menu hambúrguer (c) Scroll suave entre secções |
| 3 | Imagens | (a) Fotos do cliente **[default]** (b) Fotos de stock (c) Ilustrações simples |
| 4 | Hero (topo da página) | (a) Texto centrado + botão **[default]** (b) Texto e imagem lado a lado (c) Formulário de contacto em destaque |

**Prompt gerado:**
```
Cria um site STANDARD para [NOME_NEGÓCIO], setor [SETOR].
- Layout limpo, estrutura clássica (header, secções, footer)
- Cor: [RESPOSTA 1]
- Navegação: [RESPOSTA 2]
- Imagens: [RESPOSTA 3]
- Hero: [RESPOSTA 4]
- Sem animações. Foco em clareza e rapidez de carregamento.
Conteúdo: [CONTEÚDO]
```

---

## NÍVEL 2 — PREMIUM

| # | Pergunta | Opções |
|---|---|---|
| 1 | Imagem de hero | (a) Foto cheia com overlay escuro + texto por cima **[default]** (b) Slideshow de imagens (c) Vídeo curto em loop |
| 2 | Tipografia | (a) Sans-serif moderna **[default]** (b) Serifada elegante (c) Display/editorial |
| 3 | Paleta de cores | (a) Cor de marca + branco **[default]** (b) Preto/branco/dourado (c) Tons terrosos |
| 4 | Ícones/emojis | (a) Icon set premium (Lucide/Phosphor) **[default]** (b) Ícones SVG customizados (c) Sem ícones, só tipografia |
| 5 | Estrutura de secções | (a) Blocos alternados texto/imagem **[default]** (b) Grid de cards (c) Scroll storytelling |

**Prompt gerado:**
```
Cria um site PREMIUM para [NOME_NEGÓCIO], setor [SETOR].
- Imagens grandes, full-width, sem rebordos (edge-to-edge)
- Hero: [RESPOSTA 1]
- Tipografia: [RESPOSTA 2]
- Paleta: [RESPOSTA 3]
- Ícones: [RESPOSTA 4] (nunca usar emojis nativos do sistema operativo)
- Estrutura: [RESPOSTA 5]
- Estrutura limpa mas com mais respiração visual.
Conteúdo: [CONTEÚDO]
```

---

## NÍVEL 3 — DYNAMIC
*(referência: belgradearbor.rs/en — parallax, progress bar, secções numeradas, mapa interativo)*

| # | Pergunta | Opções |
|---|---|---|
| 1 | Animação de entrada (loading) | (a) Barra de progresso 0–100% **[default]** (b) Fade-in simples (c) Sem intro |
| 2 | Comportamento do scroll | (a) Parallax em camadas **[default]** (b) Scroll-snap por secção (c) Scroll normal com fade-in nos elementos |
| 3 | Hero | (a) Imagem com zoom lento (efeito Ken Burns) **[default]** (b) Vídeo de fundo em loop (c) Sequência de imagens tipo "3D experience" |
| 4 | Secção interativa extra | (a) Mapa/localização com cards ao hover **[default]** (b) Galeria horizontal arrastável (c) Timeline animada (ex: fases de um processo) |
| 5 | Micro-interações | (a) Hover com zoom nas imagens **[default]** (b) Cursor customizado (c) Transição animada entre páginas |
| 6 | Secções numeradas (01/02/03) | (a) Sim **[default]** (b) Não |

**Prompt gerado:**
```
Cria um site DYNAMIC para [NOME_NEGÓCIO], setor [SETOR], inspirado em
belgradearbor.rs/en (parallax storytelling premium).
- Loading: [RESPOSTA 1]
- Scroll: [RESPOSTA 2]
- Hero: [RESPOSTA 3]
- Secção interativa: [RESPOSTA 4]
- Micro-interações: [RESPOSTA 5]
- Secções numeradas: [RESPOSTA 6]
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
   - Gera as 3 pastas: `/standard`, `/premium`, `/dynamic`
