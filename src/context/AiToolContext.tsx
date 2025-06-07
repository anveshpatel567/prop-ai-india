
import React, { createContext, useContext, useState } from 'react';
import { AiToolConfig, AiToolTransaction } from '../types';

interface AiToolContextType {
  toolConfigs: AiToolConfig[];
  transactions: AiToolTransaction[];
  executeAiTool: (toolName: string, inputData: string) => Promise<string>;
  getToolCost: (toolName: string) => number;
  isToolEnabled: (toolName: string) => boolean;
}

const AiToolContext = createContext<AiToolContextType | null>(null);

export const AiToolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toolConfigs] = useState<AiToolConfig[]>([
    { tool_name: 'brochure_parser', is_enabled: true, credit_cost: 10, description: 'Parse property brochures using AI' },
    { tool_name: 'title_generator', is_enabled: true, credit_cost: 5, description: 'Generate catchy property titles' },
    { tool_name: 'smart_search', is_enabled: true, credit_cost: 8, description: 'AI-powered property search' },
    { tool_name: 'nearby_finder', is_enabled: true, credit_cost: 6, description: 'Find nearby amenities using location' },
    { tool_name: 'lead_scorer', is_enabled: true, credit_cost: 12, description: 'Score leads using AI analysis' },
    { tool_name: 'followup_generator', is_enabled: true, credit_cost: 7, description: 'Generate follow-up messages' },
    { tool_name: 'video_generator', is_enabled: true, credit_cost: 20, description: 'Create property videos' },
    { tool_name: 'seo_schema', is_enabled: true, credit_cost: 4, description: 'Generate SEO schema markup' },
    { tool_name: 'resume_builder', is_enabled: true, credit_cost: 15, description: 'Build agent resumes' },
    { tool_name: 'agent_matcher', is_enabled: true, credit_cost: 9, description: 'Match agents to properties' },
  ]);

  const [transactions, setTransactions] = useState<AiToolTransaction[]>([]);

  const executeAiTool = async (toolName: string, inputData: string): Promise<string> => {
    const tool = toolConfigs.find(t => t.tool_name === toolName);
    if (!tool || !tool.is_enabled) {
      throw new Error(`Tool ${toolName} is not available`);
    }

    // Simulate AI processing
    const transaction: AiToolTransaction = {
      id: Date.now().toString(),
      user_id: '1',
      tool_name: toolName,
      credit_cost: tool.credit_cost,
      input_data: inputData,
      output_data: '',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    setTransactions(prev => [transaction, ...prev]);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI responses
    let outputData = '';
    switch (toolName) {
      case 'brochure_parser':
        outputData = 'Extracted: 3BHK, 1200 sqft, Bandra West, Mumbai, ₹2.5 Cr';
        break;
      case 'title_generator':
        outputData = 'Luxurious 3BHK in Prime Bandra Location - Ready to Move';
        break;
      case 'smart_search':
        outputData = 'Found 15 properties with 87% match score';
        break;
      case 'nearby_finder':
        outputData = 'Schools: 3 within 1km, Hospitals: 2 within 2km, Metro: 500m';
        break;
      default:
        outputData = 'AI processing completed successfully';
    }

    // Update transaction
    setTransactions(prev => prev.map(t => 
      t.id === transaction.id 
        ? { ...t, output_data: outputData, status: 'success' }
        : t
    ));

    return outputData;
  };

  const getToolCost = (toolName: string): number => {
    const tool = toolConfigs.find(t => t.tool_name === toolName);
    return tool?.credit_cost || 0;
  };

  const isToolEnabled = (toolName: string): boolean => {
    const tool = toolConfigs.find(t => t.tool_name === toolName);
    return tool?.is_enabled || false;
  };

  return (
    <AiToolContext.Provider value={{
      toolConfigs,
      transactions,
      executeAiTool,
      getToolCost,
      isToolEnabled
    }}>
      {children}
    </AiToolContext.Provider>
  );
};

export const useAiTool = () => {
  const context = useContext(AiToolContext);
  if (!context) {
    throw new Error('useAiTool must be used within AiToolProvider');
  }
  return context;
};
