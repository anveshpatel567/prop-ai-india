
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocalityReports } from '@/hooks/useLocalityReports';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, FileText, Loader2 } from 'lucide-react';

export const LocalityInsightsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const { generateReport, loading } = useLocalityReports();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!locality || !city) {
      toast({
        title: "Error",
        description: "Please enter both locality and city",
        variant: "destructive",
      });
      return;
    }

    try {
      await generateReport(locality, city);
      toast({
        title: "Report Generated",
        description: "Your locality insights report has been created successfully!",
      });
      setIsOpen(false);
      setLocality('');
      setCity('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate locality report",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          <MapPin className="mr-2 h-4 w-4" />
          Get Locality Insights
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-orange-600">
            <FileText className="mr-2 h-5 w-5" />
            AI Locality Report
          </DialogTitle>
          <DialogDescription>
            Generate comprehensive insights about any locality including market trends, amenities, and investment potential.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="locality">Locality/Area</Label>
            <Input
              id="locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="e.g., Bandra West, Koramangala"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., Mumbai, Bangalore"
              required
            />
          </div>

          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-sm text-orange-700">
              <strong>Report includes:</strong> Demographics, market trends, infrastructure, amenities, safety statistics, and investment insights.
            </p>
          </div>

          <Button 
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report (30 credits)
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
