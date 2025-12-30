# Quick Start Guide

Get PapacitoOS running in 5 minutes!

## Prerequisites

- Text editor (VS Code, Sublime, or any markdown editor)
- Claude AI or similar LLM access
- Basic familiarity with markdown

## Step 1: Clone & Setup (2 min)

```bash
# Clone the repository
git clone https://github.com/jorgefsb/papacito-os.git
cd papacito-os

# Create your identity file
cp core/identity-template.md core/identity.md

# Create your priorities file
cp core/priorities-template.md core/priorities.md
```

## Step 2: Customize Your Profile (2 min)

Edit `core/identity.md` with your information:

```markdown
# Your Identity

## Who You Are
- Name: [Your Name]
- Role: [Your Professional Role]
- Expertise: [Your Areas of Expertise]

## Your Philosophy
- Values: [What matters to you]
- Goals: [What you want to achieve]

## Decision Metrics
1. [Metric 1] - What moves the needle for you
2. [Metric 2] - How you measure success
3. [Metric 3] - What gives you energy
```

Edit `core/priorities.md` with your business priorities:

```markdown
# Your Priorities

## Priority Distribution
- [Business A]: 80%
- [Business B]: 20%

## Never Mix Contexts
- Keep [Business A] separate from [Business B]
- Protect confidential information
```

## Step 3: Test the System (1 min)

### Test 1: Simple Request
```
You: "Help me with [your main business]"

Expected: Router should detect context and activate relevant agent
```

### Test 2: Daily Briefing
```
You: "What should I focus on today?"

Expected: Life Coach + relevant agents provide prioritized briefing
```

### Test 3: Document Processing
```
You: Drag a document to inbox/

Expected: Router analyzes and generates relevant outputs
```

## Next Steps

### Learn More
- Read [Architecture Guide](./architecture.md)
- Browse [Examples](../examples/)
- Review [Agents Guide](./agents-guide.md)

### Customize
- Create your own agent (see [agent-template.md](../templates/agent-template.md))
- Set up automations (see [Automations Guide](./automations-guide.md))
- Adjust collaboration patterns

### Share
- Star the repo if you find it useful
- Share your custom agents with the community
- Contribute improvements

## Common First-Time Issues

### Router doesn't detect context
- Check that your keywords are in the Router detection rules
- Ensure your identity.md is properly formatted
- Try being more explicit in your request

### Agents don't collaborate
- Review [Collaboration Protocol](./collaboration-protocol.md)
- Check agent definitions for collaboration rules
- Verify Router is activating multiple agents

### Personal info showing in outputs
- Check `.gitignore` is properly configured
- Verify sensitive files are in ignored directories
- Review what you're committing before pushing

## Getting Help

- Check [FAQ](./faq.md)
- Review [Troubleshooting](./troubleshooting.md)
- Open an [issue](https://github.com/jorgefsb/papacito-os/issues)
- Tweet [@jorgefsb](https://twitter.com/jorgefsb)

---

**Congratulations!** You're now running PapacitoOS. Start by asking for your daily briefing and let the agents help you work smarter.

**Next:** [Architecture Guide](./architecture.md) to understand how it all works.
