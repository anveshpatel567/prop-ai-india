
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Search, Home } from 'lucide-react';
import { usePropertyMatches, SeekerProfile } from '@/hooks/usePropertyMatches';
import SmartMatchScore from './SmartMatchScore';

interface SmartMatchPanelProps {
  seekerId: string;
}

export default function SmartMatchPanel({ seekerId }: SmartMatchPanelProps) {
  const { matches, loading, generateMatches } = usePropertyMatches();
  const [profile, setProfile] = useState<SeekerProfile>({
    budget: undefined,
    propertyType: '',
    location: '',
    bedrooms: undefined,
    notes: ''
  });

  const handleGenerateMatches = async () => {
    await generateMatches(seekerId, profile);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Profile Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Your Perfect Property Match
          </CardTitle>
          <CardDescription>
            Tell us your preferences and our AI will find the best matching properties
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (₹)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g., 5000000"
                value={profile.budget || ''}
                onChange={(e) => setProfile({ ...profile, budget: Number(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select 
                value={profile.propertyType} 
                onValueChange={(value) => setProfile({ ...profile, propertyType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Preferred Location</Label>
              <Input
                id="location"
                placeholder="e.g., Bangalore, Mumbai"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                placeholder="e.g., 3"
                value={profile.bedrooms || ''}
                onChange={(e) => setProfile({ ...profile, bedrooms: Number(e.target.value) })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Requirements</Label>
            <Textarea
              id="notes"
              placeholder="e.g., Near metro station, swimming pool, parking..."
              value={profile.notes}
              onChange={(e) => setProfile({ ...profile, notes: e.target.value })}
            />
          </div>
          
          <Button 
            onClick={handleGenerateMatches} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding Matches...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Find Smart Matches
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Your AI-Matched Properties ({matches.length})
            </CardTitle>
            <CardDescription>
              Properties ranked by AI compatibility with your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matches.map((match, index) => (
                <Card key={match.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          #{index + 1} {match.listing?.title}
                        </h3>
                        <p className="text-gray-600">
                          {match.listing?.locality}, {match.listing?.city}
                        </p>
                        <p className="font-bold text-lg text-green-600">
                          {formatPrice(match.listing?.price)}
                        </p>
                      </div>
                      <div className="w-48">
                        <SmartMatchScore score={Math.round(match.match_score)} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-3">
                      <span>Type: {match.listing?.property_type}</span>
                      <span>Bedrooms: {match.listing?.bedrooms || 'N/A'}</span>
                      <span>Bathrooms: {match.listing?.bathrooms || 'N/A'}</span>
                      <span>Area: {match.listing?.area_sqft || 'N/A'} sq ft</span>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-1">AI Match Explanation:</p>
                      <p className="text-sm text-blue-700">{match.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
