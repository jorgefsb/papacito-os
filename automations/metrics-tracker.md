# METRICS TRACKER - Seguimiento Automático de Métricas

> **Purpose:** Track métricas de 12 proyectos automáticamente + alertas cuando algo necesita atención
> **Agents involved:** Router, All project agents, Research Analyst
> **Trigger:** Scheduled (daily/weekly) + on-demand

---

## 🎯 What This Does

**Automatically tracks:**
- Health de 12 proyectos estratégicos
- KPIs críticos por proyecto
- Progress vs targets
- Blockers y red flags
- Trends (improving / declining)

**Alerts when:**
- Proyecto off-track
- KPI below threshold
- Blocker detected
- Milestone missed

**Output:** Dashboard actualizado + alertas proactivas

**Time saved:** 3-5 hrs/semana de manual tracking → 10 min de review

---

## 🔄 How It Works

### Daily Check (Automated - Every morning)

**For each of 12 projects:**

1. **Life Coach checks:** Energy level, burnout risk
2. **Project agent checks:** Status, progress, blockers
3. **Research Analyst checks:** External factors (market, competition)

**Outputs:**
- Update dashboard
- Flag red/yellow items
- Generate daily summary

---

### Weekly Deep Dive (Automated - Monday AM)

**Full health check:**

1. **OKR Progress**
   - Each project's OKRs
   - % complete
   - On-track / At-risk / Off-track

2. **Resource Allocation**
   - Jorge's time spent per project
   - Team allocation
   - Budget vs actual

3. **Momentum**
   - Wins last week
   - Blockers resolved
   - New blockers added

4. **Trends**
   - Improving (🟢)
   - Stable (🟡)
   - Declining (🔴)

**Output:** Weekly dashboard + recommendations

---

### Monthly Review (Automated - First Monday of month)

**Strategic review:**

1. **OKR Scorecard** (all projects)
2. **80/20 Check** (is Jorge actually spending 80% Amber, 20% Sparkplug?)
3. **Leverage Analysis** (which activities = highest ROI)
4. **Energy Audit** (burnout risk assessment)

**Output:** Monthly report + strategic adjustments

---

## 📊 Dashboard Structure

### Main Dashboard

```markdown
# PapacitoOS Metrics Dashboard
**Last Updated:** 2025-12-31 08:00 AM
**Overall Health:** 🟢 Healthy

---

## 🎮 AMBER STUDIO (80% Priority)

### Project 1: GM Amber México - Estrategia
**Status:** 🟢 On track
**Key Metrics:**
- Revenue Q1: $2.8M / $2.5M target ✅ (112%)
- Headcount: 208 / 210 target ⚠️ (99%)
- Retention: 96% / 95% target ✅
**This Week:**
- ✅ Closed $500K deal
- ⚠️ 2 senior hires pending (risk to Q1 target)
**Next Action:** Follow up with Diana on hiring pipeline

---

### Project 2: Business Development Amber
**Status:** 🟡 Watch
**Key Metrics:**
- Pipeline: $4.2M (strong)
- Meetings this week: 5 / 8 target ⚠️
- Win rate: 22% / 25% target ⚠️
**This Week:**
- ✅ 3 proposals sent
- 🔴 Lost deal with [Company X] - need post-mortem
**Next Action:** Improve win rate - review lost deals

---

### Project 3: Brandcade
**Status:** 🟡 Watch
**Key Metrics:**
- Clients: 1 / 3 target for Q1 🔴 (33%)
- Pipeline: 5 prospects (medium)
**Blockers:**
- 🔴 Waiting métricas AGA (Lunarcito de vacaciones)
- Case study blocked → Sales blocked
**Next Action:** Push Lunarcito for AGA metrics THIS WEEK

---

## 💼 SPARKPLUG (20% Priority)

### Project 4: Sparkplug - Operación
**Status:** 🟢 Healthy
**Key Metrics:**
- Client satisfaction: 9.2/10 ✅
- On-time delivery: 95% ✅
- Team utilization: 78% (healthy)
**This Week:**
- ✅ All projects on track
**Next Action:** Maintain

---

### Project 5: Sparkplug - Ventas & Outreach
**Status:** 🔴 Needs Attention
**Key Metrics:**
- Pipeline: $45K (low)
- Meetings this week: 1 / 5 target 🔴
- Outreach activity: Low
**This Week:**
- 🔴 Only 1 meeting booked
- Sales Machine not being used enough
**Next Action:** Run BD Outreach Flow ASAP

---

### Project 6: SparkChatbots
**Status:** 🟡 Watch
**Key Metrics:**
- MRR: $12K / $15K target ⚠️
- Churn: 5% (acceptable)
**This Week:**
- ✅ Rappi renewal confirmed
- ⚠️ 1 client at-risk (payment issues)
**Next Action:** Address at-risk client

---

## 🎯 MARCA PERSONAL & CONTENIDO

### Project 7: JorgeSuarez.com.mx
**Status:** ⚪ Not Started
**Next Action:** Kick off in Q2

---

### Project 8: Contenido
**Status:** 🟡 Inconsistent
**Key Metrics:**
- Posts this week: 2 / 3 target ⚠️
- Engagement: 4.2% (good)
**This Week:**
- ✅ 2 LinkedIn posts (good engagement)
- ⚠️ Inconsistent frequency
**Next Action:** Use Content Pipeline more

---

## 💚 VIDA PERSONAL

### Project 9: Vida Personal & Claridad
**Status:** 🟢 Healthy
**Energy Level:** 7/10 (good)
**Burnout Risk:** Low
**Sleep:** 7.5 hrs avg ✅
**This Week:**
- ✅ Good balance
**Next Action:** Maintain

---

### Project 10: Relación con Dragón 🐉
**Status:** 🟢 Strong
**Quality Time:** 8 hrs this week ✅
**Date nights:** 1 ✅
**This Week:**
- ✅ Weekend trip planned
**Next Action:** Keep prioritizing

---

## 📚 APRENDIZAJE & CREATIVO

### Project 11: Aprendizaje Continuo
**Status:** 🟡 Slow
**Learning hrs:** 2 / 5 target ⚠️
**This Week:**
- Started AI course (good)
- Only 2 hrs invested
**Next Action:** Block 5 hrs/week for learning

---

### Project 12: Creativo
**Status:** ⚪ Paused
**D&D sessions:** 0 this month
**Next Action:** Schedule D&D session

---

## 📊 SUMMARY

**Projects Health:**
- 🟢 Healthy: 5
- 🟡 Watch: 5
- 🔴 Needs Attention: 1
- ⚪ Not Started: 1

**Critical Alerts:**
- 🚨 Sparkplug Sales (Pipeline low)
- ⚠️ Brandcade (Blocked on AGA metrics)
- ⚠️ Amber Hiring (2 roles pending)

**Time Allocation (This Week):**
- Amber: 32 hrs (80%) ✅
- Sparkplug: 8 hrs (20%) ✅
- Personal: 10 hrs ✅
- **Total: 50 hrs** (healthy, not burned out)

**Energy & Health:**
- Energy: 7/10 🟢
- Sleep: 7.5 hrs 🟢
- Exercise: 4 days 🟢
- Burnout risk: Low 🟢

---

## 🎯 TOP 3 PRIORITIES THIS WEEK

1. **🔴 Brandcade:** Get AGA metrics from Lunarcito
2. **🔴 Sparkplug Sales:** Run BD Outreach Flow
3. **🟡 Amber Hiring:** Follow up with Diana on 2 senior roles

---

## 💡 RECOMMENDATIONS

**Based on metrics:**
1. **Sparkplug needs attention:** Pipeline is low, run BD flow
2. **Brandcade blocked:** Unblock AGA case study ASAP
3. **Content consistency:** Use Content Pipeline automation more
4. **Learning:** You're below target, block time

---

**Next Update:** Tomorrow 8:00 AM (Daily)
**Weekly Review:** Monday Jan 6, 8:00 AM
```

---

## 📁 Data Sources

**Where metrics come from:**

### Automatic Collection:
- **Calendar:** Time tracking per project
- **CRM:** Pipeline, deals, meetings
- **Project management:** Tasks, milestones
- **Finance:** Revenue, expenses
- **Content:** Posts published, engagement

### Agent Reports:
- Each project agent reports status weekly
- Life Coach tracks energy/burnout metrics
- Research Analyst tracks external factors

### Manual Input (Minimal):
- Jorge updates OKRs quarterly
- Spot updates for blockers/wins

---

## 🚨 Alert System

**Red Flags (Immediate attention):**
- Project >20% behind target
- Burnout risk high (6+ warning signs)
- Critical blocker >7 days
- Revenue miss >15%
- Key metric declining 3 weeks straight

**Yellow Flags (Monitor):**
- Project 10-20% behind target
- Burnout risk medium (3-5 warning signs)
- Blocker >3 days
- Revenue miss 5-15%
- Key metric declining 2 weeks

**Notification:**
- Daily email: Red flags only
- Weekly email: Red + Yellow + summary
- Monthly email: Full report

---

## 📊 Key Metrics by Project

### Amber Studio Projects

**GM Amber México:**
- Revenue (monthly/quarterly)
- Headcount
- Retention rate
- NPS (team satisfaction)

**Business Development:**
- Pipeline value
- Meetings per week
- Win rate
- Average deal size

**Brandcade:**
- # clients
- Pipeline
- Revenue
- Client metrics (when available)

### Sparkplug Projects

**Operación:**
- Client satisfaction
- On-time delivery %
- Team utilization
- Project margin

**Ventas:**
- Pipeline value
- Meetings per week
- MRR growth
- CAC

**SparkChatbots:**
- MRR
- Churn rate
- # clients
- NPS

### Personal Projects

**Vida Personal:**
- Energy level (1-10)
- Sleep hrs
- Exercise days/week
- Burnout risk score

**Dragón:**
- Quality time hrs/week
- Date nights/month
- Relationship satisfaction (self-reported)

**Aprendizaje:**
- Learning hrs/week
- Skills acquired
- Certifications/courses completed

**Creativo:**
- D&D sessions/month
- Creative projects active
- Fun meter (1-10)

---

## 🔧 Configuration

**Update frequency:**
- Daily: Critical metrics + alerts
- Weekly: Full dashboard + trends
- Monthly: Strategic review + OKRs

**Alert thresholds:**
- Customize per project
- Conservative / Balanced / Aggressive

**Dashboard views:**
- Executive (high-level only)
- Detailed (all metrics)
- Mobile (key metrics only)

---

## 🎯 Use Cases

### Use Case 1: Daily Standup
**Morning ritual:** Check dashboard (5 min)
- See top 3 priorities
- Check red flags
- Plan day accordingly

### Use Case 2: Weekly Planning
**Monday AM:** Review full dashboard (15 min)
- Assess project health
- Adjust priorities
- Clear blockers

### Use Case 3: Monthly OKR Review
**First Monday:** Strategic review (30 min)
- OKR progress
- Resource reallocation
- Strategic pivots if needed

### Use Case 4: Investor/Board Update
**On-demand:** Generate report (5 min)
- Amber metrics for Tudor/Mihai
- Sparkplug metrics for board
- Auto-generated, accurate

---

## 💡 Tips

**To get most value:**
- **Review daily** (5 min morning ritual)
- **Act on red flags** (don't just acknowledge)
- **Celebrate wins** (not just problems)
- **Adjust thresholds** (as you learn what's realistic)

**Common mistakes:**
- ❌ Tracking too many metrics (focus on vital few)
- ❌ Ignoring yellow flags until red
- ❌ Not updating when things change
- ❌ Vanity metrics vs actionable metrics

---

## 🚀 Integration

**Connects to:**
- Google Calendar (time tracking)
- HubSpot/Pipedrive (sales metrics)
- Notion/Linear (project management)
- Stripe (revenue)
- Manual inputs (minimal)

**Outputs to:**
- Daily email summary
- Slack (if configured)
- Dashboard file (always up-to-date)

---

**Last Updated:** 2025-12-31
**Version:** 1.0 (Fase 1)
**Status:** Operational ✅
