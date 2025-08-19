import React, { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, 
  Send, 
  User, 
  Bot, 
  Menu, 
  X, 
  BookOpen,
  Calendar,
  Globe,
  Briefcase,
  Users,
  MapPin,
  Heart,
  DollarSign,
  Target,
  Monitor,
  Loader2,
  AlertCircle
} from 'lucide-react'

// Agent icons mapping
const AGENT_ICONS = {
  study_buddy: BookOpen,
  exam_planner: Calendar,
  language_coach: Globe,
  career_coach: Briefcase,
  interview_bot: Users,
  gov_guide: MapPin,
  wellness_navigator: Heart,
  money_mentor: DollarSign,
  habit_coach: Target,
  digital_skills: Monitor
}

// Color schemes for different agents
const AGENT_COLORS = {
  study_buddy: 'bg-blue-500',
  exam_planner: 'bg-purple-500',
  language_coach: 'bg-green-500',
  career_coach: 'bg-indigo-500',
  interview_bot: 'bg-orange-500',
  gov_guide: 'bg-red-500',
  wellness_navigator: 'bg-pink-500',
  money_mentor: 'bg-yellow-500',
  habit_coach: 'bg-teal-500',
  digital_skills: 'bg-gray-500'
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

// Message Component
function MessageBubble({ message, isUser }) {
  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-500' : 'bg-gray-500'}`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className="text-sm whitespace-pre-wrap break-words">
          {message}
        </div>
      </div>
    </div>
  )
}

// Agent Card Component
function AgentCard({ agent, isActive, onClick, className = "" }) {
  const Icon = AGENT_ICONS[agent.id] || Bot
  const colorClass = AGENT_COLORS[agent.id] || 'bg-gray-500'
  
  return (
    <button
      onClick={() => onClick(agent)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
        isActive 
          ? 'border-blue-500 bg-blue-50 shadow-sm' 
          : 'border-transparent bg-white hover:border-gray-200'
      } ${className}`}
    >
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 truncate">
            {agent.role}
          </div>
          <div className="text-sm text-gray-600 mt-1 line-clamp-2">
            {agent.goal}
          </div>
        </div>
      </div>
    </button>
  )
}

// Main App Component
function App() {
  const [agents, setAgents] = useState([])
  const [activeAgent, setActiveAgent] = useState(null)
  const [messages, setMessages] = useState({})
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef(null)

  // Load agents on mount
  useEffect(() => {
    loadAgents()
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages, activeAgent])

  const loadAgents = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/agents`)
      if (!response.ok) {
        throw new Error('Failed to load agents')
      }
      const agentsData = await response.json()
      setAgents(agentsData)
      // Auto-select first agent
      if (agentsData.length > 0) {
        setActiveAgent(agentsData[0])
      }
    } catch (err) {
      setError('Failed to load agents. Please check if the backend server is running.')
      console.error('Error loading agents:', err)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !activeAgent || loading) return

    const message = inputMessage.trim()
    setInputMessage('')
    setError(null)

    // Add user message to chat
    const agentId = activeAgent.id
    setMessages(prev => ({
      ...prev,
      [agentId]: [...(prev[agentId] || []), { role: 'user', text: message }]
    }))

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/api/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: agentId,
          message: message
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to get response')
      }

      const data = await response.json()
      
      // Add agent response to chat
      setMessages(prev => ({
        ...prev,
        [agentId]: [...(prev[agentId] || []), { role: 'assistant', text: data.reply }]
      }))

    } catch (err) {
      setError('Failed to get response. Please try again.')
      console.error('Error sending message:', err)
      
      // Add error message to chat
      setMessages(prev => ({
        ...prev,
        [agentId]: [...(prev[agentId] || []), { 
          role: 'assistant', 
          text: 'Sorry, I encountered an error while processing your request. Please try again.' 
        }]
      }))
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const selectAgent = (agent) => {
    setActiveAgent(agent)
    setSidebarOpen(false)
    setError(null)
  }

  const currentMessages = activeAgent ? (messages[activeAgent.id] || []) : []

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:w-96
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CitizenAssist</h1>
                <p className="text-sm text-gray-600 mt-1">AI-powered citizen services</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Agent List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Assistant</h2>
              {agents.length === 0 ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                  <p className="text-gray-500 mt-2">Loading agents...</p>
                </div>
              ) : (
                agents.map(agent => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    isActive={activeAgent?.id === agent.id}
                    onClick={selectAgent}
                  />
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              AI assistants provide general guidance only. Consult professionals for specific advice.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b p-4 flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          {activeAgent && (
            <>
              <div className={`w-8 h-8 rounded-lg ${AGENT_COLORS[activeAgent.id]} flex items-center justify-center`}>
                {React.createElement(AGENT_ICONS[activeAgent.id] || Bot, { className: "w-4 h-4 text-white" })}
              </div>
              <div>
                <div className="font-semibold">{activeAgent.role}</div>
              </div>
            </>
          )}
        </div>

        {activeAgent ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header - Desktop */}
            <div className="hidden lg:block bg-white border-b p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl ${AGENT_COLORS[activeAgent.id]} flex items-center justify-center`}>
                  {React.createElement(AGENT_ICONS[activeAgent.id] || Bot, { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{activeAgent.role}</h2>
                  <p className="text-gray-600 mt-1">{activeAgent.goal}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {currentMessages.length === 0 && (
                  <div className="text-center py-12">
                    <div className={`w-16 h-16 rounded-2xl ${AGENT_COLORS[activeAgent.id]} flex items-center justify-center mx-auto mb-4`}>
                      {React.createElement(AGENT_ICONS[activeAgent.id] || Bot, { className: "w-8 h-8 text-white" })}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Hi! I'm your {activeAgent.role}
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      {activeAgent.description || 'How can I help you today? Feel free to ask me anything within my expertise!'}
                    </p>
                  </div>
                )}
                
                {currentMessages.map((message, index) => (
                  <MessageBubble
                    key={index}
                    message={message.text}
                    isUser={message.role === 'user'}
                  />
                ))}
                
                {loading && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mx-6 mb-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="bg-white border-t p-4">
              <div className="max-w-4xl mx-auto flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask ${activeAgent.role.toLowerCase()}...`}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !inputMessage.trim()}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to CitizenAssist</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Choose an AI assistant from the sidebar to get started with personalized help for your needs.
              </p>
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Choose Assistant
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default App