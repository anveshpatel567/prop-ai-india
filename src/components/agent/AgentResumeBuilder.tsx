
import React, { useState } from 'react';
import { useAiResume, CreateResumeInput } from '@/hooks/useAiResume';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, FileText } from 'lucide-react';

export default function AgentResumeBuilder() {
  const { generateResume, loading } = useAiResume();
  const [formData, setFormData] = useState<CreateResumeInput>({
    name: '',
    experience_years: 0,
    city: '',
    specialization: '',
    past_projects: '',
    strengths: ''
  });

  const handleInputChange = (field: keyof CreateResumeInput, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateResume(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-500" />
          <CardTitle>AI Resume Builder</CardTitle>
        </div>
        <CardDescription>
          Create a professional real estate agent resume powered by AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="experience_years">Years of Experience</Label>
            <Input
              id="experience_years"
              type="number"
              min="0"
              value={formData.experience_years}
              onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value) || 0)}
              placeholder="Years in real estate"
              required
            />
          </div>

          <div>
            <Label htmlFor="city">Primary City</Label>
            <Input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="City where you operate"
              required
            />
          </div>

          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              type="text"
              value={formData.specialization}
              onChange={(e) => handleInputChange('specialization', e.target.value)}
              placeholder="e.g., Luxury homes, Commercial, First-time buyers"
              required
            />
          </div>

          <div>
            <Label htmlFor="past_projects">Notable Past Projects</Label>
            <Textarea
              id="past_projects"
              value={formData.past_projects}
              onChange={(e) => handleInputChange('past_projects', e.target.value)}
              placeholder="Describe your most significant real estate projects and achievements"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="strengths">Key Strengths</Label>
            <Textarea
              id="strengths"
              value={formData.strengths}
              onChange={(e) => handleInputChange('strengths', e.target.value)}
              placeholder="Your unique selling points and professional strengths"
              rows={3}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Resume...
              </>
            ) : (
              'Generate AI Resume'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
