import { useParams } from 'react-router-dom';
import { ExternalLink, Star, ThumbsUp, ThumbsDown, Play, Image as ImageIcon, BookOpen } from 'lucide-react';
import { useToolQuery } from '../hooks/tools';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { getYouTubeEmbedUrl } from '../lib/utils/youtube';
import { cn } from '../lib/utils';

export function ToolDetailPage() {
  const { toolId } = useParams();
  const { data: tool, isLoading, error } = useToolQuery(toolId!);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !tool) {
    return <ErrorMessage message="Tool not found" />;
  }

  const embedUrl = tool.videoUrl ? getYouTubeEmbedUrl(tool.videoUrl) : null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img src={tool.logo} alt={tool.name} className="h-16 w-16 object-contain" />
            <div>
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              <p className="text-gray-600">by {tool.founder}</p>
            </div>
          </div>
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Visit Website
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 mb-8">{tool.description}</p>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Top Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Video Overview */}
        {embedUrl && (
          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Video Overview</h2>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src={embedUrl}
                title={`${tool.name} overview`}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>
        )}

        {/* Screenshots */}
        {tool.screenshots.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <ImageIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Screenshots</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.screenshots.map((screenshot, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={screenshot}
                    alt={`${tool.name} screenshot ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* How to Use */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">How to Use {tool.name}</h2>
          </div>
          <div className="prose max-w-none">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-6" dangerouslySetInnerHTML={{ __html: tool.howToUse }} />
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Pros & Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-600 flex items-center">
                <ThumbsUp className="mr-2 h-5 w-5" />
                Pros
              </h3>
              <ul className="space-y-2">
                {tool.pros.map((pro, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-red-600 flex items-center">
                <ThumbsDown className="mr-2 h-5 w-5" />
                Cons
              </h3>
              <ul className="space-y-2">
                {tool.cons.map((con, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-red-500">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Best For */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Who is this for?</h2>
          <ul className="space-y-2">
            {tool.bestFor.map((useCase, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-blue-500">•</span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}