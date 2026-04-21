import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, ShieldCheck, AlertTriangle, Zap, Database } from 'lucide-react';
import { securityAI } from '../services/geminiService';
import { threatIntelService, IOC } from '../services/threatIntelService';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'model';
  content: string;
  isEnriched?: boolean;
  iocMatches?: IOC[];
}

export function ThreatHunter() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Neural threat hunting engine online. Supply cloud telemetry or architectural concerns for zero-day vulnerability assessment.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setIsEnriching(true);

    try {
      // Step 1: Enrich telemetry with Cloud-Native Threat Intelligence
      const { enrichedData, matches } = await threatIntelService.enrichTelemetry(userMessage);
      setIsEnriching(false);

      // Step 2: Update local state to show enriched status if matches found
      if (matches.length > 0) {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            ...newMessages[newMessages.length - 1], 
            isEnriched: true,
            iocMatches: matches
          };
          return newMessages;
        });
      }

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      // Step 3: Call AI with enriched context
      const response = await securityAI.generateResponse(enrichedData, history);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      console.error("Threat Hunter Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "CRITICAL FAIL: Neural link to cloud-native intel feed severed." }]);
    } finally {
      setIsLoading(false);
      setIsEnriching(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto space-y-4 font-mono">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-security-text flex items-center gap-2 uppercase tracking-widest">
            <Bot className="text-security-accent" size={20} /> AI Threat Hunter
          </h2>
          <p className="text-security-text-dim text-[10px] uppercase font-bold tracking-wider mt-1">Identifying anomalous telemetry patterns</p>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'model', content: 'Session cleared. Ready for new telemetry analysis.' }])}
          className="p-2 text-security-text-dim hover:text-security-danger transition-colors hover:bg-security-danger/10 rounded-[4px]"
          title="Clear session"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex-1 sharp-panel flex flex-col overflow-hidden relative bg-security-bg/50">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          <AnimatePresence>
            {messages.map((message, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  "flex gap-4",
                  message.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-[2px] shrink-0 flex items-center justify-center border",
                  message.role === 'model' ? "bg-security-accent-dim text-security-accent border-security-accent/30" : "bg-security-border text-security-text-dim border-security-border"
                )}>
                  {message.role === 'model' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className={cn(
                  "max-w-[85%] rounded-[4px] p-4 text-[11px] leading-relaxed border",
                  message.role === 'model' 
                    ? "bg-security-panel text-security-text border-security-border" 
                    : "bg-security-accent text-white border-security-accent"
                )}>
                  <pre className="whitespace-pre-wrap font-mono uppercase tracking-tighter">
                    {message.content}
                  </pre>
                  
                  {message.isEnriched && message.iocMatches && (
                    <div className="mt-3 pt-3 border-t border-white/20">
                      <div className="flex items-center gap-2 text-[9px] text-white uppercase font-bold tracking-widest mb-2">
                        <Database size={10} /> Cloud-Native Intel Enriched
                      </div>
                      <div className="space-y-1">
                        {message.iocMatches.map((match, mIdx) => (
                           <div key={mIdx} className="text-[9px] font-mono bg-black/20 p-1 rounded border border-white/10">
                              <span className="text-security-danger font-bold">[{match.threatLevel}]</span> {match.type}: {match.value}
                           </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {message.role === 'model' && message.content.includes('Blast Radius') && (
                    <div className="mt-3 pt-3 border-t border-security-border flex items-center gap-2 text-[9px] text-security-danger uppercase font-bold tracking-widest">
                      <AlertTriangle size={10} /> Blast Radius Analysis Impact
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="space-y-4">
              {isEnriching && (
                <div className="flex items-center gap-2 text-[9px] text-security-accent uppercase font-bold animate-pulse px-12">
                  <Database size={10} /> Querying Cloud-Native Intel Feeds...
                </div>
              )}
              <div className="flex gap-4 animate-pulse">
                <div className="w-8 h-8 rounded-[2px] bg-security-border shrink-0" />
                <div className="w-1/2 h-12 rounded-[4px] bg-security-border/50" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-security-border bg-security-panel">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Supply cloud telemetry or architectural concerns..."
              className="w-full bg-security-bg border border-security-border rounded-[4px] px-4 py-2.5 pr-12 text-[11px] font-mono focus:outline-none focus:border-security-accent transition-all placeholder:text-security-text-dim/50 uppercase"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-1.5 text-security-accent hover:bg-security-accent/10 rounded-[2px] transition-colors disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
