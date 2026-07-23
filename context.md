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
- ✅ Painéis de admin isolados por cliente — magic links com PIN por URL

---

## Admin por cliente — Magic Links (novo, Jul 2026)

Cada demo tem o seu próprio `/admin/` com campos específicos do negócio. O cliente acede via magic link (PIN na URL), sem conta GitHub.

### Arquitectura

```
demos/[site]/admin/index.html   ← painel isolado daquele negócio
api/save.js                     ← endpoint central — valida PIN + escreve no GitHub via PAT
```

**Fluxo:** cliente abre link → formulário carrega dados actuais do `_data/*.json` → edita → guarda → `api/save.js` valida PIN → commit no GitHub → Vercel reconstrói em ~60s.

### Magic links activos

Os admins funcionam via o projecto principal (`digital-activation.vercel.app`):

| Site | Magic link | PIN |
|------|-----------|-----|
| Casa Santiago | `https://digital-activation.vercel.app/demos/casa-santiago/admin/?acesso=santiago2024` | `santiago2024` |
| O Batareo | `https://digital-activation.vercel.app/demos/o-batareo/admin/?acesso=batareo2024` | `batareo2024` |
| Barber Studio | `https://digital-activation.vercel.app/demos/barber-studio/admin/?acesso=barber2024` | `barber2024` |
| Tradições | `https://digital-activation.vercel.app/demos/tradicoes/admin/?acesso=tradicoes2024` | `tradicoes2024` |
| Marias & Manéis | `https://digital-activation.vercel.app/demos/marias-maneis/admin/?acesso=marias2024` | `marias2024` |

Os domínios demo (ex: `casa-santiago-demo.vercel.app/admin/`) também funcionarão assim que ligados ao GitHub via Settings → Git no Vercel.

### Variáveis de ambiente no Vercel (projecto `digital-activation`)

| Variável | Descrição |
|----------|-----------|
| `GITHUB_PAT` | Personal Access Token (scope: repo, no expiration) — conta jeanmarc12-rgb |
| `ADMIN_KEY_CASA_SANTIAGO` | PIN do painel Casa Santiago |
| `ADMIN_KEY_O_BATAREO` | PIN do painel O Batareo |
| `ADMIN_KEY_BARBER_STUDIO` | PIN do painel Barber Studio |
| `ADMIN_KEY_TRADICOES` | PIN do painel Tradições |
| `ADMIN_KEY_MARIAS_MANEIS` | PIN do painel Marias & Manéis |
| `GITHUB_CLIENT_ID` | OAuth App (Decap CMS legacy) |
| `GITHUB_CLIENT_SECRET` | OAuth App (Decap CMS legacy) |

---

## Decap CMS — Setup (legacy, substituído pelos magic links)

O admin central em `/admin/` ainda existe mas foi substituído pelos painéis isolados por cliente.

- `admin/index.html` — Decap CMS UI (todos os sites num só painel)
- `admin/config.yml` — schema de todos os sites
- `api/auth.js` — OAuth proxy — redireccionamento GitHub
- `api/callback.js` — OAuth proxy — troca código por token

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

### Admin por cliente (magic links)

```
demos/[site]/
└── admin/
    └── index.html      ← painel isolado do negócio (PIN via URL ?acesso=KEY)

api/
├── auth.js             ← OAuth proxy — redireccionamento GitHub (Decap legacy)
├── callback.js         ← OAuth proxy — troca código por token (Decap legacy)
└── save.js             ← endpoint de gravação — valida PIN + escreve no GitHub
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

## Estado das vendas (Jul 2026)

| Prospect | Estado |
|----------|--------|
| Casa Santiago | Tentativa de contacto — não atendeu. Voltar a tentar. |
| O Batareo | Pronto para contactar |
| Barber Studio | Pronto para contactar |
| Tradições | Pronto para contactar |
| Marias & Manéis | Site com carrinho WhatsApp (fix Jul 2026). Pronto para contactar. |

---

## CRM de Prospecção (`tools/crm.html`)

Criado em Jul 2026. Disponível em `https://digital-activation.vercel.app/tools/crm.html`.

- **112 leads** pré-carregados (5 demos existentes + 107 novos encontrados em directórios PT)
- Leads novos cobrem: Faro/Algarve, Braga/Guimarães, Viseu/Lamego, Coimbra/Figueira, Évora/Alentejo, Setúbal/Sesimbra, Santarém/Tomar
- Tipos: restaurantes, tascas, cabeleireiros, barbearias, padarias, ateliers infantis
- Funcionalidades: dashboard com stats, "Para Chamar Hoje", agendadas, ficha por lead, script personalizado por tipo de negócio, registo de chamadas, coaching via Claude
- Dados guardados em localStorage (auto-merge de novos leads sem apagar dados existentes)
- Objectivo diário: 20 chamadas

### Abordagem de vendas validada

**Regra principal:** não começar com nome nem empresa — começar com uma pergunta que revela a dor.

Três aberturas leves que funcionam:
1. *"Bom dia, aparecem quando pesquiso '[tipo] em [zona]' no Google?"*
2. *"Bom dia, vi o vosso negócio e reparei que não têm website — é uma escolha ou algo que estão a pensar?"*
3. *"Bom dia, trabalho com negócios aqui na zona a aparecerem no Google. Tenho dois minutos para lhe mostrar como o vosso aparece agora?"*

Apresentação pessoal e empresa vêm depois de o cliente estar curioso — não na abertura.

### Workflow de prospecção

1. Abrir CRM → ver "Para Chamar Hoje" (ordenado por prioridade)
2. Abrir ficha do lead → ver script personalizado
3. Ligar → registar resultado (não atendeu / callback / reunião / não interessado)
4. Se positivo → construir demo em 1-2h → enviar link por WhatsApp
5. Nunca construir demo antes de ter interesse confirmado

### Fix: GITHUB_PAT expirado (Jul 2026)

O GITHUB_PAT expira. Quando o admin de um cliente deixar de guardar (erro 401), renovar em:
1. github.com/settings/tokens → Generate new token (classic) → scope: `repo`, **No expiration**
2. Vercel → digital-activation → Settings → Environment Variables → actualizar `GITHUB_PAT`
3. Redeploy no Vercel

---

## Próximos passos

1. **Fazer chamadas** — usar CRM diariamente, objectivo 20/dia
2. **Casa Santiago** — voltar a ligar (não atendeu na primeira tentativa)
3. **Marias & Manéis** — prioridade alta: 28K Facebook, sem website, encomendas por DM
4. **Quando positivo** — construir demo em 1-2h, enviar link
5. **Analytics** — instalar GA4 quando primeiro cliente confirmar
6. **Política de privacidade** — necessária antes de ir a live com analytics

---

## Estrutura do repositório

```
digital_activation/
├── context.md
├── admin/
│   ├── index.html              ← Decap CMS (todos os sites)
│   └── config.yml              ← schema de conteúdo
├── api/
│   ├── auth.js                 ← OAuth proxy — auth (Decap legacy)
│   ├── callback.js             ← OAuth proxy — callback (Decap legacy)
│   └── save.js                 ← gravação via PIN + GitHub PAT
├── demos/
│   ├── casa-santiago/          ← dark dourado, restaurante (admin/ activo)
│   ├── o-batareo/              ← dark teal, restaurante peixe (admin/ activo)
│   ├── barber-studio/          ← dark vermelho, barbearia (admin/ activo)
│   ├── tradicoes/              ← claro terracotta, padaria (admin/ activo)
│   └── marias-maneis/          ← rosa blush, e-commerce infantil (admin/ activo)
├── prospects/
│   └── prospects.json
└── tools/
    ├── assessment.html
    ├── report.html
    ├── proposal.html           ← 4 streams, preços actualizados
    ├── crm.html                ← CRM de prospecção com 112 leads (Jul 2026)
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
