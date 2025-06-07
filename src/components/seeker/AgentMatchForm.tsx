
import React, { useState } from 'react';
import { useAgentMatch, AgentMatchRequest } from '@/hooks/useAgentMatch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Users } from 'lucide-react';

export default function AgentMatchForm() {
  const { findMatch, loading } = useAgentMatch();
  const [formData, setFormData] = useState<AgentMatchRequest>({
    preferred_city: '',
    budget: 0,
    property_type: '',
    urgency_level: '',
    notes: ''
  });

  const handleInputChange = (field: keyof AgentMatchRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await findMatch(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-green-500" />
          <CardTitle>Find Your Perfect Agent</CardTitle>
        </div>
        <CardDescription>
          Let AI match you with the ideal real estate agent based on your requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="preferred_city">Preferred City</Label>
            <Input
              id="preferred_city"
              type="text"
              value={formData.preferred_city}
              onChange={(e) => handleInputChange('preferred_city', e.target.value)}
              placeholder="City where you're looking for property"
              required
            />
          </div>

          <div>
            <Label htmlFor="budget">Budget (₹)</Label>
            <Input
              id="budget"
              type="number"
              min="0"
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)}
              placeholder="Your property budget"
              required
            />
          </div>

          <div>
            <Label htmlFor="property_type">Property Type</Label>
            <Select 
              value={formData.property_type} 
              onValueChange={(value) => handleInputChange('property_type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="plot">Plot/Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="urgency_level">Urgency Level</Label>
            <Select 
              value={formData.urgency_level} 
              onValueChange={(value) => handleInputChange('urgency_level', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="How urgent is your requirement?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Just exploring</SelectItem>
                <SelectItem value="medium">Medium - Looking within 3-6 months</SelectItem>
                <SelectItem value="high">High - Need within 1-3 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any specific requirements or preferences..."
              rows={3}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding Perfect Match...
              </>
            ) : (
              'Find My Agent'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
