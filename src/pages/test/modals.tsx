
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { X, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export default function ModalsTestPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Modal Components Visual Test
            </h1>
            <p className="text-gray-600">
              Testing modal behavior on desktop and mobile devices
            </p>
          </div>

          {/* Modal Trigger Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Modal Test Triggers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => setActiveModal('info')}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Info className="mr-2 h-4 w-4" />
                  Info Modal
                </Button>

                <Button
                  onClick={() => setActiveModal('success')}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Success Modal
                </Button>

                <Button
                  onClick={() => setActiveModal('warning')}
                  className="bg-orange-500 text-white hover:bg-orange-600"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Warning Modal
                </Button>

                <Button
                  onClick={() => setActiveModal('ai-tool')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  AI Tool Modal
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Test Instructions */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-600">Mobile Modal Test Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>✅ <strong>Backdrop Test:</strong> Tapping outside modal should close it</p>
                <p>✅ <strong>Escape Test:</strong> Pressing Esc key should close modal</p>
                <p>✅ <strong>Scroll Test:</strong> Modal content should scroll if too tall</p>
                <p>✅ <strong>Z-Index Test:</strong> Modal should appear above all other content</p>
                <p>✅ <strong>Focus Test:</strong> Focus should be trapped within modal</p>
                <p>✅ <strong>Animation Test:</strong> Modal should slide/fade in smoothly</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Modal */}
        <Dialog open={activeModal === 'info'} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-blue-500" />
                Information Modal
              </DialogTitle>
              <DialogDescription>
                This is a sample information modal to test responsive behavior.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                This modal demonstrates proper spacing, typography, and mobile responsiveness. 
                It should work seamlessly across all device sizes.
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button onClick={closeModal}>
                  Got it
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Modal */}
        <Dialog open={activeModal === 'success'} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Action Successful
              </DialogTitle>
              <DialogDescription>
                Your operation completed successfully!
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ Property listing created<br/>
                  ✅ AI analysis completed<br/>
                  ✅ SEO optimization applied
                </p>
              </div>
              <div className="flex justify-end">
                <Button onClick={closeModal} className="bg-green-500 hover:bg-green-600 text-white">
                  Continue
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Warning Modal */}
        <Dialog open={activeModal === 'warning'} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                Insufficient Credits
              </DialogTitle>
              <DialogDescription>
                You need more credits to use this AI tool.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Required:</strong> 25 credits<br/>
                  <strong>Your balance:</strong> 8 credits<br/>
                  <strong>Need:</strong> 17 more credits
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white" onClick={closeModal}>
                  Buy Credits
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* AI Tool Modal */}
        <Dialog open={activeModal === 'ai-tool'} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-orange-500" />
                AI Video Generator
              </DialogTitle>
              <DialogDescription>
                Generate a professional property video using AI
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Property Details</h4>
                  <p className="text-sm text-gray-600">3BHK Apartment in Banjara Hills</p>
                  <p className="text-sm text-gray-600">₹85L • 2100 sq ft</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Video Options</h4>
                  <p className="text-sm text-gray-600">Duration: 60 seconds</p>
                  <p className="text-sm text-gray-600">Style: Professional</p>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-800">Cost: 15 Credits</p>
                    <p className="text-sm text-orange-600">Generation time: ~2 minutes</p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-500" />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white" onClick={closeModal}>
                  Generate Video
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
