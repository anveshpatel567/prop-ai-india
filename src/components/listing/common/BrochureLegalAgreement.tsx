
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface BrochureLegalAgreementProps {
  agreed: boolean;
  onAgreementChange: (agreed: boolean) => void;
}

export const BrochureLegalAgreement: React.FC<BrochureLegalAgreementProps> = ({
  agreed,
  onAgreementChange
}) => {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id="agreement"
        checked={agreed}
        onCheckedChange={(checked) => onAgreementChange(checked as boolean)}
      />
      <Label htmlFor="agreement" className="text-sm leading-5">
        I confirm that this listing complies with the RERA Act and FreePropList terms of service.
      </Label>
    </div>
  );
};
