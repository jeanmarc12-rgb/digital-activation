# Digital Activation — Contexto do Projeto

## O que é isto

Agência de activação digital para pequenos negócios locais (restaurantes, marisqueiras, cafés, etc.).  
O modelo evoluiu: não vendemos apenas sites — vendemos **crescimento de receita digital** posicionado como consultoria.

Funil base: prospetamos alvos → criamos demo personalizada → fazemos assessment da presença digital → apresentamos roadmap de activação → convertemos em clientes com retainer mensal.

---

## Modelo de Serviço — Digital Activation

### Fase 1 — Digital Health Assessment

Auditoria em 6 pilares, cada um com score 0–20:

| Pillar | O que mede |
|--------|-----------|
| 🌐 Web Presence | Site existe, velocidade, mobile, qualidade |
| 📍 Local Discovery | Google Business, Maps, Apple Maps |
| ⭐ Reputation | Volume/score de reviews, recência, respostas |
| 📱 Social Media | Presença, frequência, engagement |
| 🔍 SEO & Content | Rankings, menções, blogs, imprensa |
| 📞 Conversion | Reservas online, CTAs, contacto fácil |

**Score total: 0–120 → normalizado 0–100 → Grade A a F**

Output: **Digital Health Report** — score por pilar, benchmark contra concorrentes locais, quick wins vs movimentos estratégicos.

### Fase 2 — Streams de Optimização (o que se vende)

```
Stream 1 · FOUNDATION   → Website + Google Business (baseline obrigatório)
Stream 2 · VISIBILITY   → SEO local + review platforms + backlinks
Stream 3 · ENGAGEMENT   → Social media (gestão + conteúdo)
Stream 4 · REPUTATION   → Monitorização reviews + PR + imprensa
Stream 5 · CONVERSION   → Reservas online + email marketing + menu UX
```

### Modelo de preços

| Produto | Tipo | Valor orientativo |
|---------|------|------------------|
| Assessment Report | One-time | €297–€497 (descontado se assinar serviço) |
| Foundation Pack | One-time | €800–€1500 (website + Google Business) |
| Activation Retainer | Mensal | €200–€500/mês (2–3 streams activos) |
| Performance Add-on | % receita atribuída | Para clientes premium |

### Argumento de venda
> *"Um restaurante com 50 reviews de 4.5 estrelas mas sem site está a perder 60% dos clientes que pesquisam online antes de decidir onde jantar. Fazemos o diagnóstico exato do que estás a perder — e resolvemos."*

---

## O que foi construído

### 1. Sistema de prospeção (`prospects/`)

- `prospects/prospects.json` — base de dados de alvos com estado no funil
- Estados: `prospeto` → `demo_criada` → `contactado` → `cliente` / `descartado`
- Critério de qualificação: negócios **sem site próprio** são alvos prioritários

| ID  | Nome | Zona | Estado |
|-----|------|------|--------|
| 001 | Casa Santiago — O Rei do Choco Frito | Setúbal | `demo_criada` |
| 002 | O Miguel | Setúbal | `descartado` (tem site) |
| 003 | Lobo do Mar | Sesimbra | `descartado` (tem site) |
| 004 | Marisqueira Modesto | Sesimbra | `descartado` (tem site) |

### 2. Site demo — Casa Santiago (`demos/casa-santiago/`)

Restaurante icónico de Setúbal desde 1974. Sem site próprio, apenas Facebook.

**Deploy:** https://casa-santiago-demo.vercel.app  
**Stack:** HTML + CSS + JS vanilla (sem dependências)  
**Deploy manual:** `cd demos/casa-santiago && vercel --prod --yes` (não tem auto-deploy do GitHub)

**Secções:** Hero → Sobre → Ementa → Galeria → Contacto

**Fotos na galeria (`assets/`)** — fonte: TripAdvisor (reviews de visitantes):
- `exterior-noite.jpg` — fachada iluminada à noite
- `choco-classico.jpg` — choco frito com azeitonas e Sagres
- `mesa-completa.jpg` — mesa com várias travessas
- `choco-batatas-sagres.jpg` — choco + batatas + Sagres (close-up)
- `choco-prato-branding.jpg` — choco no prato com logo Casa Santiago

**Pendente no site:**
- [ ] Placeholder da secção "Sobre" (foto do interior/fachada de dia ainda por adicionar)
- [ ] Contactar a Casa Santiago com o link da demo

---

## Estrutura do repositório

```
digital_activation/
├── context.md
├── demos/
│   └── casa-santiago/
│       ├── index.html
│       ├── style.css
│       ├── script.js
│       └── assets/          ← 5 fotos reais na galeria
└── prospects/
    └── prospects.json
```

---

## Próximos passos (por ordem de prioridade)

### A. Ferramentas do modelo de serviço ✅ CONCLUÍDO
- `tools/assessment.html` — formulário com 6 pilares × 4 critérios, score automático, auto-save em localStorage, export JSON
- `tools/report.html` — relatório visual com radar chart SVG, score por pilar, quick wins e movimentos estratégicos auto-gerados
- `tools/proposal.html` — proposta interactiva com streams checkáveis, pricing automático e waiver do assessment fee

### B. Casa Santiago (primeiro cliente alvo)
4. Resolver placeholder da secção "Sobre"
5. **Contactar a Casa Santiago com o link da demo** ← próximo passo imediato
6. ✅ Assessment feito — Grade C (68/120, 57%) — ver `tools/assessments/casa-santiago.json`

**Assessment Casa Santiago — resumo:**
| Pilar | Score | Notas chave |
|-------|-------|-------------|
| 🌐 Web Presence | 0/20 | Sem website próprio — só Facebook |
| 📍 Local Discovery | 20/20 | GBP completo, +5k reviews, TripAdvisor #19/392 |
| ⭐ Reputation | 15/20 | 4.4★, +5k Google reviews, 954 TripAdvisor |
| 📱 Social Media | 7/20 | Apenas Facebook básico, sem Instagram próprio |
| 🔍 SEO & Content | 20/20 | Top 3 Maps, NiT, Timeout, Deco Proteste, etc. |
| 📞 Conversion | 6/20 | Não aceita reservas, sem CTAs, sem website |

**Oportunidade:** Os pilares perfeitos (Local Discovery + SEO) mostram uma reputação forte que o site vai capitalizar imediatamente. Stream 1 + Stream 3 são as prioridades óbvias.

### Workflow de automação de assessments
Para cada nova lead:
1. Claude pesquisa a presença digital (WebSearch)
2. Gera `tools/assessments/<slug>.json`
3. Gera URL base64 para carregar directo no `assessment.html`
4. Actualiza `prospects.json` com os dados do assessment

### C. Pipeline
7. Prospetar mais negócios em Setúbal/Sesimbra sem site
8. Criar demos para novos alvos qualificados
