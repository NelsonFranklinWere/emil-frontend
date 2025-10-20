import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeadset,
  faTicketAlt,
  faUser,
  faCalendar,
  faClock,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faReply,
  faEdit,
  faTrash,
  faSearch,
  faFilter,
  faDownload,
  faPlus,
  faTimes,
  faEnvelope,
  faPhone,
  faChat,
  faBell,
  faFlag,
  faEye,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminLayout from '../../components/AdminLayout';

export default function SupportManagement() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTickets = [
        {
          id: 1,
          subject: 'Cannot access dashboard',
          user: 'John Smith',
          company: 'TechCorp Solutions',
          email: 'john@techcorp.com',
          status: 'open',
          priority: 'high',
          category: 'Technical',
          createdAt: '2024-01-15',
          lastActivity: '2 hours ago',
          messages: [
            {
              id: 1,
              sender: 'John Smith',
              message: 'I cannot access my dashboard. Getting a 403 error.',
              timestamp: '2024-01-15 10:30',
              isAdmin: false
            },
            {
              id: 2,
              sender: 'Admin Support',
              message: 'We are looking into this issue. Please try clearing your browser cache.',
              timestamp: '2024-01-15 11:15',
              isAdmin: true
            }
          ]
        },
        {
          id: 2,
          subject: 'Workflow not triggering',
          user: 'Sarah Johnson',
          company: 'StartupXYZ',
          email: 'sarah@startupxyz.io',
          status: 'in_progress',
          priority: 'medium',
          category: 'Workflow',
          createdAt: '2024-01-14',
          lastActivity: '1 day ago',
          messages: [
            {
              id: 1,
              sender: 'Sarah Johnson',
              message: 'My n8n workflow is not triggering when new applications come in.',
              timestamp: '2024-01-14 14:20',
              isAdmin: false
            }
          ]
        },
        {
          id: 3,
          subject: 'Billing question',
          user: 'Mike Wilson',
          company: 'Enterprise Inc',
          email: 'mike@enterprise.com',
          status: 'resolved',
          priority: 'low',
          category: 'Billing',
          createdAt: '2024-01-13',
          lastActivity: '2 days ago',
          messages: [
            {
              id: 1,
              sender: 'Mike Wilson',
              message: 'I have a question about my monthly billing.',
              timestamp: '2024-01-13 09:45',
              isAdmin: false
            },
            {
              id: 2,
              sender: 'Admin Support',
              message: 'Your billing has been updated. You should see the changes in your next invoice.',
              timestamp: '2024-01-13 16:30',
              isAdmin: true
            }
          ]
        }
      ];
      
      setTickets(mockTickets);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const TicketCard = ({ ticket }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-2">{ticket.subject}</h3>
          <div className="flex items-center gap-4 text-sm text-white/60 mb-2">
            <span><FontAwesomeIcon icon={faUser} className="mr-1" /> {ticket.user}</span>
            <span><FontAwesomeIcon icon={faBuilding} className="mr-1" /> {ticket.company}</span>
            <span><FontAwesomeIcon icon={faCalendar} className="mr-1" /> {ticket.createdAt}</span>
          </div>
          <p className="text-white/60 text-sm">Last activity: {ticket.lastActivity}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
            {ticket.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm">Category: {ticket.category}</span>
          <span className="text-white/60 text-sm">•</span>
          <span className="text-white/60 text-sm">{ticket.messages.length} messages</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedTicket(ticket);
              setShowModal(true);
            }}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
            <FontAwesomeIcon icon={faReply} />
          </button>
          <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const TicketModal = () => (
    <AnimatePresence>
      {showModal && selectedTicket && (
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
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedTicket.subject}</h2>
                <p className="text-white/60">{selectedTicket.user} • {selectedTicket.company}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Messages */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {selectedTicket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isAdmin
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{message.sender}</span>
                      <span className="text-xs opacity-60">{message.timestamp}</span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Type your reply..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                  <FontAwesomeIcon icon={faReply} className="mr-2" />
                  Send
                </button>
              </div>
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
            <div className="text-white text-lg font-medium mb-2">Loading Support Tickets</div>
            <div className="text-white/60">Fetching support data...</div>
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
                  <h1 className="text-3xl font-bold text-white">Support Management</h1>
                  <p className="text-white/60 mt-1">Manage support tickets and customer inquiries</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    New Ticket
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
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                    <FontAwesomeIcon icon={faTicketAlt} />
                  </div>
                  <span className="text-white/60 text-sm">Open Tickets</span>
                </div>
                <div className="text-2xl font-bold text-white">12</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <span className="text-white/60 text-sm">In Progress</span>
                </div>
                <div className="text-2xl font-bold text-white">8</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <span className="text-white/60 text-sm">Resolved</span>
                </div>
                <div className="text-2xl font-bold text-white">45</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <FontAwesomeIcon icon={faHeadset} />
                  </div>
                  <span className="text-white/60 text-sm">Avg Response</span>
                </div>
                <div className="text-2xl font-bold text-white">2.3h</div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search tickets..."
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
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="all">All Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tickets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>

            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faTicketAlt} className="text-white/60 text-2xl" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">No tickets found</h3>
                <p className="text-white/60">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          <TicketModal />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
