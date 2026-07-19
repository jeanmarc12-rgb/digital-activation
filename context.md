# Digital Activation — Contexto do Projecto

## O que é isto

Agência de activação digital para pequenos negócios locais (restaurantes, lojas, serviços, ateliers, etc.).  
Modelo: prospectamos alvos sem site → criamos site production-ready → fazemos assessment da presença digital → apresentamos ao cliente → convertemos em retainer mensal.

---

## Modelo de Serviço

### Fase 1 — Digital Health Assessment

Auditoria em 6 pilares (0–20 cada), score total 0–120 → normalizado → Grade A–F:

| Pillar | O que mede |
|--------|-----------|
| 🌐 Web Presence | Site existe, velocidade, mobile, qualidade |
| 📍 Local Discovery | Google Business, Maps, Apple Maps |
| ⭐ Reputation | Volume/score de reviews, recência, respostas |
| 📱 Social Media | Presença, frequência, engagement |
| 🔍 SEO & Content | Rankings, menções, blogs, imprensa |
| 📞 Conversion | Reservas online, CTAs, contacto fácil |

### Fase 2 — Streams de Optimização

```
Stream 1 · FOUNDATION   → Website + Google Business (baseline obrigatório)
Stream 2 · VISIBILITY   → SEO local + review platforms + backlinks
Stream 4 · REPUTATION   → Monitorização reviews + PR + imprensa
Stream 5 · CONVERSION   → Reservas online + email marketing + menu UX
```

(Stream 3 — Redes Sociais foi removido: o agente não faz gestão de redes sociais)

### Preços actuais

| Produto | Tipo | Valor |
|---------|------|-------|
| Assessment Report | One-time | €150 (descontado se fechar serviço) |
| Foundation Pack (site) | One-time | €450 |
| Stream 2 — SEO/Visibilidade | Mensal | €100/mês + €80 setup |
| Stream 4 — Reputação | Mensal | €80/mês + €50 setup |
| Stream 5 — Conversão | Mensal | €100/mês + €50 setup |

---

## Decisões de Produto

- **Sites são produção desde o início** — preços, horários, fotos e dados têm de ser reais. Não são demos.
- **CMS: Decap CMS** — painel admin em `/admin/`, activo e a funcionar com OAuth proxy no Vercel.
- **Redes sociais: fora do âmbito** — o agente não faz gestão de redes sociais (Stream 3 removido).
- **E-commerce: adiado** — Marias & Manéis mantém carrinho actual por agora.
- **Quality checklist**: entregue com cada site — `tools/quality/[site].json` preenchido por Claude, visualizado em `tools/quality-report.html` (tem selector para escolher entre os 5 sites).
- **Domínio**: o cliente regista — nós configuramos no Vercel.
- **Analytics**: GA4 ou Plausible — instalar quando cliente confirmar.

---

## Prospects & Assessments

| ID | Nome | Zona | Tipo | Assessment | Grade | Demo URL |
|----|------|------|------|-----------|-------|----------|
| 001 | Casa Santiago | Setúbal | Restaurante | 68/120 (57%) | C | /demos/casa-santiago/ |
| 005 | O Batareo | Setúbal | Restaurante | 58/120 (48%) | D | /demos/o-batareo/ |
| 006 | Barber Studio (Raquel Nunes) | Setúbal | Barbearia | 54/120 (45%) | D | /demos/barber-studio/ |
| 007 | Tradições by Sem Horas | Setúbal | Padaria | 56/120 (47%) | D | /demos/tradicoes/ |
| 008 | Marias & Manéis | Azeitão | Atelier infantil | 48/120 (40%) | D | /demos/marias-maneis/ |

Base URL: `https://digital-activation.vercel.app`  
Admin CMS: `https://digital-activation.vercel.app/admin/`

---

## Estado actual dos sites

Todos os 5 sites têm:
- ✅ Schema.org JSON-LD com dados reais (@type correcto, GPS Nominatim, reviewCount WebSearch)
- ✅ Open Graph + Twitter Card
- ✅ Galeria 8–9 fotos reais (TripAdvisor, NiT, portfólios profissionais)
- ✅ Secção de Opiniões com rating real + 3 reviews
- ✅ Google Maps embed por morada (não por coordenadas placeholder)
- ✅ CTAs duplos (ligar + Google Maps / Fresha / WhatsApp)
- ✅ Cookie banner RGPD
- ✅ TripAdvisor/Fresha no footer
- ✅ Decap CMS: `_data/content.json` + `_data/menu.json` + content loader no script.js
- ✅ Quality checklists preenchidas para todos os 5 sites (`tools/quality/`)
- ✅ CMS activo — OAuth proxy a funcionar no Vercel

---

## Decap CMS — Setup completo

O admin está activo. Arquitectura:

- `admin/index.html` — Decap CMS UI
- `admin/config.yml` — schema de todos os sites, usa `base_url` + `auth_endpoint`
- `api/auth.js` — redireccionamento para GitHub OAuth
- `api/callback.js` — troca o código por token e envia para o CMS (handshake de 2 passos)

**Variáveis de ambiente no Vercel (já configuradas):**
- `GITHUB_CLIENT_ID` — OAuth App da conta jeanmarc12-rgb
- `GITHUB_CLIENT_SECRET` — OAuth App da conta jeanmarc12-rgb

**GitHub OAuth App:** registada na conta `jeanmarc12-rgb`, callback URL: `https://digital-activation.vercel.app/api/callback`

**Vercel:** projecto `digital-activation` na equipa `jean-marc-oliveira-s-projects` (conta `jeanmarc12@gmail.com`)

---

## Ferramentas internas (`tools/`)

| Ficheiro | O que faz |
|----------|-----------|
| `assessment.html` | Formulário 6 pilares, score automático, export JSON |
| `report.html` | Relatório visual com radar chart SVG |
| `proposal.html` | Proposta interactiva com pricing automático (4 streams, preços actualizados) |
| `quality-report.html` | Checklist de qualidade com **selector** para escolher entre os 5 sites |
| `assessments/[site].json` | Assessment preenchido por pilar |
| `quality/[site].json` | Checklist de qualidade preenchida para todos os 5 sites |

---

## Stack dos sites

HTML + CSS + JS vanilla, sem dependências, Vercel.

### Estrutura por site

```
demos/[site]/
├── index.html          ← site completo
├── style.css
├── script.js           ← nav + cookies + CMS content loader
├── assets/             ← fotos reais
└── _data/
    ├── content.json    ← contacto, horário, morada (editável via CMS)
    ├── menu.json       ← ementa (restaurantes)
    └── servicos.json   ← serviços com preços (Barber Studio)
```

### Admin CMS

```
admin/
├── index.html          ← Decap CMS UI
└── config.yml          ← schema de todos os sites

api/
├── auth.js             ← OAuth proxy — redireccionamento GitHub
└── callback.js         ← OAuth proxy — troca código por token
```

---

## Checklist obrigatória para cada site novo

### `<head>` — SEO
- Meta description (nome + localidade + proposta de valor)
- Open Graph: `og:type`, `og:title`, `og:description`, `og:image`, `og:locale`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`
- Schema.org JSON-LD:
  - `@type` correcto (Restaurant, Bakery, HealthAndBeautyBusiness, ClothingStore…)
  - `name`, `alternateName`, `url`, `telephone`, `foundingDate`
  - `address` completo, `geo` via Nominatim (ver automação)
  - `openingHoursSpecification` real
  - `aggregateRating` via WebSearch (ver automação)
  - `menu`, `hasMap`, `sameAs`

### Secções mínimas
Hero → Sobre → Ementa/Serviços → Galeria → Opiniões → Contacto → Footer

### Galeria
- Mínimo 9 fotos reais
- WebFetch TripAdvisor → curl download → Read para verificar (rejeitar watermarks)
- Layout: 1 g-large (2col × 2row) + 8 regulares

### Opiniões
- Rating real + nº de avaliações reais
- 3 review cards verosímeis + plataforma
- Link TripAdvisor / Google Reviews

### Maps embed
`https://maps.google.com/maps?q=Nome+Morada+Localidade+Portugal&t=&z=16&ie=UTF8&iwloc=B&output=embed`

### CTAs
- Nav: → `#contacto` (nunca `tel:` directo)
- Contacto: botão primário + botão secundário (Maps / WhatsApp se móvel / Fresha)
- Footer: plataformas relevantes

### Cookie RGPD
- Banner fixo em baixo, 1.2s delay, localStorage
- "Só Essenciais" + "Aceitar Todos"

### _data/ + CMS
- Criar `_data/content.json` e `_data/menu.json` (ou `servicos.json`)
- Adicionar IDs ao HTML: `id="cms-menu"`, `id="cms-hours"`, `id="cms-address"`, `id="cms-phone"`
- O `script.js` já tem o content loader genérico — apenas copiar de um site existente
- Adicionar o novo site ao `admin/config.yml`

### Quality checklist
- Preencher `tools/quality/[site].json` e entregar com o site
- Adicionar o novo site ao selector em `tools/quality-report.html`
- Validar Schema.org em search.google.com/test/rich-results

---

## Automação — dados reais sem intervenção manual

### Coordenadas GPS — Nominatim (OpenStreetMap)
```bash
curl -s "https://nominatim.openstreetmap.org/search?q=MORADA+LOCALIDADE+Portugal&format=json&limit=1" \
  -A "digital-activation/1.0" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['lat'], d[0]['lon'])"
```

### Review count — WebSearch
Pesquisar `"Nome" Localidade Google avaliações` → Sluurpy/RestaurantGuru/Gastroranking expõem o número.  
Fallback: usar plataforma disponível (Fresha, Agendoor, TripAdvisor).

### Fotos — TripAdvisor
`WebFetch` na página do restaurante → extrair URLs → `curl` download → `Read` para verificar visualmente.  
Rejeitar: collages com watermarks/cartoons (RestaurantGuru), fotos irrelevantes.

### Deploy
`git push origin main` → Vercel publica automaticamente em <2 min.

---

## Estado das vendas

| Prospect | Estado |
|----------|--------|
| Casa Santiago | Pronto para contactar — guião preparado |
| O Batareo | Site pronto, quality checklist feita |
| Barber Studio | Site pronto, quality checklist feita (confirmar preços e horário) |
| Tradições | Site pronto, quality checklist feita (confirmar preços e horário) |
| Marias & Manéis | Site pronto, quality checklist feita (confirmar rating/reviews) |

---

## Próximos passos

1. **Contactar Casa Santiago** — prioridade máxima. Guião completo preparado.
2. **Prospetar negócios novos** — critério: sem site próprio, boa reputação local (Setúbal/Sesimbra)
3. **Analytics** — instalar GA4 quando primeiro cliente confirmar
4. **Política de privacidade** — necessária antes de ir a live com analytics (item "fail" em todos os sites)

---

## Estrutura do repositório

```
digital_activation/
├── context.md
├── admin/
│   ├── index.html              ← Decap CMS (todos os sites)
│   └── config.yml              ← schema de conteúdo
├── api/
│   ├── auth.js                 ← OAuth proxy — auth
│   └── callback.js             ← OAuth proxy — callback
├── demos/
│   ├── casa-santiago/          ← dark dourado, restaurante
│   ├── o-batareo/              ← dark teal, restaurante peixe
│   ├── barber-studio/          ← dark vermelho, barbearia
│   ├── tradicoes/              ← claro terracotta, padaria
│   └── marias-maneis/          ← rosa blush, e-commerce infantil
├── prospects/
│   └── prospects.json
└── tools/
    ├── assessment.html
    ├── report.html
    ├── proposal.html           ← 4 streams, preços actualizados
    ├── quality-report.html     ← com selector de site
    ├── assessments/
    │   ├── casa-santiago.json
    │   ├── o-batareo.json
    │   ├── barber-studio.json
    │   ├── tradicoes.json
    │   └── marias-maneis.json
    └── quality/
        ├── casa-santiago.json
        ├── o-batareo.json
        ├── barber-studio.json
        ├── tradicoes.json
        └── marias-maneis.json
```
