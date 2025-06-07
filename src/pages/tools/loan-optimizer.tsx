
import React from 'react';
import LoanOptimizerForm from '@/components/loan/LoanOptimizerForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, TrendingUp, Shield, Calculator } from 'lucide-react';

export default function LoanOptimizerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-orange-400 to-rose-500 rounded-full">
              <Home className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            🏦 AI Home Loan Optimizer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized home loan recommendations powered by AI. Calculate your eligible loan amount, 
            optimal EMI, and receive expert financial advice tailored to your profile.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/50 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <Calculator className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle className="text-lg">Smart Calculations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Advanced EMI calculations using standard banking formulas and your income profile.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-lg">AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get personalized recommendations on loan amount, down payment, and financial planning.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <Shield className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle className="text-lg">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Conservative calculations ensuring your EMI doesn't exceed 50% of your monthly income.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Form */}
        <LoanOptimizerForm />

        {/* Disclaimer */}
        <Card className="bg-yellow-50/50 border-yellow-200">
          <CardContent className="pt-6">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> These calculations are estimates based on standard formulas. 
              Actual loan approval and terms depend on various factors including credit score, bank policies, 
              and property valuation. Please consult with financial advisors and banks for precise information.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
