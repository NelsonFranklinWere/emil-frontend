import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers,
  faUser,
  faBuilding,
  faCalendar,
  faCheckCircle,
  faTimesCircle,
  faLock,
  faUnlock,
  faEdit,
  faTrash,
  faEye,
  faEnvelope,
  faKey,
  faSearch,
  faFilter,
  faDownload,
  faPlus,
  faShieldAlt,
  faUserShield,
  faUserTie,
  faChartBar,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminLayout from '../../components/AdminLayout';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john@techcorp.com',
          role: 'HR_MANAGER',
          company: 'TechCorp Solutions',
          status: 'active',
          lastLogin: '2 hours ago',
          emailVerified: true,
          twoFactorEnabled: false,
          tokens: 2,
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah@techcorp.com',
          role: 'ANALYST',
          company: 'TechCorp Solutions',
          status: 'active',
          lastLogin: '1 day ago',
          emailVerified: true,
          twoFactorEnabled: true,
          tokens: 1,
          createdAt: '2024-01-20'
        },
        {
          id: 3,
          name: 'Mike Wilson',
          email: 'mike@startupxyz.io',
          role: 'ADMIN',
          company: 'StartupXYZ',
          status: 'active',
          lastLogin: '3 hours ago',
          emailVerified: true,
          twoFactorEnabled: true,
          tokens: 3,
          createdAt: '2024-02-20'
        },
        {
          id: 4,
          name: 'Lisa Brown',
          email: 'lisa@enterprise.com',
          role: 'HR_MANAGER',
          company: 'Enterprise Inc',
          status: 'suspended',
          lastLogin: '1 week ago',
          emailVerified: false,
          twoFactorEnabled: false,
          tokens: 0,
          createdAt: '2023-11-10'
        }
      ];
      
      setUsers(mockUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case 'ADMIN': return faUserShield;
      case 'HR_MANAGER': return faUserTie;
      case 'ANALYST': return faChartBar;
      default: return faUser;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HR_MANAGER': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ANALYST': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const UserCard = ({ user }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <FontAwesomeIcon icon={getRoleIcon(user.role)} className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{user.name}</h3>
            <p className="text-white/60 text-sm">{user.email}</p>
            <p className="text-white/50 text-xs">{user.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
            {user.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-white">{user.tokens}</div>
          <div className="text-white/60 text-sm">Active Tokens</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-white">
            {user.emailVerified ? (
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
            ) : (
              <FontAwesomeIcon icon={faTimesCircle} className="text-red-400" />
            )}
          </div>
          <div className="text-white/60 text-sm">Email Verified</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
        <span>Last login: {user.lastLogin}</span>
        <span>Created: {user.createdAt}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {user.twoFactorEnabled && (
            <span className="text-green-400 text-sm">
              <FontAwesomeIcon icon={faShieldAlt} className="mr-1" />
              2FA
            </span>
          )}
          <span className="text-white/60 text-sm">
            {user.tokens} active session{user.tokens !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedUser(user);
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
            <FontAwesomeIcon icon={user.status === 'active' ? faLock : faUnlock} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const UserModal = () => (
    <AnimatePresence>
      {showModal && selectedUser && (
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
              <h2 className="text-2xl font-bold text-white">{selectedUser.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-white/60 text-sm">Full Name</label>
                <p className="text-white font-medium">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Email</label>
                <p className="text-white font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Role</label>
                <p className="text-white font-medium">{selectedUser.role}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Company</label>
                <p className="text-white font-medium">{selectedUser.company}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Status</label>
                <p className="text-white font-medium">{selectedUser.status}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm">Last Login</label>
                <p className="text-white font-medium">{selectedUser.lastLogin}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Send Email
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                <FontAwesomeIcon icon={faKey} className="mr-2" />
                Reset Password
              </button>
              <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                Force Logout
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
            <div className="text-white text-lg font-medium mb-2">Loading Users</div>
            <div className="text-white/60">Fetching user data...</div>
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
                  <h1 className="text-3xl font-bold text-white">Users Management</h1>
                  <p className="text-white/60 mt-1">Manage all users across companies</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add User
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
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="all">All Roles</option>
                    <option value="ADMIN">Admin</option>
                    <option value="HR_MANAGER">HR Manager</option>
                    <option value="ANALYST">Analyst</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                </div>
              </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faUsers} className="text-white/60 text-2xl" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">No users found</h3>
                <p className="text-white/60">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          <UserModal />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
