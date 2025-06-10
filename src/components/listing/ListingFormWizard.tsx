
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { BrochureUploadStep } from './steps/BrochureUploadStep';
import { AmenitiesStep } from './steps/AmenitiesStep';
import { LocationStep } from './steps/LocationStep';
import { PropertyDetailsStep } from './steps/PropertyDetailsStep';
import { ReviewSubmitStep } from './steps/ReviewSubmitStep';
import { useToast } from '@/hooks/use-toast';

interface ListingData {
  title: string;
  property_type: string;
  listing_type: 'sale' | 'rent';
  price: number;
  area_sqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  city: string;
  locality?: string;
  description: string;
  google_maps_pin: string;
  amenities: string[];
  brochure_data?: any;
  photos: string[];
}

const steps = [
  { id: 'basic', title: 'Basic Info', component: BasicInfoStep },
  { id: 'brochure', title: 'Brochure Upload', component: BrochureUploadStep },
  { id: 'amenities', title: 'Amenities', component: AmenitiesStep },
  { id: 'location', title: 'Location & Pin', component: LocationStep },
  { id: 'details', title: 'Property Details', component: PropertyDetailsStep },
  { id: 'review', title: 'Review & Submit', component: ReviewSubmitStep }
];

export const ListingFormWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listingData, setListingData] = useState<ListingData>({
    title: '',
    property_type: '',
    listing_type: 'sale',
    price: 0,
    city: '',
    description: '',
    google_maps_pin: '',
    amenities: [],
    photos: []
  });
  const { toast } = useToast();

  const updateListingData = (stepData: Partial<ListingData>) => {
    setListingData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual submission to backend
      console.log('Submitting listing:', listingData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Listing created successfully!",
        description: "Your property has been listed and is now live"
      });
      
      // Reset form or redirect
    } catch (error) {
      toast({
        title: "Failed to create listing",
        description: "Please check your data and try again",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Create Property Listing</span>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </CardTitle>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    index < currentStep ? 'bg-green-500 border-green-500 text-white' :
                    index === currentStep ? 'border-blue-500 text-blue-500' :
                    'border-gray-300 text-gray-300'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className={`ml-2 text-sm ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <CurrentStepComponent
            data={listingData}
            onDataChange={updateListingData}
            onNext={nextStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? 'Creating...' : 'Create Listing'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
