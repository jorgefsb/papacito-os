# 🚀 PapacitoOS v1.0

> Your Personal Operating System powered by Collaborative AI Agents

**PapacitoOS** is a personal operating system that uses a team of specialized AI agents that automatically detect context, collaborate with each other like real employees, and automate repetitive tasks to generate ready-to-use deliverables.

![Version](https://img.shields.io/badge/version-1.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-in%20development-yellow.svg)

---

## ✨ Features

- 🤖 **11 Specialized Agents** - Each with expertise in specific areas (Business, Operations, Content, Strategy, etc.)
- 🔄 **Automatic Context Detection** - No manual commands needed, the Router detects what you need
- 👥 **Real Collaboration** - Agents work together like a team (sequential, parallel, consultative)
- ⚡ **5 Core Automations** - Daily briefing, content pipeline, BD flow, project sync, and metrics tracking
- 🎯 **High Leverage** - Build once, use forever across all your business contexts
- 📊 **Smart Prioritization** - Automatically prioritizes based on your custom metrics (Leverage, Speed, Energy)

---

## 🏗️ Architecture

PapacitoOS is built on four core pillars:

### 1. **Router** (Automatic Detection)
Analyzes every request and automatically detects:
- Which project(s) are involved
- Which agent(s) should be activated
- Whether agents need to collaborate

### 2. **Collaboration Protocol**
Defines how agents work together:
- **Sequential:** Agent A → Agent B → Agent C (pipeline)
- **Parallel:** Agents work simultaneously on different parts
- **Consultative:** One agent asks another for specific input

### 3. **Specialized Agents** (11 Total)

#### Business Agents (80% priority):
- **GM Co-Pilot:** Strategic decisions for business leadership
- **BD Hunter:** Business development and sales
- **PM Brandcade:** Product management for specific products

#### Operations Agents (20% priority):
- **COO Digital:** Operations management
- **Sales Machine:** Outreach and sales automation
- **PM Chatbots:** Chatbot product management

#### Personal Agents:
- **Content Strategist:** Personal brand and content creation
- **Life Coach:** Mental clarity and personal goals
- **Creative Writer:** Creative projects without KPIs

#### Support Agents:
- **Learning Facilitator:** Continuous learning and skill development
- **Research Analyst:** Research and competitive analysis

### 4. **Automations** (5 Core)
- **Daily Briefing:** Automatic daily summary of priorities
- **Project Sync:** Syncs with your logging system
- **Content Pipeline:** Drag document → Get multiple outputs
- **BD Outreach Flow:** Automated business development workflows
- **Metrics Tracker:** Track metrics across all projects

---

## 🚀 Quick Start

### Prerequisites
- Claude AI or similar LLM system
- Text editor for markdown files
- (Optional) GitHub CLI for version control

### Installation

1. **Clone this repository:**
   ```bash
   git clone https://github.com/jorgefsb/papacito-os.git
   cd papacito-os
   ```

2. **Customize your identity:**
   ```bash
   cp core/identity-template.md core/identity.md
   # Edit core/identity.md with your information
   ```

3. **Set your priorities:**
   ```bash
   cp core/priorities-template.md core/priorities.md
   # Edit core/priorities.md with your business priorities
   ```

4. **Review the Quick Start guide:**
   ```bash
   open docs/quick-start.md
   ```

5. **Start using agents!**
   Just start asking questions or making requests. The Router will detect context automatically.

---

## 📚 Documentation

- [**Architecture Guide**](./docs/architecture.md) - Deep dive into system design
- [**Quick Start Guide**](./docs/quick-start.md) - Get started in 5 minutes
- [**Agents Guide**](./docs/agents-guide.md) - How to use and create agents
- [**Automations Guide**](./docs/automations-guide.md) - Set up workflows
- [**Collaboration Protocol**](./docs/collaboration-protocol.md) - How agents work together
- [**Examples**](./examples/) - Real-world use cases

---

## 🎯 Use Cases

### Example 1: Close 3 Brands for Q1
```
You: "I need to close 3 brands for Brandcade Q1"

Router detects: Project #3 (Brandcade) + Project #2 (BD)
Activates: PM Brandcade + BD Hunter + Research Analyst + Content Strategist
Collaboration: Pipeline (Sequential)

Deliverables (automatic):
✅ Target list (25 brands researched, top 10 prioritized)
✅ Value prop deck (10 customized slides)
✅ Email sequences (30 emails ready to send)
✅ Outreach calendar Q1
✅ Meeting prep templates
```

### Example 2: Process Meeting Notes
```
You: Drag "Meeting-Notes.pdf" to inbox/

Router analyzes document
Detects: Meeting with prospectc → BD project
Activates: BD Hunter + PM + Content Strategist

Deliverables (automatic):
✅ Commercial analysis
✅ Technical proposal
✅ Follow-up email (ready to send)
✅ One-pager executive summary
✅ Case study support material
```

### Example 3: Daily Briefing
```
You: "What's next?"

Router detects: Daily briefing request
Activates: Life Coach + GM Co-Pilot + active project agents

Deliverables (automatic):
✅ Status of all active projects
✅ What's blocked and needs attention
✅ Next most profitable action
✅ Estimated time and leverage score
✅ Clear priorities for today
```

---

## 🛠️ Customization

### Create Your Own Agent

1. Copy the agent template:
   ```bash
   cp templates/agent-template.md agents/my-custom-agent.md
   ```

2. Customize:
   - Define identity and role
   - Set activation keywords
   - Define collaboration patterns
   - Specify typical outputs

3. Test:
   - Make a request that matches keywords
   - Verify Router activates your agent
   - Check collaboration with other agents

See [Agents Guide](./docs/agents-guide.md) for details.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

### How to contribute:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-agent`)
3. Commit your changes (`git commit -m 'Add amazing agent'`)
4. Push to the branch (`git push origin feature/amazing-agent`)
5. Open a Pull Request

---

## 📝 License

MIT License - See [LICENSE](./LICENSE) for details.

---

## 👤 Author

**Jorge Suárez Basáñez**
- 20+ year video games veteran and entrepreneur
- GM of Amber Studio México
- Co-Founder & CEO of Sparkplug Technologies

**Links:**
- Website: [jorgesuarez.com.mx](https://jorgesuarez.com.mx)
- LinkedIn: [@yorgenmeister](https://linkedin.com/in/yorgenmeister)
- Twitter: [@jorgefsb](https://twitter.com/jorgefsb)
- GitHub: [@jorgefsb](https://github.com/jorgefsb)

---

## 🙏 Acknowledgments

- Inspired by conversation with **Little Bird AI**
- Built on top of **Claude AI** and the **ACE Framework**
- Created during vacation time to set infrastructure for 2025
- Special thanks to the AI community for continuous innovation

---

## 📊 Project Status

- **Current Version:** v1.0 (Phase 0 in progress)
- **Last Updated:** 2025-12-30
- **Status:** Architecture complete, implementation in progress

### Roadmap

- [x] ✅ Architecture design
- [x] ✅ Plan documentation
- [x] ✅ Repository setup
- [ ] 🚧 Phase 0: Foundation (Router + 3 core agents + Daily Briefing)
- [ ] 📋 Phase 1: Expansion (11 agents + 5 automations)
- [ ] 📋 Phase 2: Refinement (optimization + complete documentation)

---

## ⭐ Star History

If you find this useful, please star the repo!

[![Star History Chart](https://api.star-history.com/svg?repos=jorgefsb/papacito-os&type=Date)](https://star-history.com/#jorgefsb/papacito-os&Date)

---

## 📞 Support

- 📖 [Read the docs](./docs/)
- 💬 [Open an issue](https://github.com/jorgefsb/papacito-os/issues)
- 🐦 [Tweet at me](https://twitter.com/jorgefsb)

---

**Built with ❤️ and AI**

_PapacitoOS - Because you don't need to do more tasks, you need to build the machine that does the tasks._
