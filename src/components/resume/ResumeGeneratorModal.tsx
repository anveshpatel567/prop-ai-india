
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Zap, Loader2 } from 'lucide-react';
import { useMyResume } from '@/hooks/useMyResume';
import { useToast } from '@/hooks/use-toast';

interface ResumeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeGeneratorModal: React.FC<ResumeGeneratorModalProps> = ({
  isOpen,
  onClose
}) => {
  const { generateResume } = useMyResume();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    experience_years: '',
    regions_covered: '',
    rera_id: '',
    specializations: '',
    achievements: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.experience_years || !formData.regions_covered) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      await generateResume({
        experience_years: parseInt(formData.experience_years),
        regions_covered: formData.regions_covered,
        rera_id: formData.rera_id,
        specializations: formData.specializations,
        achievements: formData.achievements
      });

      toast({
        title: "Resume Generation Started",
        description: "Your AI resume is being generated. This may take a few moments.",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate resume",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Generate AI Resume
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              100 credits
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience *</Label>
            <Input
              id="experience"
              type="number"
              min="0"
              max="50"
              value={formData.experience_years}
              onChange={(e) => updateFormData('experience_years', e.target.value)}
              placeholder="e.g. 5"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regions">Regions Covered *</Label>
            <Input
              id="regions"
              value={formData.regions_covered}
              onChange={(e) => updateFormData('regions_covered', e.target.value)}
              placeholder="e.g. Mumbai, Pune, Nashik"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rera">RERA Registration ID</Label>
            <Input
              id="rera"
              value={formData.rera_id}
              onChange={(e) => updateFormData('rera_id', e.target.value)}
              placeholder="e.g. A52100012345"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specializations">Specializations</Label>
            <Textarea
              id="specializations"
              value={formData.specializations}
              onChange={(e) => updateFormData('specializations', e.target.value)}
              placeholder="e.g. Luxury properties, Commercial real estate, First-time buyers"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievements">Key Achievements</Label>
            <Textarea
              id="achievements"
              value={formData.achievements}
              onChange={(e) => updateFormData('achievements', e.target.value)}
              placeholder="e.g. Closed 100+ property deals, Top performer 2023, Award winner"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Resume'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            This will deduct 100 credits from your wallet
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
