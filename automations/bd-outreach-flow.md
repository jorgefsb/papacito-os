# BD OUTREACH FLOW - Automatización de Business Development

> **Purpose:** Input "Quiero llegar a [tipo de cliente]" → Get lista + emails + follow-up plan automáticamente
> **Agents involved:** Router, BD Hunter (Amber) o Sales Machine (Sparkplug), Research Analyst, Content Strategist
> **Trigger:** BD/Sales request

---

## 🎯 What This Does

**Input:** "Necesito cerrar 3 marcas en Brandcade Q1"

**Output:** BD package completo:
- Target list (50-100 companies researched, top 10 prioritized)
- Email sequences (3-5 touchpoints cada uno)
- LinkedIn outreach templates
- Meeting prep templates
- Follow-up calendario
- Pitch materials (one-pagers, decks)

**Time saved:** 10-15 hrs de BD prep → 2 hrs de review y ejecución

---

## 🔄 How It Works

### Phase 1: Research & Targeting (Automated - 30 min)

**Router activates:**
- BD Hunter (if Amber project) OR Sales Machine (if Sparkplug)
- Research Analyst
- Content Strategist

**Research Analyst:**
1. Builds target list basado en ICP
   - Industry filters
   - Company size
   - Geography
   - Tech stack (if relevant)
   - Pain points indicators

2. Finds contacts
   - Decision makers (title-based)
   - LinkedIn profiles
   - Email addresses (verified)
   - Phone numbers (when available)

3. Prioritizes list
   - Tier 1: Perfect fit (top 10)
   - Tier 2: Good fit (next 20)
   - Tier 3: Worth trying (next 20)

**Output:** `outputs/bd-outreach/[campaign-name]/target-list.csv`

---

### Phase 2: Content Creation (Automated - 45 min)

**Content Strategist + BD Hunter/Sales Machine:**

1. **Email sequences (3-5 emails per prospect)**
   - Email 1: Value-first intro
   - Email 2: Case study / social proof
   - Email 3: Specific pain point
   - Email 4: Soft close
   - Email 5: Breakup email (if no response)

2. **LinkedIn templates**
   - Connection request message
   - Follow-up DM sequence (3 messages)
   - Engagement playbook (what to comment on)

3. **Meeting prep**
   - Company research summary
   - Pain points to probe
   - Questions to ask
   - Pitch angle customized

4. **Pitch materials**
   - One-pager (customized per tier)
   - Deck slides (if needed)
   - Case studies relevant

**Output:** `outputs/bd-outreach/[campaign-name]/content/`

---

### Phase 3: Execution Plan (Automated - 15 min)

**BD Hunter/Sales Machine generates:**

**Week-by-week calendar:**
- Week 1: Research + content prep (done by automation)
- Week 2: Launch outreach (50 contacts)
- Week 3-4: Follow-ups + qualification
- Week 5-6: Meetings + proposals
- Week 7-8: Closing

**Daily tasks:**
- Monday: Send 10 emails, 10 LinkedIn requests
- Tuesday: Follow-up batch 1
- Wednesday: Send 10 more, follow-up batch 2
- Thursday: Qualification calls
- Friday: Meeting prep, proposals

**Metrics to track:**
- Emails sent / Opened / Replied
- LinkedIn connections / Accepted / Responded
- Meetings booked
- Proposals sent
- Deals closed

**Output:** `outputs/bd-outreach/[campaign-name]/execution-plan.md`

---

## 📁 File Structure

```
outputs/bd-outreach/
└── brandcade-q1-2025/
    ├── target-list.csv              # 50 companies, prioritized
    ├── content/
    │   ├── email-sequences/
    │   │   ├── tier-1-sequence.md   # For top 10
    │   │   ├── tier-2-sequence.md
    │   │   └── tier-3-sequence.md
    │   ├── linkedin/
    │   │   ├── connection-requests.md
    │   │   ├── dm-sequence.md
    │   │   └── engagement-playbook.md
    │   ├── pitch-materials/
    │   │   ├── one-pager-tier-1.pdf
    │   │   ├── one-pager-tier-2.pdf
    │   │   └── case-study-deck.pdf
    │   └── meeting-prep/
    │       └── [company-name]-prep.md  # One per Tier 1 company
    ├── execution-plan.md
    └── tracking-dashboard.md
```

---

## 🎬 Example

**Input:** "Necesito cerrar 3 marcas para Brandcade Q1"

**Router detects:**
- Project: Brandcade (Amber #3)
- Activates: BD Hunter + Research Analyst + Content Strategist

**Phase 1: Research**

Research Analyst generates:
- 50 target companies (retail brands LATAM, 100-1000 employees)
- Top 10 Tier 1:
  1. Chedraui (already have AGA!)
  2. Grupo Bimbo
  3. Liverpool
  4. Palacio de Hierro
  5. Sanborns
  6. [etc.]

**Phase 2: Content**

Content Strategist creates:

**Email Sequence (Tier 1 - Grupo Bimbo):**
```
Subject: Grupo Bimbo x Roblox - 230M potential customers

Hola [Name],

Vi que Grupo Bimbo tiene fuerte presencia en retail tradicional.

¿Han considerado Roblox como canal de marketing? 230M usuarios mensuales, 67% Gen Z.

Trabajamos con Chedraui (Embotelladora AGA) creando branded experience que generó [X interactions].

¿15 min para explorar si aplica a Bimbo?

[Calendly link]

Jorge Suárez
GM Amber México
```

**LinkedIn Connection Request:**
```
Hola [Name], me interesa tu trabajo en [Company]. Amber ayuda a marcas LATAM conectar con Gen Z vía Roblox. Me encantaría conectar!
```

**Meeting Prep (Grupo Bimbo):**
```
COMPANY RESEARCH: Grupo Bimbo
- Industry: Food & Beverage
- Size: 135K employees
- LATAM leader
- Pain point: Reaching Gen Z (traditional channels saturated)

PITCH ANGLE: "Nike y Gucci ya están en Roblox. Bimbo puede ser la primera food brand en México."

QUESTIONS TO ASK:
- ¿Cómo llegan actualmente a Gen Z?
- ¿Budget para digital marketing Q1?
- ¿Quién decide estas initiatives?
```

**Phase 3: Execution Plan**

BD Hunter generates calendar:
```
WEEK 1-2 (Jan 6-19): Outreach Launch
- Mon Jan 6: Send emails to Tier 1 (10 companies)
- Tue Jan 7: LinkedIn requests to all contacts
- Wed Jan 8: Send emails to Tier 2 (20 companies)
- Fri Jan 10: Follow-up email #2 to Tier 1

WEEK 3-4 (Jan 20 - Feb 2): Follow-ups & Qualification
- [Calendar detallado]

TARGET:
- 10 meetings booked
- 3-5 proposals sent
- 2-3 deals closed
```

**Total prep time:** 90 min (automation) + 2 hrs (Jorge review)

---

## ⚙️ Configuration

**ICP Templates:**
- Brandcade: Retail brands, 100-1K employees, LATAM
- SparkChatbots: SaaS/Ecommerce, 50-500 employees, customer support pain
- Amber projects: Game studios, publishers
- Custom: Define your own

**Outreach channels:**
- Email (primary)
- LinkedIn (primary)
- Calls (secondary - only warm leads)
- Events (bonus if applicable)

**Sequence length:**
- Standard: 5 touchpoints over 14 days
- Aggressive: 7 touchpoints over 10 days
- Conservative: 3 touchpoints over 21 days

---

## 🎯 Use Cases

### Use Case 1: Brandcade Q1 Pipeline
**Input:** "3 marcas Brandcade Q1"
**Output:** 50 targets + emails + LinkedIn + pitch
**Result:** 10 meetings, 3 proposals, 2 closed
**Time saved:** 15 hrs

### Use Case 2: Sparkplug Chatbot Sales
**Input:** "10 SaaS companies for chatbots"
**Output:** Target list + outreach sequences
**Result:** 5 meetings, 2 closed
**Time saved:** 10 hrs

### Use Case 3: Amber New Client
**Input:** "Game studios needing QA"
**Output:** Studios list + pitch materials
**Result:** 3 meetings, 1 partnership
**Time saved:** 12 hrs

---

## 📊 Success Metrics

**Track automatically:**
- Emails sent: [X]
- Open rate: [Y%] (target: >30%)
- Reply rate: [Z%] (target: >5%)
- Meetings booked: [N] (target: >10)
- Proposals sent: [M]
- Deals closed: [P] (target: 2-3)

**ROI:**
- Time invested: 2-5 hrs (Jorge)
- Deals closed: 2-3
- Average deal value: $20-50K
- **ROI: 10-25X** (time value)

---

## 🚀 Activation

**How to trigger:**

**Option 1: Natural request**
"Necesito cerrar 3 marcas para Brandcade"
→ Router detects → Activates flow

**Option 2: Explicit command**
"Run BD Outreach Flow para [target]"

**Option 3: Scheduled**
"Run BD flow primera semana de cada quarter"

---

## 🔧 Integration Points

**CRM:**
- Export target list to HubSpot/Pipedrive
- Track emails, meetings, deals

**Email tools:**
- lemlist / instantly.ai (cold email automation)
- Gmail / Outlook (manual send)

**LinkedIn:**
- LinkedIn Sales Navigator (if available)
- Manual outreach using templates

**Calendar:**
- Calendly links embedded
- Sync meetings to Google Calendar

---

## 💡 Tips

**To maximize results:**
- **Tier 1 = personalized** (use templates pero customize)
- **Tier 2-3 = semi-automated** (light customization)
- **Follow up persistently** (5-7 touches, not 1-2)
- **Track metrics** (optimize basado en data)

**Common mistakes to avoid:**
- ❌ Generic emails (personalize at least Subject + Line 1)
- ❌ Giving up after 1 email
- ❌ No clear CTA
- ❌ Pitching too early (value first)

---

**Last Updated:** 2025-12-31
**Version:** 1.0 (Fase 1)
