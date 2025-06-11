import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, ChartBarIcon } from '../components/Icons';

const Dashboard = () => {
  const portfolioData = {
    totalValue: 247850,
    todayChange: 3250,
    todayChangePercent: 1.32,
    investments: [
      { name: 'Stocks', value: 125000, change: 2.1, color: 'text-secondary' },
      { name: 'Mutual Funds', value: 85000, change: 1.8, color: 'text-blue-400' },
      { name: 'Metals', value: 25000, change: -0.5, color: 'text-yellow-400' },
      { name: 'Others', value: 12850, change: 0.9, color: 'text-purple-400' },
    ],
    recentTransactions: [
      { type: 'Buy', asset: 'RELIANCE', amount: 15000, date: '2024-01-15', status: 'completed' },
      { type: 'Sell', asset: 'TCS', amount: 8500, date: '2024-01-14', status: 'completed' },
      { type: 'SIP', asset: 'Axis Bluechip Fund', amount: 5000, date: '2024-01-10', status: 'completed' },
    ]
  };

  const quickStats = [
    { title: 'Today\'s P&L', value: '₹3,250', change: '+1.32%', positive: true },
    { title: 'Best Performer', value: 'HDFC Bank', change: '+3.2%', positive: true },
    { title: 'Portfolio Diversity', value: '4 Categories', change: 'Balanced', positive: true },
    { title: 'Monthly SIP', value: '₹15,000', change: 'Active', positive: true },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-accent to-secondary rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Investor!</h1>
        <p className="text-lg opacity-90">Track your investments and make informed financial decisions.</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Portfolio Value */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Portfolio Overview</h2>
              <ChartBarIcon className="w-6 h-6 text-accent" />
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-white mb-2">
                ₹{portfolioData.totalValue.toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                {portfolioData.todayChange > 0 ? (
                  <ArrowUpIcon className="w-4 h-4 text-secondary" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-accent" />
                )}
                <span className={`text-sm font-medium ${portfolioData.todayChange > 0 ? 'text-secondary' : 'text-accent'}`}>
                  ₹{Math.abs(portfolioData.todayChange).toLocaleString()} ({portfolioData.todayChangePercent}%)
                </span>
                <span className="text-text-muted text-sm">Today</span>
              </div>
            </div>

            {/* Investment Breakdown */}
            <div className="space-y-3">
              {portfolioData.investments.map((investment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${investment.color === 'text-secondary' ? 'bg-secondary' : 
                      investment.color === 'text-blue-400' ? 'bg-blue-400' :
                      investment.color === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-purple-400'
                    }`}></div>
                    <span className="text-white font-medium">{investment.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">₹{investment.value.toLocaleString()}</div>
                    <div className={`text-sm ${investment.change > 0 ? 'text-secondary' : 'text-accent'}`}>
                      {investment.change > 0 ? '+' : ''}{investment.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-muted text-sm">{stat.title}</p>
                  <p className="text-white font-semibold text-lg">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${stat.positive ? 'text-secondary' : 'text-accent'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {portfolioData.recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${transaction.type === 'Buy' ? 'bg-secondary' : 
                    transaction.type === 'Sell' ? 'bg-accent' : 'bg-blue-400'
                  }`}></div>
                  <div>
                    <p className="text-white font-medium">{transaction.type} {transaction.asset}</p>
                    <p className="text-text-muted text-sm">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">₹{transaction.amount.toLocaleString()}</p>
                  <p className="text-secondary text-sm capitalize">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Insights */}
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4">Market Insights</h3>
          <div className="space-y-4">
            <div className="p-3 bg-dark-bg rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUpIcon className="w-4 h-4 text-secondary" />
                <span className="text-secondary font-medium">Market Trend</span>
              </div>
              <p className="text-text-secondary text-sm">
                Indian markets are showing positive momentum with IT and Banking sectors leading the gains.
              </p>
            </div>
            
            <div className="p-3 bg-dark-bg rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-accent font-medium">💡 Investment Tip</span>
              </div>
              <p className="text-text-secondary text-sm">
                Consider rebalancing your portfolio quarterly to maintain optimal asset allocation.
              </p>
            </div>
            
            <div className="p-3 bg-dark-bg rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-400 font-medium">📈 Opportunity</span>
              </div>
              <p className="text-text-secondary text-sm">
                Mid-cap mutual funds are showing strong performance this quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;