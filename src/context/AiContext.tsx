
import React, { createContext, useContext, useEffect, useState } from "react";

interface AiTool {
  id: string;
  name: string;
  enabled: boolean;
  creditCost: number;
  description: string;
}

interface AiContextType {
  aiTools: AiTool[];
  setAiTools: (tools: AiTool[]) => void;
  isToolEnabled: (toolName: string) => boolean;
  getToolCost: (toolName: string) => number;
  toggleTool: (toolName: string) => void;
}

const AiContext = createContext<AiContextType | null>(null);

export const AiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ✅ Always call hooks at the top level - never conditionally
  const [isMounted, setIsMounted] = useState(false);
  const [aiTools, setAiTools] = useState<AiTool[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      
      // Initialize default AI tools after mounting
      const defaultTools: AiTool[] = [
        { id: '1', name: 'ai_search', enabled: true, creditCost: 10, description: 'AI-powered property search' },
        { id: '2', name: 'smart_pricing', enabled: true, creditCost: 30, description: 'AI pricing analysis' },
        { id: '3', name: 'brochure_parser', enabled: true, creditCost: 50, description: 'Brochure parsing' },
        { id: '4', name: 'video_generator', enabled: true, creditCost: 100, description: 'Video generation' },
        { id: '5', name: 'lead_scorer', enabled: true, creditCost: 25, description: 'Lead scoring' },
      ];
      setAiTools(defaultTools);
    }
  }, []);

  const isToolEnabled = (toolName: string): boolean => {
    if (!isMounted) return false;
    const tool = aiTools.find(t => t.name === toolName);
    return tool?.enabled || false;
  };

  const getToolCost = (toolName: string): number => {
    const tool = aiTools.find(t => t.name === toolName);
    return tool?.creditCost || 0;
  };

  const toggleTool = (toolName: string) => {
    if (!isMounted) return;
    setAiTools(prev => prev.map(tool => 
      tool.name === toolName ? { ...tool, enabled: !tool.enabled } : tool
    ));
  };

  // ✅ Safe guard AFTER all hooks are called
  if (!isMounted) {
    return (
      <div className="fixed bottom-28 right-4 bg-purple-100 px-4 py-2 rounded-lg shadow-lg text-sm z-50">
        🤖 AI context initializing...
      </div>
    );
  }

  return (
    <AiContext.Provider value={{
      aiTools,
      setAiTools,
      isToolEnabled,
      getToolCost,
      toggleTool
    }}>
      {children}
    </AiContext.Provider>
  );
};

export const useAi = () => {
  const ctx = useContext(AiContext);
  if (!ctx) throw new Error("useAi must be used within AiProvider");
  return ctx;
};
