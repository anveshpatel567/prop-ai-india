
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGradient } from '../common/ButtonGradient';

export const RoleSelectorCards: React.FC = () => {
  const roles = [
    {
      title: 'Property Seeker',
      description: 'Find your dream home with AI-powered search and smart recommendations.',
      features: ['Smart Search', 'Property Comparison', 'Saved Properties', 'Agent Matching'],
      icon: '🏠',
      cta: 'Start Searching',
      link: '/search'
    },
    {
      title: 'Property Owner',
      description: 'List your property with AI assistance and reach genuine buyers quickly.',
      features: ['AI Brochure Parser', 'Smart Pricing', 'Lead Management', 'Analytics'],
      icon: '🔑',
      cta: 'List Property',
      link: '/list-property'
    },
    {
      title: 'Real Estate Agent',
      description: 'Boost your business with AI-powered CRM and lead scoring tools.',
      features: ['CRM Dashboard', 'Lead Scoring', 'Follow-up Generator', 'Performance Analytics'],
      icon: '👨‍💼',
      cta: 'Join as Agent',
      link: '/register'
    },
    {
      title: 'RERA Agent',
      description: 'Certified agents can list new projects with RERA verification.',
      features: ['RERA Verification', 'Project Listings', 'Builder Network', 'Compliance Tools'],
      icon: '🏢',
      cta: 'RERA Registration',
      link: '/register'
    },
    {
      title: 'Builder/Developer',
      description: 'Showcase your projects and connect with verified buyers and agents.',
      features: ['Project Showcase', 'Bulk Listings', 'Agent Network', 'Marketing Tools'],
      icon: '🏗️',
      cta: 'List Projects',
      link: '/register'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Choose Your <span className="text-orange-600">Journey</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Whether you're buying, selling, or working in real estate, 
            we have tailored solutions for every need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 space-y-6 h-full flex flex-col hover:bg-white/20 transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl mb-4">{role.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-gray-700">{role.description}</p>
              </div>

              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={role.link} className="mt-auto">
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl px-4 py-2 hover:brightness-110 transition duration-300 shadow-md">
                  {role.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
