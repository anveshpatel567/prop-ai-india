
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, MapPin, School, Train } from 'lucide-react';

interface LocalityInsightPanelProps {
  locality: string;
  city: string;
}

interface LocalityData {
  avgPriceSqft: number;
  rentalYield: number;
  builderDensity: number;
  schoolRating: number;
  metroRating: number;
  trend: 'up' | 'down' | 'stable';
}

export const LocalityInsightPanel: React.FC<LocalityInsightPanelProps> = ({
  locality,
  city
}) => {
  const [data, setData] = useState<LocalityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual data fetching
    setTimeout(() => {
      setData({
        avgPriceSqft: 8500,
        rentalYield: 3.2,
        builderDensity: 7,
        schoolRating: 4.2,
        metroRating: 3.8,
        trend: 'up'
      });
      setLoading(false);
    }, 1000);
  }, [locality, city]);

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">Loading locality insights...</div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-orange-500" />
          {locality}, {city}
          <Badge className={`ml-auto ${
            data.trend === 'up' ? 'bg-green-100 text-green-700' :
            data.trend === 'down' ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {data.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> :
             data.trend === 'down' ? <TrendingDown className="h-3 w-3 mr-1" /> : null}
            {data.trend}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/20 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              ₹{data.avgPriceSqft.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Avg. Price/sq ft</div>
          </div>
          
          <div className="text-center p-3 bg-white/20 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              {data.rentalYield}%
            </div>
            <div className="text-sm text-gray-600">Rental Yield</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <School className="h-4 w-4 text-gray-600" />
              <span className="text-sm">School Rating</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`w-3 h-3 rounded-full ${
                    star <= data.schoolRating ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Train className="h-4 w-4 text-gray-600" />
              <span className="text-sm">Metro Connectivity</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`w-3 h-3 rounded-full ${
                    star <= data.metroRating ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
