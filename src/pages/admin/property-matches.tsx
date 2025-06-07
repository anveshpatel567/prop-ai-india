
import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePropertyMatches } from '@/hooks/usePropertyMatches';
import SmartMatchScore from '@/components/match/SmartMatchScore';
import { Brain, Users, Home } from 'lucide-react';

export default function AdminPropertyMatchesPage() {
  const { matches, loading, fetchMatches } = usePropertyMatches();

  useEffect(() => {
    fetchMatches(); // Fetch all matches for admin
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Rajdhani'] flex items-center justify-center gap-2">
            <Brain className="h-8 w-8 text-blue-500" />
            AI Property Matches Dashboard
          </h1>
          <p className="text-gray-600 font-['DM_Sans']">
            Monitor and analyze AI-generated property matches across all users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{matches.length}</div>
              <p className="text-xs text-muted-foreground">AI-generated property matches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Match Score</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {matches.length > 0 
                  ? Math.round(matches.reduce((sum, match) => sum + match.match_score, 0) / matches.length)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Average compatibility score</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Matches</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {matches.filter(match => match.match_score >= 80).length}
              </div>
              <p className="text-xs text-muted-foreground">Matches scoring 80% or higher</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Property Matches</CardTitle>
            <CardDescription>
              Comprehensive view of AI-generated property matches across all users
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p>Loading matches...</p>
              </div>
            ) : matches.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No property matches found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {matches.map((match) => (
                  <Card key={match.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {match.listing?.title}
                          </h3>
                          <p className="text-gray-600">
                            {match.listing?.locality}, {match.listing?.city}
                          </p>
                          <p className="font-bold text-lg text-green-600">
                            {formatPrice(match.listing?.price)}
                          </p>
                          <Badge variant="outline" className="mt-2">
                            Seeker ID: {match.seeker_id?.slice(0, 8)}...
                          </Badge>
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
                      
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-purple-800 mb-1">AI Explanation:</p>
                        <p className="text-sm text-purple-700">{match.explanation}</p>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        Generated: {new Date(match.created_at).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
