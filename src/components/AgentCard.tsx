import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Agent {
  id: string;
  name: string;
  goal: string;
  icon: string;
  category: string;
  color: string;
}

interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
  onClick: () => void;
}

export const AgentCard = ({ agent, isActive, onClick }: AgentCardProps) => {
  return (
    <Card
      className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 ${
        isActive 
          ? 'ring-2 ring-primary shadow-glow bg-gradient-card' 
          : 'hover:shadow-card'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`text-2xl p-3 rounded-xl bg-gradient-to-br ${agent.color}`}>
          {agent.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground truncate">{agent.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {agent.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {agent.goal}
          </p>
        </div>
      </div>
    </Card>
  );
};