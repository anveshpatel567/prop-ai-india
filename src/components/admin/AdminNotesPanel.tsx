
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAdminNotes } from '@/hooks/useAdminNotes';
import { format } from 'date-fns';
import { FileText } from 'lucide-react';

export function AdminNotesPanel() {
  const { notes, loading, addAdminNote } = useAdminNotes();
  const [context, setContext] = useState('');
  const [note, setNote] = useState('');

  const handleAddNote = async () => {
    if (!context || !note) return;
    
    await addAdminNote(context, note);
    setContext('');
    setNote('');
  };

  const getContextColor = (context: string) => {
    const lowerContext = context.toLowerCase();
    if (lowerContext.includes('bias')) return 'bg-purple-100 text-purple-800';
    if (lowerContext.includes('abuse')) return 'bg-red-100 text-red-800';
    if (lowerContext.includes('performance')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Admin Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <Label htmlFor="context">Context/Tag</Label>
            <Input
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., bias, performance, abuse"
            />
          </div>
          <div>
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Admin note about AI event or observation"
            />
          </div>
          <Button onClick={handleAddNote} disabled={!context || !note}>
            Add Note
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Notes</h3>
          {loading ? (
            <p className="text-muted-foreground">Loading admin notes...</p>
          ) : (
            <div className="space-y-3">
              {notes.map((noteItem) => (
                <div key={noteItem.id} className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getContextColor(noteItem.context)}>
                      {noteItem.context}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(noteItem.created_at), 'PPp')}
                    </span>
                  </div>
                  <p className="text-sm">{noteItem.note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
