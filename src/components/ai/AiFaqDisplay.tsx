
import React, { useEffect } from 'react';
import { useAiFaqGenerations } from '@/hooks/useAiFaqGenerations';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar } from 'lucide-react';

export default function AiFaqDisplay() {
  const { user } = useAuth();
  const { faqs, loading, fetchUserFaqs } = useAiFaqGenerations();

  useEffect(() => {
    if (user?.id) {
      fetchUserFaqs(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading FAQ generations...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          AI Generated FAQs ({faqs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {faqs.length === 0 ? (
          <p className="text-gray-500">No FAQs generated yet. Start using AI features to create FAQs!</p>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {faq.context}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(faq.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
                    {faq.faq_markdown}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
