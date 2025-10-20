import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding,
  faUsers,
  faCalendar,
  faCheckCircle,
  faTimesCircle,
  faPause,
  faPlay,
  faEdit,
  faTrash,
  faEye,
  faEnvelope,
  faKey,
  faSearch,
  faFilter,
  faDownload,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminLayout from '../../components/AdminLayout';

export default function CompaniesManagement() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCompanies = [
        {
          id: 1,
          name: 'TechCorp Solutions',
          domain: 'techcorp.com',
          email: 'admin@techcorp.com',
          status: 'active',
          plan: 'Pro',
          users: 12,
          jobs: 8,
          registeredDate: '2024-01-15',
          lastActivity: '2 hours ago',
          isVerified: true
        },
        {
          id: 2,
          name: 'StartupXYZ',
          domain: 'startupxyz.io',
          email: 'hr@startupxyz.io',
          status: 'active',
          plan: 'Free',
          users: 3,
          jobs: 2,
          registeredDate: '2024-02-20',
          lastActivity: '1 day ago',
          isVerified: false
        },
        {
          id: 3,
          name: 'Enterprise Inc',
          domain: 'enterprise.com',
          email: 'admin@enterprise.com',
          status: 'suspended',
          plan: 'Enterprise',
          users: 45,
          jobs: 23,
          registeredDate: '2023-11-10',
          lastActivity: '1 week ago',
          isVerified: true
        }
      ];
      
      setCompanies(mockCompanies);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || company.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Pro': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Free': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const CompanyCard = ({ company }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faBuilding} className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{company.name}</h3>
            <p className="text-white/60 text-sm">{company.domain}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(company.status)}`}>
            {company.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPlanColor(company.plan)}`}>
            {company.plan}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{company.users}</div>
          <div className="text-white/60 text-sm">Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{company.jobs}</div>
          <div className="text-white/60 text-sm">Jobs</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
        <span>Registered: {company.registeredDate}</span>
        <span>Last activity: {company.lastActivity}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {company.isVerified ? (
            <span className="text-green-400 text-sm">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
              Verified
            </span>
          ) : (
            <span className="text-yellow-400 text-sm">
              <FontAwesomeIcon icon={faTimesCircle} className="mr-1" />
              Unverified
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCompany(company);
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
            <FontAwesomeIcon icon={company.status === 'active' ? faPause : faPlay} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const CompanyModal = () => (
    <AnimatePresence>
      {showModal && selectedCompany && (
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
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedCompany.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-white/60 text-sm">Company Name</label>
                <p className="text-white font-medium">{selectedCompany.name}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Domain</label>
                <p className="text-white font-medium">{selectedCompany.domain}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Email</label>
                <p className="text-white font-medium">{selectedCompany.email}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Plan</label>
                <p className="text-white font-medium">{selectedCompany.plan}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Send Email
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                <FontAwesomeIcon icon={faKey} className="mr-2" />
                Reset OAuth
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Impersonate
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
            <div className="text-white text-lg font-medium mb-2">Loading Companies</div>
            <div className="text-white/60">Fetching company data...</div>
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
                  <h1 className="text-3xl font-bold text-white">Companies Management</h1>
                  <p className="text-white/60 mt-1">Manage all registered companies</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Company
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
                      placeholder="Search companies..."
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
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                </div>
              </div>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faBuilding} className="text-white/60 text-2xl" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">No companies found</h3>
                <p className="text-white/60">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          <CompanyModal />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
