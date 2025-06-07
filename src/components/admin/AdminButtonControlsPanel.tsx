
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ButtonVariant, UiButtonControl } from '@/types/ui';
import { GlassCard } from '@/components/layout/GlassCard';
import { ButtonPrimary } from '@/components/common/ButtonPrimary';

const availableVariants: ButtonVariant[] = ['primary', 'secondary', 'glass'];

export const AdminButtonControlsPanel: React.FC = () => {
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    allowed_variants: ButtonVariant[];
    fallback_variant: ButtonVariant;
  }>({
    allowed_variants: ['primary'],
    fallback_variant: 'primary'
  });

  const queryClient = useQueryClient();

  const { data: buttonControls, isLoading } = useQuery({
    queryKey: ['admin-button-controls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ui_button_controls')
        .select('*')
        .order('page_slug');

      if (error) throw error;
      return data as UiButtonControl[];
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<UiButtonControl> }) => {
      const { error } = await supabase
        .from('ui_button_controls')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-button-controls'] });
      setEditingPage(null);
    }
  });

  const handleEdit = (control: UiButtonControl) => {
    setEditingPage(control.id);
    setFormData({
      allowed_variants: control.allowed_variants,
      fallback_variant: control.fallback_variant
    });
  };

  const handleSave = (id: string) => {
    updateMutation.mutate({
      id,
      updates: {
        allowed_variants: formData.allowed_variants,
        fallback_variant: formData.fallback_variant,
        updated_at: new Date().toISOString()
      }
    });
  };

  const toggleVariant = (variant: ButtonVariant) => {
    setFormData(prev => ({
      ...prev,
      allowed_variants: prev.allowed_variants.includes(variant)
        ? prev.allowed_variants.filter(v => v !== variant)
        : [...prev.allowed_variants, variant]
    }));
  };

  if (isLoading) {
    return (
      <GlassCard>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 fire-gradient-text">Button Variant Controls</h2>
        
        <div className="space-y-4">
          {buttonControls?.map((control) => (
            <div key={control.id} className="glass-card p-4 border border-fire-gold/30">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-rajdhani font-semibold text-lg">{control.page_slug}</h3>
                  
                  {editingPage === control.id ? (
                    <div className="mt-3 space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">Allowed Variants:</label>
                        <div className="flex gap-2">
                          {availableVariants.map((variant) => (
                            <button
                              key={variant}
                              onClick={() => toggleVariant(variant)}
                              className={`px-3 py-1 rounded text-sm border transition-colors ${
                                formData.allowed_variants.includes(variant)
                                  ? 'bg-fire-primary text-white border-fire-primary'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-fire-primary'
                              }`}
                            >
                              {variant}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Fallback Variant:</label>
                        <select
                          value={formData.fallback_variant}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            fallback_variant: e.target.value as ButtonVariant 
                          }))}
                          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-fire-primary"
                        >
                          {availableVariants.map((variant) => (
                            <option key={variant} value={variant}>{variant}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <ButtonPrimary 
                          onClick={() => handleSave(control.id)}
                          disabled={updateMutation.isPending}
                        >
                          Save
                        </ButtonPrimary>
                        <button
                          onClick={() => setEditingPage(null)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Allowed:</span> {control.allowed_variants.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Fallback:</span> {control.fallback_variant}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Updated: {new Date(control.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                
                {editingPage !== control.id && (
                  <button
                    onClick={() => handleEdit(control)}
                    className="text-fire-primary hover:text-fire-secondary transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default AdminButtonControlsPanel;
