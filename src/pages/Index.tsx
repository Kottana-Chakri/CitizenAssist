import { useEffect, useMemo, useState } from "react";
import { AgentCard } from "@/components/AgentCard";
import { ChatInterface } from "@/components/ChatInterface";
import { agents, type Agent } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Shield, Zap } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useChatHistory } from "@/hooks/use-chat-history";
import type { Message } from "@/types/chat";
import { LoginDialog } from "@/components/LoginDialog";
import { generateAssistantReply, synthesizeSpeech } from "@/lib/ai";

// using shared Message type

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { user, login, logout } = useAuth();
  const { getMessages, appendMessage } = useChatHistory(user);
  const [isLoading, setIsLoading] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleSendMessage = async (text: string) => {
    if (!selectedAgent) return;
    if (!user) { setLoginOpen(true); return; }

    const userMessage: Message = { role: 'user', content: text, timestamp: new Date() };
    appendMessage(selectedAgent.id, userMessage);
    setIsLoading(true);

    try {
      const history = getMessages(selectedAgent.id);
      const reply = await generateAssistantReply(selectedAgent.id, text, history);
      const botMessage: Message = { role: 'assistant', content: reply, timestamp: new Date() };
      appendMessage(selectedAgent.id, botMessage);

      // Optional TTS
      const url = await synthesizeSpeech(reply);
      setAudioUrl(url);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = useMemo(() => Array.from(new Set(agents.map(agent => agent.category))), []);

  useEffect(() => {
    // Cleanup audio object URLs on unmount or update
    return () => { if (audioUrl) URL.revokeObjectURL(audioUrl); };
  }, [audioUrl]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                <Sparkles className="w-5 h-5 mr-2" />
                AI-Powered Citizen Services
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              CitizenAssist
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              Your personal AI assistant for education, career guidance, health, finance, and more. 
              Get expert help from 10 specialized agents, available 24/7.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>10 Specialized Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Safe & Reliable</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Instant Responses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Agent Selection */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Choose Your Assistant
              </h2>
              <p className="text-muted-foreground">
                Select an AI agent specialized for your specific needs.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const count = agents.filter(a => a.category === category).length;
                return (
                  <Badge key={category} variant="outline" className="text-xs">
                    {category} ({count})
                  </Badge>
                );
              })}
            </div>

            {/* Agent Cards */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  isActive={selectedAgent?.id === agent.id}
                  onClick={() => setSelectedAgent(agent)}
                />
              ))}
            </div>
          </div>

      {/* Chat Interface */}
          <div className="lg:col-span-2">
            {selectedAgent ? (
              <ChatInterface
                agent={selectedAgent}
        messages={getMessages(selectedAgent.id)}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            ) : (
              <div className="h-[80vh] flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="text-6xl mb-6">🤖</div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Welcome to CitizenAssist
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Select an AI agent from the left panel to start getting personalized assistance with your questions and goals.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Button onClick={() => setSelectedAgent(agents[0])} className="bg-primary hover:bg-primary/90">
                      Get Started with Study Buddy
                    </Button>
                    {!user && (
                      <Button variant="secondary" onClick={() => setLoginOpen(true)}>Sign in</Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/50 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              🔒 <strong>Important:</strong> This is a demonstration interface. Responses are educational examples only.
            </p>
            <p>
              For medical, legal, or financial advice, please consult qualified professionals.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              {user ? (
                <>
                  <span>Signed in as {user.name} ({user.email})</span>
                  <Button size="sm" variant="outline" onClick={logout}>Sign out</Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setLoginOpen(true)}>Sign in to save chats</Button>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Login Dialog */}
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={login} />

      {/* Optional TTS audio preview */}
      {audioUrl && (
        <audio src={audioUrl} autoPlay className="hidden" />
      )}
    </div>
  );
};

export default Index;