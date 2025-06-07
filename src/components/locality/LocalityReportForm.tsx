
import React, { useState } from 'react';
import { useLocalityReport, LocalityReportInput } from '@/hooks/useLocalityReport';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, MapPin } from 'lucide-react';

export default function LocalityReportForm() {
  const { generateReport, loading } = useLocalityReport();
  const [formData, setFormData] = useState<LocalityReportInput>({
    locality: '',
    city: ''
  });

  const handleInputChange = (field: keyof LocalityReportInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateReport(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-green-500" />
          <CardTitle>Generate Locality Report</CardTitle>
        </div>
        <CardDescription>
          Get AI-powered insights about any locality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="locality">Locality/Area</Label>
            <Input
              id="locality"
              type="text"
              value={formData.locality}
              onChange={(e) => handleInputChange('locality', e.target.value)}
              placeholder="e.g., Koramangala"
              required
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="e.g., Bangalore"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              'Generate Report'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
