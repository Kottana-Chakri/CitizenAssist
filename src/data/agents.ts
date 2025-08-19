export interface Agent {
  id: string;
  name: string;
  goal: string;
  icon: string;
  category: string;
  color: string;
  welcomeMessage: string;
  samplePrompts: string[];
}

export const agents: Agent[] = [
  {
    id: "study_buddy",
    name: "Study Buddy",
    goal: "Help primary school students learn math, science, and language basics with simple explanations and fun activities.",
    icon: "📚",
    category: "Education",
    color: "from-blue-400 to-blue-600",
    welcomeMessage: "Hi there! I'm your friendly study buddy. I love helping students learn new things in fun and easy ways!",
    samplePrompts: [
      "Explain fractions with pizza examples",
      "Help me with my multiplication tables",
      "What is photosynthesis in simple terms?"
    ]
  },
  {
    id: "exam_planner",
    name: "Exam Planner",
    goal: "Design study plans, daily routines, and spaced-repetition schedules for exams and academic goals.",
    icon: "📅",
    category: "Planning",
    color: "from-purple-400 to-purple-600",
    welcomeMessage: "Ready to ace your exams? I'll help you create the perfect study schedule and stick to it!",
    samplePrompts: [
      "Create a 30-day study plan for my finals",
      "Help me balance study time across 5 subjects",
      "Design a revision timetable with breaks"
    ]
  },
  {
    id: "language_coach",
    name: "Language Coach",
    goal: "Teach vocabulary, grammar, and conversation skills while adapting to your learning level.",
    icon: "🗣️",
    category: "Language",
    color: "from-green-400 to-green-600",
    welcomeMessage: "Hello! I'm here to help you master new languages through practice, conversation, and fun exercises!",
    samplePrompts: [
      "Teach me 10 essential French phrases",
      "Help me practice English conversation",
      "Explain the difference between 'a' and 'an'"
    ]
  },
  {
    id: "career_coach",
    name: "Career Coach",
    goal: "Help craft resumes, cover letters, and career roadmaps while preparing for professional growth.",
    icon: "💼",
    category: "Career",
    color: "from-indigo-400 to-indigo-600",
    welcomeMessage: "Let's build your dream career together! I'll help you polish your professional profile and plan your next steps.",
    samplePrompts: [
      "Review my resume for a software job",
      "Help me write a cover letter",
      "What skills should I learn for data science?"
    ]
  },
  {
    id: "interview_bot",
    name: "Interview Simulator",
    goal: "Conduct realistic mock interviews with targeted follow-up questions and constructive feedback.",
    icon: "🎤",
    category: "Career",
    color: "from-red-400 to-red-600",
    welcomeMessage: "Ready for your big interview? Let's practice together and boost your confidence!",
    samplePrompts: [
      "Mock interview for a marketing role",
      "Practice behavioral questions",
      "Help me answer 'Tell me about yourself'"
    ]
  },
  {
    id: "gov_guide",
    name: "Government Guide",
    goal: "Explain government services, typical processes, and point you to official sources for verification.",
    icon: "🏛️",
    category: "Civic",
    color: "from-amber-400 to-amber-600",
    welcomeMessage: "Need help navigating government services? I'll explain the processes and guide you to the right resources!",
    samplePrompts: [
      "How do I apply for a passport?",
      "What documents do I need for voter registration?",
      "Explain the process for business licensing"
    ]
  },
  {
    id: "wellness_navigator",
    name: "Wellness Navigator",
    goal: "Provide general wellness information, lifestyle tips, and guidance on when to consult healthcare professionals.",
    icon: "🌿",
    category: "Health",
    color: "from-emerald-400 to-emerald-600",
    welcomeMessage: "Your wellness journey starts here! I'll share helpful tips for a healthier, happier you.",
    samplePrompts: [
      "Suggest a healthy meal plan for beginners",
      "How can I improve my sleep quality?",
      "What are some stress management techniques?"
    ]
  },
  {
    id: "money_mentor",
    name: "Financial Mentor",
    goal: "Teach budgeting, saving, and basic financial concepts with practical examples and guidelines.",
    icon: "💰",
    category: "Finance",
    color: "from-cyan-400 to-cyan-600",
    welcomeMessage: "Let's make your money work for you! I'll teach you the basics of personal finance in simple terms.",
    samplePrompts: [
      "Help me create a monthly budget",
      "Explain compound interest with examples",
      "What's the difference between savings and investments?"
    ]
  },
  {
    id: "habit_coach",
    name: "Habit Coach",
    goal: "Help create sustainable routines, track progress, and build positive habits with gentle accountability.",
    icon: "⭐",
    category: "Lifestyle",
    color: "from-pink-400 to-pink-600",
    welcomeMessage: "Small changes, big results! I'm here to help you build habits that will transform your life.",
    samplePrompts: [
      "Help me start a morning routine",
      "How can I build a reading habit?",
      "Create a 30-day challenge for exercise"
    ]
  },
  {
    id: "digital_skills",
    name: "Digital Skills Coach",
    goal: "Teach essential digital tools, online safety, and productivity workflows for modern life and work.",
    icon: "💻",
    category: "Technology",
    color: "from-violet-400 to-violet-600",
    welcomeMessage: "Welcome to the digital age! I'll help you master the tools and skills you need to thrive online.",
    samplePrompts: [
      "Teach me keyboard shortcuts for productivity",
      "How do I stay safe online?",
      "Best practices for email management"
    ]
  }
];

// Mock responses for demonstration
export const getMockResponse = (agentId: string, message: string): string => {
  const responses: Record<string, string[]> = {
    study_buddy: [
      "Great question! Let me break this down into simple steps for you...",
      "That's a wonderful topic to explore! Here's how I like to explain it...",
      "I love helping with this! Let's start with the basics and build from there..."
    ],
    exam_planner: [
      "Let's create a strategic study plan that works for your schedule...",
      "Here's how I recommend organizing your study time for maximum effectiveness...",
      "I'll help you break this down into manageable daily goals..."
    ],
    language_coach: [
      "Excellent! Let's practice this together. Here's what you need to know...",
      "That's a great way to improve your language skills! Let me guide you through this...",
      "Perfect question for language learning! Here's my approach..."
    ],
    career_coach: [
      "That's a smart career move! Here's how I recommend approaching this...",
      "Let's work on making your professional profile shine. Here are my suggestions...",
      "Great question for career development! Here's what I've seen work well..."
    ],
    interview_bot: [
      "Excellent! Let's practice this interview scenario. I'll ask you some questions...",
      "That's a common interview question. Here's how I recommend structuring your answer...",
      "Good thinking! Let's work on your interview confidence with some practice..."
    ],
    gov_guide: [
      "Here's what you typically need to know about this government process...",
      "Let me explain the general steps involved, and I'll direct you to official sources for current details...",
      "That's an important civic question! Here's the typical process and where to verify..."
    ],
    wellness_navigator: [
      "That's a great wellness goal! Here are some general tips that many people find helpful...",
      "I'm glad you're focusing on your health! Here's what you should consider...",
      "Wellness is so important! Here are some evidence-based approaches to consider..."
    ],
    money_mentor: [
      "Smart financial question! Let me explain this concept with a practical example...",
      "That's a key part of financial literacy! Here's how this typically works...",
      "Excellent question about money management! Here's what you should know..."
    ],
    habit_coach: [
      "I love that you want to build better habits! Here's my step-by-step approach...",
      "That's a fantastic goal! Let me help you create a sustainable plan...",
      "Great mindset for positive change! Here's how we can make this happen..."
    ],
    digital_skills: [
      "That's an essential digital skill! Here's what I recommend learning first...",
      "Perfect question for the digital age! Let me walk you through this...",
      "Technology can be so helpful when you know how to use it! Here's my guide..."
    ]
  };

  const agentResponses = responses[agentId] || responses.study_buddy;
  const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
  
  return `${randomResponse}\n\n📝 Your question: "${message}"\n\n✨ This is a mock response demonstrating the interface. In a full implementation, this would connect to the CrewAI backend with specialized AI agents for each domain.`;
};