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
Stream 3 · ENGAGEMENT   → Social media (gestão + conteúdo)
Stream 4 · REPUTATION   → Monitorização reviews + PR + imprensa
Stream 5 · CONVERSION   → Reservas online + email marketing + menu UX
```

### Preços

| Produto | Tipo | Valor |
|---------|------|-------|
| Assessment Report | One-time | €297–€497 |
| Foundation Pack | One-time | €800–€1500 |
| Activation Retainer | Mensal | €200–€500/mês |
| Performance Add-on | % receita | Clientes premium |

---

## Decisões de Produto

- **Sites são produção desde o início** — preços, horários, fotos e dados têm de ser reais. Não são demos.
- **CMS: Decap CMS** — painel admin em `/admin/`, gratuito, git-based, Vercel auto-deploy. Pending: criar GitHub OAuth App (ver abaixo).
- **E-commerce: adiado** — Marias & Manéis mantém carrinho actual por agora.
- **Quality checklist**: entregue com cada site — `tools/quality/[site].json` preenchido por Claude, visualizado em `tools/quality-report.html`.
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
- ⏳ GitHub OAuth App — passo manual pendente para activar o admin CMS

---

## Ferramentas internas (`tools/`)

| Ficheiro | O que faz |
|----------|-----------|
| `assessment.html` | Formulário 6 pilares, score automático, export JSON |
| `report.html` | Relatório visual com radar chart SVG |
| `proposal.html` | Proposta interactiva com pricing automático |
| `quality-report.html` | Checklist de qualidade pré-entrega (carrega `quality/[site].json`) |
| `assessments/[site].json` | Assessment preenchido por pilar |
| `quality/[site].json` | Checklist de qualidade preenchida — entregue com o site |

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

### Quality checklist
- Preencher `tools/quality/[site].json` e entregar com o site
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

## Decap CMS — Setup pendente

Para activar o painel admin (`/admin/`), criar o GitHub OAuth App uma vez:

1. github.com/settings/developers → OAuth Apps → New OAuth App
2. Application name: `Digital Activation CMS`
3. Homepage URL: `https://digital-activation.vercel.app`
4. Authorization callback URL: `https://digital-activation.vercel.app/admin/`
5. Copiar Client ID → colar em `admin/config.yml` linha 16 (`app_id:`)
6. `git push` → admin activo

Após setup, o cliente edita preços/horário/ementa no browser e o Vercel republica automaticamente.

---

## Estrutura do repositório

```
digital_activation/
├── context.md
├── admin/
│   ├── index.html              ← Decap CMS (todos os sites)
│   └── config.yml              ← schema de conteúdo
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
    ├── proposal.html
    ├── quality-report.html
    ├── assessments/
    │   ├── casa-santiago.json
    │   ├── o-batareo.json
    │   ├── barber-studio.json
    │   ├── tradicoes.json
    │   └── marias-maneis.json
    └── quality/
        └── casa-santiago.json
```

---

## Próximos passos

1. **Criar GitHub OAuth App** → activar Decap CMS admin
2. **Contactar Casa Santiago** — site + assessment + quality report prontos → prioritário
3. **Preencher quality checklists** dos outros 4 sites (`tools/quality/`)
4. **Prospetar novos negócios** — critério: sem site, boa reputação local
5. **Analytics** — instalar GA4 quando primeiro cliente confirmar
