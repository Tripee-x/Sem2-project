import { useState } from 'react';
import { BuildingLibraryIcon, TrendingUpIcon, ArrowUpIcon, ArrowDownIcon } from '../components/Icons';

const MutualFunds = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Funds', color: 'text-white' },
    { id: 'equity', name: 'Equity Funds', color: 'text-secondary' },
    { id: 'hybrid', name: 'Hybrid Funds', color: 'text-blue-400' },
    { id: 'debt', name: 'Debt Funds', color: 'text-yellow-400' },
    { id: 'elss', name: 'ELSS', color: 'text-purple-400' },
  ];

  const topFunds = [
    {
      name: 'Axis Bluechip Fund',
      category: 'equity',
      nav: 45.67,
      change: 2.3,
      returns: { '1y': 15.2, '3y': 12.8, '5y': 14.1 },
      aum: '₹25,420 Cr',
      rating: 5,
      riskLevel: 'High'
    },
    {
      name: 'HDFC Balanced Advantage Fund',
      category: 'hybrid',
      nav: 38.92,
      change: 1.1,
      returns: { '1y': 12.5, '3y': 10.2, '5y': 11.8 },
      aum: '₹18,756 Cr',
      rating: 4,
      riskLevel: 'Moderate'
    },
    {
      name: 'SBI Small Cap Fund',
      category: 'equity',
      nav: 102.45,
      change: 3.8,
      returns: { '1y': 22.1, '3y': 18.5, '5y': 19.2 },
      aum: '₹12,890 Cr',
      rating: 5,
      riskLevel: 'Very High'
    },
    {
      name: 'ICICI Prudential Corporate Bond Fund',
      category: 'debt',
      nav: 28.15,
      change: 0.2,
      returns: { '1y': 6.8, '3y': 7.1, '5y': 7.5 },
      aum: '₹8,420 Cr',
      rating: 4,
      riskLevel: 'Low'
    },
    {
      name: 'Mirae Asset Tax Saver Fund',
      category: 'elss',
      nav: 56.78,
      change: 2.7,
      returns: { '1y': 16.8, '3y': 13.9, '5y': 15.6 },
      aum: '₹15,670 Cr',
      rating: 5,
      riskLevel: 'High'
    },
    {
      name: 'Kotak Multi Cap Fund',
      category: 'equity',
      nav: 67.34,
      change: -0.8,
      returns: { '1y': 13.2, '3y': 11.5, '5y': 12.9 },
      aum: '₹9,230 Cr',
      rating: 4,
      riskLevel: 'High'
    }
  ];

  const marketOverview = [
    { category: 'Equity Funds', totalAUM: '₹15.2L Cr', change: 1.8, fundCount: 456 },
    { category: 'Debt Funds', totalAUM: '₹8.9L Cr', change: 0.3, fundCount: 298 },
    { category: 'Hybrid Funds', totalAUM: '₹4.1L Cr', change: 1.2, fundCount: 167 },
    { category: 'ELSS Funds', totalAUM: '₹2.8L Cr', change: 2.1, fundCount: 89 },
  ];

  const sipCalculator = {
    amount: 5000,
    duration: 10,
    expectedReturn: 12,
    getMaturityAmount: function() {
      const monthlyRate = this.expectedReturn / 100 / 12;
      const months = this.duration * 12;
      const maturityAmount = this.amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      return maturityAmount;
    },
    getTotalInvestment: function() {
      return this.amount * this.duration * 12;
    },
    getWealth: function() {
      return this.getMaturityAmount() - this.getTotalInvestment();
    }
  };

  const getFilteredFunds = () => {
    if (activeCategory === 'all') return topFunds;
    return topFunds.filter(fund => fund.category === activeCategory);
  };

  const getRiskColor = (riskLevel) => {
    switch(riskLevel) {
      case 'Low': return 'text-secondary';
      case 'Moderate': return 'text-blue-400';
      case 'High': return 'text-yellow-400';
      case 'Very High': return 'text-accent';
      default: return 'text-text-muted';
    }
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-text-muted'}`}>
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Mutual Funds</h1>
          <p className="text-text-muted mt-2">Discover and analyze mutual fund performance</p>
        </div>
        <div className="flex items-center space-x-2 bg-secondary bg-opacity-20 text-secondary px-4 py-2 rounded-lg">
          <BuildingLibraryIcon className="w-5 h-5" />
          <span className="font-medium">1,010 Active Funds</span>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketOverview.map((market, idx) => (
          <div key={idx} className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">{market.category}</h3>
              {market.change > 0 ? (
                <ArrowUpIcon className="w-4 h-4 text-secondary" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-accent" />
              )}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{market.totalAUM}</div>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${market.change > 0 ? 'text-secondary' : 'text-accent'}`}>
                {market.change > 0 ? '+' : ''}{market.change}%
              </span>
              <span className="text-text-muted text-sm">{market.fundCount} funds</span>
            </div>
          </div>
        ))}
      </div>

      {/* SIP Calculator */}
      <div className="card">
        <h2 className="text-xl font-bold text-white mb-4">SIP Calculator</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-text-muted">
              Calculate potential returns from Systematic Investment Plan (SIP)
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-bg p-4 rounded-lg text-center">
                <p className="text-text-muted text-sm">Monthly SIP</p>
                <p className="text-white text-xl font-bold">₹{sipCalculator.amount.toLocaleString()}</p>
              </div>
              <div className="bg-dark-bg p-4 rounded-lg text-center">
                <p className="text-text-muted text-sm">Duration</p>
                <p className="text-white text-xl font-bold">{sipCalculator.duration} years</p>
              </div>
              <div className="bg-dark-bg p-4 rounded-lg text-center">
                <p className="text-text-muted text-sm">Expected Return</p>
                <p className="text-white text-xl font-bold">{sipCalculator.expectedReturn}%</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary bg-opacity-20 p-4 rounded-lg text-center border border-secondary">
                <p className="text-secondary text-sm font-medium">Total Investment</p>
                <p className="text-white text-2xl font-bold">₹{sipCalculator.getTotalInvestment().toLocaleString()}</p>
              </div>
              <div className="bg-accent bg-opacity-20 p-4 rounded-lg text-center border border-accent">
                <p className="text-accent text-sm font-medium">Wealth Gained</p>
                <p className="text-white text-2xl font-bold">₹{Math.round(sipCalculator.getWealth()).toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-secondary to-accent bg-opacity-20 p-4 rounded-lg text-center border border-secondary">
              <p className="text-white text-sm font-medium">Maturity Amount</p>
              <p className="text-white text-3xl font-bold">₹{Math.round(sipCalculator.getMaturityAmount()).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-accent text-white transform scale-105'
                : 'bg-card-bg text-text-muted hover:text-white hover:bg-primary'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Top Performing Funds */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUpIcon className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-bold text-white">
            {activeCategory === 'all' ? 'Top Performing Funds' : 
             categories.find(c => c.id === activeCategory)?.name}
          </h2>
        </div>
        
        <div className="space-y-4">
          {getFilteredFunds().map((fund, idx) => (
            <div key={idx} className="bg-dark-bg p-6 rounded-lg hover:bg-opacity-80 transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg group-hover:text-accent transition-colors">
                        {fund.name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-text-muted text-sm capitalize">{fund.category} Fund</span>
                        <StarRating rating={fund.rating} />
                        <span className={`text-sm font-medium ${getRiskColor(fund.riskLevel)}`}>
                          {fund.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-text-muted text-sm">NAV</p>
                      <p className="text-white font-bold text-xl">₹{fund.nav}</p>
                      <p className={`text-sm font-medium ${fund.change > 0 ? 'text-secondary' : 'text-accent'}`}>
                        {fund.change > 0 ? '+' : ''}{fund.change}%
                      </p>
                    </div>
                    <div>
                      <p className="text-text-muted text-sm">AUM</p>
                      <p className="text-white font-semibold">{fund.aum}</p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-80">
                  <p className="text-text-muted text-sm mb-2">Annualized Returns</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-primary p-3 rounded-lg text-center">
                      <p className="text-text-muted text-xs">1 Year</p>
                      <p className={`font-bold ${fund.returns['1y'] > 10 ? 'text-secondary' : 'text-white'}`}>
                        {fund.returns['1y']}%
                      </p>
                    </div>
                    <div className="bg-primary p-3 rounded-lg text-center">
                      <p className="text-text-muted text-xs">3 Years</p>
                      <p className={`font-bold ${fund.returns['3y'] > 10 ? 'text-secondary' : 'text-white'}`}>
                        {fund.returns['3y']}%
                      </p>
                    </div>
                    <div className="bg-primary p-3 rounded-lg text-center">
                      <p className="text-text-muted text-xs">5 Years</p>
                      <p className={`font-bold ${fund.returns['5y'] > 10 ? 'text-secondary' : 'text-white'}`}>
                        {fund.returns['5y']}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {getFilteredFunds().length === 0 && (
          <div className="text-center py-8">
            <BuildingLibraryIcon className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">No funds found in this category.</p>
          </div>
        )}
      </div>

      {/* Investment Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">💡 Investment Tips</h3>
          <div className="space-y-3">
            <div className="p-3 bg-dark-bg rounded-lg">
              <p className="text-secondary font-medium text-sm">Diversification</p>
              <p className="text-text-secondary text-sm">
                Spread investments across different fund categories to reduce risk.
              </p>
            </div>
            <div className="p-3 bg-dark-bg rounded-lg">
              <p className="text-secondary font-medium text-sm">SIP Advantage</p>
              <p className="text-text-secondary text-sm">
                Start SIP early to benefit from rupee cost averaging and compounding.
              </p>
            </div>
            <div className="p-3 bg-dark-bg rounded-lg">
              <p className="text-secondary font-medium text-sm">Long-term Focus</p>
              <p className="text-text-secondary text-sm">
                Stay invested for at least 5-7 years for optimal equity fund returns.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">📊 Quick Facts</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Total MF AUM in India</span>
              <span className="text-white font-semibold">₹46.8L Crores</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Active SIP Accounts</span>
              <span className="text-white font-semibold">7.4 Crores</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Average SIP Amount</span>
              <span className="text-white font-semibold">₹3,456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Best Performing Category</span>
              <span className="text-secondary font-semibold">Small Cap Equity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFunds;