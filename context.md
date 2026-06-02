# Digital Activation — Contexto do Projeto

## O que é isto

Agência de criação de sites para pequenos negócios locais (restaurantes, marisqueiras, cafés, etc.) sem presença web.  
Modelo de negócio: prospetamos alvos sem site → criamos demo personalizada → contactamos o negócio → convertemos em clientes.

## O que foi feito até agora

### 1. Sistema de prospeção automática (`prospects/`)

- Ficheiro `prospects/prospects.json` com base de dados de alvos prospetados
- Cada prospect tem: nome, tipo, zona, contactos, presença digital atual, estado no funil, URL da demo
- Estados do funil: `prospeto` → `demo_criada` → `contactado` → `cliente` / `descartado`
- Critério de qualificação: negócios **sem site próprio** são os alvos prioritários

Prospects atuais:
| ID  | Nome | Zona | Estado |
|-----|------|------|--------|
| 001 | Casa Santiago — O Rei do Choco Frito | Setúbal | `demo_criada` |
| 002 | O Miguel | Setúbal | `descartado` (tem site) |
| 003 | Lobo do Mar | Sesimbra | `descartado` (tem site) |
| 004 | Marisqueira Modesto | Sesimbra | `descartado` (tem site) |

---

### 2. Site demo — Casa Santiago (`demos/casa-santiago/`)

Demo criada para a Casa Santiago (O Rei do Choco Frito), restaurante icónico de Setúbal desde 1974.  
Sem site próprio, apenas página de Facebook.

**Deploy:** https://casa-santiago-demo.vercel.app

**Stack:** HTML + CSS + JS vanilla (sem dependências, deploy rápido)

**Estrutura do site:**
- Hero com frase de impacto e CTA para reserva
- Secção "Sobre" com história do restaurante (desde 1974)
- Ementa com pratos principais (choco frito, mariscos, petiscos)
- Galeria — **ainda com placeholders** (fotos reais por adicionar)
- Contacto com morada, telefone e horário

**Fotos na galeria (`assets/`):**
- `exterior-noite.jpg` — fachada iluminada à noite com insígnia "Rei do Choco Frito"
- `choco-classico.jpg` — choco frito numa travessa com salada, azeitonas e Sagres
- `mesa-completa.jpg` — mesa com várias travessas (ambiente de grupo)
- `choco-batatas-sagres.jpg` — close-up choco + batatas fritas + Sagres
- `choco-prato-branding.jpg` — choco no prato branco com logo "O Rei do Choco Frito — Casa Santiago"

Fonte: fotos de visitantes no TripAdvisor (uso legítimo para demo).

**O que falta:**
- [ ] Contactar a Casa Santiago com o link da demo

---

## Estrutura do repositório

```
digital_activation/
├── context.md              ← este ficheiro
├── demos/
│   └── casa-santiago/      ← demo do primeiro alvo
│       ├── index.html
│       ├── style.css
│       ├── script.js
│       └── assets/         ← vazia (fotos por adicionar)
└── prospects/
    └── prospects.json      ← base de dados de alvos
```

---

## Próximos passos

1. Adicionar fotos reais à galeria da Casa Santiago (assets/)
2. Contactar a Casa Santiago por email/telefone com o link da demo
3. Prospetar mais negócios na zona de Setúbal/Sesimbra sem site
4. Criar demos para novos alvos qualificados
