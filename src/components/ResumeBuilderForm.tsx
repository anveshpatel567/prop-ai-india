
import { useState } from 'react';
import { useResumeBuilder } from '@/hooks/useResumeBuilder';
import { useAuth } from '@/context/AuthContext';

export function ResumeBuilderForm() {
  const [details, setDetails] = useState<string>('');
  const { generateResume, loading, error } = useResumeBuilder();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !details.trim()) return;
    
    await generateResume(user.id, details);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900">AI Resume Builder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter your professional details, experience, and skills..."
          className="w-full min-h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading || !details.trim()}
          className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-md hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating Resume...' : 'Generate AI Resume'}
        </button>
      </form>
      {error && (
        <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>
      )}
    </div>
  );
}
