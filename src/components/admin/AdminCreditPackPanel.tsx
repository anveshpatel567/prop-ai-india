import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import {
  useCreditPacks,
  useCreateCreditPack,
  useUpdateCreditPack,
  useDeleteCreditPack,
  type CreateCreditPackInput
} from '@/hooks/useCreditPacks';

export default function AdminCreditPackPanel() {
  const { data: packs, isLoading } = useCreditPacks();
  const createPack = useCreateCreditPack();
  const updatePack = useUpdateCreditPack();
  const deletePack = useDeleteCreditPack();
  const { toast } = useToast();

  const [form, setForm] = useState<CreateCreditPackInput>({
    name: '',
    description: '',
    price_inr: 100,
    credits: 1000,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

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

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await updatePack.mutateAsync({ id, is_active: !currentActive });
      toast({
        title: 'Success',
        description: `Credit pack ${!currentActive ? 'activated' : 'deactivated'}`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update credit pack',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this credit pack?')) return;

    try {
      await deletePack.mutateAsync(id);
      toast({
        title: 'Success',
        description: 'Credit pack deleted successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete credit pack',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading credit packs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Credit Pack Management</h1>
        <p className="text-gray-600">Create and manage credit packages for users</p>
      </div>

      {/* Create New Pack Form */}
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

      {/* Existing Credit Packs */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Existing Credit Packs</h2>
        {!packs || packs.length === 0 ? (
          <Card className="p-6">
            <div className="text-center text-gray-500">
              No credit packs found. Create your first pack above.
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {packs.map((pack) => (
              <Card key={pack.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{pack.name}</h3>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={pack.is_active}
                          onCheckedChange={() => handleToggleActive(pack.id, pack.is_active)}
                        />
                        <span className="text-sm text-gray-500">
                          {pack.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    {pack.description && (
                      <p className="text-sm text-gray-600 mb-2">{pack.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        ₹{pack.price_inr}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {pack.credits} credits
                      </span>
                      <span className="text-gray-500">
                        ₹{(pack.price_inr / pack.credits).toFixed(2)} per credit
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(pack.id)}
                      disabled={deletePack.isPending}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
