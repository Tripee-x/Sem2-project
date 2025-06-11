import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import InvestmentPlanner from './pages/InvestmentPlanner';
import Stocks from './pages/Stocks';
import MutualFunds from './pages/MutualFunds';
import Metals from './pages/Metals';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/investment-planner" element={<InvestmentPlanner />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/mutual-funds" element={<MutualFunds />} />
          <Route path="/metals" element={<Metals />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;