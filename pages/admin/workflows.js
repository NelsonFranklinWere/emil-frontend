import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog,
  faPlay,
  faPause,
  faRefresh,
  faExclamationTriangle,
  faCheckCircle,
  faClock,
  faEye,
  faEdit,
  faTrash,
  faSearch,
  faFilter,
  faDownload,
  faPlus,
  faExternalLinkAlt,
  faChartLine,
  faDatabase,
  faRobot,
  faTimes,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminLayout from '../../components/AdminLayout';

export default function WorkflowsManagement() {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockWorkflows = [
        {
          id: 1,
          name: 'Job Application Processing',
          jobId: 'JOB-001',
          company: 'TechCorp Solutions',
          status: 'active',
          executions: 45,
          lastRun: '2 hours ago',
          successRate: 94.2,
          errorCount: 3,
          nextRun: 'In 30 minutes',
          webhookUrl: 'https://n8n.example.com/webhook/job-001',
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          name: 'Candidate Screening',
          jobId: 'JOB-002',
          company: 'StartupXYZ',
          status: 'active',
          executions: 23,
          lastRun: '1 hour ago',
          successRate: 87.5,
          errorCount: 1,
          nextRun: 'In 1 hour',
          webhookUrl: 'https://n8n.example.com/webhook/job-002',
          createdAt: '2024-02-20'
        },
        {
          id: 3,
          name: 'Interview Scheduling',
          jobId: 'JOB-003',
          company: 'Enterprise Inc',
          status: 'paused',
          executions: 12,
          lastRun: '1 day ago',
          successRate: 91.7,
          errorCount: 0,
          nextRun: 'Paused',
          webhookUrl: 'https://n8n.example.com/webhook/job-003',
          createdAt: '2023-11-10'
        },
        {
          id: 4,
          name: 'Application Review',
          jobId: 'JOB-004',
          company: 'TechCorp Solutions',
          status: 'error',
          executions: 8,
          lastRun: '3 hours ago',
          successRate: 62.5,
          errorCount: 5,
          nextRun: 'Failed',
          webhookUrl: 'https://n8n.example.com/webhook/job-004',
          createdAt: '2024-01-20'
        }
      ];
      
      setWorkflows(mockWorkflows);
    } catch (error) {
      console.error('Failed to fetch workflows:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || workflow.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return faCheckCircle;
      case 'paused': return faPause;
      case 'error': return faExclamationTriangle;
      case 'inactive': return faClock;
      default: return faCog;
    }
  };

  const WorkflowCard = ({ workflow }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faCog} className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{workflow.name}</h3>
            <p className="text-white/60 text-sm">{workflow.jobId} • {workflow.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(workflow.status)}`}>
            <FontAwesomeIcon icon={getStatusIcon(workflow.status)} className="mr-1" />
            {workflow.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{workflow.executions}</div>
          <div className="text-white/60 text-sm">Executions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{workflow.successRate}%</div>
          <div className="text-white/60 text-sm">Success Rate</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Last Run:</span>
          <span className="text-white/90">{workflow.lastRun}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Next Run:</span>
          <span className="text-white/90">{workflow.nextRun}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Errors:</span>
          <span className={workflow.errorCount > 0 ? 'text-red-400' : 'text-green-400'}>
            {workflow.errorCount}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedWorkflow(workflow);
              setShowModal(true);
            }}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
            <FontAwesomeIcon icon={workflow.status === 'active' ? faPause : faPlay} />
          </button>
        </div>
        <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
          <FontAwesomeIcon icon={faRefresh} />
        </button>
      </div>
    </motion.div>
  );

  const WorkflowModal = () => (
    <AnimatePresence>
      {showModal && selectedWorkflow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedWorkflow.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-white/60 text-sm">Job ID</label>
                <p className="text-white font-medium">{selectedWorkflow.jobId}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Company</label>
                <p className="text-white font-medium">{selectedWorkflow.company}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Status</label>
                <p className="text-white font-medium">{selectedWorkflow.status}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Success Rate</label>
                <p className="text-white font-medium">{selectedWorkflow.successRate}%</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Executions</label>
                <p className="text-white font-medium">{selectedWorkflow.executions}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Error Count</label>
                <p className="text-white font-medium">{selectedWorkflow.errorCount}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-white/60 text-sm">Webhook URL</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-white font-medium flex-1">{selectedWorkflow.webhookUrl}</p>
                <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                View in n8n
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                <FontAwesomeIcon icon={faPlay} className="mr-2" />
                Activate
              </button>
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                <FontAwesomeIcon icon={faRefresh} className="mr-2" />
                Re-run
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-black font-bold text-2xl">E</span>
            </div>
            <div className="text-white text-lg font-medium mb-2">Loading Workflows</div>
            <div className="text-white/60">Fetching workflow data...</div>
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
                  <h1 className="text-3xl font-bold text-white">Workflows Management</h1>
                  <p className="text-white/60 mt-1">Monitor and manage n8n workflows</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Create Workflow
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search workflows..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="error">Error</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                </div>
              </div>
            </div>

            {/* Workflows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))}
            </div>

            {filteredWorkflows.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faCog} className="text-white/60 text-2xl" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">No workflows found</h3>
                <p className="text-white/60">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          <WorkflowModal />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
