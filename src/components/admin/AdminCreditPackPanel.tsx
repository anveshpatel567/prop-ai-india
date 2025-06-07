
import { Card } from '@/components/ui/card';
import { useCreditPacks } from '@/hooks/useCreditPacks';
import CreditPackForm from './CreditPackForm';
import CreditPackCard from './CreditPackCard';

export default function AdminCreditPackPanel() {
  const { data: packs, isLoading } = useCreditPacks();

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

      <CreditPackForm />

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
              <CreditPackCard key={pack.id} pack={pack} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
