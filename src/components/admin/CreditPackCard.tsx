
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateCreditPack, useDeleteCreditPack, type CreditPack } from '@/hooks/useCreditPacks';

interface CreditPackCardProps {
  pack: CreditPack;
}

export default function CreditPackCard({ pack }: CreditPackCardProps) {
  const updatePack = useUpdateCreditPack();
  const deletePack = useDeleteCreditPack();
  const { toast } = useToast();

  const handleToggleActive = async (currentActive: boolean) => {
    try {
      await updatePack.mutateAsync({ id: pack.id, is_active: !currentActive });
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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this credit pack?')) return;

    try {
      await deletePack.mutateAsync(pack.id);
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

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-lg">{pack.name}</h3>
            <div className="flex items-center gap-2">
              <Switch
                checked={pack.is_active}
                onCheckedChange={() => handleToggleActive(pack.is_active)}
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
            onClick={handleDelete}
            disabled={deletePack.isPending}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
