
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building, Key } from 'lucide-react';

export function AgentTypeSelector({ 
  selectedType,
  onTypeSelect 
}: { 
  selectedType: string;
  onTypeSelect: (type: string) => void;
}) {
  const agentTypes = [
    {
      id: 'buyer',
      title: 'Looking to Buy',
      description: 'Find agents who specialize in helping buyers',
      icon: Home,
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'seller',
      title: 'Looking to Sell',
      description: 'Connect with agents who excel at selling properties',
      icon: Building,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'renter',
      title: 'Looking to Rent',
      description: 'Get matched with rental specialists',
      icon: Key,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">What are you looking for?</h2>
        <p className="text-gray-600">Select your primary goal to get matched with the right agent</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agentTypes.map(type => {
          const IconComponent = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-orange-500 bg-orange-50 border-orange-200' 
                  : type.color
              }`}
              onClick={() => onTypeSelect(type.id)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-orange-100' : 'bg-white'
                }`}>
                  <IconComponent className={`h-8 w-8 ${
                    isSelected ? 'text-orange-600' : 'text-gray-600'
                  }`} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                </div>
                
                <Button
                  variant={isSelected ? "default" : "outline"}
                  className="w-full"
                >
                  {isSelected ? 'Selected' : 'Select'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
