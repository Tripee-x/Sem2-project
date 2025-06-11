import { useState } from 'react';
import { CalculatorIcon, LightBulbIcon, CreditCardIcon } from '../components/Icons';

const InvestmentPlanner = () => {
  const [activeTab, setActiveTab] = useState('budget');
  const [growthForm, setGrowthForm] = useState({
    amount: '',
    interest: '',
    duration: '',
    inflationRate: 6.5
  });
  const [loanForm, setLoanForm] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: '',
    inflationRate: 6.5
  });

  const budgetRules = [
    {
      name: '50/30/20 Rule',
      description: 'Popular budgeting strategy',
      breakdown: { needs: 50, wants: 30, savings: 20 },
      color: 'from-secondary to-green-600',
      best: 'Beginners and stable income earners'
    },
    {
      name: '70/20/10 Rule',
      description: 'Conservative approach',
      breakdown: { expenses: 70, savings: 20, investments: 10 },
      color: 'from-blue-500 to-blue-700',
      best: 'Risk-averse individuals'
    },
    {
      name: '60/40 Rule',
      description: 'Investment focused',
      breakdown: { expenses: 60, investments: 40 },
      color: 'from-accent to-red-600',
      best: 'Aggressive investors'
    },
    {
      name: '80/20 Rule',
      description: 'High earners strategy',
      breakdown: { expenses: 80, savings: 20 },
      color: 'from-purple-500 to-purple-700',
      best: 'High income professionals'
    }
  ];

  const calculateGrowth = () => {
    const { amount, interest, duration } = growthForm;
    if (!amount || !interest || !duration) return null;

    const principal = parseFloat(amount);
    const rate = parseFloat(interest) / 100;
    const time = parseFloat(duration);
    const inflationRate = growthForm.inflationRate / 100;

    // Compound Interest Calculation
    const maturityAmount = principal * Math.pow(1 + rate, time);
    const totalGrowth = maturityAmount - principal;

    // Real return after inflation
    const realReturn = Math.pow(1 + rate, time) / Math.pow(1 + inflationRate, time) - 1;
    const realValue = principal * Math.pow(1 + realReturn, time);

    const isGoodInvestment = realReturn > 0.02; // More than 2% real return

    return {
      maturityAmount: maturityAmount.toFixed(0),
      totalGrowth: totalGrowth.toFixed(0),
      realValue: realValue.toFixed(0),
      realReturn: (realReturn * 100).toFixed(2),
      isGoodInvestment
    };
  };

  const calculateLoan = () => {
    const { loanAmount, interestRate, tenure } = loanForm;
    if (!loanAmount || !interestRate || !tenure) return null;

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const months = parseFloat(tenure) * 12;
    const inflationRate = loanForm.inflationRate / 100;

    // EMI Calculation
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    // Real cost considering inflation
    const realCost = totalPayment / Math.pow(1 + inflationRate, tenure);
    const savingsFromInflation = totalPayment - realCost;

    const isAcceptable = (interestRate / 100) <= (inflationRate + 0.03); // Loan rate should be close to inflation

    return {
      emi: emi.toFixed(0),
      totalPayment: totalPayment.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      realCost: realCost.toFixed(0),
      savingsFromInflation: savingsFromInflation.toFixed(0),
      isAcceptable
    };
  };

  const growthResult = calculateGrowth();
  const loanResult = calculateLoan();

  const tabs = [
    { id: 'budget', name: 'Budget Rules', icon: LightBulbIcon },
    { id: 'growth', name: 'Growth Planner', icon: CalculatorIcon },
    { id: 'loan', name: 'Loan Advisor', icon: CreditCardIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Investment Planner</h1>
          <p className="text-text-muted mt-2">Plan your finances with proven strategies and calculators</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-card-bg rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 flex-1 justify-center ${
              activeTab === tab.id 
                ? 'bg-accent text-white shadow-lg' 
                : 'text-text-muted hover:text-white hover:bg-primary'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Budget Rules Tab */}
      {activeTab === 'budget' && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Budgeting Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {budgetRules.map((rule, index) => (
              <div key={index} className="card hover:shadow-luxury transform hover:scale-105 transition-all duration-300">
                <div className={`h-2 rounded-t-lg bg-gradient-to-r ${rule.color} mb-4`}></div>
                <div className="p-2">
                  <h3 className="text-xl font-bold text-white mb-2">{rule.name}</h3>
                  <p className="text-text-muted mb-4">{rule.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    {Object.entries(rule.breakdown).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-text-secondary capitalize">{key}:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-dark-bg rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${rule.color}`}
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                          <span className="text-white font-semibold">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-3 border-t border-border-color">
                    <p className="text-sm text-text-muted">
                      <strong className="text-secondary">Best for:</strong> {rule.best}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Growth Planner Tab */}
      {activeTab === 'growth' && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">Investment Growth Calculator</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-text-secondary mb-2">Investment Amount (₹)</label>
                  <input
                    type="number"
                    value={growthForm.amount}
                    onChange={(e) => setGrowthForm({...growthForm, amount: e.target.value})}
                    className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="100000"
                  />
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-2">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={growthForm.interest}
                    onChange={(e) => setGrowthForm({...growthForm, interest: e.target.value})}
                    className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="12"
                  />
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-2">Investment Duration (Years)</label>
                  <input
                    type="number"
                    value={growthForm.duration}
                    onChange={(e) => setGrowthForm({...growthForm, duration: e.target.value})}
                    className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="5"
                  />
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-2">Inflation Rate (%) - Current: 6.5%</label>
                  <input
                    type="number"
                    step="0.1"
                    value={growthForm.inflationRate}
                    onChange={(e) => setGrowthForm({...growthForm, inflationRate: parseFloat(e.target.value)})}
                    className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">Investment Analysis</h2>
              {growthResult ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${growthResult.isGoodInvestment ? 'bg-secondary bg-opacity-20 border border-secondary' : 'bg-accent bg-opacity-20 border border-accent'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-lg font-bold ${growthResult.isGoodInvestment ? 'text-secondary' : 'text-accent'}`}>
                        {growthResult.isGoodInvestment ? '✅ Good Investment' : '⚠️ Poor Investment'}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {growthResult.isGoodInvestment 
                        ? 'This investment beats inflation with good real returns.' 
                        : 'This investment may not adequately protect against inflation.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-bg p-4 rounded-lg">
                      <p className="text-text-muted text-sm">Maturity Amount</p>
                      <p className="text-white text-xl font-bold">₹{parseInt(growthResult.maturityAmount).toLocaleString()}</p>
                    </div>
                    <div className="bg-dark-bg p-4 rounded-lg">
                      <p className="text-text-muted text-sm">Total Growth</p>
                      <p className="text-secondary text-xl font-bold">₹{parseInt(growthResult.totalGrowth).toLocaleString()}</p>
                    </div>
                    <div className="bg-dark-bg p-4 rounded-lg">
                      <p className="text-text-muted text-sm">Real Value (After Inflation)</p>
                      <p className="text-white text-xl font-bold">₹{parseInt(growthResult.realValue).toLocaleString()}</p>
                    </div>
                    <div className="bg-dark-bg p-4 rounded-lg">
                      <p className="text-text-muted text-sm">Real Return Rate</p>
                      <p className={`text-xl font-bold ${parseFloat(growthResult.realReturn) > 0 ? 'text-secondary' : 'text-accent'}`}>
                        {growthResult.realReturn}%
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalculatorIcon className="w-16 h-16 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">Fill in the form to see investment analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loan Advisor Tab */}
      {activeTab === 'loan' && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">Loan Analysis Calculator</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-text-secondary mb-2">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={loanForm.loanAmount}
                    onChange={(e) => setLoanForm({...loanForm, loanAmount: e.target.value})}
                    className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="500000"
                  />
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-2">Interest Rate (% per annum)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={loanForm.interestRate}
                    onChange={(e) => setLoanForm({...loanForm, interestRate: e.target.value})}
                    className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="8.5"
                  />
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-2">Loan Tenure (Years)</label>
                  <input
                    type="number"
                    value={loanForm.tenure}
                    onChange={(e) => setLoanForm({...loanForm, tenure: e.target.value})}
                    className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="5"
                  />
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-2">Inflation Rate (%) - Current: 6.5%</label>
                  <input
                    type="number"
                    step="0.1"
                    value={loanForm.inflationRate}
                    onChange={(e) => setLoanForm({...loanForm, inflationRate: parseFloat(e.target.value)})}
                    className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">Loan Assessment</h2>
              {loanResult ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${loanResult.isAcceptable ? 'bg-secondary bg-opacity-20 border border-secondary' : 'bg-accent bg-opacity-20 border border-accent'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-lg font-bold ${loanResult.isAcceptable ? 'text-secondary' : 'text-accent'}`}>
                        {loanResult.isAcceptable ? '✅ Acceptable Loan' : '⚠️ Expensive Loan'}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {loanResult.isAcceptable 
                        ? 'This loan rate is reasonable compared to current inflation.' 
                        : 'This loan rate is significantly higher than inflation. Consider alternatives.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-dark-bg p-4 rounded-lg">
                      <p className="text-text-muted text-sm">Monthly EMI</p>
                      <p className="text-white text-xl font-bold">₹{parseInt(loanResult.emi).toLocaleString()}</p>
                    </div>
                    <div className="bg-dark-bg p-4 rounded-lg">
                      <p className="text-text-muted text-sm">Total Payment</p>
                      <p className="text-accent text-xl font-bold">₹{parseInt(loanResult.totalPayment).toLocaleString()}</p>
                    </div>
                    <div className="bg-dark-bg p-4 rounded-lg">
                      <p className="text-text-muted text-sm">Total Interest</p>
                      <p className="text-accent text-xl font-bold">₹{parseInt(loanResult.totalInterest).toLocaleString()}</p>
                    </div>
                    <div className="bg-dark-bg p-4 rounded-lg">
                      <p className="text-text-muted text-sm">Real Cost (Inflation Adjusted)</p>
                      <p className="text-white text-xl font-bold">₹{parseInt(loanResult.realCost).toLocaleString()}</p>
                    </div>
                    <div className="bg-dark-bg p-4 rounded-lg">
                      <p className="text-text-muted text-sm">Inflation Benefit</p>
                      <p className="text-secondary text-xl font-bold">₹{parseInt(loanResult.savingsFromInflation).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCardIcon className="w-16 h-16 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">Fill in the form to see loan analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlanner;