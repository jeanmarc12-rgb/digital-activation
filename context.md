# Digital Activation — Contexto do Projeto

## O que é isto

Agência de activação digital para pequenos negócios locais (restaurantes, lojas, serviços, ateliers, etc.).  
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

| ID  | Nome | Zona | Tipo | Estado |
|-----|------|------|------|--------|
| 001 | Casa Santiago — O Rei do Choco Frito | Setúbal | Restaurante | `demo_criada` |
| 002 | O Batareo | Setúbal | Restaurante | `demo_criada` |
| 003 | Barber Studio (Raquel Nunes) | Setúbal | Barbearia | `demo_criada` |
| 004 | Tradições by Sem Horas | Setúbal | Padaria/Pastelaria | `demo_criada` |
| 005 | Marias & Manéis | Azeitão | Atelier Infantil (e-commerce) | `demo_criada` |

### 2. Ferramentas do modelo de serviço (`tools/`)

- `tools/assessment.html` — formulário com 6 pilares × 4 critérios, score automático, auto-save localStorage, export JSON
- `tools/report.html` — relatório visual com radar chart SVG, score por pilar, quick wins e movimentos estratégicos
- `tools/proposal.html` — proposta interactiva com streams checkáveis, pricing automático e waiver do assessment fee
- `tools/assessments/casa-santiago.json` — assessment feito, Grade C (68/120, 57%)

---

## Demos criadas (`demos/`)

Todas as demos: **HTML + CSS + JS vanilla**, sem dependências, deployáveis em Vercel.  
Deploy manual: `cd demos/<pasta> && vercel --prod --yes`

### Stack e padrão comum
- Fotos reais descarregadas da internet (TripAdvisor, NiT, Zankyou, Alboom, Unsplash)
- Fontes Google Fonts
- Scroll suave, nav fixa com efeito scroll, mobile responsive

---

### Demo 1 — Casa Santiago (`demos/casa-santiago/`)

**Negócio:** Restaurante icónico de Setúbal desde 1974. O Rei do Choco Frito.  
**Presença online:** Só Facebook. Sem site.  
**Deploy:** https://casa-santiago-demo.vercel.app  
**Estética:** Dark premium, dourado, Playfair Display  
**Secções:** Hero → Sobre (foto exterior) → Ementa → Galeria (5 fotos) → Contacto  
**Fotos:** TripAdvisor — exterior-noite, choco-classico, mesa-completa, choco-batatas-sagres, choco-prato-branding  
**Assessment:** Grade C (68/120) — sem site, forte em Local Discovery e SEO

---

### Demo 2 — O Batareo (`demos/o-batareo/`)

**Negócio:** Restaurante de peixe e marisco grelhado do Sado. Rua das Fontaínhas 64, Setúbal.  
**Presença online:** Facebook + Instagram (@obatareo_restaurante). Sem site.  
**Contacto:** 265 234 548 / 914 053 850  
**Horário:** Terça a Domingo, 12h–15h30  
**Estética:** Dark oceânico, teal/azul Sado, Playfair Display  
**Secções:** Hero (foto real como fundo) → Sobre → Ementa (peixe ao kg) → Galeria (6 fotos) → Contacto  
**Fotos:** TripAdvisor + RestaurantGuru — lulas grelhadas, dourada na brasa, peixe grelhado, pratos, exterior

---

### Demo 3 — Barber Studio (`demos/barber-studio/`)

**Negócio:** Barbearia vintage de Raquel Nunes. Av. dos Ciprestes 23C, Setúbal. Abriu 2022.  
**Presença online:** Instagram (@barber_studio_raquel). Sem site.  
**Contacto:** 265 419 947  
**Horário:** Segunda a Sábado, 10h–13h / 14h–19h  
**Preços:** Corte €12 · Corte + Barba €15  
**Estética:** Dark vintage, vermelho/preto (décor real), Bebas Neue display  
**Secções:** Hero (foto de interior como fundo full-bleed) → Sobre → Serviços (6 cards com preços) → Galeria (5 fotos, efeito grayscale→cor) → Contacto  
**Fotos:** Portfólio profissional Alboom/LionsFilms (sessão fotográfica do espaço)

---

### Demo 4 — Tradições by Sem Horas (`demos/tradicoes/`)

**Negócio:** Padaria e pastelaria artesanal. Praça do Brasil 12, Setúbal.  
**Presença online:** Instagram (@tradicoes_semhoras) + Facebook. Sem site.  
**Contacto:** 265 415 487  
**Horário:** Segunda a Sábado, 7h30–19h30  
**Produtos:** Pão artesanal, brioche, pastel de nata, doçaria sazonal, menu do dia (€8)  
**Estética:** Claro e artesanal — fundo creme, terracotta, Cormorant Garamond (completamente diferente dos outros)  
**Secções:** Hero → Sobre → Produtos (4 categorias) → Galeria (5 fotos) → Contacto  
**Fotos:** NiT (artigo) + Unsplash (padaria portuguesa)

---

### Demo 5 — Marias & Manéis (`demos/marias-maneis/`)

**Negócio:** Atelier de roupa personalizada para bebé e criança (0–12 anos). Rua José Augusto Coelho 88, Vila Nogueira de Azeitão.  
**Presença online:** Facebook (28k likes). Sem site.  
**Contacto:** 964 723 101 · marias.maneis@hotmail.com  
**Estética:** Boutique feminina, rosa blush, Cormorant Garamond  
**Tipo de site:** E-commerce com loja online  
**Funcionalidades únicas:**
  - 12 produtos com fotos reais dos produtos (fonte: Zankyou portfolio)
  - Filtros por categoria (Cerimónia / Bebé / Menina / Menino / Acessórios)
  - Seletor de tamanho por produto
  - Carrinho deslizante com contador, controlo de quantidade, total calculado
  - Botão "Confirmar Encomenda" liga diretamente para o atelier
**Fotos produtos:** Portfólio real do Zankyou da Marias & Manéis

---

## Estrutura do repositório

```
digital_activation/
├── context.md
├── demos/
│   ├── casa-santiago/        ← restaurante, dark dourado
│   ├── o-batareo/            ← restaurante, dark teal
│   ├── barber-studio/        ← barbearia, dark vermelho
│   ├── tradicoes/            ← padaria, claro terracotta
│   └── marias-maneis/        ← atelier infantil, e-commerce rosa
├── prospects/
│   └── prospects.json
└── tools/
    ├── assessment.html
    ├── report.html
    ├── proposal.html
    └── assessments/
        └── casa-santiago.json
```

---

## Próximos passos

### A. Contactar os alvos
1. **Casa Santiago** — demo pronta, assessment feito → contactar com link da demo ← **prioritário**
2. **O Batareo** — demo pronta → próximo a contactar
3. **Barber Studio** — demo pronta → próximo a contactar
4. **Tradições** — demo pronta → próximo a contactar
5. **Marias & Manéis** — demo pronta → próximo a contactar

### B. Assessment Casa Santiago — resumo
| Pilar | Score | Notas chave |
|-------|-------|-------------|
| 🌐 Web Presence | 0/20 | Sem website próprio — só Facebook |
| 📍 Local Discovery | 20/20 | GBP completo, +5k reviews, TripAdvisor #19/392 |
| ⭐ Reputation | 15/20 | 4.4★, +5k Google reviews, 954 TripAdvisor |
| 📱 Social Media | 7/20 | Apenas Facebook básico, sem Instagram próprio |
| 🔍 SEO & Content | 20/20 | Top 3 Maps, NiT, Timeout, Deco Proteste |
| 📞 Conversion | 6/20 | Não aceita reservas, sem CTAs, sem website |

**Oportunidade:** Stream 1 (site) + Stream 3 (social) são prioridades óbvias.

### C. Pipeline — prospetar mais negócios
- Continuar a expandir para outros tipos de negócios: clínicas, ginásios, lojas, serviços locais
- Critério: sem site próprio ou site muito fraco, boa reputação local, presença só em redes sociais
