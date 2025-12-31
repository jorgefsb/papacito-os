# CONTENT PIPELINE - Automatización de Contenido

> **Purpose:** Drag documento a inbox/ → Get múltiples content outputs automáticamente
> **Agents involved:** Router, Content Strategist, Research Analyst
> **Trigger:** Archivo aparece en `inbox/`

---

## 🎯 What This Does

**Input:** Drag cualquier documento (PDF, TXT, MD, imagen) a `inbox/`

**Output:** Múltiples formatos de contenido listos para usar:
- LinkedIn post (long-form)
- Twitter thread
- Newsletter section
- Blog post draft
- One-pager / summary

**Time saved:** 2-3 hrs de content creation → 10 min de review

---

## 🔄 How It Works

### Step 1: Detection

**Trigger:** Archivo nuevo en `inbox/`

**Router analyzes:**
- Tipo de documento (PDF, meeting notes, article, etc.)
- Contexto (Amber, Sparkplug, Personal Brand)
- Qué tipo de content se puede crear

### Step 2: Extraction

**Content Strategist + Research Analyst:**
- Extract key insights del documento
- Identify 3-5 main takeaways
- Find quotable moments
- Gather supporting data/stats si es necesario

### Step 3: Generation

**Content Strategist generates:**
1. **LinkedIn post** (300-500 words)
   - Hook fuerte
   - Story o framework
   - Call to action

2. **Twitter thread** (5-10 tweets)
   - Thread format optimizado
   - Cada tweet standalone pero connected

3. **Newsletter section** (500-800 words)
   - Deeper dive
   - More context
   - Links to resources

4. **One-pager summary** (1 página)
   - Executive summary
   - Key takeaways en bullets
   - Next steps

### Step 4: Output

**All content saved to:**
`outputs/content-drafts/[date]-[document-name]/`

**Jorge receives notification:**
- Summary de qué se generó
- Links a cada piece de content
- Quick review checklist

---

## 📁 File Structure

```
inbox/
└── meeting-notes-rappi.pdf    ← DROP HERE

[Pipeline runs automatically]

outputs/content-drafts/
└── 2025-12-31-meeting-notes-rappi/
    ├── linkedin-post.md
    ├── twitter-thread.md
    ├── newsletter-section.md
    ├── one-pager.pdf
    └── _metadata.json
```

---

## 🎬 Example

**Input:** Drag `meeting-notes-rappi.pdf` to inbox/

**Router detects:**
- Document type: Meeting notes
- Context: Sparkplug (client meeting)
- Content potential: High (case study material)

**Content Strategist generates:**

**1. LinkedIn Post:**
```
Ayer cerramos uno de los proyectos más interesting de Sparkplug:
Chatbot de IA para Rappi que automatiza 40% de su soporte.

Aquí 3 lessons que aprendimos building esto:

[Story + insights + CTA]
```

**2. Twitter Thread:**
```
Tweet 1/8: Just shipped an AI chatbot for @Rappi that handles 40% of support queries. Here's what we learned... 🧵

Tweet 2/8: Challenge: Rappi gets 50K+ support queries/month. Most are repetitive: "Where's my order?" etc...

[8 tweet thread]
```

**3. One-Pager:**
```
CASE STUDY: Rappi Chatbot
- Challenge
- Solution
- Results
- Testimonial
```

**Total time:** 10 min to review → 4 pieces of content ready

---

## ⚙️ Configuration

**Document types supported:**
- ✅ PDFs (meeting notes, reports)
- ✅ Text files (.txt, .md)
- ✅ Images (infográficas - OCR + analysis)
- ✅ URLs (article links - fetch + analyze)
- ⏳ Coming: Audio (transcribe + analyze)
- ⏳ Coming: Video (transcribe + analyze)

**Content types generated:**
- Default: LinkedIn + Twitter + Newsletter + One-pager
- Custom: Specify in filename (e.g., `meeting-BLOG.pdf` → focuses on blog)

**Context detection:**
- Filename keywords: `amber-`, `sparkplug-`, `personal-`
- Or auto-detect from content

---

## 🎯 Use Cases

### Use Case 1: Meeting Notes → Content
**Input:** Meeting notes from client call
**Output:** Case study + LinkedIn post + Tweet thread
**Time saved:** 2 hrs

### Use Case 2: Article → Thread
**Input:** Article URL you found interesting
**Output:** Twitter thread summarizing key points
**Time saved:** 45 min

### Use Case 3: Infografía → Multiple Posts
**Input:** Infografía (imagen)
**Output:** 4 different LinkedIn posts (different angles)
**Time saved:** 3 hrs

### Use Case 4: Report → Newsletter
**Input:** Industry report PDF
**Output:** Newsletter section + LinkedIn post
**Time saved:** 2 hrs

---

## 📋 Quality Checklist

**Before publishing generated content:**
- [ ] Facts are accurate
- [ ] Tone matches your voice
- [ ] No confidential info leaked (auto-check but verify)
- [ ] Links work
- [ ] Hashtags appropriate
- [ ] CTA is clear

**Trust level:**
- LinkedIn posts: 90% ready (minor edits usually)
- Twitter threads: 95% ready
- Newsletter: 80% ready (might need expansion)
- One-pagers: 95% ready

---

## 🚀 Next Steps After Generation

**Generated content is in drafts folder. Now:**

1. **Review** (5-10 min)
   - Quick read for accuracy
   - Adjust tone if needed
   - Add personal touch

2. **Schedule** (2 min)
   - Add to content calendar
   - Schedule via Buffer/Hootsuite

3. **Archive original** (1 min)
   - Move from inbox/ to processed/

**Total time:** <15 min for 4 pieces of content

---

## 🔧 Technical Details

**How it works behind scenes:**

1. **File watcher:** Monitors inbox/ for new files
2. **Router:** Analyzes document, determines content types
3. **Agents collaborate:**
   - Research Analyst: Extract facts
   - Content Strategist: Generate content
4. **Output formatter:** Save to outputs/
5. **Notification:** Alert Jorge content is ready

**No manual intervention needed** (except final review)

---

## 💡 Tips

**To get best results:**
- **Clear filenames:** `rappi-meeting-notes.pdf` > `notes.pdf`
- **Context tags:** Add `amber-`, `sparkplug-`, or `personal-` prefix
- **Quality input:** Better notes = better output
- **Batch processing:** Drop multiple files → All processed

**Advanced:**
- Drop template file: `_template.md` → Pipeline uses custom format
- Drop config: `_config.json` → Override defaults

---

**Last Updated:** 2025-12-31
**Version:** 1.0 (Fase 1)
