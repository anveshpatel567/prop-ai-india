
import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import SmartMatchPanel from '@/components/match/SmartMatchPanel';
import { useAuth } from '@/hooks/useAuth';
import { usePropertyMatches } from '@/hooks/usePropertyMatches';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp } from 'lucide-react';

export default function SmartMatchesPage() {
  const { user } = useAuth();
  const { matches, fetchMatches } = usePropertyMatches();

  useEffect(() => {
    if (user?.id) {
      fetchMatches(user.id);
    }
  }, [user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen warm-gradient">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-6 text-center">
              <p>Please log in to access smart property matches.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-['Rajdhani'] flex items-center justify-center gap-2">
            <Brain className="h-8 w-8 text-blue-500" />
            AI Smart Property Matches
          </h1>
          <p className="text-gray-600 font-['DM_Sans']">
            Let AI find the perfect properties that match your preferences and requirements
          </p>
        </div>

        {matches.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Previous Matches
              </CardTitle>
              <CardDescription>
                You have {matches.length} AI-generated property matches
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <SmartMatchPanel seekerId={user.id} />
      </div>
      <Footer />
    </div>
  );
}
