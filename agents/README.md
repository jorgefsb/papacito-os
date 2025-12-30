# Agents - Your AI Team

This folder contains your team of specialized AI agents that work together to get things done.

## Structure

```
agents/
├── _ROUTER.md                    # Master agent - detects context
├── _COLLABORATION-PROTOCOL.md    # How agents work together
│
├── amber-agents/                 # Business agents (80% priority)
│   ├── gm-copilot.md
│   ├── bd-hunter.md
│   └── pm-brandcade.md
│
├── sparkplug-agents/             # Operations agents (20% priority)
│   ├── coo-digital.md
│   ├── sales-machine.md
│   └── pm-chatbots.md
│
├── personal-agents/              # Personal brand & life
│   ├── content-strategist.md
│   ├── life-coach.md
│   └── creative-writer.md
│
└── support-agents/               # Research & learning
    ├── learning-facilitator.md
    └── research-analyst.md
```

## How Agents Work

### 1. Automatic Detection
You don't invoke agents manually. The **Router** automatically detects which agent(s) to activate based on:
- Keywords in your request
- Document content (if you drag a file)
- Implicit context (e.g., "What's next?" = Daily Briefing)

### 2. Collaboration
Agents work together like real employees:
- **Sequential:** One agent passes work to the next
- **Parallel:** Multiple agents work simultaneously
- **Consultative:** One agent asks another for specific input

### 3. Deliverables
Each agent generates specific types of outputs:
- Documents (PDFs, Word docs)
- Email drafts
- Presentations
- Checklists
- Analysis reports

## Agent Categories

### Business Agents (80% Priority)
Focus on your main business operations. These agents handle strategic decisions, business development, and product management.

**Use when:** Working on primary business projects, making strategic decisions, preparing pitches.

### Operations Agents (20% Priority)
Focus on secondary business. Handle operational tasks, sales outreach, and product management for complementary business.

**Use when:** Working on secondary business, sales activities, operational planning.

### Personal Agents
Focus on personal brand, content creation, and life goals. Help with content strategy, mental clarity, and creative projects.

**Use when:** Creating content, reflecting on goals, working on creative projects.

### Support Agents
Provide research, analysis, and learning support across all contexts.

**Use when:** Need research, want to learn something new, require competitive analysis.

## Creating Custom Agents

1. **Copy the template:**
   ```bash
   cp ../templates/agent-template.md my-custom-agent.md
   ```

2. **Define the agent:**
   - Identity (name, role, expertise)
   - Activation keywords
   - Collaboration patterns
   - Typical outputs

3. **Test it:**
   - Make a request with the keywords
   - Verify Router activates your agent
   - Check collaboration with other agents

4. **Document it:**
   - Add examples
   - Explain use cases
   - Update this README

## Agent Communication Format

When agents work together, they use this format:

```
[ROUTER] Detected: Project #X
[ROUTER] Activating: Agent A + Agent B
[ROUTER] Collaboration: Sequential

---

[AGENT A]
My work here...

→ Passing to [AGENT B] for [next step]

---

[AGENT B]
My work here...

---

DELIVERABLES:
1. [Output 1]
2. [Output 2]
```

## Best Practices

1. **Let Router decide** - Don't manually specify agents unless needed
2. **Clear requests** - Be specific about what you want
3. **Trust collaboration** - Agents know when to work together
4. **Review outputs** - Always check deliverables before using
5. **Customize agents** - Adapt them to your specific needs

## Troubleshooting

**Agent not activating:**
- Check if your keywords match agent's activation rules
- Try being more explicit in your request
- Verify agent file exists and is properly formatted

**Wrong agent activating:**
- Router might need tuning for your specific keywords
- Be more specific about which project/context
- Check priority settings (80/20 split)

**Agents not collaborating:**
- Review `_COLLABORATION-PROTOCOL.md`
- Check agent definitions specify collaboration partners
- Verify collaboration type is defined (sequential/parallel/consultative)

---

For detailed information, see:
- [Agents Guide](../docs/agents-guide.md)
- [Collaboration Protocol](./COLLABORATION-PROTOCOL.md)
- [Agent Template](../templates/agent-template.md)
