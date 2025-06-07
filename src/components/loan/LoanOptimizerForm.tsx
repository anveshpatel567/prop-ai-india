
import React, { useState } from 'react';
import { useLoanOptimizer } from '@/hooks/useLoanOptimizer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

export default function LoanOptimizerForm() {
  const { data, loading, error, run } = useLoanOptimizer();
  const [income, setIncome] = useState(75000);
  const [tenure, setTenure] = useState(20);
  const [rate, setRate] = useState(8.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(income, tenure, rate);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/50 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Loan Calculator
          </CardTitle>
          <CardDescription>
            Enter your financial details to get AI-powered loan recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income (₹)</Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                placeholder="Enter your monthly income"
                min="1"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tenure">Loan Tenure (Years)</Label>
              <Input
                id="tenure"
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                placeholder="Loan duration in years"
                min="1"
                max="30"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                placeholder="Annual interest rate"
                min="1"
                max="20"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-400 to-rose-500 hover:from-orange-500 hover:to-rose-600"
            >
              {loading ? 'Optimizing...' : 'Run AI Optimizer'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="pt-6">
            <p className="text-red-600 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {data && (
        <Card className="bg-gradient-to-br from-green-50/50 to-blue-50/50 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <TrendingUp className="h-5 w-5" />
              Loan Optimization Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                <DollarSign className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Estimated Loan Amount</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{data.loan_amount.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                <Calculator className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Monthly EMI</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{data.emi.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white/60 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">AI Recommendation:</p>
              <p className="text-gray-600 italic leading-relaxed">{data.suggestion}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
