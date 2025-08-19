import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Message, UserProfile } from '@/types/chat';

const makeKey = (userId: string) => `caf_history_v1:${userId}`;

function reviveMessages(raw: any[]): Message[] {
  return (raw || []).map(m => ({
    role: m.role,
    content: m.content,
    timestamp: new Date(m.timestamp),
  }));
}

export function useChatHistory(user: UserProfile | null) {
  const [store, setStore] = useState<Record<string, Message[]>>({});

  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(makeKey(user.id));
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, Message[]> | any;
        const hydrated: Record<string, Message[]> = {};
        Object.keys(parsed || {}).forEach(k => {
          hydrated[k] = reviveMessages(parsed[k]);
        });
        setStore(hydrated);
      } else {
        setStore({});
      }
    } catch {
      setStore({});
    }
  }, [user?.id]);

  const persist = useCallback((next: Record<string, Message[]>) => {
    if (!user) return;
    localStorage.setItem(makeKey(user.id), JSON.stringify(next));
  }, [user]);

  const getMessages = useCallback((agentId: string): Message[] => store[agentId] || [], [store]);

  const appendMessage = useCallback((agentId: string, msg: Message) => {
    setStore(prev => {
      const next = { ...prev, [agentId]: [...(prev[agentId] || []), msg] };
      persist(next);
      return next;
    });
  }, [persist]);

  const setMessages = useCallback((agentId: string, msgs: Message[]) => {
    setStore(prev => {
      const next = { ...prev, [agentId]: msgs };
      persist(next);
      return next;
    });
  }, [persist]);

  const clearAgent = useCallback((agentId: string) => {
    setStore(prev => {
      const next = { ...prev };
      delete next[agentId];
      persist(next);
      return next;
    });
  }, [persist]);

  return useMemo(() => ({ store, getMessages, appendMessage, setMessages, clearAgent }), [store, getMessages, appendMessage, setMessages, clearAgent]);
}
