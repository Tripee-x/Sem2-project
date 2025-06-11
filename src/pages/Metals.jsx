import { useState } from 'react';
import { CubeIcon, TrendingUpIcon, ArrowUpIcon, ArrowDownIcon, CalculatorIcon } from '../components/Icons';

const Metals = () => {
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const [investmentForm, setInvestmentForm] = useState({
    amount: '',
    duration: '',
    metalType: 'gold'
  });

  const metalsData = [
    {
      name: 'Gold',
      symbol: 'XAU',
      pricePerGram: 6420.50,
      pricePerOunce: 2045.80,
      change: 1.8,
      volume: '125.8K oz',
      marketCap: '₹14.2L Cr',
      color: 'from-yellow-400 to-yellow-600',
      description: 'Traditional safe haven asset',
      volatility: 'Low',
      liquidity: 'High'
    },
    {
      name: 'Silver',
      symbol: 'XAG',
      pricePerGram: 84.25,
      pricePerOunce: 26.15,
      change: -0.9,
      volume: '892.5K oz',
      marketCap: '₹1.8L Cr',
      color: 'from-gray-300 to-gray-500',
      description: 'Industrial and investment metal',
      volatility: 'Medium',
      liquidity: 'High'
    },
    {
      name: 'Platinum',
      symbol: 'XPT',
      pricePerGram: 3125.40,
      pricePerOunce: 970.20,
      change: 2.3,
      volume: '45.2K oz',
      marketCap: '₹85.5K Cr',
      color: 'from-blue-300 to-blue-500',
      description: 'Rare industrial precious metal',
      volatility: 'High',
      liquidity: 'Medium'
    },
    {
      name: 'Palladium',
      symbol: 'XPD',
      pricePerGram: 2890.75,
      pricePerOunce: 898.15,
      change: -1.5,
      volume: '28.9K oz',
      marketCap: '₹45.8K Cr',
      color: 'from-purple-400 to-purple-600',
      description: 'Auto industry catalyst metal',
      volatility: 'Very High',
      liquidity: 'Low'
    }
  ];

  const historicalData = {
    gold: [
      { period: '1 Week', change: 1.2 },
      { period: '1 Month', change: 3.8 },
      { period: '3 Months', change: 8.5 },
      { period: '6 Months', change: 12.1 },
      { period: '1 Year', change: 18.7 },
      { period: '3 Years', change: 35.2 }
    ],
    silver: [
      { period: '1 Week', change: -2.1 },
      { period: '1 Month', change: 1.5 },
      { period: '3 Months', change: 6.8 },
      { period: '6 Months', change: 9.2 },
      { period: '1 Year', change: 15.4 },
      { period: '3 Years', change: 28.9 }
    ],
    platinum: [
      { period: '1 Week', change: 0.8 },
      { period: '1 Month', change: -1.2 },
      { period: '3 Months', change: 4.5 },
      { period: '6 Months', change: 7.8 },
      { period: '1 Year', change: 11.3 },
      { period: '3 Years', change: 22.1 }
    ],
    palladium: [
      { period: '1 Week', change: -3.2 },
      { period: '1 Month', change: -5.8 },
      { period: '3 Months', change: 2.1 },
      { period: '6 Months', change: 8.9 },
      { period: '1 Year', change: 13.7 },
      { period: '3 Years', change: 45.6 }
    ]
  };

  const marketInsights = [
    {
      title: 'Gold Rush Continues',
      description: 'Central bank purchases and inflation concerns drive gold prices higher.',
      sentiment: 'positive',
      time: '2 hours ago'
    },
    {
      title: 'Silver Industrial Demand',
      description: 'Growing solar panel production boosts silver consumption globally.',
      sentiment: 'positive',
      time: '4 hours ago'
    },
    {
      title: 'Platinum Supply Constraints',
      description: 'South African mining disruptions create supply chain challenges.',
      sentiment: 'neutral',
      time: '6 hours ago'
    },
    {
      title: 'Auto Industry Impact',
      description: 'Electric vehicle transition affects palladium demand outlook.',
      sentiment: 'negative',
      time: '1 day ago'
    }
  ];

  const calculateMetalInvestment = () => {
    const { amount, duration, metalType } = investmentForm;
    if (!amount || !duration) return null;

    const principal = parseFloat(amount);
    const years = parseFloat(duration);
    const metal = metalsData.find(m => m.name.toLowerCase() === metalType);
    
    // Assume historical average returns for metals
    const averageReturns = {
      gold: 8.5,
      silver: 12.3,
      platinum: 6.8,
      palladium: 15.2
    };
    
    const annualReturn = averageReturns[metalType] / 100;
    const inflationRate = 6.5 / 100;
    
    const futureValue = principal * Math.pow(1 + annualReturn, years);
    const totalGains = futureValue - principal;
    const realReturn = (Math.pow(1 + annualReturn, years) / Math.pow(1 + inflationRate, years) - 1) * 100;
    
    return {
      futureValue: futureValue.toFixed(0),
      totalGains: totalGains.toFixed(0),
      realReturn: realReturn.toFixed(2),
      annualReturn: (annualReturn * 100).toFixed(1),
      isGoodInvestment: realReturn > 2
    };
  };

  const investmentResult = calculateMetalInvestment();

  const getVolatilityColor = (volatility) => {
    switch(volatility) {
      case 'Low': return 'text-secondary';
      case 'Medium': return 'text-blue-400';
      case 'High': return 'text-yellow-400';
      case 'Very High': return 'text-accent';
      default: return 'text-text-muted';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'positive': return 'text-secondary';
      case 'negative': return 'text-accent';
      case 'neutral': return 'text-yellow-400';
      default: return 'text-text-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Precious Metals</h1>
          <p className="text-text-muted mt-2">Track precious metals prices and investment opportunities</p>
        </div>
        <div className="flex items-center space-x-2 bg-yellow-500 bg-opacity-20 text-yellow-400 px-4 py-2 rounded-lg">
          <CubeIcon className="w-5 h-5" />
          <span className="font-medium">Live Prices</span>
        </div>
      </div>

      {/* Live Metals Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metalsData.map((metal, idx) => (
          <div 
            key={idx} 
            className="card cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => setSelectedMetal(metal.name.toLowerCase())}
          >
            <div className={`h-2 rounded-t-lg bg-gradient-to-r ${metal.color} mb-4`}></div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{metal.name}</h3>
                <p className="text-text-muted text-sm">{metal.symbol}</p>
              </div>
              {metal.change > 0 ? (
                <ArrowUpIcon className="w-5 h-5 text-secondary" />
              ) : (
                <ArrowDownIcon className="w-5 h-5 text-accent" />
              )}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-text-muted text-sm">Per Gram:</span>
                <span className="text-white font-semibold">₹{metal.pricePerGram.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted text-sm">Per Ounce:</span>
                <span className="text-white font-semibold">${metal.pricePerOunce.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${metal.change > 0 ? 'text-secondary' : 'text-accent'}`}>
                {metal.change > 0 ? '+' : ''}{metal.change}%
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getVolatilityColor(metal.volatility)} bg-opacity-20`}>
                {metal.volatility}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Metal Investment Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-white mb-6">Metal Investment Calculator</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-text-secondary mb-2">Investment Amount (₹)</label>
              <input
                type="number"
                value={investmentForm.amount}
                onChange={(e) => setInvestmentForm({...investmentForm, amount: e.target.value})}
                className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="100000"
              />
            </div>
            
            <div>
              <label className="block text-text-secondary mb-2">Investment Duration (Years)</label>
              <input
                type="number"
                value={investmentForm.duration}
                onChange={(e) => setInvestmentForm({...investmentForm, duration: e.target.value})}
                className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="5"
              />
            </div>
            
            <div>
              <label className="block text-text-secondary mb-2">Metal Type</label>
              <select
                value={investmentForm.metalType}
                onChange={(e) => setInvestmentForm({...investmentForm, metalType: e.target.value})}
                className="w-full bg-dark-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              >
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="platinum">Platinum</option>
                <option value="palladium">Palladium</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-white mb-6">Investment Projection</h2>
          {investmentResult ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${investmentResult.isGoodInvestment ? 'bg-secondary bg-opacity-20 border border-secondary' : 'bg-accent bg-opacity-20 border border-accent'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-lg font-bold ${investmentResult.isGoodInvestment ? 'text-secondary' : 'text-accent'}`}>
                    {investmentResult.isGoodInvestment ? '✅ Good Investment' : '⚠️ Consider Alternatives'}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  Expected annual return: {investmentResult.annualReturn}% | Real return after inflation: {investmentResult.realReturn}%
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-bg p-4 rounded-lg">
                  <p className="text-text-muted text-sm">Future Value</p>
                  <p className="text-white text-xl font-bold">₹{parseInt(investmentResult.futureValue).toLocaleString()}</p>
                </div>
                <div className="bg-dark-bg p-4 rounded-lg">
                  <p className="text-text-muted text-sm">Total Gains</p>
                  <p className="text-secondary text-xl font-bold">₹{parseInt(investmentResult.totalGains).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <CalculatorIcon className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <p className="text-text-muted">Fill in the form to see investment projection</p>
            </div>
          )}
        </div>
      </div>

      {/* Historical Performance */}
      <div className="card">
        <h2 className="text-xl font-bold text-white mb-6">Historical Performance</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {metalsData.map((metal) => (
            <button
              key={metal.name}
              onClick={() => setSelectedMetal(metal.name.toLowerCase())}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedMetal === metal.name.toLowerCase()
                  ? 'bg-accent text-white'
                  : 'bg-card-bg text-text-muted hover:text-white hover:bg-primary'
              }`}
            >
              {metal.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {historicalData[selectedMetal]?.map((data, idx) => (
            <div key={idx} className="bg-dark-bg p-4 rounded-lg text-center">
              <p className="text-text-muted text-sm">{data.period}</p>
              <p className={`text-lg font-bold ${data.change > 0 ? 'text-secondary' : 'text-accent'}`}>
                {data.change > 0 ? '+' : ''}{data.change}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Insights and Investment Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">Market Insights</h3>
          <div className="space-y-3">
            {marketInsights.map((insight, idx) => (
              <div key={idx} className="bg-dark-bg p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium">{insight.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${getSentimentColor(insight.sentiment)} bg-opacity-20`}>
                    {insight.sentiment}
                  </span>
                </div>
                <p className="text-text-secondary text-sm mb-2">{insight.description}</p>
                <p className="text-text-muted text-xs">{insight.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">💡 Investment Tips</h3>
          <div className="space-y-3">
            <div className="p-3 bg-dark-bg rounded-lg">
              <p className="text-secondary font-medium text-sm">Diversification</p>
              <p className="text-text-secondary text-sm">
                Allocate 5-10% of portfolio to precious metals for stability.
              </p>
            </div>
            <div className="p-3 bg-dark-bg rounded-lg">
              <p className="text-secondary font-medium text-sm">Physical vs Digital</p>
              <p className="text-text-secondary text-sm">
                Consider digital gold for convenience, physical for long-term storage.
              </p>
            </div>
            <div className="p-3 bg-dark-bg rounded-lg">
              <p className="text-secondary font-medium text-sm">Market Timing</p>
              <p className="text-text-secondary text-sm">
                Dollar-cost averaging works well for precious metals investments.
              </p>
            </div>
            <div className="p-3 bg-dark-bg rounded-lg">
              <p className="text-secondary font-medium text-sm">Storage Costs</p>
              <p className="text-text-secondary text-sm">
                Factor in storage and insurance costs for physical metals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">📊 Market Statistics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-text-muted text-sm">Global Gold Reserves</p>
            <p className="text-white text-xl font-bold">201,296 tonnes</p>
          </div>
          <div className="text-center">
            <p className="text-text-muted text-sm">Annual Gold Production</p>
            <p className="text-white text-xl font-bold">3,200 tonnes</p>
          </div>
          <div className="text-center">
            <p className="text-text-muted text-sm">Silver: Gold Ratio</p>
            <p className="text-white text-xl font-bold">78:1</p>
          </div>
          <div className="text-center">
            <p className="text-text-muted text-sm">Central Bank Purchases</p>
            <p className="text-secondary text-xl font-bold">+15.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metals;