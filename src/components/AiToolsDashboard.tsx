
import { ResumeBuilderForm } from './ResumeBuilderForm';
import { AgentMatchResultList } from './AgentMatchResultList';
import { SeoSchemaList } from './SeoSchemaList';
import { useAuth } from '@/context/AuthContext';

export function AiToolsDashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Please log in to access AI tools.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Tools</h1>
        <p className="text-gray-600">Enhance your real estate experience with our AI tools</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ResumeBuilderForm />
          <AgentMatchResultList />
        </div>
        
        <div className="space-y-6">
          <SeoSchemaList />
        </div>
      </div>
    </div>
  );
}
