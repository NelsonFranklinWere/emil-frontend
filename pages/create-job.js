import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createJob } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { motion } from 'framer-motion';

const initialState = {
  company_name: '',
  job_title: '',
  job_description: '',
  requirements: '',
  application_mode: 'link',
  application_email: '',
  report_emails: '',
  deadline: '',
  interview_time: '',
  interview_link: ''
};

export default function CreateJob() {
  const router = useRouter();
  const { user, isAuthenticated, login } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  // Auto-login effect
  useEffect(() => {
    const autoLogin = async () => {
      if (!isAuthenticated && !autoLoginAttempted) {
        setAutoLoginAttempted(true);
        try {
          await login({
            email: 'demo@example.com',
            password: 'demo123'
          });
        } catch (error) {
          console.error('Auto-login failed:', error);
        }
      }
    };
    
    autoLogin();
  }, [isAuthenticated, autoLoginAttempted, login]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Map frontend form to backend JobDTO fields
      const deadlineDate = form.deadline ? `${form.deadline}T00:00:00` : null;
      const payload = {
        companyName: form.company_name,
        title: form.job_title,
        description: form.job_description,
        requirements: form.requirements,
        applicationMode: form.application_mode, // 'email' | 'link'
        applicationEmail: form.application_email,
        reportEmails: form.report_emails
          .split(',')
          .map(e => e.trim())
          .filter(Boolean),
        // Many Spring backends expect LocalDate (YYYY-MM-DD) and LocalDateTime (YYYY-MM-DDTHH:mm)
        deadline: deadlineDate,
        interviewTime: form.interview_time || null,
        interviewLink: form.interview_link || null,
      };

      const data = await createJob(payload);
      const jobId = data.id || data.jobId || data.job_id;
      const applicationUrl = data.applicationUrl || data.application_url || '';
      router.push(`/confirmation?jobId=${encodeURIComponent(jobId || '')}&applicationUrl=${encodeURIComponent(applicationUrl)}&mode=${encodeURIComponent(form.application_mode)}&emails=${encodeURIComponent(form.report_emails)}`);
    } catch (error) {
      console.error(error);
      const backendMessage = error?.data?.message || error?.data?.error || error?.message;
      if (error?.status === 401 || error?.status === 403) {
        setErrorMsg('Authentication required. Please login first.');
        // Try auto-login again
        try {
          await login({
            email: 'demo@example.com',
            password: 'demo123'
          });
          // Retry the job creation
          setTimeout(() => {
            handleSubmit(e);
          }, 1000);
        } catch (loginError) {
          setErrorMsg('Please login to create jobs. Go to /auth/signin');
        }
        return;
      }
      setErrorMsg(backendMessage || 'Network or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-4 transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Create Job Posting
            </h1>
            <p className="text-white/60">
              Fill in your job details and let Emil AI handle the rest
            </p>
            {user && (
              <p className="text-white/40 text-sm mt-2">
                Creating as {user.name} ({user.email})
              </p>
            )}
            
            {/* Authentication Status */}
            <div className={`mt-4 p-3 rounded-lg ${isAuthenticated ? 'bg-green-900/30 border border-green-600' : 'bg-red-900/30 border border-red-600'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className={`text-sm ${isAuthenticated ? 'text-green-300' : 'text-red-300'}`}>
                  {isAuthenticated ? '✅ Authenticated - Ready to create jobs' : '❌ Not authenticated - Auto-login in progress...'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div 
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {errorMsg && (
              <motion.div 
                className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {errorMsg}
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Company Name *</label>
                <input
                  type="text"
                  name="company_name"
                  value={form.company_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                  placeholder="Enter your company name"
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Job Title *</label>
                <input
                  type="text"
                  name="job_title"
                  value={form.job_title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Job Description *</label>
                <textarea
                  name="job_description"
                  value={form.job_description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 resize-none"
                  placeholder="Describe the role, responsibilities, and company culture..."
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Requirements & Skills</label>
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 resize-none font-mono text-sm"
                  placeholder="List required skills and experience..."
                />
              </div>

              {/* Application Mode */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Application Mode *</label>
                <select
                  name="application_mode"
                  value={form.application_mode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                >
                  <option value="email" className="bg-gray-800">Applications go to Company Email</option>
                  <option value="link" className="bg-gray-800">Generate Application Link</option>
                </select>
              </div>

              {/* HR Email */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">HR Contact Email *</label>
                <input
                  type="email"
                  name="application_email"
                  value={form.application_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                  placeholder="hr@yourcompany.com"
                />
              </div>

              {/* Report Emails */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Report Emails *</label>
                <input
                  type="text"
                  name="report_emails"
                  value={form.report_emails}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                  placeholder="manager1@company.com, manager2@company.com"
                />
                <p className="text-sm text-white/50 mt-1">Separate multiple emails with commas</p>
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Application Deadline *</label>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                />
              </div>

              {/* Interview Time */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Preferred Interview Time (Optional)</label>
                <input
                  type="datetime-local"
                  name="interview_time"
                  value={form.interview_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                />
              </div>

              {/* Interview Link */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Interview Link (Optional)</label>
                <input
                  type="url"
                  name="interview_link"
                  value={form.interview_link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                  placeholder="https://meet.google.com/your-meeting"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !isAuthenticated}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Creating Job...
                  </div>
                ) : !isAuthenticated ? (
                  'Please wait - Authenticating...'
                ) : (
                  'Create Job Posting'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
