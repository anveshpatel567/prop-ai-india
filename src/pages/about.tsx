
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">About FreePropList</h1>
          <p className="text-gray-600">AI-powered real estate platform for India</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              FreePropList is revolutionizing the Indian real estate market with AI-powered tools 
              that help property seekers, agents, and listers make smarter decisions.
            </p>
            <p className="text-gray-600">
              Our platform combines cutting-edge artificial intelligence with deep understanding 
              of the Indian property market to deliver personalized experiences and insights.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default About;
