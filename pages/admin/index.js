import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faBuilding, 
  faChartLine, 
  faCog, 
  faBell, 
  faShieldAlt,
  faDatabase,
  faRobot,
  faFileAlt,
  faExclamationTriangle,
  faCheckCircle,
  faClock,
  faArrowUp,
  faArrowDown,
  faEye,
  faEdit,
  faTrash,
  faPlay,
  faPause,
  faRefresh,
  faDownload,
  faUpload,
  faBackup,
  faServer,
  faNetworkWired,
  faEnvelope,
  faCalendar,
  faGlobe,
  faKey,
  faLock,
  faUnlock,
  faUserShield,
  faChartBar,
  faTrendingUp,
  faTrendingDown,
  faInfoCircle,
  faWarning,
  faTimes,
  faPlus,
  faSearch,
  faFilter,
  faSort,
  faExternalLinkAlt,
  faHardDrive
} from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminLayout from '../../components/AdminLayout';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    activeUsers: 0,
    totalJobs: 0,
    applicationsToday: 0,
    aiSuccessRate: 0,
    failedAutomations: 0,
    activeWorkflows: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    status: 'healthy',
    uptime: '99.9%',
    lastBackup: '2 hours ago',
    errors: 0
  });
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    responseTime: '120ms',
    throughput: '1.2k req/min',
    errorRate: '0.1%',
    cpuUsage: '45%',
    memoryUsage: '67%',
    diskUsage: '23%'
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API calls - replace with actual endpoints
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalCompanies: 47,
        activeUsers: 156,
        totalJobs: 234,
        applicationsToday: 89,
        aiSuccessRate: 94.7,
        failedAutomations: 3,
        activeWorkflows: 89
      });

      setRecentActivity([
        { id: 1, type: 'company_registered', message: 'TechCorp registered', time: '2 minutes ago', status: 'success' },
        { id: 2, type: 'workflow_failed', message: 'Job #123 workflow failed', time: '5 minutes ago', status: 'error' },
        { id: 3, type: 'user_login', message: 'HR Manager logged in', time: '8 minutes ago', status: 'info' },
        { id: 4, type: 'application_processed', message: '15 applications processed', time: '12 minutes ago', status: 'success' }
      ]);

      setSystemHealth({
        status: 'healthy',
        uptime: '99.9%',
        lastBackup: '2 hours ago',
        errors: 3
      });

      setNotifications([
        { id: 1, type: 'info', message: 'New company registered: TechStart Inc', time: '5 minutes ago' },
        { id: 2, type: 'warning', message: 'High CPU usage detected on server-2', time: '10 minutes ago' },
        { id: 3, type: 'success', message: 'Backup completed successfully', time: '1 hour ago' }
      ]);

      setAlerts([
        { id: 1, type: 'critical', message: 'Database connection timeout', count: 3 },
        { id: 2, type: 'warning', message: 'Low disk space on server-1', count: 1 },
        { id: 3, type: 'info', message: 'Scheduled maintenance in 2 hours', count: 1 }
      ]);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
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

  const ActivityItem = ({ activity }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
    >
      <div className={`w-2 h-2 rounded-full ${
        activity.status === 'success' ? 'bg-green-400' :
        activity.status === 'error' ? 'bg-red-400' :
        'bg-blue-400'
      }`} />
      <div className="flex-1">
        <p className="text-white/90 text-sm">{activity.message}</p>
        <p className="text-white/50 text-xs">{activity.time}</p>
      </div>
    </motion.div>
  );

  const NotificationItem = ({ notification }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center space-x-3 p-3 rounded-lg border-l-4 ${
        notification.type === 'success' ? 'border-green-400 bg-green-500/10' :
        notification.type === 'warning' ? 'border-yellow-400 bg-yellow-500/10' :
        notification.type === 'error' ? 'border-red-400 bg-red-500/10' :
        'border-blue-400 bg-blue-500/10'
      }`}
    >
      <FontAwesomeIcon 
        icon={
          notification.type === 'success' ? faCheckCircle :
          notification.type === 'warning' ? faWarning :
          notification.type === 'error' ? faExclamationTriangle :
          faInfoCircle
        }
        className={`text-sm ${
          notification.type === 'success' ? 'text-green-400' :
          notification.type === 'warning' ? 'text-yellow-400' :
          notification.type === 'error' ? 'text-red-400' :
          'text-blue-400'
        }`}
      />
      <div className="flex-1">
        <p className="text-white/90 text-sm">{notification.message}</p>
        <p className="text-white/50 text-xs">{notification.time}</p>
      </div>
    </motion.div>
  );

  const AlertItem = ({ alert }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center justify-between p-3 rounded-lg ${
        alert.type === 'critical' ? 'bg-red-500/20 border border-red-500/30' :
        alert.type === 'warning' ? 'bg-yellow-500/20 border border-yellow-500/30' :
        'bg-blue-500/20 border border-blue-500/30'
      }`}
    >
      <div className="flex items-center space-x-3">
        <FontAwesomeIcon 
          icon={
            alert.type === 'critical' ? faExclamationTriangle :
            alert.type === 'warning' ? faWarning :
            faInfoCircle
          }
          className={`text-sm ${
            alert.type === 'critical' ? 'text-red-400' :
            alert.type === 'warning' ? 'text-yellow-400' :
            'text-blue-400'
          }`}
        />
        <span className="text-white/90 text-sm">{alert.message}</span>
      </div>
      {alert.count > 1 && (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          alert.type === 'critical' ? 'bg-red-500 text-white' :
          alert.type === 'warning' ? 'bg-yellow-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {alert.count}
        </span>
      )}
    </motion.div>
  );

  const MetricCard = ({ title, value, icon, color, trend, change }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <FontAwesomeIcon icon={icon} className="text-white text-sm" />
        </div>
        <div className="flex items-center space-x-1">
          {trend === 'up' ? (
            <FontAwesomeIcon icon={faTrendingUp} className="text-green-400 text-xs" />
          ) : trend === 'down' ? (
            <FontAwesomeIcon icon={faTrendingDown} className="text-red-400 text-xs" />
          ) : null}
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-white/60'}`}>
            {change}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{value}</h3>
      <p className="text-white/60 text-xs">{title}</p>
    </motion.div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-black font-bold text-2xl">E</span>
            </div>
            <div className="text-white text-lg font-medium mb-2">Emil AI Admin</div>
            <div className="text-white/60">Loading dashboard...</div>
          </motion.div>
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
                  <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-white/60 mt-1">System overview and management</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    systemHealth.status === 'healthy' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    System {systemHealth.status}
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300">
                    <FontAwesomeIcon icon={faRefresh} className="mr-2" />
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Companies"
                value={stats.totalCompanies}
                change="+12%"
                icon={faBuilding}
                color="bg-gradient-to-br from-blue-500 to-blue-600"
                trend="up"
              />
              <StatCard
                title="Active Users"
                value={stats.activeUsers}
                change="+8%"
                icon={faUsers}
                color="bg-gradient-to-br from-green-500 to-green-600"
                trend="up"
              />
              <StatCard
                title="Total Jobs"
                value={stats.totalJobs}
                change="+15%"
                icon={faFileAlt}
                color="bg-gradient-to-br from-purple-500 to-purple-600"
                trend="up"
              />
              <StatCard
                title="Applications Today"
                value={stats.applicationsToday}
                change="+23%"
                icon={faChartLine}
                color="bg-gradient-to-br from-orange-500 to-orange-600"
                trend="up"
              />
            </div>

            {/* AI & System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="AI Success Rate"
                value={`${stats.aiSuccessRate}%`}
                change="+2.1%"
                icon={faRobot}
                color="bg-gradient-to-br from-yellow-500 to-yellow-600"
                trend="up"
              />
              <StatCard
                title="Active Workflows"
                value={stats.activeWorkflows}
                change="+5"
                icon={faCog}
                color="bg-gradient-to-br from-indigo-500 to-indigo-600"
                trend="up"
              />
              <StatCard
                title="Failed Automations"
                value={stats.failedAutomations}
                change="-1"
                icon={faExclamationTriangle}
                color="bg-gradient-to-br from-red-500 to-red-600"
                trend="down"
              />
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <MetricCard
                title="Response Time"
                value={performanceMetrics.responseTime}
                icon={faClock}
                color="bg-gradient-to-br from-blue-500 to-blue-600"
                trend="down"
                change="-5ms"
              />
              <MetricCard
                title="Throughput"
                value={performanceMetrics.throughput}
                icon={faNetworkWired}
                color="bg-gradient-to-br from-green-500 to-green-600"
                trend="up"
                change="+12%"
              />
              <MetricCard
                title="Error Rate"
                value={performanceMetrics.errorRate}
                icon={faExclamationTriangle}
                color="bg-gradient-to-br from-red-500 to-red-600"
                trend="down"
                change="-0.05%"
              />
              <MetricCard
                title="CPU Usage"
                value={performanceMetrics.cpuUsage}
                icon={faServer}
                color="bg-gradient-to-br from-orange-500 to-orange-600"
                trend="up"
                change="+3%"
              />
              <MetricCard
                title="Memory"
                value={performanceMetrics.memoryUsage}
                icon={faDatabase}
                color="bg-gradient-to-br from-purple-500 to-purple-600"
                trend="up"
                change="+2%"
              />
              <MetricCard
                title="Disk Usage"
                value={performanceMetrics.diskUsage}
                icon={faHardDrive}
                color="bg-gradient-to-br from-indigo-500 to-indigo-600"
                trend="up"
                change="+1%"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                    <button className="text-white/60 hover:text-white text-sm">
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentActivity.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>

              {/* System Health & Alerts */}
              <div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
                  <h2 className="text-xl font-bold text-white mb-4">System Health</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Uptime</span>
                      <span className="text-green-400 font-medium">{systemHealth.uptime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Last Backup</span>
                      <span className="text-white/90">{systemHealth.lastBackup}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Errors (24h)</span>
                      <span className="text-red-400 font-medium">{systemHealth.errors}</span>
                    </div>
                  </div>
                </div>

                {/* Active Alerts */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
                  <h2 className="text-xl font-bold text-white mb-4">Active Alerts</h2>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <AlertItem key={alert.id} alert={alert} />
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUsers} className="mr-2" />
                      Manage Companies
                    </button>
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCog} className="mr-2" />
                      Workflow Status
                    </button>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                      <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                      View Analytics
                    </button>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                      <FontAwesomeIcon icon={faBackup} className="mr-2" />
                      Create Backup
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications & System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Notifications */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">System Notifications</h2>
                  <button className="text-white/60 hover:text-white text-sm">
                    Mark All Read
                  </button>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-6">System Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
                      <span className="text-white/90">Database</span>
                    </div>
                    <span className="text-green-400 font-medium">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
                      <span className="text-white/90">N8N Workflows</span>
                    </div>
                    <span className="text-green-400 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
                      <span className="text-white/90">Email Service</span>
                    </div>
                    <span className="text-green-400 font-medium">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon icon={faWarning} className="text-yellow-400" />
                      <span className="text-white/90">AI Service</span>
                    </div>
                    <span className="text-yellow-400 font-medium">Degraded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
