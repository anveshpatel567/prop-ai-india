
import TopActiveListingsCard from './widgets/TopActiveListingsCard';
import TopScoringLeadsCard from './widgets/TopScoringLeadsCard';
import TopAgentsByAIUsageCard from './widgets/TopAgentsByAIUsageCard';
import MostUsedAIToolsCard from './widgets/MostUsedAIToolsCard';
import NegotiationTrendsCard from './widgets/NegotiationTrendsCard';

export default function AdminAnalyticsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TopActiveListingsCard />
      <TopScoringLeadsCard />
      <TopAgentsByAIUsageCard />
      <MostUsedAIToolsCard />
      <NegotiationTrendsCard />
    </div>
  );
}
