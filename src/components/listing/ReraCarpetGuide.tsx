
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, FileText, Info } from 'lucide-react';

export const ReraCarpetGuide: React.FC = () => {
  const includedAreas = [
    'Living Room',
    'Bedrooms',
    'Kitchen',
    'Dining Room',
    'Internal Walls',
    'Bathrooms',
    'Study Room',
    'Utility Room (if enclosed)'
  ];

  const excludedAreas = [
    'Balconies',
    'Open Terraces',
    'Common Areas',
    'Shaft Areas',
    'Washyards',
    'External Walls',
    'Parking Space',
    'Garden/Landscaping'
  ];

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-600">
          <Info className="mr-2 h-5 w-5" />
          RERA Carpet Area Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>RERA Carpet Area</strong> includes only the usable internal area within the walls. 
              This helps buyers understand the actual space they're purchasing.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="included">
              <AccordionTrigger className="text-green-700 font-semibold">
                ✅ Included in Carpet Area
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {includedAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2 text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="excluded">
              <AccordionTrigger className="text-red-700 font-semibold">
                ❌ Excluded from Carpet Area
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {excludedAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2 text-red-700">
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="conversion">
              <AccordionTrigger className="text-orange-700 font-semibold">
                🔄 How We Calculate
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="bg-orange-50 p-3 rounded">
                    <strong>Super Built-up to Carpet Area:</strong>
                    <br />Typically 70-75% of Super Built-up Area
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <strong>Built-up to Carpet Area:</strong>
                    <br />Typically 80-85% of Built-up Area
                  </div>
                  <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                    <strong>Note:</strong> These are approximations. Actual RERA carpet area 
                    should be verified from official documents.
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <FileText className="mr-2 h-4 w-4" />
              Read RERA Rulebook (PDF)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
