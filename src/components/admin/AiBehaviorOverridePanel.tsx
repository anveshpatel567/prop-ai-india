
import React, { useEffect, useState } from 'react';
import { useBehaviorExceptions } from '@/hooks/useBehaviorExceptions';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Plus, CheckCircle } from 'lucide-react';

export function AiBehaviorOverridePanel(): JSX.Element {
  const { user } = useAuth();
  const { exceptions, loading, fetchExceptions, createException } = useBehaviorExceptions();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    context: '',
    override_behavior: '',
    notes: ''
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchExceptions();
    }
  }, [user?.role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createException(formData);
    setFormData({ context: '', override_behavior: '', notes: '' });
    setShowForm(false);
  };

  if (!user || user.role !== 'admin') {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Access restricted to administrators only.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading behavior exceptions...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            AI Behavior Override Registry ({exceptions.length})
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Override
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {showForm && (
            <form onSubmit={handleSubmit} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Context</label>
                  <Input
                    value={formData.context}
                    onChange={(e) => setFormData({...formData, context: e.target.value})}
                    placeholder="e.g., Property valuation for luxury homes"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Override Behavior</label>
                  <Textarea
                    value={formData.override_behavior}
                    onChange={(e) => setFormData({...formData, override_behavior: e.target.value})}
                    placeholder="Describe the specific behavior override..."
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Additional notes or justification..."
                    rows={2}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Create Override</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}

          {exceptions.length === 0 ? (
            <p className="text-gray-500">No behavior exceptions found.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {exceptions.map((exception) => (
                <div key={exception.id} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">Approved Override</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(exception.created_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Context:</h4>
                      <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                        {exception.context}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Override Behavior:</h4>
                      <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                        {exception.override_behavior}
                      </p>
                    </div>

                    {exception.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Notes:</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {exception.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
