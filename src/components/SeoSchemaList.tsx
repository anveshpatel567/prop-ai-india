
import { useSeoSchemasFlat } from '@/hooks/useSeoSchemasFlat';
import { useAuth } from '@/context/AuthContext';

export function SeoSchemaList() {
  const { user } = useAuth();
  const { schemas, loading, error } = useSeoSchemasFlat(user?.id || '');

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map(i => (
          <div key={i} className="animate-pulse p-4 border rounded-lg">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error loading schemas: {error}</p>
      </div>
    );
  }

  if (schemas.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No SEO schemas generated yet. Start by creating your first schema.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your SEO Schemas</h3>
      {schemas.map(schema => (
        <div key={schema.id} className="p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-medium text-gray-900">{schema.schema_type} Schema</h4>
              <p className="text-sm text-gray-600">{schema.page_url}</p>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(schema.created_at).toLocaleDateString()}
            </span>
          </div>
          <pre className="bg-gray-50 p-3 text-xs text-gray-700 rounded overflow-auto max-h-40">
            {schema.schema_output}
          </pre>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
              Copy Schema
            </button>
            <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
              Export
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
