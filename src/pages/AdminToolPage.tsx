import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToolQuery } from '../hooks/tools';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { updateTool } from '../lib/api/tools';
import { CATEGORIES } from '../data/tools';

export function AdminToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { data: tool, isLoading, error } = useToolQuery(toolId!);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load tool" />;
  if (!tool) return <ErrorMessage message="Tool not found" />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    console.log('Form data collected:', Object.fromEntries(formData));

    const updates = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      founder: formData.get('founder') as string,
      website: formData.get('website') as string,
      videoUrl: formData.get('videoUrl') as string || null,
      howToUse: formData.get('howToUse') as string,
      category: formData.get('category') as string,
      features: (formData.get('features') as string).split('\n').filter(Boolean),
      pros: (formData.get('pros') as string).split('\n').filter(Boolean),
      cons: (formData.get('cons') as string).split('\n').filter(Boolean),
      bestFor: (formData.get('bestFor') as string).split('\n').filter(Boolean),
      screenshots: (formData.get('screenshots') as string).split('\n').filter(Boolean),
      logo: formData.get('logo') as string,
      pricing: {
        startingPrice: formData.get('startingPrice') as string,
        hasFreeplan: formData.get('hasFreeplan') === 'true',
        pricingModel: formData.get('pricingModel') as string,
      },
    };

    console.log('Prepared updates object:', JSON.stringify(updates, null, 2));

    try {
      console.log('Attempting to update tool with ID:', tool.id);
      const updatedTool = await updateTool(tool.id, updates);
      console.log('Tool successfully updated:', updatedTool);
      navigate(`/tools/${tool.id}`);
    } catch (err) {
      console.error('Detailed error in handleSubmit:', err);
      setErrorMessage('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Edit Tool: {tool.name}</h1>
          <button
            onClick={() => navigate(`/tools/${tool.id}`)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Tool Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={tool.name}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="founder" className="block text-sm font-medium text-gray-700">
                  Founder
                </label>
                <input
                  type="text"
                  id="founder"
                  name="founder"
                  defaultValue={tool.founder}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  defaultValue={tool.website}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={tool.category}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={tool.description}
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Media */}
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-4">Media</h2>
            
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Logo URL
              </label>
              <input
                type="url"
                id="logo"
                name="logo"
                defaultValue={tool.logo}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
                YouTube Video URL
              </label>
              <input
                type="url"
                id="videoUrl"
                name="videoUrl"
                defaultValue={tool.videoUrl || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="screenshots" className="block text-sm font-medium text-gray-700">
                Screenshot URLs (one per line)
              </label>
              <textarea
                id="screenshots"
                name="screenshots"
                defaultValue={tool.screenshots.join('\n')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Features & Details */}
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-4">Features & Details</h2>
            
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700">
                Features (one per line)
              </label>
              <textarea
                id="features"
                name="features"
                defaultValue={tool.features.join('\n')}
                required
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="howToUse" className="block text-sm font-medium text-gray-700">
                How to Use
              </label>
              <textarea
                id="howToUse"
                name="howToUse"
                defaultValue={tool.howToUse}
                required
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pros" className="block text-sm font-medium text-gray-700">
                  Pros (one per line)
                </label>
                <textarea
                  id="pros"
                  name="pros"
                  defaultValue={tool.pros.join('\n')}
                  required
                  rows={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="cons" className="block text-sm font-medium text-gray-700">
                  Cons (one per line)
                </label>
                <textarea
                  id="cons"
                  name="cons"
                  defaultValue={tool.cons.join('\n')}
                  required
                  rows={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bestFor" className="block text-sm font-medium text-gray-700">
                Best For (one per line)
              </label>
              <textarea
                id="bestFor"
                name="bestFor"
                defaultValue={tool.bestFor.join('\n')}
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Pricing */}
          <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700">
                  Starting Price
                </label>
                <input
                  type="text"
                  id="startingPrice"
                  name="startingPrice"
                  defaultValue={tool.pricing.startingPrice}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="pricingModel" className="block text-sm font-medium text-gray-700">
                  Pricing Model
                </label>
                <select
                  id="pricingModel"
                  name="pricingModel"
                  defaultValue={tool.pricing.pricingModel}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="subscription">Subscription</option>
                  <option value="one-time">One-time</option>
                  <option value="per-user">Per User</option>
                  <option value="usage-based">Usage Based</option>
                </select>
              </div>

              <div>
                <label htmlFor="hasFreeplan" className="block text-sm font-medium text-gray-700">
                  Free Plan Available
                </label>
                <select
                  id="hasFreeplan"
                  name="hasFreeplan"
                  defaultValue={tool.pricing.hasFreeplan.toString()}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/tools/${tool.id}`)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}