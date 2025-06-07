
import DeveloperAiUsagePanel from '@/components/admin/DeveloperAiUsagePanel';

export default function DeveloperAiSummaryPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Developer AI Usage Summary</h1>
        <p className="text-gray-600">Monitor AI tool usage, credits consumption, and system performance</p>
      </div>
      <DeveloperAiUsagePanel />
    </div>
  );
}
