import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { motion } from 'framer-motion';
import { getPublicJobs } from '../lib/api';

// Simple placeholder mapping in case backend fields differ
const mapJob = (j) => ({
  id: j.id || j.jobId || j.job_id,
  title: j.title || j.jobTitle,
  company: j.company || j.companyName,
  applicants: j.applicants || j.applicantCount || 0,
  deadline: j.deadline || j.closingDate || '',
  status: j.status || (j.active ? 'Active' : 'Closed'),
  shortlisted: j.shortlisted || 0,
  flagged: j.flagged || 0,
  rejected: j.rejected || 0,
});

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplicants: 0,
    aiAccuracy: 94.7
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await getPublicJobs();
      const list = Array.isArray(data) ? data : (data?.content || data?.items || []);
      const mappedJobs = list.map(mapJob);
      
      setJobs(mappedJobs);
      setStats({
        totalJobs: mappedJobs.length,
        activeJobs: mappedJobs.filter(job => job.status === 'Active').length,
        totalApplicants: mappedJobs.reduce((sum, job) => sum + job.applicants, 0),
        aiAccuracy: 94.7
      });
    } catch (err) {
      setError('Failed to load jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const viewReport = (job) => {
    setSelectedJob(job);
    setShowReport(true);
  };

  const downloadReport = () => {
    alert('Downloading report...');
  };

  const resendReport = () => {
    alert('Report resent to HR emails');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-black font-bold text-2xl">E</span>
          </div>
          <div className="text-white text-lg font-medium mb-2">Loading Dashboard</div>
          <div className="text-white/60">Preparing your AI-powered workspace...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Premium Header */}
        <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-black font-bold text-lg">E</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Emil AI Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome back, {user?.name || 'User'}!</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/create-job" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105">
                  + New Job
                </Link>
                <button 
                  onClick={logout}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-gray-700 font-medium px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Jobs', value: stats.totalJobs, icon: '📝', color: 'from-blue-500 to-cyan-500' },
              { label: 'Active Jobs', value: stats.activeJobs, icon: '⚡', color: 'from-green-500 to-emerald-500' },
              { label: 'Total Applicants', value: stats.totalApplicants, icon: '👥', color: 'from-purple-500 to-pink-500' },
              { label: 'AI Accuracy', value: `${stats.aiAccuracy}%`, icon: '🧠', color: 'from-yellow-500 to-orange-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                </div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Jobs Table */}
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Job Postings</h2>
              <div className="text-sm text-gray-600">
                AI-powered insights and analytics
              </div>
            </div>
            
            {!loading && jobs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="text-gray-400 mb-4 text-lg">No job postings yet</div>
                <Link href="/create-job" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105">
                  Create Your First Job
                </Link>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
                <div className="text-gray-500">Loading jobs...</div>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="text-red-600 text-lg">{error}</div>
              </div>
            )}

            {jobs.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Job Title</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Company</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Applicants</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Deadline</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, index) => (
                      <motion.tr 
                        key={job.id} 
                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.company}</div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{job.company}</td>
                        <td className="py-4 px-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {job.applicants}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{job.deadline}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => viewReport(job)}
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-4 py-2 rounded-lg shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105 text-sm"
                          >
                            View Report
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Report Modal */}
          {showReport && selectedJob && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div 
                className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Candidate Report: {selectedJob.title}
                    </h3>
                    <button
                      onClick={() => setShowReport(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedJob.applicants}</div>
                      <div className="text-blue-700 text-sm">Total Applicants</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedJob.shortlisted}</div>
                      <div className="text-green-700 text-sm">Shortlisted</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-yellow-600">{selectedJob.flagged}</div>
                      <div className="text-yellow-700 text-sm">Flagged</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-red-600">{selectedJob.rejected}</div>
                      <div className="text-red-700 text-sm">Rejected</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mb-6">
                    <button onClick={downloadReport} className="bg-white/10 hover:bg-white/20 border border-white/20 text-gray-700 font-medium px-6 py-3 rounded-xl transition-all duration-300">
                      Download JSON Report
                    </button>
                    <button onClick={downloadReport} className="bg-white/10 hover:bg-white/20 border border-white/20 text-gray-700 font-medium px-6 py-3 rounded-xl transition-all duration-300">
                      Download PDF Report
                    </button>
                    <button onClick={resendReport} className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105">
                      Resend to HR
                    </button>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Candidate Breakdown</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-green-700">Shortlisted Candidates</span>
                          <span className="font-bold text-green-700">{selectedJob.shortlisted}</span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${(selectedJob.shortlisted / selectedJob.applicants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-yellow-700">Flagged for Review</span>
                          <span className="font-bold text-yellow-700">{selectedJob.flagged}</span>
                        </div>
                        <div className="w-full bg-yellow-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${(selectedJob.flagged / selectedJob.applicants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-red-700">Rejected</span>
                          <span className="font-bold text-red-700">{selectedJob.rejected}</span>
                        </div>
                        <div className="w-full bg-red-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${(selectedJob.rejected / selectedJob.applicants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}