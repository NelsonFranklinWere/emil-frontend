import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine,
  faChartBar,
  faChartPie,
  faUsers,
  faBuilding,
  faFileAlt,
  faRobot,
  faDownload,
  faCalendar,
  faArrowUp,
  faArrowDown,
  faTrendingUp,
  faTrendingDown,
  faEye,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminLayout from '../../components/AdminLayout';

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [analytics, setAnalytics] = useState({
    overview: {
      totalCompanies: 47,
      activeUsers: 156,
      totalJobs: 234,
      applicationsProcessed: 1247,
      aiSuccessRate: 94.7,
      revenue: 45680
    },
    trends: {
      applications: [
        { date: '2024-01-01', count: 45 },
        { date: '2024-01-02', count: 52 },
        { date: '2024-01-03', count: 38 },
        { date: '2024-01-04', count: 61 },
        { date: '2024-01-05', count: 47 },
        { date: '2024-01-06', count: 55 },
        { date: '2024-01-07', count: 42 }
      ],
      successRate: [
        { date: '2024-01-01', rate: 92.3 },
        { date: '2024-01-02', rate: 94.1 },
        { date: '2024-01-03', rate: 89.7 },
        { date: '2024-01-04', rate: 96.2 },
        { date: '2024-01-05', rate: 93.8 },
        { date: '2024-01-06', rate: 95.1 },
        { date: '2024-01-07', rate: 94.7 }
      ]
    },
    topCompanies: [
      { name: 'TechCorp Solutions', applications: 234, successRate: 96.2, revenue: 12500 },
      { name: 'Enterprise Inc', applications: 189, successRate: 94.1, revenue: 9800 },
      { name: 'StartupXYZ', applications: 156, successRate: 91.3, revenue: 7200 },
      { name: 'Innovation Labs', applications: 134, successRate: 93.7, revenue: 6800 },
      { name: 'Future Corp', applications: 98, successRate: 89.2, revenue: 5200 }
    ],
    jobCategories: [
      { category: 'Software Engineering', count: 45, percentage: 32.1 },
      { category: 'Marketing', count: 28, percentage: 20.0 },
      { category: 'Sales', count: 22, percentage: 15.7 },
      { category: 'Design', count: 18, percentage: 12.9 },
      { category: 'Operations', count: 15, percentage: 10.7 },
      { category: 'Other', count: 12, percentage: 8.6 }
    ]
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Analytics data is already set in state
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, change, icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <FontAwesomeIcon icon={icon} className="text-white text-lg" />
        </div>
        <div className="flex items-center space-x-1">
          {trend === 'up' ? (
            <FontAwesomeIcon icon={faArrowUp} className="text-green-400 text-sm" />
          ) : trend === 'down' ? (
            <FontAwesomeIcon icon={faArrowDown} className="text-red-400 text-sm" />
          ) : null}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-white/60'}`}>
            {change}
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-white/60 text-sm">{title}</p>
    </motion.div>
  );

  const SimpleChart = ({ data, title, color = 'blue' }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
      <h3 className="text-white font-bold text-lg mb-4">{title}</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`w-full bg-gradient-to-t from-${color}-500 to-${color}-400 rounded-t-lg transition-all duration-300 hover:from-${color}-400 hover:to-${color}-300`}
              style={{ height: `${(item.count || item.rate) * 2}px` }}
            />
            <span className="text-white/60 text-xs mt-2">
              {item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const CompanyRow = ({ company, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <div>
          <h4 className="text-white font-medium">{company.name}</h4>
          <p className="text-white/60 text-sm">{company.applications} applications</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-white font-bold">{company.successRate}%</div>
          <div className="text-white/60 text-xs">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold">${company.revenue.toLocaleString()}</div>
          <div className="text-white/60 text-xs">Revenue</div>
        </div>
        <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
          <FontAwesomeIcon icon={faEye} />
        </button>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-black font-bold text-2xl">E</span>
            </div>
            <div className="text-white text-lg font-medium mb-2">Loading Analytics</div>
            <div className="text-white/60">Processing data...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          {/* Header */}
          <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
                  <p className="text-white/60 mt-1">Platform insights and performance metrics</p>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                  <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <StatCard
                title="Total Companies"
                value={analytics.overview.totalCompanies}
                change="+12%"
                icon={faBuilding}
                color="bg-gradient-to-br from-blue-500 to-blue-600"
                trend="up"
              />
              <StatCard
                title="Active Users"
                value={analytics.overview.activeUsers}
                change="+8%"
                icon={faUsers}
                color="bg-gradient-to-br from-green-500 to-green-600"
                trend="up"
              />
              <StatCard
                title="Total Jobs"
                value={analytics.overview.totalJobs}
                change="+15%"
                icon={faFileAlt}
                color="bg-gradient-to-br from-purple-500 to-purple-600"
                trend="up"
              />
              <StatCard
                title="Applications"
                value={analytics.overview.applicationsProcessed.toLocaleString()}
                change="+23%"
                icon={faChartLine}
                color="bg-gradient-to-br from-orange-500 to-orange-600"
                trend="up"
              />
              <StatCard
                title="AI Success Rate"
                value={`${analytics.overview.aiSuccessRate}%`}
                change="+2.1%"
                icon={faRobot}
                color="bg-gradient-to-br from-yellow-500 to-yellow-600"
                trend="up"
              />
              <StatCard
                title="Revenue"
                value={`$${analytics.overview.revenue.toLocaleString()}`}
                change="+18%"
                icon={faChartBar}
                color="bg-gradient-to-br from-indigo-500 to-indigo-600"
                trend="up"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <SimpleChart
                data={analytics.trends.applications}
                title="Applications Over Time"
                color="blue"
              />
              <SimpleChart
                data={analytics.trends.successRate}
                title="AI Success Rate Trend"
                color="green"
              />
            </div>

            {/* Top Companies and Job Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Companies */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Top Performing Companies</h2>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                </div>
                <div className="space-y-2">
                  {analytics.topCompanies.map((company, index) => (
                    <CompanyRow key={company.name} company={company} index={index} />
                  ))}
                </div>
              </div>

              {/* Job Categories */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-6">Job Categories Distribution</h2>
                <div className="space-y-4">
                  {analytics.jobCategories.map((category, index) => (
                    <div key={category.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        <span className="text-white font-medium">{category.category}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <span className="text-white/60 text-sm w-12 text-right">{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
