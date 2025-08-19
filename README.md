# CitizenAssist - Multi-Agent AI Web Application

A comprehensive web application featuring 10 specialized AI agents built with CrewAI framework, FastAPI backend, and React frontend. The agents provide diverse citizen services from elementary education support to career coaching.

## 🏗️ Project Structure

```
citizenassist/
├── backend/
│   ├── app.py                 # FastAPI main application
│   ├── agents.py              # CrewAI agent definitions
│   ├── requirements.txt       # Python dependencies
│   └── .env.example          # Environment variables template
└── frontend/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── AgentCard.jsx
    │   │   ├── ChatInterface.jsx
    │   │   └── MessageBubble.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.8+
- Node.js 16+
- OpenAI API key

### Backend Setup (5 minutes)

1. **Clone and navigate to backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

3. **Start the server:**
```bash
uvicorn app:app --reload --port 8000
```

### Frontend Setup (5 minutes)

1. **Navigate to frontend and install:**
```bash
cd ../frontend
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Access application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/docs

## 🤖 The 10 Specialized Agents

### 1. **Study Buddy** (`study_buddy`)
- **Role:** Primary School Study Companion
- **Capabilities:** Math, science, and language basics for 5th-grade level
- **Example:** "Explain fractions with pizza examples and give me a 3-question quiz"

### 2. **Exam Planner** (`exam_planner`)
- **Role:** Study Schedule & Time Management Coach
- **Capabilities:** Custom study timetables, spaced repetition, goal tracking
- **Example:** "Create a 30-day study plan for my science exam with weekends off"

### 3. **Language Coach** (`language_coach`)
- **Role:** Language Learning Companion
- **Capabilities:** Vocabulary building, grammar lessons, conversation practice
- **Example:** "Teach me 20 business English phrases with examples"

### 4. **Career Coach** (`career_coach`)
- **Role:** Professional Development Advisor
- **Capabilities:** Resume writing, career planning, skill development
- **Example:** "Review my resume and suggest improvements for a software role"

### 5. **Interview Bot** (`interview_bot`)
- **Role:** Mock Interview Specialist
- **Capabilities:** Realistic interview simulations with feedback
- **Example:** "Conduct a behavioral interview for a marketing manager position"

### 6. **Government Guide** (`gov_guide`)
- **Role:** Civic Services Navigator
- **Capabilities:** Government process explanations, document requirements
- **Example:** "What documents do I need for a passport application?"

### 7. **Wellness Navigator** (`wellness_navigator`)
- **Role:** Health & Wellness Information Provider
- **Capabilities:** General wellness tips, healthy lifestyle guidance
- **Example:** "Create a weekly meal plan for a diabetic-friendly diet"

### 8. **Money Mentor** (`money_mentor`)
- **Role:** Financial Literacy Educator
- **Capabilities:** Budgeting, saving strategies, investment basics
- **Example:** "Explain compound interest with a practical example"

### 9. **Habit Coach** (`habit_coach`)
- **Role:** Personal Development & Routine Builder
- **Capabilities:** Habit formation, daily planning, accountability
- **Example:** "Help me build a morning routine that includes exercise"

### 10. **Digital Skills Coach** (`digital_skills`)
- **Role:** Technology & Productivity Mentor
- **Capabilities:** Digital literacy, online safety, productivity tools
- **Example:** "Teach me keyboard shortcuts for better productivity"

## 🛡️ Safety & Limitations

### Built-in Safety Guidelines
- **Non-Medical:** Wellness Navigator provides general information only
- **Non-Legal:** Government Guide explains processes, not specific legal advice
- **Non-Financial:** Money Mentor teaches concepts, not investment recommendations
- **Age-Appropriate:** All content filtered for appropriate audiences
- **Professional Referrals:** Agents direct users to licensed professionals when needed

### Content Filtering
- Harmful content prevention
- Age-appropriate responses
- Professional boundary maintenance
- Clear disclaimer messaging

## 🔧 Advanced Configuration

### Environment Variables

**Backend (.env):**
```env
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.3
PORT=8000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Frontend (.env):**
```env
VITE_API_BASE=http://localhost:8000
VITE_APP_TITLE=CitizenAssist
```

### Adding New Agents

1. **Define agent in `backend/agents.py`:**
```python
"new_agent": Agent(
    role="Your Agent Role",
    goal="Agent's specific goal and capabilities",
    backstory=SAFETY_PREFIX + " Agent's personality and approach",
    llm=llm,
    allow_delegation=False,
)
```

2. **Update frontend agent list** (auto-fetched from API)

### External Tool Integration

```python
from crewai_tools import WebSearchTool, CalculatorTool

# Add tools to agents
agent = Agent(
    role="Research Assistant",
    tools=[WebSearchTool(), CalculatorTool()],
    # ... other config
)
```

## 🎨 UI Customization

### Tailwind Configuration
The application uses Tailwind CSS with a custom color scheme:
- Primary: Emerald (government/civic theme)
- Secondary: Blue (trust and reliability)
- Accent: Orange (warmth and approachability)

### Responsive Breakpoints
- Mobile: < 768px (single column, collapsible agent list)
- Tablet: 768px - 1024px (side-by-side with adjusted spacing)
- Desktop: > 1024px (full three-column layout)

## 🔍 Testing & Quality Assurance

### Agent Testing Checklist

**For each agent:**
- [ ] Responds within role boundaries
- [ ] Provides helpful, accurate information
- [ ] Maintains safety guidelines
- [ ] Handles edge cases gracefully
- [ ] Refers to professionals when appropriate

### API Testing
```bash
# Test agent list
curl http://localhost:8000/api/agents

# Test agent response
curl -X POST http://localhost:8000/api/respond \
  -H "Content-Type: application/json" \
  -d '{"agent_id": "study_buddy", "message": "Help me with fractions"}'
```

## 🚨 Troubleshooting Guide

### Common Issues

**Backend Issues:**
```bash
# ModuleNotFoundError
pip install -r requirements.txt

# OpenAI API errors
# Check your .env file has correct OPENAI_API_KEY

# Port already in use
# Change PORT in .env or kill existing process
```

**Frontend Issues:**
```bash
# npm install errors
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# API connection issues
# Check VITE_API_BASE in .env matches backend URL
```

**CORS Issues:**
- Ensure frontend origin is in CORS_ORIGINS
- Check that both servers are running
- Verify API_BASE URL in frontend

### Performance Optimization

1. **Backend:**
   - Implement response caching
   - Add request rate limiting
   - Use connection pooling for databases

2. **Frontend:**
   - Implement virtual scrolling for long conversations
   - Add message pagination
   - Optimize bundle size with code splitting

## 📈 Scaling Considerations

### Production Deployment

**Backend:**
- Use Gunicorn with multiple workers
- Implement Redis for caching
- Add database for user persistence
- Set up monitoring and logging

**Frontend:**
- Use CDN for static assets
- Implement service workers for offline support
- Add error boundary components
- Set up performance monitoring

### Database Schema (Optional Enhancement)
```sql
-- User management
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat history
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    agent_id VARCHAR(50),
    messages JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Security Best Practices

### API Security
- Implement API key authentication
- Add rate limiting per user/IP
- Validate and sanitize all inputs
- Use HTTPS in production

### Data Protection
- Never log API keys or user messages
- Implement data retention policies
- Add user data export/deletion features
- Regular security audits

## 📚 Additional Resources

- [CrewAI Documentation](https://docs.crewai.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Best Practices](https://react.dev/)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add comprehensive tests
4. Update documentation
5. Submit a pull request

## 📄 License

MIT License - Feel free to use for educational and civic benefit projects.

---

*Built with ❤️ for citizens seeking AI-powered assistance in their daily lives.*