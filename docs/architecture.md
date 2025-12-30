# PapacitoOS Architecture

Deep dive into how PapacitoOS works under the hood.

## Overview

PapacitoOS is built on the principle that **you don't need to do more tasks, you need to build the machine that does the tasks.**

The system consists of four main layers:

```
┌─────────────────────────────────────────┐
│           User Interface Layer           │
│  (Natural language requests & documents) │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Router (Detection Layer)         │
│  • Analyzes context                     │
│  • Detects projects                      │
│  • Activates agents                      │
│  • Determines collaboration              │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Agents (Execution Layer)            │
│  • 11 specialized agents                 │
│  • Collaboration protocol                │
│  • Generate deliverables                 │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    Automations (Workflow Layer)          │
│  • Daily briefings                       │
│  • Content pipelines                     │
│  • Metrics tracking                      │
└──────────────────────────────────────────┘
```

## Layer 1: Router (Detection)

The Router is the brain of PapacitoOS. It analyzes every request and determines:

### Detection Methods

1. **Keyword Detection**
   ```
   Keywords: "pitch", "Brandcade" → Project #3
   Keywords: "BD", "sales" → Activate BD Hunter
   ```

2. **Implicit Context**
   ```
   Document dropped in inbox → Analyze content → Detect project
   "What's next?" → Daily briefing mode
   ```

3. **Project Mapping**
   ```
   Request → Keywords → Project(s) → Agent(s) → Collaboration Type
   ```

### Router Output

```markdown
[ROUTER] Detected: Project #3 (Brandcade) + #2 (BD)
[ROUTER] Activating: PM Brandcade + BD Hunter
[ROUTER] Collaboration: Sequential
```

## Layer 2: Agents (Execution)

### Agent Structure

Each agent has:
- **Identity:** Name, role, expertise
- **Activation:** Keywords and triggers
- **Collaboration:** Who they work with and how
- **Outputs:** Types of deliverables they generate

### Agent Types

#### 1. Business Agents (80% Priority)
Focus on main business operations

#### 2. Operations Agents (20% Priority)
Focus on secondary business

#### 3. Personal Agents
Focus on personal brand and life

#### 4. Support Agents
Provide research and learning support

### Collaboration Types

#### Sequential (Pipeline)
```
Agent A → Output → Agent B → Output → Agent C → Final Result
```

Example: PM defines product → BD creates pitch → Content creates post

#### Parallel (Division of Work)
```
Agent A ─┐
Agent B ─┼→ Integrated Final Result
Agent C ─┘
```

Example: PM creates deck + BD creates proposal + Content creates one-pager

#### Consultative (Expert Input)
```
Agent A → Needs input → Agent B → Returns expertise → Agent A continues
```

Example: Sales needs copy → Content provides hooks → Sales integrates

## Layer 3: Collaboration Protocol

Defines how agents hand off work:

```markdown
[AGENT A]
My part of the work here...

→ Passing to [AGENT B] for [next step]

---

[AGENT B]
My part of the work here...

→ Passing to [AGENT C] for [finalization]

---

[AGENT C]
Final integrated result...

DELIVERABLES:
1. [Output 1]
2. [Output 2]
```

### Rules

1. **Never duplicate work** - If another agent has expertise, delegate
2. **Always explicit handoffs** - State who you're passing to and why
3. **Maintain context** - Reference what you received from previous agents
4. **Deliver integrated** - Final output should be cohesive, not fragmented

## Layer 4: Automations (Workflows)

### Daily Briefing
```
Trigger: First interaction of the day
Process: Read dashboard → Identify priorities → Generate briefing
Output: 5 bullet summary of what matters today
```

### Content Pipeline
```
Trigger: Document dropped in inbox/
Process: Analyze → Detect project → Activate agents → Generate outputs
Output: Posts, scripts, reports, etc.
```

### Project Sync
```
Trigger: Agent completes task
Process: Update both local and tracking systems
Output: Synchronized state across systems
```

## Data Flow Example

### Request: "Close 3 brands for Brandcade Q1"

```
1. USER REQUEST
   ↓
2. ROUTER ANALYZES
   Keywords: "close", "brands", "Brandcade", "Q1"
   Projects: #3 (Brandcade) + #2 (BD)
   ↓
3. ROUTER ACTIVATES
   Agents: Research Analyst, PM Brandcade, BD Hunter, Content Strategist
   Mode: Sequential collaboration
   ↓
4. AGENTS EXECUTE
   Research Analyst: Find 25 target brands
   ↓ (passes to)
   PM Brandcade: Customize value props
   ↓ (passes to)
   Content Strategist: Write email sequences
   ↓ (passes to)
   BD Hunter: Create execution plan
   ↓
5. INTEGRATED OUTPUT
   • Target list (25 brands, top 10 prioritized)
   • Value prop deck (10 slides)
   • Email sequences (30 emails)
   • Outreach calendar
   • Meeting prep templates
```

## Key Design Principles

### 1. Automatic Detection
Users speak naturally, system detects what's needed.

### 2. Real Collaboration
Agents work like a real team, not isolated tools.

### 3. Context Separation
Business contexts never mix (e.g., Business A stays separate from Business B).

### 4. High Leverage
Build once, use forever. System improves over time.

### 5. Privacy First
Personal information never leaves local system (gitignore protection).

## Technical Stack

- **Format:** Markdown files (portable, version-controllable, human-readable)
- **Storage:** Local filesystem + Git for versioning
- **AI Engine:** Claude AI or compatible LLMs
- **Integration:** Designed to work with any text-based AI system

## Scalability

### Adding New Agents
1. Copy `templates/agent-template.md`
2. Define identity, activation, collaboration
3. Test with Router
4. Document and commit

### Adding New Automations
1. Copy `templates/automation-template.md`
2. Define trigger, process, output
3. Test workflow
4. Document and commit

### Customizing for Your Context
1. Edit `core/identity.md` with your profile
2. Edit `core/priorities.md` with your business split
3. Customize agents for your specific needs
4. Add your own automations

## Security & Privacy

### What's Local (Never Uploaded)
- `core/identity.md` - Your personal info
- `people/` - Your contacts
- `projects/` - Your specific projects
- `inbox/` & `outputs/` - Your documents

### What's Public (In Git Repo)
- Templates and structure
- Documentation
- Generic agent definitions (no personal info)
- Examples (anonymized)

### Protection
`.gitignore` prevents accidental upload of personal files.

---

**Next:** [Agents Guide](./agents-guide.md) to learn how to use and create agents.
