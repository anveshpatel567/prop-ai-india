
import React from 'react';
import { GlassCard } from '../layout/GlassCard';
import { Search, FileText, MapPin, Sparkles, BarChart3, Video } from 'lucide-react';

export const AiTeaserCards: React.FC = () => {
  const aiFeatures = [
    {
      title: 'Smart Property Search',
      description: 'Just describe what you want in plain English. Our AI finds the perfect matches.',
      icon: <Search className="h-6 w-6 text-blue-600" />,
      cost: '8 credits'
    },
    {
      title: 'Brochure AI Parser',
      description: 'Upload property brochures and let AI extract all details automatically.',
      icon: <FileText className="h-6 w-6 text-green-600" />,
      cost: '10 credits'
    },
    {
      title: 'Location Intelligence',
      description: 'Get detailed insights about schools, hospitals, and amenities nearby.',
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      cost: '6 credits'
    },
    {
      title: 'AI Title Generator',
      description: 'Create compelling property titles that attract more buyers.',
      icon: <Sparkles className="h-6 w-6 text-orange-600" />,
      cost: '5 credits'
    },
    {
      title: 'Lead Scoring AI',
      description: 'Automatically score and prioritize leads for maximum conversion.',
      icon: <BarChart3 className="h-6 w-6 text-red-600" />,
      cost: '12 credits'
    },
    {
      title: 'Video Generator',
      description: 'Transform property photos into engaging video presentations.',
      icon: <Video className="h-6 w-6 text-indigo-600" />,
      cost: '20 credits'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
            Powered by <span className="text-fire">Artificial Intelligence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of real estate with our advanced AI tools. 
            Manual features are free, AI enhancements are credit-based.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <GlassCard key={index} className="text-center space-y-4 hover:scale-105 transition-all duration-200">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
              <div className="glass-card bg-orange-50 border-orange-200 py-2 px-4 inline-block rounded-full">
                <span className="text-sm font-medium text-orange-700">{feature.cost}</span>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="glass-card inline-block p-6 border-2 border-orange-200 hover:scale-105 transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">💳</div>
              <div>
                <h4 className="font-semibold text-gray-800">Credit System</h4>
                <p className="text-sm text-gray-600">Pay only for AI features you use. Manual search & listing is always free!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
