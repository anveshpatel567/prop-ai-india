
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, ArrowLeft, ArrowRight } from 'lucide-react';
import { BrochureUploadStep } from './steps/BrochureUploadStep';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { PropertyDetailsStep } from './steps/PropertyDetailsStep';
import { LocationStep } from './steps/LocationStep';
import { PricingStep } from './steps/PricingStep';
import { PhotosStep } from './steps/PhotosStep';
import { ReviewStep } from './steps/ReviewStep';
import { useListing } from '@/hooks/useListing';

const steps = [
  { id: 'brochure', title: 'Brochure Upload', component: BrochureUploadStep, optional: true },
  { id: 'basic', title: 'Basic Info', component: BasicInfoStep },
  { id: 'details', title: 'Property Details', component: PropertyDetailsStep },
  { id: 'location', title: 'Location', component: LocationStep },
  { id: 'pricing', title: 'Pricing', component: PricingStep },
  { id: 'photos', title: 'Photos', component: PhotosStep },
  { id: 'review', title: 'Review & Publish', component: ReviewStep }
];

export const ListingFormWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const { createListing, isLoading } = useListing();

  const currentStepData = steps[currentStep];
  const CurrentStepComponent = currentStepData.component;

  const handleDataChange = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = async () => {
    try {
      await createListing(formData);
      // Navigate to success page or listings
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Create Property Listing</CardTitle>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <Progress value={progress} className="mb-4" />
          
          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleStepClick(index)}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  completedSteps.has(index) 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : index === currentStep
                    ? 'border-orange-500 text-orange-500'
                    : 'border-gray-300 text-gray-300'
                }`}>
                  {completedSteps.has(index) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`text-xs mt-1 ${
                  index === currentStep ? 'text-orange-500 font-medium' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {step.optional && (
                  <span className="text-xs text-gray-400">(Optional)</span>
                )}
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Current Step Content */}
      <Card>
        <CardContent className="p-6">
          <CurrentStepComponent
            data={formData}
            onDataChange={handleDataChange}
            onNext={handleNext}
          />
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600"
          >
            {isLoading ? 'Publishing...' : 'Publish Listing'}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
