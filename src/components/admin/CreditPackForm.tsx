
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useCreateCreditPack, type CreateCreditPackInput } from '@/hooks/useCreditPacks';

export default function CreditPackForm() {
  const createPack = useCreateCreditPack();
  const { toast } = useToast();

  const [form, setForm] = useState<CreateCreditPackInput>({
    name: '',
    description: '',
    price_inr: 100,
    credits: 1000,
  });

  const handleCreate = async () => {
    if (!form.name.trim()) {
      toast({
        title: 'Error',
        description: 'Pack name is required',
        variant: 'destructive'
      });
      return;
    }

    try {
      await createPack.mutateAsync(form);
      setForm({ name: '', description: '', price_inr: 100, credits: 1000 });
      toast({
        title: 'Success',
        description: 'Credit pack created successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create credit pack',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Create New Credit Pack</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Pack Name *</Label>
          <Input
            id="name"
            placeholder="e.g., Starter Pack"
            value={form.name}
            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            min="1"
            placeholder="100"
            value={form.price_inr}
            onChange={(e) => setForm(f => ({ ...f, price_inr: Number(e.target.value) }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="credits">Credits *</Label>
          <Input
            id="credits"
            type="number"
            min="1"
            placeholder="1000"
            value={form.credits}
            onChange={(e) => setForm(f => ({ ...f, credits: Number(e.target.value) }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Pack description..."
            value={form.description}
            onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>
      </div>
      <Button 
        className="mt-4" 
        onClick={handleCreate}
        disabled={createPack.isPending}
      >
        {createPack.isPending ? 'Creating...' : 'Create Pack'}
      </Button>
    </Card>
  );
}
