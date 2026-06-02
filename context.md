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

### A. Ferramentas do modelo de serviço (a construir)
1. **Template do Assessment** — checklist/formulário para auditar qualquer negócio em 30 min, com cálculo automático do score por pilar
2. **Digital Health Report** — página web ou PDF gerado automaticamente com o score, grade e recomendações
3. **Proposal Template** — proposta de Activation Roadmap com os streams selecionados e pricing

### B. Casa Santiago (primeiro cliente alvo)
4. Resolver placeholder da secção "Sobre"
5. Contactar a Casa Santiago com o link da demo
6. Fazer o assessment da presença digital da Casa Santiago como primeiro caso real

### C. Pipeline
7. Prospetar mais negócios em Setúbal/Sesimbra sem site
8. Criar demos para novos alvos qualificados
